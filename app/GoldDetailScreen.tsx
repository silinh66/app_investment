import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { LineChart } from "react-native-chart-kit";
import axiosClient from "@/api/request";

export default function GoldDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const goldName = params.goldName as string;

  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    fetchGoldHistory();
  }, [goldName]);

  const fetchGoldHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/giaVang/history`, {
        params: { name: goldName },
      });
      const data = response?.data?.data || [];
      setHistoryData(data);
      if (data.length > 0) {
        setLatestPrice(data[data.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching gold history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredData = () => {
    if (historyData.length === 0) return [];
    const now = new Date();
    let startDate = new Date();

    switch (selectedPeriod) {
      case "7D":
        startDate.setDate(now.getDate() - 7);
        break;
      case "1M":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "6M":
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "1Y":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case "Tất cả":
        return historyData;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    return historyData.filter((item) => new Date(item.date) >= startDate);
  };

  const filteredData = getFilteredData();

  const chartData = {
    labels: filteredData.map((item) => {
      const d = new Date(item.date);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    }),
    datasets: [
      {
        data: filteredData.map((item) => item.buy / 1000000),
        color: (opacity = 1) => `rgba(92, 214, 128, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: filteredData.map((item) => item.sell / 1000000),
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const formatPrice = (price) => {
    if (!price) return "-";
    return price.toLocaleString("vi-VN");
  };

  const getPriceStats = () => {
    if (filteredData.length === 0) return { low: 0, high: 0 };
    const buyPrices = filteredData.map((item) => item.buy);
    const sellPrices = filteredData.map((item) => item.sell);
    const allPrices = [...buyPrices, ...sellPrices];
    return {
      low: Math.min(...allPrices),
      high: Math.max(...allPrices),
    };
  };

  const stats = getPriceStats();

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Vàng miếng {goldName}
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.secondaryText },
            ]}
          >
            {goldName}
          </Text>
        </View>
        <TouchableOpacity style={styles.aiButton}>
          <View style={styles.aiIcon}>
            <Text style={styles.aiText}>AI</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Price */}
        <View style={styles.priceSection}>
          <Text style={[styles.currentPrice, { color: theme.colors.text }]}>
            {latestPrice ? formatPrice(latestPrice.sell) : "-"}
          </Text>
          <Text
            style={[styles.priceChange, { color: theme.colors.secondaryText }]}
          >
            0đ (0%)
          </Text>
        </View>

        {/* Chart */}
        {filteredData.length > 0 && (
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 32}
              height={280}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 1,
                color: (opacity = 1) => theme.colors.secondaryText,
                labelColor: (opacity = 1) => theme.colors.secondaryText,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "0",
                },
                propsForBackgroundLines: {
                  strokeDasharray: "",
                  stroke: theme.mode === "dark" ? "#333" : "#e0e0e0",
                  strokeWidth: 1,
                },
              }}
              bezier
              style={styles.chart}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              segments={4}
            />
            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#5CD680" }]}
                />
                <Text style={[styles.legendText, { color: theme.colors.text }]}>
                  Mua vào
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#FF3B30" }]}
                />
                <Text style={[styles.legendText, { color: theme.colors.text }]}>
                  Bán ra
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {["7D", "1M", "3M", "6M", "1Y", "Tất cả"].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
                {
                  backgroundColor:
                    selectedPeriod === period
                      ? theme.colors.blue
                      : theme.colors.inactiveTab,
                },
              ]}
            >
              <Text
                style={[
                  styles.periodText,
                  {
                    color:
                      selectedPeriod === period
                        ? "#FFFFFF"
                        : theme.colors.secondaryText,
                    fontWeight: selectedPeriod === period ? "600" : "400",
                  },
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Analysis Section */}
        <TouchableOpacity
          style={[
            styles.aiAnalysisSection,
            { backgroundColor: theme.colors.card },
          ]}
        >
          <View style={styles.aiAnalysisIcon}>
            <Text style={styles.aiAnalysisIconText}>⚡</Text>
          </View>
          <Text style={[styles.aiAnalysisText, { color: theme.colors.text }]}>
            Phân tích hay nhất về vàng
          </Text>
          <Text style={styles.aiAnalysisArrow}>→</Text>
        </TouchableOpacity>

        {/* Price Stats */}
        <View
          style={[
            styles.statsContainer,
            { backgroundColor: theme.colors.card },
          ]}
        >
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Giá mua thấp nhất
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {formatPrice(stats.low)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Giá mua cao nhất
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {formatPrice(stats.high)}
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Giá bán thấp nhất
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {formatPrice(stats.low)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Giá bán cao nhất
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {formatPrice(stats.high)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontSize: 28,
    color: "#007AFF",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  aiButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  aiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8E8ED",
    justifyContent: "center",
    alignItems: "center",
  },
  aiText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  priceSection: {
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 36,
    fontWeight: "700",
  },
  priceChange: {
    fontSize: 15,
    marginTop: 4,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 13,
  },
  periodSelector: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  periodButtonActive: {
    backgroundColor: "#007AFF",
  },
  periodText: {
    fontSize: 13,
  },
  aiAnalysisSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  aiAnalysisIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  aiAnalysisIconText: {
    fontSize: 16,
  },
  aiAnalysisText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  aiAnalysisArrow: {
    fontSize: 20,
    color: "#007AFF",
  },
  statsContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "600",
  },
});
