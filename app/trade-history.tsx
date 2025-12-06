import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
// import io from 'socket.io-client'; // TODO: Add socket.io-client dependency

// Type definition for trade data
type TradeItem = {
  Time: string;
  LastPrice: number;
  Change: number;
  LastVol: number;
  type: string;
};

export default function TradeHistoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { listMatchOrder, symbol } = useLocalSearchParams<{
    listMatchOrder: string;
    symbol: string;
  }>();

  const [tradeData, setTradeData] = React.useState<TradeItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [lastOrder, setLastOrder] = React.useState<TradeItem | null>(null);

  const isDark = theme.mode === "dark";
  const colors = {
    background: isDark ? "#0B0F1A" : "#f5f5f5",
    cardBackground: isDark ? "#1a1e2b" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    secondaryText: isDark ? "#8e8e93" : "#666666",
    border: isDark ? "#2a3340" : "#e0e0e0",
    headerBorder: isDark ? "#1F242F" : "#e0e0e0",
  };

  // Load trade data on component mount
  React.useEffect(() => {
    const loadTradeData = async () => {
      try {
        setIsLoading(true);

        // First try to get data from AsyncStorage
        const storedData = await AsyncStorage.getItem("tempTradeData");
        if (storedData) {
          const parsedData = JSON.parse(storedData) as TradeItem[];
          setTradeData(parsedData);
          // Clear the temporary data
          await AsyncStorage.removeItem("tempTradeData");
        } else if (listMatchOrder) {
          // Fallback to URL params if AsyncStorage is empty
          const parsedData = JSON.parse(listMatchOrder) as TradeItem[];
          setTradeData(parsedData);
        } else {
          // Fallback static data if no real data available
          const fallbackData = Array.from({ length: 50 }).map((_, i) => ({
            Time: "14:45:01",
            LastPrice: 27.6 - i * 0.01,
            Change: i % 2 === 0 ? +(0.1 + i * 0.01) : -(0.1 + i * 0.01),
            LastVol: Math.floor(Math.random() * 300000),
            type: i % 3 === 0 ? "B" : "S",
          }));
          setTradeData(fallbackData);
        }
      } catch (error) {
        console.error("Error loading trade data:", error);
        setTradeData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTradeData();
  }, [listMatchOrder]);

  // Socket connection for real-time trade data updates
  React.useEffect(() => {
    if (!symbol) return;

    const SOCKET_URL = "wss://api.dautubenvung.vn/marketStream";
    console.log("Connecting to socket for trade history:", SOCKET_URL);

    // TODO: Uncomment when socket.io-client is installed

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("Trade history socket connected:", socket.id);
      socket.emit("subscribe", symbol);
    });

    // Handle market data for trade history updates
    socket.on("marketData", (parsedData) => {
      console.log("Received marketData for trade history:", parsedData);

      if (!parsedData?.isDuplicate) {
        const newTradeItem: TradeItem = {
          Time:
            parsedData.Time ||
            new Date().toLocaleTimeString("vi-VN", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          LastPrice: parsedData.LastPrice || 0,
          Change: parsedData.Change || 0,
          LastVol: parsedData.LastVol || 0,
          type: parsedData.type || "M",
        };

        // Add new trade to the beginning of the list
        setTradeData((prev) => [newTradeItem, ...prev]);
        setLastOrder(newTradeItem);
      } else {
        console.log("Skipping duplicate or invalid data:", parsedData);
      }
    });

    socket.on("disconnect", () => {
      console.log("Trade history socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Trade history socket connection error:", error);
    });

    return () => {
      socket.disconnect();
    };

    // For now, just log that socket would be connected
    console.log(`Would connect socket for symbol: ${symbol}`);
  }, [symbol]);

  const formatNumber = (number: any) => {
    return (number / 1000)?.toFixed(2);
  };

  const formatNumberComma = (num: any) => {
    if (!num && num !== 0) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Parse the trade data from params with performance optimization
  const tradeDataMap = React.useMemo(() => {
    return tradeData.map((item, index) => ({
      id: `trade-${index}`, // Add unique ID for better FlatList performance
      time: item.Time || "00:00:00",
      price: item.LastPrice || 0,
      change: item.Change || 0,
      volume: item.LastVol || 0,
      type: item?.type === "S" ? "B" : item?.type === "B" ? "M" : "",
    }));
  }, [tradeData]);

  // Memoized render item for better performance
  const renderItem = React.useCallback(
    ({ item }: { item: any }) => {
      const isUp = item?.change > 0;
      const isDown = item?.change < 0;
      const noChange = item?.change === 0;

      return (
        <View style={styles.row}>
          <Text style={[styles.cell, { color: colors.text }]}>{item.time}</Text>
          <Text
            style={[
              styles.cell,
              styles.price,
              { color: colors.text },
              isUp && styles.green,
              isDown && styles.red,
              noChange && styles.yellow,
            ]}
          >
            {formatNumber(item.price)}
          </Text>
          <Text
            style={[
              styles.cell,
              styles.change,
              { color: colors.text },
              isUp && styles.green,
              isDown && styles.red,
              noChange && styles.yellow,
            ]}
          >
            {typeof item.change === "number"
              ? item.change >= 0
                ? `+${formatNumber(item.change)}`
                : item.change.toFixed(2)
              : item.change}
          </Text>
          <Text style={[styles.cell, { color: colors.text }]}>
            {formatNumberComma(item.volume)}
          </Text>
          <Text
            style={[
              styles.cell,
              { color: colors.text },
              item.type === "M" && styles.green,
              item.type === "B" && styles.red,
            ]}
          >
            {item.type}
          </Text>
        </View>
      );
    },
    [colors.text]
  );

  // Key extractor for better FlatList performance
  const keyExtractor = React.useCallback((item: any) => item.id, []);

  // Get item layout for better virtualization
  const getItemLayout = React.useCallback(
    (_: any, index: number) => ({
      length: 32, // Row height
      offset: 32 * index,
      index,
    }),
    []
  );

  return (
    <View
      style={[styles.screenContainer, { backgroundColor: colors.background }]}
    >
      {/* Header with Back Button */}
      <View
        style={[
          styles.headerContainer,
          { borderBottomColor: colors.headerBorder },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={[styles.backText, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Lịch sử khớp lệnh
        </Text>
      </View>

      {/* Table */}
      <View style={styles.tableContainer}>
        <View
          style={[
            styles.row,
            styles.header,
            { borderBottomColor: colors.border },
          ]}
        >
          <Text style={[styles.headerCell, { color: colors.secondaryText }]}>
            Khớp
          </Text>
          <Text style={[styles.headerCell, { color: colors.secondaryText }]}>
            Giá
          </Text>
          <Text style={[styles.headerCell, { color: colors.secondaryText }]}>
            +/-
          </Text>
          <Text style={[styles.headerCell, { color: colors.secondaryText }]}>
            KL
          </Text>
          <Text style={[styles.headerCell, { color: colors.secondaryText }]}>
            M/B
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: colors.secondaryText }]}>
              Loading...
            </Text>
          </View>
        ) : (
          <FlatList
            data={tradeDataMap}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={20}
            updateCellsBatchingPeriod={50}
            initialNumToRender={30}
            windowSize={10}
            legacyImplementation={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50, // Add top padding to account for status bar
    borderBottomWidth: 1,
  },
  backButton: {
    paddingRight: 12,
  },
  backText: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    height: 32, // Fixed height for getItemLayout optimization
  },
  header: {
    borderBottomWidth: 0.5,
    paddingBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: "center",
  },
  price: {
    fontWeight: "500",
  },
  change: {
    fontWeight: "500",
  },
  red: {
    color: "#FF6B6B",
  },
  green: {
    color: "#34C759",
  },
  yellow: {
    color: "#FFD60A",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  loadingText: {
    fontSize: 16,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
