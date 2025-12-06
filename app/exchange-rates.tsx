import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import axiosClient from "@/api/request";

export default function ExchangeRatesScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [exchangeRateData, setExchangeRateData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTyGiaNgoaiTe();
  }, []);

  const getTyGiaNgoaiTe = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/ty_gia_ngoai_te");
      const data = response?.data?.data || [];

      // Transform API data to match component structure
      const transformedData = data.map((item: any) => ({
        name: item.name || item.currencyName,
        icon: getCurrencyIcon(item.name || item.currencyName),
        buyRate: item.buy || item.buyRate,
        sellRate: item.sell || item.sellRate,
        buyColor: "#34C759",
        sellColor: "#FF6B6B",
      }));

      setExchangeRateData(transformedData);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrencyIcon = (name: string) => {
    const iconMap: Record<string, string> = {
      "Đô La Mỹ": "🇺🇸",
      "USD": "🇺🇸",
      "EURO": "🇪🇺",
      "EUR": "🇪🇺",
      "Bảng Anh": "🇬🇧",
      "GBP": "��",
      "Đô La Úc": "🇦🇺",
      "AUD": "🇦🇺",
      "Đô La Canada": "🇨🇦",
      "CAD": "🇨🇦",
      "Yên Nhật": "🇯🇵",
      "JPY": "��",
      "Won Hàn Quốc": "🇰🇷",
      "KRW": "🇰🇷",
      "Nhân Dân Tệ": "🇨🇳",
      "CNY": "🇨🇳",
      "Đô La Sing": "🇸🇬",
      "SGD": "🇸🇬",
      "Franc Thụy Sĩ": "🇨🇭",
      "CHF": "🇨🇭",
      "Đô La Hồng Kông": "🇭🇰",
      "HKD": "🇭🇰",
      "Baht Thái": "🇹🇭",
      "THB": "🇹🇭",
    };
    return iconMap[name] || "💱";
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
          Tỷ giá
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
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text
              style={[
                styles.headerTextName,
                { color: theme.colors.textResult },
              ]}
            >
              Tên
            </Text>
            <Text
              style={[
                styles.headerTextRate,
                { color: theme.colors.textResult },
              ]}
            >
              Mua
            </Text>
            <Text
              style={[
                styles.headerTextRate,
                { color: theme.colors.textResult },
              ]}
            >
              Bán
            </Text>
          </View>

          {/* Table Data */}
          {exchangeRateData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.currencyNameContainer}>
                <Text
                  style={[styles.currencyName, { color: theme.colors.text }]}
                >
                  {item.name}
                </Text>
              </View>
              <Text style={[styles.rateText, { color: item.buyColor }]}>
                {item.buyRate}
              </Text>
              <Text style={[styles.rateText, { color: item.sellColor }]}>
                {item.sellRate}
              </Text>
            </View>
          ))}
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
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginBottom: 4,
  },
  headerTextName: {
    fontSize: 11,
    fontWeight: "400",
    flex: 2,
    textAlign: "left",
  },
  headerTextRate: {
    fontSize: 11,
    fontWeight: "400",
    flex: 1,
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#30323B",
  },
  currencyNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
  currencyName: {
    fontSize: 14,
    fontWeight: "400",
  },
  rateText: {
    fontSize: 14,
    textAlign: "right",
    flex: 1,
    fontWeight: "500",
  },
});
