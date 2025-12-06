import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import axiosClient from "@/api/request";
import { INVESTING_MAPPING } from "@/app/utils/mapping";

export default function WorldMarketsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [worldMarketData, setWorldMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorldMarketsData();
  }, []);

  const getWorldMarketsData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/investing-data");
      const apiData = response?.data?.data || [];

      // Filter world data (currencies and indices)
      const worldData = apiData.filter((item: any) =>
        item.symbol?.startsWith('currencies/') || item.symbol?.startsWith('indices/')
      );

      // Transform to display format
      const transformedData = worldData.map((item: any) => ({
        name: item.name || item.title || item.symbol,
        icon: getMarketIcon(item.symbol),
        value: item.value?.toLocaleString() || "0",
        change: formatChange(item),
        changeColor: item.value >= (item.price_close || 0) ? "#34C759" : "#FF6B6B",
      }));

      setWorldMarketData(transformedData);
    } catch (error) {
      console.error("Error fetching world markets data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMarketIcon = (symbol: string) => {
    if (symbol?.includes('usd-vnd')) return '🇻🇳';
    if (symbol?.includes('us-30') || symbol?.includes('nasdaq') || symbol?.includes('spx-500')) return '🇺🇸';
    if (symbol?.includes('netherlands')) return '🇳🇱';
    if (symbol?.includes('japan') || symbol?.includes('nikkei')) return '🇯🇵';
    if (symbol?.includes('uk-')) return '🇬🇧';
    if (symbol?.includes('germany')) return '🇩🇪';
    if (symbol?.includes('france')) return '🇫🇷';
    if (symbol?.includes('china') || symbol?.includes('shanghai')) return '🇨🇳';
    if (symbol?.includes('hong-kong') || symbol?.includes('hang-seng')) return '🇭🇰';
    if (symbol?.includes('australia')) return '🇦🇺';
    return '🌍';
  };

  const formatChange = (item: any) => {
    const change = item.value - (item.price_close || item.value);
    const changePercent = item.price_close ? ((change / item.price_close) * 100).toFixed(2) : "0.00";
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${changePercent}%)`;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={[styles.backIcon, { color: theme.colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Thế giới
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View
        style={{
          backgroundColor: theme.colors.backgroundCoPhieu,
          marginHorizontal: 8,
          flex: 1,
          borderRadius: 12,
        }}
      >
        <ScrollView
          style={styles.tableContainer}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Table Data */}
          {loading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            worldMarketData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.marketNameContainer}>
                  <Text style={[styles.marketName, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text
                    style={[styles.marketValue, { color: theme.colors.text }]}
                  >
                    {item.value}
                  </Text>
                  <Text
                    style={[styles.marketChange, { color: item.changeColor }]}
                  >
                    {item.change}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#30323B",
  },
  marketNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  marketName: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 2,
  },
  valueContainer: {
    alignItems: "flex-end",
  },
  marketValue: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  marketChange: {
    fontSize: 13,
  },
});
