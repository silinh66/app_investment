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

export default function GoldListScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialGoldName = params.goldName as string;

  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [latestPrice, setLatestPrice] = useState(null);
  const [listGiaVang, setListGiaVang] = useState([]);
  const [goldName, setGoldName] = useState(initialGoldName);
  const [tooltipPos, setTooltipPos] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: null,
    index: -1,
  });

  useEffect(() => {
    fetchGoldHistory();
  }, [goldName]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await getGiaVang();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGoldHistory = async () => {
    try {
      const response = await axiosClient.get(`/giaVangChart`);
      const allData = response?.data?.data || [];

      // Filter by goldName and sort by date
      const filtered = allData
        .filter((item) => item.company === goldName)
        .sort(
          (a, b) =>
            new Date(a.price_date).getTime() - new Date(b.price_date).getTime()
        );

      setHistoryData(filtered);
      if (filtered.length > 0) {
        setLatestPrice(filtered[filtered.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching gold history:", error);
    }
  };

  const getGiaVang = async () => {
    try {
      const responseGiaVang = await axiosClient.get(`/giaVang/latest`);
      const dataGiaVang = responseGiaVang?.data?.data;
      setListGiaVang(dataGiaVang || []);
    } catch (error) {
      console.error("Error fetching gia vang:", error);
      setListGiaVang([]);
    }
  };

  const handleGoldItemClick = (itemName) => {
    if (itemName && itemName !== "Vàng thế giới" && !itemName.includes("USD")) {
      setGoldName(itemName);
      setTooltipPos({ visible: false, x: 0, y: 0, value: null, index: -1 });
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

    return historyData.filter((item) => new Date(item.price_date) >= startDate);
  };

  const filteredData = getFilteredData();

  const handleDataPointClick = (data) => {
    const { index, value, x, y, dataset } = data;

    if (filteredData[index]) {
      setTooltipPos({
        visible: true,
        x: x,
        y: y - 10,
        value: filteredData[index],
        index: index,
      });

      // Auto hide after 3 seconds
      setTimeout(() => {
        setTooltipPos((prev) => ({ ...prev, visible: false }));
      }, 3000);
    }
  };

  const chartData = {
    labels:
      filteredData.length > 0
        ? filteredData.map((item, index) => {
            const step = Math.ceil(filteredData.length / 6);
            if (index % step === 0 || index === filteredData.length - 1) {
              const d = new Date(item.price_date);
              return `${d.getDate()}/${d.getMonth() + 1}`;
            }
            return "";
          })
        : [""],
    datasets: [
      {
        data:
          filteredData.length > 0
            ? filteredData.map((item) => item.buy / 1000000)
            : [0],
        // dataset-level color (keeps line color for buy)
        color: (opacity = 1) => theme.colors.green,
        strokeWidth: 3,
      },
      {
        data:
          filteredData.length > 0
            ? filteredData.map((item) => item.sell / 1000000)
            : [0],
        color: (opacity = 1) => theme.colors.red,
        strokeWidth: 3,
      },
    ],
  };

  const formatPrice = (price) => {
    if (!price) return "-";
    return price.toLocaleString("vi-VN");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getPriceStats = () => {
    if (filteredData.length === 0)
      return {
        buyLow: 0,
        buyHigh: 0,
        sellLow: 0,
        sellHigh: 0,
      };
    const buyPrices = filteredData.map((item) => item.buy);
    const sellPrices = filteredData.map((item) => item.sell);
    return {
      buyLow: Math.min(...buyPrices),
      buyHigh: Math.max(...buyPrices),
      sellLow: Math.min(...sellPrices),
      sellHigh: Math.max(...sellPrices),
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
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerTitleRow}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Vàng miếng {goldName}
            </Text>
            <Text style={styles.headerDropdown}>◊</Text>
          </View>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.secondaryText },
            ]}
          >
            {goldName === "SJC" ? "SJC - Hồ Chí Minh" : goldName}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Price */}
        <View style={styles.priceSection}>
          <Text style={[styles.currentPrice, { color: theme.colors.text }]}>
            {latestPrice ? formatPrice(latestPrice.sell) : "-"}
          </Text>
        </View>

        {/* Chart */}
        {filteredData.length > 0 && (
          <View
            style={[
              styles.chartContainer,
              {
                borderColor: theme.mode === "dark" ? "#2C2C2E" : "#E5E5EA",
              },
            ]}
          >
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 50}
              height={280}
              // show Y-axis labels (values are in "triệu" because dataset = price / 1_000_000)
              yAxisLabel=""
              yAxisSuffix=" Triệu"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 1,
                // IMPORTANT: set a visible color here so the Y labels render.
                // previously it was "transparent" which hides axis/label coloring.
                color: (opacity = 1) =>
                  theme.mode === "dark"
                    ? `rgba(142,142,147,${opacity})`
                    : `rgba(60,60,67,${0.6 * opacity})`,
                // label color for X axis labels
                labelColor: (opacity = 1) =>
                  theme.mode === "dark"
                    ? "rgba(142, 142, 147, 1)"
                    : "rgba(60, 60, 67, 0.6)",
                style: {
                  borderRadius: 8,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: 2,
                  stroke: "transparent",
                  fill: "transparent",
                },
                propsForBackgroundLines: {
                  strokeDasharray: "",
                  stroke: theme.mode === "dark" ? "#2C2C2E" : "#E5E5EA",
                  strokeWidth: 1,
                },
                propsForLabels: {
                  fontSize: 11,
                  fontWeight: "400",
                },
              }}
              bezier
              style={styles.chart}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              segments={5}
              // increase left offset so Y column has space
              yLabelsOffset={40} // <-- tăng từ 10 lên 40
              xLabelsOffset={-5}
              onDataPointClick={handleDataPointClick}
              withDots={true}
              withShadow={false}
              fromZero={false}
              formatYLabel={(value) => {
                // value is the Y tick (in millions). Format with 1 decimal and keep 'Triệu' suffix handled by yAxisSuffix
                const num = parseFloat(value);
                if (Number.isNaN(num)) return value;
                return num.toFixed(1);
              }}
            />

            {/* Custom Tooltip */}
            {tooltipPos.visible && tooltipPos.value && (
              <View
                style={[
                  styles.tooltip,
                  {
                    left: Math.max(
                      10,
                      Math.min(
                        tooltipPos.x - 70,
                        Dimensions.get("window").width - 170
                      )
                    ),
                    top: Math.max(10, tooltipPos.y - 100),
                    backgroundColor:
                      theme.mode === "dark" ? "#2C2C2E" : "#FFFFFF",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  },
                ]}
              >
                <Text
                  style={[styles.tooltipDate, { color: theme.colors.text }]}
                >
                  {formatDate(tooltipPos.value.price_date)}
                </Text>
                <View style={styles.tooltipRow}>
                  <View style={styles.tooltipItem}>
                    <View style={styles.tooltipDot}>
                      <View
                        style={[
                          styles.tooltipDotInner,
                          { backgroundColor: "#10B981" },
                        ]}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.tooltipLabel,
                          { color: theme.colors.secondaryText },
                        ]}
                      >
                        Mua vào
                      </Text>
                      <Text
                        style={[
                          styles.tooltipValue,
                          { color: theme.colors.text },
                        ]}
                      >
                        {formatPrice(tooltipPos.value.buy)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tooltipRow}>
                  <View style={styles.tooltipItem}>
                    <View style={styles.tooltipDot}>
                      <View
                        style={[
                          styles.tooltipDotInner,
                          { backgroundColor: "#EF4444" },
                        ]}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.tooltipLabel,
                          { color: theme.colors.secondaryText },
                        ]}
                      >
                        Bán ra
                      </Text>
                      <Text
                        style={[
                          styles.tooltipValue,
                          { color: theme.colors.text },
                        ]}
                      >
                        {formatPrice(tooltipPos.value.sell)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#10B981" }]}
                />
                <Text style={[styles.legendText, { color: theme.colors.text }]}>
                  Mua vào
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#EF4444" }]}
                />
                <Text style={[styles.legendText, { color: theme.colors.text }]}>
                  Bán ra
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Gold Price List Table */}
        <View style={styles.tableSection}>
          <Text style={[styles.tableTitle, { color: theme.colors.text }]}>
            Giá Vàng/Tỷ giá
          </Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.tableColName]}>
              Tên
            </Text>
            <Text style={[styles.tableHeaderText, styles.tableColPrice]}>
              Mua vào
            </Text>
            <Text style={[styles.tableHeaderText, styles.tableColPrice]}>
              Bán ra
            </Text>
          </View>

          {/* Table Rows */}
          {listGiaVang.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.tableRow,
                  {
                    backgroundColor:
                      goldName === item.name
                        ? theme.mode === "dark"
                          ? "#1E3A5F"
                          : "#E3F2FD"
                        : theme.mode === "dark"
                        ? theme.colors.background
                        : "#FFFFFF",
                  },
                ]}
                onPress={() => handleGoldItemClick(item.name)}
              >
                <View style={styles.tableColName}>
                  <Text
                    style={[
                      styles.goldName,
                      {
                        color:
                          goldName === item.name
                            ? "#007AFF"
                            : theme.colors.text,
                        fontWeight: goldName === item.name ? "700" : "500",
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={styles.tableColPrice}>
                  <Text
                    style={[
                      styles.priceText,
                      {
                        color:
                          item.name === "Vàng thế giới"
                            ? "#10B981"
                            : theme.colors.text,
                      },
                    ]}
                  >
                    {formatPrice(item.buy)}
                  </Text>
                </View>
                <View style={styles.tableColPrice}>
                  <Text
                    style={[
                      styles.priceText,
                      {
                        color:
                          item.name === "Vàng thế giới"
                            ? "#10B981"
                            : theme.colors.text,
                      },
                    ]}
                  >
                    {formatPrice(item.sell)}
                  </Text>
                </View>
              </TouchableOpacity>
              {index < listGiaVang.length - 1 && (
                <View
                  style={[
                    styles.tableDivider,
                    {
                      backgroundColor:
                        theme.mode === "dark" ? "#2C2C2E" : "#E5E5EA",
                    },
                  ]}
                />
              )}
            </View>
          ))}
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
    paddingHorizontal: 8,
    paddingTop: 50,
    paddingBottom: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontSize: 34,
    fontWeight: "400",
    color: "#007AFF",
    marginTop: -4,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  headerDropdown: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  priceSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  chartContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    position: "relative",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  chart: {
    marginVertical: 0,
    borderRadius: 8,
    paddingRight: 0,
  },
  tooltip: {
    position: "absolute",
    minWidth: 160,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(142, 142, 147, 0.2)",
    zIndex: 1000,
  },
  tooltipDate: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  tooltipRow: {
    marginBottom: 8,
  },
  tooltipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tooltipDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(142, 142, 147, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  tooltipDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tooltipLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  tooltipValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tableSection: {
    marginBottom: 40,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#8E8E93",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  tableColName: {
    flex: 3,
  },
  tableColPrice: {
    flex: 1,
    alignItems: "flex-end",
  },
  goldName: {
    fontSize: 13,
    fontWeight: "500",
  },
  goldLocation: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
  },
  changeText: {
    fontSize: 14,
    textAlign: "right",
    marginTop: 2,
  },
  tableDivider: {
    height: 1,
    marginLeft: 16,
  },
});
