import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import ChartWebViews from "./ChartWebView";
import { SettingIcon } from "@/components/icons";
import io from "socket.io-client";
import axiosClient from "../api/request";
import { useAuth } from "@/context/AuthContext";

// Helper functions from stock-detail.tsx
function formatNumberWithDecimals(value: any, decimals: number = 2) {
  if (value == null) return "0";

  const [integerPart, fractionPart] = value.toString().split(".");
  const integerWithSeparator = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  const fractionFormatted = (fractionPart || "").slice(0, decimals);

  return fractionFormatted
    ? integerWithSeparator + "." + fractionFormatted
    : integerWithSeparator;
}

function formatToBillion(value: number) {
  const billionValue = value / 1e9;
  return formatNumberWithDecimals(billionValue, 2) + (value === 0 ? "" : " Tỷ");
}

function getPriceColor(
  price: number,
  reference: number,
  ceiling: number,
  floor: number
) {
  if (price === ceiling) return "#C663E9";
  if (price === floor) return "#47D3EB";
  if (price === reference) return "#E8D632";
  if (price > reference) return Colors.greenPrice;
  if (price < reference) return Colors.redPrice;
  return "#E8D632";
}

// Order Book interface
interface Order {
  BidPrice1?: number;
  BidVol1?: number;
  BidPrice2?: number;
  BidVol2?: number;
  BidPrice3?: number;
  BidVol3?: number;
  AskPrice1?: number;
  AskVol1?: number;
  AskPrice2?: number;
  AskVol2?: number;
  AskPrice3?: number;
  AskVol3?: number;
  TotalBuyVol?: number;
  TotalSellVol?: number;
  TotalVol?: number;
  LastVol?: number;
  type?: string;
  isDuplicate?: boolean;
  // Socket real-time data properties
  LastPrice?: number;
  Close?: number;
  RatioChange?: number;
  High?: number;
  AvgPrice?: number;
  Low?: number;
  Ceiling?: number;
  RefPrice?: number;
  Floor?: number;
  Change?: number;
  Open?: number;
  Time?: string;
  TradingDate?: string;
  symbol?: string;
  Exchange?: string;
  MarketId?: string;
  TotalOtherVol?: number;
  EstMatchedPrice?: number;
  TradingSession?: string;
  TradingStatus?: string;
  PriorVal?: number;
}

const Colors = {
  charade: "#202127",
  white: "#FFFFFF",
  border: "#30323B",
  BuddhaGold: "#E8D632",
  greenPrice: "#5CD680",
  redPrice: "#FF6B6B",
};

const formatNumber = (num: any) => {
  if (typeof num !== "number") return "0";
  return num.toFixed(2);
};

const StockInfoCard = ({ data }: { data: any }) => {
  const {
    companyName = "Công ty Cổ phần Chứng khoán SSI",
    exchange = "HOSE",
    currentPrice = 23.7,
    changePercent = 0.84,
    high = 24.4,
    change = 0.2,
    average = 24.02,
    low = 23.7,
    ceiling = 25.35,
    reference = 23.7,
    floor = 22.05,
    lastOrder,
  } = data;

  // Parse lastOrder values (divide by 1000) except for Ceiling and Floor
  let currentPriceValue = lastOrder?.LastPrice
    ? lastOrder.LastPrice / 1000
    : currentPrice;
  const ratioChange =
    lastOrder?.RatioChange !== undefined
      ? lastOrder.RatioChange / 1000
      : changePercent;
  const changeValue =
    lastOrder?.Change !== undefined ? lastOrder.Change / 1000 : change;

  const highValue = lastOrder?.High ? lastOrder.High / 1000 : high;
  const averageValue = lastOrder?.AvgPrice
    ? lastOrder.AvgPrice / 1000
    : average;
  const lowValue = lastOrder?.Low ? lastOrder.Low / 1000 : low;
  const referenceValue = lastOrder?.RefPrice
    ? lastOrder.RefPrice / 1000
    : reference;
  const ceilingValue = lastOrder?.Ceiling ? lastOrder.Ceiling / 1000 : ceiling;
  const floorValue = lastOrder?.Floor ? lastOrder.Floor / 1000 : floor;

  const { theme } = useTheme();
  const isUp = changePercent > 0;
  const isRef = currentPriceValue === referenceValue;
  const percentColor = getPriceColor(
    currentPriceValue,
    referenceValue,
    ceilingValue,
    floorValue
  );

  return (
    <View
      style={[
        stockInfoStyles.card,
        {
          backgroundColor: theme.colors.backgroundCoPhieu,
        },
      ]}
    >
      <View style={stockInfoStyles.header}>
        <Text style={[stockInfoStyles.company, { color: theme.colors.text }]}>
          {companyName?.length > 32
            ? companyName.substring(0, 32) + "..."
            : companyName}
        </Text>
        <View
          style={[
            stockInfoStyles.exchangeBox,
            {
              backgroundColor: theme.colors.backgroundExchangeItem,
            },
          ]}
        >
          <Text
            style={[
              stockInfoStyles.exchange,
              {
                color: theme.colors.text,
              },
            ]}
          >
            {exchange}
          </Text>
        </View>
      </View>

      <View style={stockInfoStyles.row}>
        <View style={stockInfoStyles.mainPriceBox}>
          <Text style={[stockInfoStyles.currentPrice, { color: percentColor }]}>
            {currentPriceValue == 0 ? "" : formatNumber(currentPriceValue)}
          </Text>
          <Text
            style={[
              stockInfoStyles.percentChange,
              {
                color: percentColor,
                marginTop: 12,
              },
            ]}
          >
            {changeValue == "" && changeValue !== 0
              ? ""
              : `${changeValue >= 0 ? "+" : ""}${changeValue.toFixed(2)} /${
                  changeValue >= 0 ? "+" : ""
                }${(ratioChange * 1000).toFixed(2)}%`}
          </Text>
        </View>

        <View style={stockInfoStyles.infoBox}>
          <View style={stockInfoStyles.infoRow}>
            <Text
              style={[
                stockInfoStyles.label,
                {
                  color: theme.colors.textResult,
                },
              ]}
            >
              Cao
            </Text>
            <Text
              style={[
                stockInfoStyles.value,
                {
                  color: getPriceColor(
                    highValue,
                    referenceValue,
                    ceilingValue,
                    floorValue
                  ),
                },
              ]}
            >
              {highValue == 0 ? "" : formatNumber(highValue)}
            </Text>
            <Text
              style={[
                stockInfoStyles.label,
                {
                  color: theme.colors.textResult,
                },
              ]}
            >
              Trần
            </Text>
            <Text style={[stockInfoStyles.value, { color: "#C663E9" }]}>
              {ceilingValue == 0 ? "" : formatNumber(ceilingValue)}
            </Text>
          </View>

          <View style={stockInfoStyles.infoRow}>
            <Text
              style={[
                stockInfoStyles.label,
                {
                  color: theme.colors.textResult,
                },
              ]}
            >
              TB
            </Text>
            <Text
              style={[
                stockInfoStyles.value,
                {
                  color: getPriceColor(
                    averageValue,
                    referenceValue,
                    ceilingValue,
                    floorValue
                  ),
                },
              ]}
            >
              {averageValue == 0 ? "" : formatNumber(averageValue)}
            </Text>
            <Text
              style={[
                stockInfoStyles.label,
                {
                  color: theme.colors.textResult,
                },
              ]}
            >
              TC
            </Text>
            <Text style={[stockInfoStyles.value, { color: "#E8D632" }]}>
              {referenceValue == 0 ? "" : formatNumber(referenceValue)}
            </Text>
          </View>

          <View style={stockInfoStyles.infoRow}>
            <Text
              style={[
                stockInfoStyles.label,
                {
                  color: theme.colors.textResult,
                },
              ]}
            >
              Thấp
            </Text>
            <Text
              style={[
                stockInfoStyles.value,
                {
                  color: getPriceColor(
                    lowValue,
                    referenceValue,
                    ceilingValue,
                    floorValue
                  ),
                },
              ]}
            >
              {lowValue == 0 ? "" : formatNumber(lowValue)}
            </Text>
            <Text
              style={[
                stockInfoStyles.label,
                {
                  color: theme.colors.textResult,
                },
              ]}
            >
              Sàn
            </Text>
            <Text style={[stockInfoStyles.value, { color: "#47D3EB" }]}>
              {floorValue == 0 ? "" : formatNumber(floorValue)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function SignalSettingsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // Get route parameters - only symbol needed now
  const { symbol } = useLocalSearchParams<{
    symbol: string;
  }>();

  const { isAuthenticated, user, logout } = useAuth();
  const [lastOrder, setLastOrder] = useState<Order>({});

  // State for stock detail data
  const [stockDetail, setStockDetail] = useState<{
    ticker: string;
    companyName: string;
    sector: string;
    currentPrice: string;
    priceChange: string;
    percentChange: string;
    volume: string;
    marketCap: string;
    high: string;
    low: string;
    reference: string;
    ceiling: string;
    floor: string;
    average: string;
    exchange: string;
  } | null>(null);

  // Calculate currentPriceValue before using it for default state values
  const currentPriceValue = lastOrder?.LastPrice
    ? lastOrder.LastPrice / 1000
    : stockDetail
    ? parseFloat(stockDetail.currentPrice)
    : 23.7;

  const [alertAbove, setAlertAbove] = useState(formatNumber(currentPriceValue));
  const [alertBelow, setAlertBelow] = useState(formatNumber(currentPriceValue));
  const [trendingLine, setTrendingLine] = useState<any>([]);

  const [trendlineAlertMap, setTrendlineAlertMap] = useState<
    Record<string, any>
  >({});

  const [checkedItems, setCheckedItems] = useState<{
    [key: string | number]: boolean;
  }>({});
  const reconcileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const symbolStr = symbol as string;

  // Helper function to format number with comma
  const formatNumberComma = useCallback((num: any) => {
    if (!num && num !== 0) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  // Helper function to find sector for stock
  const findSectorForStock = useCallback((ticker: string) => {
    // TODO: Implement sector lookup logic if needed
    return "Đang cập nhật";
  }, []);

  // Fetch stock detail data
  const fetchStockDetail = useCallback(
    async (ticker: string) => {
      try {
        const response = await axiosClient.get(`/stock-overview/${ticker}`);
        if (response.status === 200) {
          const stocks = response.data.data;
          const stock = stocks.find((s: any) => s.c === ticker);
          if (stock) {
            setStockDetail({
              ticker: stock.c,
              companyName: stock.sn || "Đang cập nhật",
              sector: findSectorForStock(ticker),
              currentPrice: (stock.p / 1000)?.toFixed(2) || "0.00",
              priceChange: (stock.dc / 1000)?.toFixed(2) || "0.00",
              percentChange: stock.dcp?.toFixed(2) || "0.00",
              volume: formatNumberComma(stock.dv),
              marketCap: formatToBillion(stock.dve),
              high: (stock.hp / 1000)?.toFixed(2) || "0.00",
              low: (stock.lp / 1000)?.toFixed(2) || "0.00",
              reference: (stock.rp / 1000)?.toFixed(2) || "0.00",
              ceiling: (stock.ce / 1000)?.toFixed(2) || "0.00",
              floor: (stock.f / 1000)?.toFixed(2) || "0.00",
              average: (stock.ap / 1000)?.toFixed(2) || "0.00",
              exchange: stock.e || "HOSE",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching stock detail:", error);
      }
    },
    [findSectorForStock, formatNumberComma]
  );

  // 🔹 Load alert từ backend khi mở màn hình
  useEffect(() => {
    if (!symbolStr) return;

    // Fetch stock detail first
    fetchStockDetail(symbolStr);
    getMuaBanChuDongShort(symbol);
    (async () => {
      try {
        const res = await axiosClient.get(`/api/alerts/trendline/${symbolStr}`);

        const alerts = res.data?.data || [];
        const map: Record<string, any> = {};

        alerts.forEach((a: any) => {
          // gom các alert vào map để tái sử dụng
          map[a.client_line_id] = {
            alertId: a.id,
            enabled: !!a.enabled,
            a: a.a,
            b: a.b,
            side: a.side,
            alert_type: a.alert_type,
            target_price: a.target_price,
          };

          // 🔹 Nếu là price alert, cập nhật UI tương ứng
          if (a.alert_type === "price") {
            if (
              String(a.client_line_id).includes("_PRICE_ABOVE") ||
              a.side === "above"
            ) {
              setAlertAbove(String(a.target_price || "0"));
              setCheckedItems((prev) => ({ ...prev, alertAbove: !!a.enabled }));
            } else if (
              String(a.client_line_id).includes("_PRICE_BELOW") ||
              a.side === "below"
            ) {
              setAlertBelow(String(a.target_price || "0"));
              setCheckedItems((prev) => ({ ...prev, alertBelow: !!a.enabled }));
            }
          }
        });

        setTrendlineAlertMap(map);
        console.log("Loaded alerts from API:", map);
      } catch (err: any) {
        console.error("Load trendline alerts error:", err.message);

        // Nếu lỗi 401 Unauthorized → chuyển về màn login
        if (err.response?.status === 401) {
          console.log("Unauthorized - redirecting to login");
          await logout();
          router.push("/auth/login");
        }
      }
    })();
  }, [symbolStr, fetchStockDetail]);

  // 🔹 Đồng bộ mảng trendline giữa chart và DB
  async function reconcileTrendlinesWithBackend(incoming: any[]) {
    // Use the latest state
    const localMap = { ...trendlineAlertMap }; // copy
    const incomingIds = new Set(incoming.map((l) => l.lineId));

    // 1) Xóa line mất khỏi biểu đồ → DELETE DB
    for (const lineId of Object.keys(localMap)) {
      const meta = localMap[lineId];

      // Nếu là price alert => skip (không xóa)
      if (meta?.alert_type === "price") {
        continue;
      }

      // Nếu là trendline nhưng không có trên chart nữa => xóa
      if (!incomingIds.has(lineId)) {
        console.log("Removing line not in chart anymore:", lineId);
        if (meta?.alertId) {
          try {
            await axiosClient.delete(`/api/alerts/trendline/${meta.alertId}`);
            console.log(
              "Deleted trendline alert for removed line:",
              lineId,
              "id=",
              meta.alertId
            );
          } catch (err: any) {
            console.error("Delete alert error", err);
            // Nếu lỗi 401 Unauthorized → chuyển về màn login
            if (err.response?.status === 401) {
              console.log("Unauthorized - redirecting to login");
              // Logout và redirect
              await logout();
              router.push("/auth/login");
              return;
            }
          }
        }
        // xóa khỏi localMap
        delete localMap[lineId];
      }
    }

    // 2) Thêm mới hoặc cập nhật a,b nếu thay đổi (chỉ xử lý incoming là trendline)
    for (const line of incoming) {
      console.log("Processing line from chart:", line.lineId);
      const exist = localMap[line.lineId];
      console.log("Existing entry for line:", line.lineId, exist);

      // Nếu tồn tại một price alert với cùng client_line_id (hiếm) => skip overwrite
      if (exist && exist.alert_type === "price") {
        // bảo đảm không ghi đè price alert bằng trendline data
        console.log(
          "Skipping incoming trendline because local meta is price alert:",
          line.lineId
        );
        continue;
      }

      if (!exist) {
        console.log("Creating new entry for line:", line.lineId);
        // tạo mới local meta với alert_type = 'trendline' (chưa enabled)
        // Luôn giữ enabled state từ backend nếu có
        localMap[line.lineId] = {
          alertId: undefined,
          enabled: localMap[line.lineId]?.enabled || false, // Giữ nguyên enabled state nếu đã có
          a: line.a,
          b: line.b,
          side: line.side,
          alert_type: "trendline",
        };
      } else {
        console.log("Updating existing entry for line:", line.lineId);
        // Update the line data but preserve the enabled state and alertId from backend
        exist.a = line.a;
        exist.b = line.b;
        exist.side = line.side;
        // Do NOT update enabled or alertId from the chart data
      }
    }

    // 3) set lại state
    console.log("Setting updated trendlineAlertMap:", localMap);
    setTrendlineAlertMap(localMap);
  }

  // 🔹 Tick vào checkbox
  const toggleTrendlineCheckbox = async (line: any) => {
    console.log("toggleTrendlineCheckbox", line);

    const lineId = line.lineId;
    const localMap = { ...trendlineAlertMap };
    const meta = localMap[lineId] || {
      enabled: false,
      a: line.a,
      b: line.b,
      side: line.side,
    };

    const willEnable = !meta.enabled;
    meta.enabled = willEnable;
    setTrendlineAlertMap({ ...localMap }); // cập nhật tạm thời UI

    try {
      if (willEnable) {
        console.log("line.side", line.side);

        if (line.side === "unknown") {
          Alert.alert(
            "Thông báo",
            "Đường xu hướng chưa được xác định hướng. Vui lòng chờ xác định xong đường trendline."
          );
        } else {
          // Cập nhật UI
          localMap[lineId] = meta;
          setTrendlineAlertMap(localMap);

          Alert.alert(
            "Bật cảnh báo",
            `Đã bật thông báo cho đường ${
              line.side === "below"
                ? "kháng cự"
                : line.side === "above"
                ? "hỗ trợ"
                : "đang xác định..."
            }`
          );
          // ✅ Bật cảnh báo
          if (!meta.alertId) {
            const res = await axiosClient.post("/api/alerts/trendline", {
              symbol: line.symbol,
              lineId: line.lineId,
              a: line.a,
              b: line.b,
              side: line.side,
            });
            meta.alertId = res.data.id;
          } else {
            await axiosClient.put(`/api/alerts/trendline/${meta.alertId}`, {
              a: line.a,
              b: line.b,
              side: line.side,
              enabled: 1,
            });
          }
        }
      } else {
        if (line.side === "unknown") {
          Alert.alert(
            "Thông báo",
            "Đường xu hướng chưa được xác định hướng. Vui lòng chờ xác định xong đường trendline."
          );
        } else {
          // 🔕 Tắt cảnh báo
          // Cập nhật UI
          localMap[lineId] = meta;
          setTrendlineAlertMap(localMap);
          Alert.alert(
            "Tắt cảnh báo",
            `Đã tắt thông báo cho đường ${
              line.side === "below"
                ? "kháng cự"
                : line.side === "above"
                ? "hỗ trợ"
                : "đang xác định..."
            }`
          );
          if (meta.alertId) {
            await axiosClient.put(`/api/alerts/trendline/${meta.alertId}`, {
              a: line.a,
              b: line.b,
              side: line.side,
              enabled: 0,
            });
          }
        }
      }
    } catch (err: any) {
      console.error("toggleCheckbox API error", err.message);

      // Nếu lỗi 401 Unauthorized → chuyển về màn login
      if (err.response?.status === 401) {
        console.log("Unauthorized - redirecting to login");
        Alert.alert(
          "Phên đăng nhập hết hạn",
          "Vui lòng đăng nhập lại để tiếp tục.",
          [
            {
              text: "Đồng ý",
              onPress: async () => {
                await logout();
                router.push("/auth/login");
              },
            },
          ]
        );
        return;
      }

      Alert.alert("Lỗi", "Không thể cập nhật cảnh báo");
    }

    setTrendlineAlertMap({ ...localMap });
  };

  // tạo 2 hàm: enable/disable price alert
  const togglePriceAlert = async (type: "above" | "below") => {
    // Helper function to normalize comma decimal separator to dot
    const normalizeDecimal = (value: string): string => {
      return value.replace(",", ".");
    };

    const inputValue = type === "above" ? alertAbove : alertBelow;
    const normalizedValue = normalizeDecimal(inputValue);
    const price = Number(normalizedValue || 0);

    if (!price || isNaN(price) || price <= 0) {
      Alert.alert("Lỗi", "Vui lòng nhập giá hợp lệ trước khi bật cảnh báo.");
      return;
    }

    // client_line_id: đảm bảo unique per user+symbol+type
    const clientLineId = `${symbol}_PRICE_${type.toUpperCase()}`;

    // check if we already have mapping in trendlineAlertMap
    const existing = trendlineAlertMap[clientLineId];

    const willEnable =
      !checkedItems[type === "above" ? "alertAbove" : "alertBelow"];

    // optimistic UI
    setCheckedItems((prev) => ({
      ...prev,
      [type === "above" ? "alertAbove" : "alertBelow"]: willEnable,
    }));

    try {
      if (willEnable) {
        // create or upsert
        const payload = {
          symbol,
          lineId: clientLineId,
          target_price: price,
          side: type === "above" ? "above" : "below",
        };
        const res = await axiosClient.post("/api/alerts/trendline", payload);
        // res.data has { id, client_line_id }
        const newAlertId = res.data.id;
        setTrendlineAlertMap((prev) => ({
          ...prev,
          [clientLineId]: {
            alertId: newAlertId,
            enabled: true,
            target_price: price,
            alert_type: "price",
            a: null,
            b: null,
            side: payload.side,
          },
        }));
        Alert.alert(
          "Bật cảnh báo",
          `Đã bật cảnh báo giá ${
            type === "above" ? "trên" : "dưới"
          } ${formatNumber(price)}`
        );
      } else {
        // disable: if exists, call update put enabled=0
        if (existing && existing.alertId) {
          await axiosClient.put(`/api/alerts/trendline/${existing.alertId}`, {
            enabled: 0,
            target_price: price,
            alert_type: "price",
          });
          setTrendlineAlertMap((prev) => {
            const copy = { ...prev };
            if (copy[clientLineId]) copy[clientLineId].enabled = false;
            return copy;
          });
          Alert.alert(
            "Tắt cảnh báo",
            `Đã tắt cảnh báo giá ${
              type === "above" ? "trên" : "dưới"
            } ${formatNumber(price)}`
          );
        }
      }
    } catch (err: any) {
      console.error("togglePriceAlert error", err);

      // Nếu lỗi 401 Unauthorized → chuyển về màn login
      if (err.response?.status === 401) {
        console.log("Unauthorized - redirecting to login");
        Alert.alert(
          "Phên đăng nhập hết hạn",
          "Vui lòng đăng nhập lại để tiếp tục.",
          [
            {
              text: "Đồng ý",
              onPress: async () => {
                await logout();
                router.push("/auth/login");
              },
            },
          ]
        );
        return;
      }

      Alert.alert("Lỗi", "Không thể cập nhật cảnh báo giá.");
      // revert UI
      setCheckedItems((prev) => ({
        ...prev,
        [type === "above" ? "alertAbove" : "alertBelow"]: !willEnable,
      }));
    }
  };

  // Toggle checkbox for price alert notifications
  const toggleCheckbox = (index: number | string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getMuaBanChuDongShort = useCallback(async (company: string) => {
    try {
      const res = await axiosClient.get(
        `/mua_ban_chu_dong_short?symbol=${company}`
      );

      if (res?.data?.data && res?.data?.data.length > 0) {
        let totalVol = res?.data?.data[0]?.TotalVol;
        let totalBuyVol = res?.data?.data[0]?.TotalBuyVol;
        let totalSellVol = res?.data?.data[0]?.TotalSellVol;
        setLastOrder({
          ...res?.data?.data[0],
          High: lastOrder?.High,
          Low: lastOrder?.Low,
          AvgPrice: lastOrder?.AvgPrice,
        });
      }
    } catch (error) {
      console.error("Error fetching order book data:", error);
    }
  }, []);

  // Socket connection for real-time order book data
  useEffect(() => {
    if (!symbol) return;

    const SOCKET_URL = "wss://api.dautubenvung.vn/marketStream";
    console.log("Connecting to socket:", SOCKET_URL);

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("subscribe", symbol);
    });

    // Handle market data
    socket.on("marketData", (parsedData) => {
      setLastOrder(parsedData);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [symbol]);

  // Nhận thông điệp từ WebView (chart) và log khi có trendlineCross
  const handleChartMessage = useCallback((e: any) => {
    try {
      const raw = e?.nativeEvent?.data;
      const msg = typeof raw === "string" ? JSON.parse(raw) : raw;

      if (msg.type === "trendingLineMap") {
        const incoming = msg.payload;
        setTrendingLine(incoming);

        // debounce đồng bộ tránh spam khi kéo
        if (reconcileTimeoutRef.current)
          clearTimeout(reconcileTimeoutRef.current);
        reconcileTimeoutRef.current = setTimeout(() => {
          // reconcileTrendlinesWithBackend(incoming);
        }, 1000); // Increase debounce time to 1000ms to ensure API data is loaded first
      }
    } catch (err) {
      console.error("handleChartMessage error", err);
    }
  }, []);

  // Parse numeric parameters from stockDetail (keep for backward compatibility)
  const parsedCurrentPrice = stockDetail
    ? parseFloat(stockDetail.currentPrice)
    : "";
  const parsedChangePercent = stockDetail
    ? parseFloat(stockDetail.percentChange) / 1000
    : "";
  const parsedChange = stockDetail ? parseFloat(stockDetail.priceChange) : "";

  const parsedHigh = stockDetail ? parseFloat(stockDetail.high) : "";
  const parsedAverage = stockDetail ? parseFloat(stockDetail.average) : "";
  const parsedLow = stockDetail ? parseFloat(stockDetail.low) : "";
  const parsedCeiling = stockDetail ? parseFloat(stockDetail.ceiling) : "";
  const parsedReference = stockDetail ? parseFloat(stockDetail.reference) : "";
  const parsedFloor = stockDetail ? parseFloat(stockDetail.floor) : "s";

  const isDark = theme.mode === "dark";

  // Memoize colors object to prevent unnecessary re-renders
  const colors = useMemo(
    () => ({
      background: isDark ? "#0f1115" : "#f5f5f5",
      cardBackground: isDark ? "#202127" : "#ffffff",
      text: isDark ? "#ffffff" : "#000000",
      secondaryText: isDark ? "#ABADBA" : "#666666",
      border: isDark ? "#2a3340" : "#e0e0e0",
    }),
    [isDark]
  );

  // Memoize chart colors to prevent WebView reload
  const chartColors = useMemo(() => ({ background: "#0B1018" }), []);
  const [chartKey, setChartKey] = useState<number>(0);
  // Force reload chart when returning to this screen
  useFocusEffect(
    useCallback(() => {
      // Increment chart key to force WebView remount
      setChartKey((prev) => prev + 1);
    }, [])
  );
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />

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
          Cài đặt tín hiệu
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Info - Using StockInfoCard component */}
        <View style={{ paddingHorizontal: 8 }}>
          <StockInfoCard
            data={{
              companyName:
                stockDetail?.companyName || "Công ty Cổ phần Chứng khoán SSI",
              exchange: stockDetail?.exchange || "HOSE",
              currentPrice: lastOrder?.LastPrice || parsedCurrentPrice,
              changePercent: lastOrder?.RatioChange || parsedChangePercent,
              change: lastOrder?.Change || parsedChange,
              high: lastOrder?.High || parsedHigh,
              average: lastOrder?.AvgPrice || parsedAverage,
              low: lastOrder?.Low || parsedLow,
              ceiling: lastOrder?.Ceiling || parsedCeiling,
              reference: lastOrder?.RefPrice || parsedReference,
              floor: lastOrder?.Floor || parsedFloor,
              lastOrder: lastOrder,
            }}
          />
        </View>
        {/* SSI Alert Settings */}
        <View
          style={[
            stockInfoStyles.card,
            {
              backgroundColor: theme.colors.backgroundTab,
              marginHorizontal: 8,
            },
          ]}
        >
          <View
            style={[
              styles.section,
              { backgroundColor: theme.colors.backgroundTab },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Cài đặt cảnh báo đường kháng cư - hỗ trợ {symbol} :
            </Text>

            {/* Tool Selection */}
            <View style={styles.toolSelection}>
              <Text style={[styles.toolLabel, { color: theme.colors.text }]}>
                Chọn công cụ
              </Text>
            </View>

            {trendingLine?.length > 0 ? (
              <View>
                {trendingLine?.map((item: any, index: number) => {
                  return (
                    <View
                      key={item.lineId || index}
                      style={styles.trendlineRow}
                    >
                      <View style={styles.trendlineLeft}>
                        <View style={styles.numberCircle}>
                          <Text style={styles.numberText}>{index + 1}</Text>
                        </View>
                        <Text
                          style={[
                            styles.trendlineLabel,
                            { color: theme.colors.text },
                          ]}
                        >
                          {item.side === "below"
                            ? `Đường kháng cự ${index + 1}`
                            : item.side === "above"
                            ? `Đường hỗ trợ ${index + 1}`
                            : `Đang xác định... ${index + 1}`}
                        </Text>
                      </View>
                      <View style={styles.trendlineIndicator} />
                      <Text
                        style={[
                          styles.trendlineCheckboxLabel,
                          { color: theme.colors.text },
                        ]}
                      >
                        Nhận thông báo
                      </Text>

                      <TouchableOpacity
                        style={styles.trendlineCheckbox}
                        onPress={() => toggleTrendlineCheckbox(item)}
                      >
                        <View
                          style={[
                            styles.checkboxBox,
                            {
                              borderColor: trendlineAlertMap[item.lineId]
                                ?.enabled
                                ? theme.colors.primary
                                : "#8E8E93",
                              backgroundColor: trendlineAlertMap[item.lineId]
                                ?.enabled
                                ? theme.colors.primary
                                : "transparent",
                            },
                          ]}
                        >
                          {trendlineAlertMap[item.lineId]?.enabled && (
                            <Text style={styles.checkIconText}>✓</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.trendlineShareButton}
                        onPress={() =>
                          router.push({
                            pathname: "/share-signal",
                            params: {
                              signalName: `Đường ${
                                item.side === "below" ? "hỗ trợ" : "kháng cự"
                              } ${index + 1}`,
                            },
                          })
                        }
                      >
                        <Text
                          style={[styles.shareIconText, { color: "#8E8E93" }]}
                        >
                          ↗
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={[styles.toolDescription, { color: "#8E8E93" }]}>
                Kẻ đường kháng cự và hỗ trợ trên biểu đồ.
              </Text>
            )}
          </View>

          {/* Price Alert Settings */}
          <View
            style={[
              styles.section,
              { backgroundColor: theme.colors.backgroundTab, marginTop: 8 },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Cài đặt cảnh báo giá cổ phiếu {symbol} :
            </Text>

            {/* Alert Above */}
            <View style={styles.alertRow}>
              <Text style={[styles.alertLabel, { color: theme.colors.text }]}>
                Nhận cảnh báo khi giá vượt lên:
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor:
                      theme.mode === "dark" ? "#2C2C2E" : "#F2F2F7",
                    borderColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                  },
                ]}
              >
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  value={alertAbove}
                  onChangeText={setAlertAbove}
                  placeholder={formatNumber(currentPriceValue)}
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity
                style={styles.alertCheckbox}
                onPress={() => togglePriceAlert("above")}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    {
                      borderColor: checkedItems["alertAbove"]
                        ? theme.colors.primary
                        : "#8E8E93",
                      backgroundColor: checkedItems["alertAbove"]
                        ? theme.colors.primary
                        : "transparent",
                    },
                  ]}
                >
                  {checkedItems["alertAbove"] && (
                    <Text style={styles.checkIconText}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.alertShareButton}
                onPress={() =>
                  router.push({
                    pathname: "/share-signal",
                    params: {
                      signalName: `Cảnh báo giá vượt lên ${alertAbove}`,
                    },
                  })
                }
              >
                <Text style={[styles.shareIconText, { color: "#8E8E93" }]}>
                  ↗
                </Text>
              </TouchableOpacity>
            </View>

            {/* Alert Below */}
            <View style={styles.alertRow}>
              <Text style={[styles.alertLabel, { color: theme.colors.text }]}>
                Nhận cảnh báo khi giá vượt xuống:
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor:
                      theme.mode === "dark" ? "#2C2C2E" : "#F2F2F7",
                    borderColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                  },
                ]}
              >
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  value={alertBelow}
                  onChangeText={setAlertBelow}
                  placeholder={formatNumber(currentPriceValue)}
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity
                style={styles.alertCheckbox}
                onPress={() => togglePriceAlert("below")}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    {
                      borderColor: checkedItems["alertBelow"]
                        ? theme.colors.primary
                        : "#8E8E93",
                      backgroundColor: checkedItems["alertBelow"]
                        ? theme.colors.primary
                        : "transparent",
                    },
                  ]}
                >
                  {checkedItems["alertBelow"] && (
                    <Text style={styles.checkIconText}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.alertShareButton}
                onPress={() =>
                  router.push({
                    pathname: "/share-signal",
                    params: {
                      signalName: `Cảnh báo giá vượt xuống ${alertBelow}`,
                    },
                  })
                }
              >
                <Text style={[styles.shareIconText, { color: "#8E8E93" }]}>
                  ↗
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Chart Section */}
        <View
          style={{
            height: 410,
            width: "100%",
            // marginVertical: 8,
            paddingHorizontal: 8,
          }}
        >
          {/* <ChartWebViews
            symbol={(symbol as string) || 'SSI'}
            colors={chartColors}
            onMessage={handleChartMessage}
          /> */}
          <ChartWebViews
            key={chartKey}
            symbol={symbolStr}
            colors={chartColors}
            onMessage={handleChartMessage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stockInfoStyles = StyleSheet.create({
  card: {
    borderRadius: 6,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  company: {
    fontSize: 16,
    fontWeight: "600",
  },
  exchangeBox: {
    backgroundColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  exchange: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.white,
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
  },
  mainPriceBox: {
    width: 128,
    alignItems: "flex-start",
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: "500",
  },
  percentChange: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 0,
  },
  infoBox: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: "#ABADBA",
    width: "20%",
  },
  value: {
    fontSize: 15,
    fontWeight: "400",
    width: "30%",
  },
});

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
  scrollContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 0,
    borderRadius: 12,
  },
  settingsInfo: {
    flex: 1,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  settingsSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
    lineHeight: 22,
  },
  toolSelection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  toolLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  toolIcon: {
    marginLeft: 4,
  },
  toolIconText: {
    fontSize: 16,
  },
  toolDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  trendlineRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#30323B",
  },
  trendlineLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberCircle: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: "#4B9B63",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  numberText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  trendlineLabel: {
    fontSize: 13,
    fontWeight: "400",
    minWidth: 110,
  },
  trendlineIndicator: {
    width: 20,

    marginLeft: 10,
    height: 3,
    backgroundColor: "#004AEA",
    borderRadius: 1.5,
  },
  trendlineCheckboxLabel: {
    fontSize: 13,
    fontWeight: "400",
    marginLeft: 12,
  },
  trendlineCheckbox: {
    marginLeft: 8,
    padding: 4,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIconText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  trendlineShareButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  shareIconText: {
    fontSize: 18,
    fontWeight: "500",
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  alertLabel: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  inputContainer: {
    width: 60,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  input: {
    fontSize: 13,
    textAlign: "center",
    padding: 0,
  },
  alertCheckbox: {
    marginLeft: 8,
    padding: 4,
  },
  alertShareButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  chartSection: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchText: {
    fontSize: 16,
    flex: 1,
  },
  addButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "300",
  },
  stockInfo: {
    marginBottom: 20,
  },
  stockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stockLeft: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  stockTime: {
    fontSize: 14,
  },
  stockRight: {
    alignItems: "flex-end",
  },
  stockPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  stockChange: {
    fontSize: 14,
    fontWeight: "500",
  },
  stockDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockVolume: {
    fontSize: 12,
  },
  stockValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  chartContainer: {
    height: 200,
    marginBottom: 16,
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 160,
    paddingHorizontal: 20,
  },
  chartBar: {
    width: 12,
    borderRadius: 2,
  },
  timeIndicators: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
  },
  chartControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  timeButtons: {
    flexDirection: "row",
    gap: 8,
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  currentTime: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 20,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
