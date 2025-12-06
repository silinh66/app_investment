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

export default function CommoditiesScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [commoditiesData, setCommoditiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommoditiesData();
  }, []);

  const getCommoditiesData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/investing-data");
      const apiData = response?.data?.data || [];

      // Filter commodity data
      const commodityData = apiData.filter((item: any) =>
        item.symbol?.startsWith('commodities/')
      );

      // Transform to display format
      const transformedData = commodityData.map((item: any) => ({
        name: item.name || item.title || item.symbol,
        icon: getCommodityIcon(item.symbol),
        value: item.value?.toLocaleString() || "0",
        change: formatChange(item),
        changeColor: item.value >= (item.price_close || 0) ? "#34C759" : "#FF6B6B",
      }));

      setCommoditiesData(transformedData);
    } catch (error) {
      console.error("Error fetching commodities data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCommodityIcon = (symbol: string) => {
    if (symbol?.includes('gold')) return '🟡';
    if (symbol?.includes('silver')) return '⚪';
    if (symbol?.includes('copper')) return '🟤';
    if (symbol?.includes('platinum')) return '⚫';
    if (symbol?.includes('palladium')) return '⚪';
    if (symbol?.includes('oil') || symbol?.includes('crude') || symbol?.includes('brent')) return '⚫';
    if (symbol?.includes('gas')) return '🔵';
    if (symbol?.includes('wheat')) return '🟤';
    if (symbol?.includes('corn')) return '🟡';
    if (symbol?.includes('soybean')) return '🟤';
    return '📦';
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
          Hàng hóa
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
            commoditiesData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.commodityNameContainer}>
                  <Text
                    style={[styles.commodityName, { color: theme.colors.text }]}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text
                    style={[styles.commodityValue, { color: theme.colors.text }]}
                  >
                    {item.value}
                  </Text>
                  <Text
                    style={[styles.commodityChange, { color: item.changeColor }]}
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
  commodityNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  commodityName: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 2,
  },
  valueContainer: {
    alignItems: "flex-end",
  },
  commodityValue: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  commodityChange: {
    fontSize: 13,
  },
});
