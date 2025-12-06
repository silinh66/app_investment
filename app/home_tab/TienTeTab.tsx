import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import axiosClient from "@/api/request";

import { INVESTING_MAPPING } from "@/app/utils/mapping";

export default function TienTeTab() {
  const { theme } = useTheme();
  const router = useRouter();

  // Define keys for each section
  const worldKeys = [
    'currencies/usd-vnd',
    'indices/us-30',
    'indices/netherlands-25',
    'indices/nq-100',
    'indices/us-spx-500',
  ];

  const commodityKeys = [
    'commodities/gold',
    'currencies/xau-usd',
    'commodities/silver',
    'commodities/copper',
    'commodities/platinum',
  ];

  // Initialize state from mapping
  const [listNuocNgoai, setListNuocNgoai] = useState(() =>
    worldKeys.map(key => ({
      ...INVESTING_MAPPING[key],
      value: "0",
      high: "0",
      low: "0",
      change: "0",
      percent: "0%",
      time: "--:--",
      pid: INVESTING_MAPPING[key]?.pairId
    }))
  );

  const [listHangHoa, setListHangHoa] = useState(() =>
    commodityKeys.map(key => ({
      ...INVESTING_MAPPING[key],
      value: "0",
      high: "0",
      low: "0",
      change: "0",
      percent: "0%",
      time: "--:--",
      pid: INVESTING_MAPPING[key]?.pairId
    }))
  );

  const [tyGiaNgoaiTe, setTyGiaNgoaiTe] = useState([]);
  const [highlightedItems, setHighlightedItems] = useState<
    Record<string, boolean>
  >({});
  const [loading, setLoading] = useState(true);

  const getInvestingData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/investing-data");
      const apiData = response?.data?.data || [];

      // Filter and categorize data
      const worldData = apiData.filter((item: any) =>
        item.symbol?.startsWith('currencies/') || item.symbol?.startsWith('indices/')
      );

      const commodityData = apiData.filter((item: any) =>
        item.symbol?.startsWith('commodities/')
      );

      // Transform world data
      const transformedWorldData = worldData.map((item: any) => ({
        pairId: item.pair_id,
        title: item.title,
        name: item.name || item.title || item.symbol,
        value: item.value?.toString() || "0",
        high: item.price_high?.toString() || "0",
        low: item.price_low?.toString() || "0",
        change: "0",
        percent: "0%",
        time: new Date(item.date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        pid: item.pair_id
      }));

      // Transform commodity data
      const transformedCommodityData = commodityData.map((item: any) => ({
        pairId: item.pair_id,
        title: item.title,
        name: item.name || item.title || item.symbol,
        value: item.value?.toString() || "0",
        high: item.price_high?.toString() || "0",
        low: item.price_low?.toString() || "0",
        change: "0",
        percent: "0%",
        time: new Date(item.date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        pid: item.pair_id
      }));

      setListNuocNgoai(transformedWorldData);
      setListHangHoa(transformedCommodityData);

    } catch (error) {
      console.error("Error fetching investing data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data from backend
    getInvestingData();
    getTyGiaNgoaiTe();

    const ws = new WebSocket(
      "wss://streaming.forexpros.com/echo/263/os_yqv68/websocket"
    );

    ws.onopen = () => {
      console.log("WebSocket Connected");

      // Send UID
      const uidMessage = JSON.stringify({
        _event: "UID",
        UID: 268973161, // Using the UID from the working session
      });
      ws.send(JSON.stringify([uidMessage]));

      const listCommodities = [
        ...listHangHoa.map((item) => item.pid),
        ...listNuocNgoai.map((item) => item.pid),
      ];
      console.log("Subscribing to commodities:", listCommodities);
      const message = listCommodities
        .map((item, index) => {
          if (index === listCommodities.length - 1)
            return `isOpenPair-${item}:%%pid-${item}:`;
          else return `isOpenPair-${item}:%%pid-${item}:%%`;
        })
        .join("");

      const dataStringify = [
        `{"_event":"bulk-subscribe","tzID":8,"message":"${message}"}`,
      ];
      console.log("Sending subscription message:", dataStringify[0]);
      ws.send(JSON.stringify(dataStringify));

      // Send Heartbeat
      const heartbeat = JSON.stringify({
        _event: "heartbeat",
        data: "h",
      });
      ws.send(JSON.stringify([heartbeat]));
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = (e) => {
      console.log("WebSocket Closed:", e.code, e.reason);
    };

    ws.addEventListener("message", (event) => {
      if (event?.data === "o") return;
      // console.log("WebSocket Message Received:", event.data);
      try {
        const parsedData = JSON.parse(event?.data.substring(1));
        const messageReceive = JSON.parse(parsedData[0]);

        // Handle heartbeat or other non-data messages
        if (!messageReceive.message) {
          // console.log("Non-data message received:", messageReceive);
          return;
        }

        const messageContent = messageReceive?.message.split("::");
        const content = messageContent[1];
        const contentParse = JSON.parse(content);
        // console.log("Parsed Content:", contentParse);

        // Update Hàng hóa
        setListHangHoa((prev) => {
          const item = prev.find((item) => item.pid === contentParse?.pid);
          if (item) {
            // console.log("Updating HangHoa item:", item.name, contentParse.last);
            item.value = contentParse?.last;
            item.change = contentParse?.pc;
            item.percent = contentParse?.pcp;
            return [...prev]; // Return new array reference to trigger re-render
          }
          return prev;
        });

        // Update Nước ngoài
        setListNuocNgoai((prev) => {
          const item = prev.find((item) => item.pid === contentParse?.pid);
          if (item) {
            // console.log("Updating NuocNgoai item:", item.name, contentParse.last);
            item.value = contentParse?.last;
            item.change = contentParse?.pc;
            item.percent = contentParse?.pcp;
            return [...prev];
          }
          return prev;
        });

        // Đánh dấu item có sự thay đổi
        setHighlightedItems((prev) => ({
          ...prev,
          [contentParse?.pid]: true,
        }));

        setTimeout(() => {
          setHighlightedItems((prev) => {
            const newState = { ...prev };
            delete newState[contentParse?.pid];
            return newState;
          });
        }, 1000);
      } catch (error) {
        console.error("WebSocket message parse error:", error);
      }
    });

    return () => {
      ws.close();
    };
  }, []);

  const getTyGiaNgoaiTe = async () => {
    try {
      const responseTyGiaNgoaiTe = await axiosClient.get("/ty_gia_ngoai_te");
      const dataTyGiaNgoaiTe = responseTyGiaNgoaiTe?.data?.data;
      setTyGiaNgoaiTe(dataTyGiaNgoaiTe);
    } catch (error) {
      console.error("Error fetching ty gia ngoai te:", error);
    }
  };

  const formatChange = (change: string) => {
    if (!change) return "";
    return parseFloat(change) > 0 ? `+${change}` : change;
  };

  const getChangeColor = (change: string) => {
    if (!change) return theme.colors.yellow;
    const numChange = parseFloat(change);
    if (numChange > 0) return "#34C759";
    if (numChange < 0) return "#FF6B6B";
    return theme.colors.yellow;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Thế giới Section */}
        <View
          style={{
            backgroundColor: theme.colors.backgroundCoPhieu,
            marginHorizontal: 8,
            marginTop: 12,
            borderRadius: 12,
            paddingVertical: 8,
          }}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Thế giới
              </Text>
              <TouchableOpacity onPress={() => router.push("/world-markets")}>
                <Text
                  style={[styles.viewMore, { color: theme.colors.xemThem }]}
                >
                  Xem thêm ›
                </Text>
              </TouchableOpacity>
            </View>

            {/* World Data */}
            {listNuocNgoai.slice(0, 5).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.itemContainer,
                  highlightedItems[item.pid] && styles.highlightedItem,
                ]}
              >
                <View style={styles.leftSection}>
                  <Text style={[styles.symbol, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={[styles.price, { color: theme.colors.text }]}>
                    {item.value}
                  </Text>
                  <Text
                    style={[
                      styles.percent,
                      { color: getChangeColor(item.change) },
                    ]}
                  >
                    {formatChange(item.change)} ({item.percent})
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Hàng hóa Section */}
        <View
          style={{
            backgroundColor: theme.colors.backgroundCoPhieu,
            marginHorizontal: 8,
            marginTop: 12,
            borderRadius: 12,
            paddingVertical: 8,
          }}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Hàng hóa
              </Text>
              <TouchableOpacity onPress={() => router.push("/commodities")}>
                <Text
                  style={[styles.viewMore, { color: theme.colors.xemThem }]}
                >
                  Xem thêm ›
                </Text>
              </TouchableOpacity>
            </View>

            {/* Commodities Data */}
            {listHangHoa.slice(0, 5).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.itemContainer,
                  highlightedItems[item.pid] && styles.highlightedItem,
                ]}
              >
                <View style={styles.leftSection}>
                  <Text style={[styles.symbol, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={[styles.price, { color: theme.colors.text }]}>
                    {item.value}
                  </Text>
                  <Text
                    style={[
                      styles.percent,
                      { color: getChangeColor(item.change) },
                    ]}
                  >
                    {formatChange(item.change)} ({item.percent})
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tỷ giá Section */}
        <View
          style={{
            backgroundColor: theme.colors.backgroundCoPhieu,
            marginHorizontal: 8,
            marginTop: 12,
            borderRadius: 12,
            paddingVertical: 8,
          }}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Tỷ giá
              </Text>
              <TouchableOpacity onPress={() => router.push("/exchange-rates")}>
                <Text
                  style={[styles.viewMore, { color: theme.colors.xemThem }]}
                >
                  Xem thêm ›
                </Text>
              </TouchableOpacity>
            </View>

            {/* Exchange Rate Header */}
            <View style={styles.exchangeHeader}>
              <Text
                style={[styles.headerTextName, { color: theme.colors.textResult }]}
              >
                Tên
              </Text>
              <Text
                style={[styles.headerText, { color: theme.colors.textResult }]}
              >
                Mua
              </Text>
              <Text
                style={[styles.headerText, { color: theme.colors.textResult }]}
              >
                Bán
              </Text>
            </View>

            {/* Exchange Rate Data */}
            {tyGiaNgoaiTe.slice(0, 5).map((item: any, index) => (
              <View key={index} style={styles.exchangeRow}>
                <View style={styles.exchangeNameContainer}>
                  <Text
                    style={[styles.exchangeName, { color: theme.colors.text }]}
                  >
                    {item.name || item.currencyName}
                  </Text>
                </View>
                <Text
                  style={[styles.exchangeRate, { color: theme.colors.green }]}
                >
                  {item.buy || item.buyRate}
                </Text>
                <Text
                  style={[styles.exchangeRate, { color: theme.colors.red }]}
                >
                  {item.sell || item.sellRate}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  viewMore: {
    fontSize: 13,
    fontWeight: "500",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#30323B",
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  symbol: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  percent: {
    fontSize: 13,
  },
  exchangeHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: 4,
    paddingHorizontal: 0,
  },
  headerTextName: {
    fontSize: 11,
    fontWeight: "400",
    flex: 1,
    textAlign: "left",
  },
  headerText: {
    fontSize: 11,
    fontWeight: "400",
    flex: 1,
    textAlign: "right",
  },
  exchangeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#30323B",
    paddingHorizontal: 0,
  },
  exchangeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  exchangeName: {
    fontSize: 14,
    fontWeight: "400",
  },
  exchangeRate: {
    fontSize: 14,
    textAlign: "right",
    flex: 1,
    fontWeight: "500",
  },
  highlightedItem: {
    backgroundColor: "#FFD700",
  },
});
