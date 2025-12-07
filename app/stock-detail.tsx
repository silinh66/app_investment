import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import WebView from "react-native-webview";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "expo-image";
import RenderHTML from "react-native-render-html";
import { postsApi } from "../api/posts";
import { Topic } from "../api/types";
import axiosClient from "@/api/request";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import Svg, { G, Path, Rect, Text as SvgText } from "react-native-svg";
import { BackIcon, SettingIcon } from "@/components/icons";
import { formatThousands } from "@/utils/formatNumber";
import ChartWebViews from "./ChartWebView";
import { TopicItem } from "../components/TopicItem";
import { topicsApi, Topic as TopicType } from "../api/topics";
// ... existing imports ...
import io from "socket.io-client"; // TODO: Add socket.io-client dependency
import { LinearGradient } from "expo-linear-gradient";

// API Host
const API_HOST = "https://api.dautubenvung.vn"; // Replace with your actual API host

// Helper functions from old code
function formatNumberWithDecimals(value: any, decimals: number = 2) {
  if (value == null) return "0";

  // Tách phần integer và fraction
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

function extractYear(filename: string) {
  // Biểu thức chính quy để tìm 4 chữ số liên tiếp
  const regex = /\b\d{4}\b/;
  // Tìm kiếm và trả về kết quả
  const match = filename.match(regex);
  return match ? match[0] : null;
}

// Ví dụ cho "tỷ"
function formatToBillion(value: number) {
  const billionValue = value / 1e9;
  return formatNumberWithDecimals(billionValue, 2) + (value === 0 ? "" : " Tỷ");
}

// Date utility function
function basicConvertDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Price color utility function
function getPriceColor(
  price: number,
  reference: number,
  ceiling: number,
  floor: number,
  theme: any
) {
  if (price === ceiling) return theme.colors.purple; // Trần (purple)
  if (price === floor) return theme.colors.cyan; // Sàn (blue)
  if (price === reference) return theme.colors.yellow; // Tham chiếu (yellow)
  if (price > reference) return Colors.greenPrice; // Tăng (green)
  if (price < reference) return Colors.redPrice; // Giảm (red)
  return theme.colors.yellow; // Default to reference color
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
  AskPrice4?: number;
  AskPrice5?: number;
  AskPrice6?: number;
  AskPrice7?: number;
  AskPrice8?: number;
  AskPrice9?: number;
  AskPrice10?: number;
  AskVol4?: number;
  AskVol5?: number;
  AskVol6?: number;
  AskVol7?: number;
  AskVol8?: number;
  AskVol9?: number;
  AskVol10?: number;
  BidPrice4?: number;
  BidPrice5?: number;
  BidPrice6?: number;
  BidPrice7?: number;
  BidPrice8?: number;
  BidPrice9?: number;
  BidPrice10?: number;
  BidVol4?: number;
  BidVol5?: number;
  BidVol6?: number;
  BidVol7?: number;
  BidVol8?: number;
  BidVol9?: number;
  BidVol10?: number;
}

// Type definition for stock data
type StockData = {
  c: string; // stock symbol
  sn?: string; // stock name
  p?: number; // price
  dc: number; // change
  dcp: number; // change percent
  e: string;
  hp: number;
  ap: number;
  lp: number;
  ce: number;
  rp: number;
  f: number;
};

// Colors utility (matching the old code structure)
const Colors = {
  charade: "#202127",
  white: "#FFFFFF",
  border: "#30323B",
  BuddhaGold: "#E8D632",
  greenPrice: "#5CD680",
  redPrice: "#FF6B6B",
};

// Format number utility (matching the old code structure)
const formatNumber = (num: any) => {
  if (typeof num !== "number") return "";
  if (num === 0) return "";
  return num.toFixed(2);
};

// StockInfoCard component from old code
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
    floorValue,
    theme
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
            {formatNumber(currentPriceValue)}
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
              : `${changeValue >= 0 ? "+" : ""}${changeValue.toFixed(2)} /${changeValue >= 0 ? "+" : ""
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
                    floorValue,
                    theme
                  ),
                },
              ]}
            >
              {formatNumber(highValue)}
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
              {formatNumber(ceilingValue)}
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
                    floorValue,
                    theme
                  ),
                },
              ]}
            >
              {formatNumber(averageValue)}
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
              {formatNumber(referenceValue)}
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
                    floorValue,
                    theme
                  ),
                },
              ]}
            >
              {formatNumber(lowValue)}
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
              {formatNumber(floorValue)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

// This component represents a social media post
const PostItem = ({
  post,
  stockData,
  onStockPress,
}: {
  post: Topic;
  stockData: StockData[];
  onStockPress: (stock: StockData) => void;
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const isDark = theme.mode === "dark";
  const colors = {
    background: isDark ? "#0f1115" : "#f5f5f5",
    cardBackground: isDark ? "#202127" : "#F4F5F6",
    text: isDark ? "#ffffff" : "#000000",
    secondaryText: isDark ? "#8e8e93" : "#666666",
    border: isDark ? "#2a3340" : "#e0e0e0",

    // Sector colors
    green: "#rgb(5, 177, 104)",
    red: "#EF4444",
    purple: "#A855F7",
    orange: "#F59E0B",
    blue: "#3B82F6",
  };

  // Truncate description to 60 characters for display in the community feed
  const truncateDescription = (text: string) => {
    let listParagraphs = text.split("\n");
    //return first paragraph and ...

    if (listParagraphs?.length > 1) return listParagraphs[0] + "...";
    return text;
  };

  // Find stock symbols in the post description
  const foundStocks = React.useMemo(() => {
    if (!stockData || stockData.length === 0 || !post.description) return [];

    const foundStocks: StockData[] = [];

    stockData.forEach((stock) => {
      const stockSymbol = stock.c.toUpperCase();

      // Create precise patterns to match Vietnamese stock symbols
      // Only match if the symbol appears as a complete word or with common Vietnamese financial prefixes
      const patterns = [
        `\\b${stockSymbol}\\b`, // Word boundary (standalone word)
        `\\$${stockSymbol}\\b`, // Dollar sign prefix ($MWG)
        `\\(${stockSymbol}\\)`, // In parentheses (MWG)
        `mã\\s+${stockSymbol}\\b`, // "mã MWG"
        `cổ\\s+phiếu\\s+${stockSymbol}\\b`, // "cổ phiếu MWG"
        `${stockSymbol}\\s+là\\b`, // "MWG là"
        `\\s${stockSymbol}\\s`, // " MWG " (surrounded by spaces)
      ];

      const combinedPattern = new RegExp(patterns.join("|"), "gi");

      if (combinedPattern.test(post.description)) {
        // Avoid duplicates
        if (!foundStocks.find((s) => s.c === stock.c)) {
          foundStocks.push(stock);
        }
      }
    });

    return foundStocks;
  }, [post.description, stockData]);

  const handleSharePress = () => {
    // Handle share functionality
    console.log("Share post");
  };

  const handleCommentPress = () => {
    router.push(`/post-detail?postId=${post.topic_id}&scrollToComments=true`);
  };

  const handleLikePress = () => {
    // Check if user is authenticated before allowing like
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    console.log("Like post");
  };

  return (
    <TouchableOpacity
      style={[styles.postContainer, { backgroundColor: colors.cardBackground }]}
      onPress={() => router.push(`/post-detail?postId=${post.topic_id}`)}
    >
      <View style={styles.postHeader}>
        <Link href={`/user-profile?userId=${post.userId}`} asChild>
          <TouchableOpacity style={styles.userInfo}>
            <Image
              source={{ uri: post.avatar || "https://i.pravatar.cc/40?img=1" }}
              style={styles.userAvatar}
            />
            <View>
              <Text style={[styles.username, { color: theme.colors.text }]}>
                {post.author}
              </Text>
              <Text
                style={[styles.postTime, { color: theme.colors.secondaryText }]}
              >
                {new Date(post.created_at).toLocaleString("vi-VN")}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      <Text style={[styles.postContent, { color: theme.colors.text }]}>
        {truncateDescription(post.description)}
      </Text>

      {post.image && post.image?.length > 0
        ? post.image?.map((image: any) => (
          <Image
            key={image.url}
            source={{ uri: image?.url }}
            style={styles.postImage}
          />
        ))
        : null}

      {/* Stock mentions */}
      {foundStocks.map((stock, index) => (
        <TouchableOpacity
          key={index}
          style={styles.stockMention}
          onPress={() => onStockPress(stock)}
        >
          <FontAwesome
            name="circle"
            size={12}
            color={stock.dcp >= 0 ? "#34C759" : "#FF6B6B"}
          />
          <Text style={styles.stockNameInPost}>{stock.c}</Text>
          <Text
            style={[
              styles.stockChangeInPost,
              { color: stock.dcp >= 0 ? "#34C759" : "#FF6B6B" },
            ]}
          >
            {stock.dcp >= 0 ? "+" : ""}
            {stock.dcp?.toFixed(2)}%
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSharePress}
        >
          <MaterialIcons name="share" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleCommentPress}
        >
          <View style={styles.actionWithCount}>
            <MaterialIcons name="chat" size={20} color="#8e8e93" />
            <Text style={styles.actionCount}>{post.comment_count}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
          <View style={styles.actionWithCount}>
            <MaterialIcons name="favorite-border" size={20} color="#8e8e93" />
            <Text style={styles.actionCount}>{post.like_count}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="more-horiz" size={20} color="#8e8e93" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function StockDetailScreen() {
  const { theme } = useTheme();
  const isDark = theme.mode === "dark";

  // Memoize colors object to prevent unnecessary re-renders
  const colors = useMemo(
    () => ({
      background: isDark ? "#0f1115" : "#f5f5f5",
      cardBackground: isDark ? "#202127" : "#F4F5F6",
      text: isDark ? "#ABADBA" : "#000000",
      secondaryText: isDark ? "#373943" : "#666666",
      border: isDark ? "#2a3340" : "#e0e0e0",

      // Sector colors
      green: "#rgb(5, 177, 104)",
      red: "#EF4444",
      purple: "#A855F7",
      orange: "#F59E0B",
      blue: "#3B82F6",
    }),
    [isDark]
  );

  // Memoize chart colors to prevent WebView reload
  const chartColors = useMemo(() => ({ background: "#0B1018" }), []);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [realTopics, setRealTopics] = useState<TopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [dataNuocNgoai, setDataNuocNgoai] = useState<any[]>([]);
  const [dataTuDoanh, setDataTuDoanh] = useState<any[]>([]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [chartKey, setChartKey] = useState<number>(0);

  // Profile tab data states
  const [detailInfoSymbol, setDetailInfoSymbol] = useState<any>(null);
  const [listAnalysisReport, setListAnalysisReport] = useState<any[]>([]);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [downloadReportMap, setDownloadReportMap] = useState<any[]>([]);
  const [shareholderStructure, setShareholderStructure] = useState<any[]>([]);
  const [newSubCompany, setNewSubCompany] = useState<any[]>([]);
  const [newAssociatedCompany, setNewAssociatedCompany] = useState<any[]>([]);
  const [leadership, setLeadership] = useState<any[]>([]);
  const [generalIndex, setGeneralIndex] = useState<any>(null);
  const [businessPlan, setBusinessPlan] = useState<any>(null);

  // Order Book states
  const [lastOrder, setLastOrder] = useState<Order>({});

  const [listMatchOrder, setListMatchOrder] = useState<Order[]>([]);
  const [totalBuyVol, setTotalBuyVol] = useState<number>(0);
  const [totalSellVol, setTotalSellVol] = useState<number>(0);
  const [totalVol, setTotalVol] = useState<number>(0);

  // Price highlight states
  const [previousValues, setPreviousValues] = useState<Order>({
    BidPrice1: undefined,
    BidVol1: undefined,
    BidPrice2: undefined,
    BidVol2: undefined,
    BidPrice3: undefined,
    BidVol3: undefined,
    AskPrice1: undefined,
    AskVol1: undefined,
    AskPrice2: undefined,
    AskVol2: undefined,
    AskPrice3: undefined,
    AskVol3: undefined,
    TotalBuyVol: undefined,
    TotalSellVol: undefined,
    TotalVol: undefined,
  });

  const [bgColors, setBgColors] = useState<Record<string, string>>({
    BidPrice1: "transparent",
    BidVol1: "transparent",
    BidPrice2: "transparent",
    BidVol2: "transparent",
    BidPrice3: "transparent",
    BidVol3: "transparent",
    AskPrice1: "transparent",
    AskVol1: "transparent",
    AskPrice2: "transparent",
    AskVol2: "transparent",
    AskPrice3: "transparent",
    AskVol3: "transparent",
    TotalBuyVol: "transparent",
    TotalSellVol: "transparent",
    TotalVol: "transparent",
  });
  // Format number utilities
  const formatNumber = (number: any) => {
    return (number / 1000)?.toFixed(2);
  };
  const formatNumberComma = useCallback((num: any) => {
    if (!num && num !== 0) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  // API call function to get initial order book data
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
        setListMatchOrder(res?.data?.data);
        setTotalBuyVol(totalBuyVol);
        setTotalSellVol(totalSellVol);
        setTotalVol(totalVol);
      }
    } catch (error) {
      console.error("Error fetching order book data:", error);
    }
  }, []);

  // Price highlight effect
  useEffect(() => {
    const changedKeys: Array<keyof typeof bgColors> = [];

    function checkChange(
      key: keyof typeof bgColors,
      newVal: number | undefined,
      oldVal: number | undefined
    ) {
      if (typeof newVal === "number" || typeof oldVal === "number") {
        if (newVal !== oldVal) {
          changedKeys.push(key);
        }
      }
    }

    // Compare each price/volume field
    checkChange("BidPrice1", lastOrder?.BidPrice1, previousValues.BidPrice1);
    checkChange("BidVol1", lastOrder?.BidVol1, previousValues.BidVol1);
    checkChange("BidPrice2", lastOrder?.BidPrice2, previousValues.BidPrice2);
    checkChange("BidVol2", lastOrder?.BidVol2, previousValues.BidVol2);
    checkChange("BidPrice3", lastOrder?.BidPrice3, previousValues.BidPrice3);
    checkChange("BidVol3", lastOrder?.BidVol3, previousValues.BidVol3);

    checkChange("AskPrice1", lastOrder?.AskPrice1, previousValues.AskPrice1);
    checkChange("AskVol1", lastOrder?.AskVol1, previousValues.AskVol1);
    checkChange("AskPrice2", lastOrder?.AskPrice2, previousValues.AskPrice2);
    checkChange("AskVol2", lastOrder?.AskVol2, previousValues.AskVol2);
    checkChange("AskPrice3", lastOrder?.AskPrice3, previousValues.AskPrice3);
    checkChange("AskVol3", lastOrder?.AskVol3, previousValues.AskVol3);

    // Compare total volumes
    checkChange("TotalBuyVol", totalBuyVol, previousValues.TotalBuyVol);
    checkChange("TotalSellVol", totalSellVol, previousValues.TotalSellVol);
    checkChange("TotalVol", totalVol, previousValues.TotalVol);

    if (changedKeys.length > 0) {
      // Highlight changed fields, then reset after 800ms
      changedKeys.forEach((key) => {
        setBgColors((prev) => ({ ...prev, [key]: "#d3a43f" }));
        setTimeout(() => {
          setBgColors((prev) => ({ ...prev, [key]: "transparent" }));
        }, 300);
      });

      // Update previousValues with new values
      setPreviousValues({
        BidPrice1: lastOrder?.BidPrice1,
        BidVol1: lastOrder?.BidVol1,
        BidPrice2: lastOrder?.BidPrice2,
        BidVol2: lastOrder?.BidVol2,
        BidPrice3: lastOrder?.BidPrice3,
        BidVol3: lastOrder?.BidVol3,
        AskPrice1: lastOrder?.AskPrice1,
        AskVol1: lastOrder?.AskVol1,
        AskPrice2: lastOrder?.AskPrice2,
        AskVol2: lastOrder?.AskVol2,
        AskPrice3: lastOrder?.AskPrice3,
        AskVol3: lastOrder?.AskVol3,
        TotalBuyVol: totalBuyVol,
        TotalSellVol: totalSellVol,
        TotalVol: totalVol,
      });
    } else {
      // Update previousValues even if no changes
      setPreviousValues({
        BidPrice1: lastOrder?.BidPrice1,
        BidVol1: lastOrder?.BidVol1,
        BidPrice2: lastOrder?.BidPrice2,
        BidVol2: lastOrder?.BidVol2,
        BidPrice3: lastOrder?.BidPrice3,
        BidVol3: lastOrder?.BidVol3,
        AskPrice1: lastOrder?.AskPrice1,
        AskVol1: lastOrder?.AskVol1,
        AskPrice2: lastOrder?.AskPrice2,
        AskVol2: lastOrder?.AskVol2,
        AskPrice3: lastOrder?.AskPrice3,
        AskVol3: lastOrder?.AskVol3,
        TotalBuyVol: totalBuyVol,
        TotalSellVol: totalSellVol,
        TotalVol: totalVol,
      });
    }
  }, [lastOrder, totalBuyVol, totalSellVol, totalVol]);
  const processColumnChartNuocNgoaiData = useMemo(() => {
    if (!dataNuocNgoai || dataNuocNgoai.length === 0) {
      // Return default static data if no API data
      return {
        chartBars: [
          {
            x: 0,
            height: 25,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 50000000000,
              buyVal: 75000000000,
              sellVal: 25000000000,
              time: "2024-08-22",
              netVol: 1000000,
            },
            index: 0,
          },
          {
            x: 16,
            height: 30,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 60000000000,
              buyVal: 85000000000,
              sellVal: 25000000000,
              time: "2024-08-23",
              netVol: 1200000,
            },
            index: 1,
          },
          {
            x: 32,
            height: 8,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 15000000000,
              buyVal: 40000000000,
              sellVal: 25000000000,
              time: "2024-08-24",
              netVol: 800000,
            },
            index: 2,
          },
          {
            x: 48,
            height: 35,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              time: "2024-08-25",
              netVol: 1100000,
            },
            index: 3,
          },
          {
            x: 64,
            height: 40,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 80000000000,
              buyVal: 105000000000,
              sellVal: 25000000000,
              time: "2024-08-26",
              netVol: 1300000,
            },
            index: 4,
          },
          {
            x: 80,
            height: 32,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              time: "2024-08-27",
              netVol: 950000,
            },
            index: 5,
          },
          {
            x: 96,
            height: 38,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              time: "2024-08-28",
              netVol: 1150000,
            },
            index: 6,
          },
          {
            x: 112,
            height: 35,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              time: "2024-08-29",
              netVol: 1050000,
            },
            index: 7,
          },
          {
            x: 128,
            height: 15,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 30000000000,
              buyVal: 55000000000,
              sellVal: 25000000000,
              time: "2024-08-30",
              netVol: 750000,
            },
            index: 8,
          },
          {
            x: 144,
            height: 42,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 85000000000,
              buyVal: 110000000000,
              sellVal: 25000000000,
              time: "2024-09-01",
              netVol: 1250000,
            },
            index: 9,
          },
          {
            x: 160,
            height: 28,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 55000000000,
              buyVal: 80000000000,
              sellVal: 25000000000,
              time: "2024-09-02",
              netVol: 900000,
            },
            index: 10,
          },
          {
            x: 176,
            height: 32,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              time: "2024-09-03",
              netVol: 980000,
            },
            index: 11,
          },
          {
            x: 192,
            height: 38,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              time: "2024-09-04",
              netVol: 1180000,
            },
            index: 12,
          },
          {
            x: 208,
            height: 45,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 90000000000,
              buyVal: 115000000000,
              sellVal: 25000000000,
              time: "2024-09-05",
              netVol: 1330000,
            },
            index: 13,
          },
          {
            x: 224,
            height: 40,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 80000000000,
              buyVal: 105000000000,
              sellVal: 25000000000,
              time: "2024-09-06",
              netVol: 1280000,
            },
            index: 14,
          },
          {
            x: 240,
            height: 38,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              time: "2024-09-07",
              netVol: 1200000,
            },
            index: 15,
          },
          {
            x: 256,
            height: 35,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              time: "2024-09-08",
              netVol: 1150000,
            },
            index: 16,
          },
          {
            x: 272,
            height: 32,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              time: "2024-09-09",
              netVol: 1080000,
            },
            index: 17,
          },
          {
            x: 288,
            height: 36,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 72000000000,
              buyVal: 97000000000,
              sellVal: 25000000000,
              time: "2024-09-10",
              netVol: 1220000,
            },
            index: 18,
          },
          {
            x: 304,
            height: 50,
            color: "rgb(232, 96, 102)",
            data: {
              netVal: -100000000000,
              buyVal: 15000000000,
              sellVal: 115000000000,
              time: "2024-09-11",
              netVol: -500000,
            },
            index: 19,
          },
          {
            x: 330,
            height: 45,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 90000000000,
              buyVal: 115000000000,
              sellVal: 25000000000,
              time: "2024-09-12",
              netVol: 1400000,
            },
            index: 20,
          },
        ],
        negBars: [
          {
            x: 64,
            height: 60,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: -120000000000,
              buyVal: 20000000000,
              sellVal: 140000000000,
              time: "2024-08-26",
              netVol: -800000,
            },
            index: 4,
          },
          {
            x: 80,
            height: 80,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: -160000000000,
              buyVal: 15000000000,
              sellVal: 175000000000,
              time: "2024-08-27",
              netVol: -1200000,
            },
            index: 5,
          },
          {
            x: 144,
            height: 70,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: -140000000000,
              buyVal: 18000000000,
              sellVal: 158000000000,
              time: "2024-09-01",
              netVol: -950000,
            },
            index: 9,
          },
        ],
        topValue: "900.0",
        bottomValue: "-1600.0",
        dateRange: { start: "08-22", end: "09-19" },
        metrics: {
          net20: "-240.28亿",
          net10: "-104.37亿",
          net5: "-57.20亿",
          net3: "-23.75亿",
        },
      };
    }

    // Sort data by trading date
    const sortedData = [...dataNuocNgoai].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    // Calculate chart dimensions
    const chartWidth = 330;
    const barWidth = 12;
    const spacing = 8;
    const totalBars = Math.min(
      sortedData.length,
      Math.floor((chartWidth + spacing) / (barWidth + spacing))
    );
    const actualSpacing =
      totalBars > 1 ? (chartWidth - totalBars * barWidth) / (totalBars - 1) : 0;

    // Find min/max values for scaling
    const allValues = sortedData.map((d) => d.netVal || 0);
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const maxAbsValue = Math.max(Math.abs(maxValue), Math.abs(minValue));

    // Generate bars
    const chartBars: Array<{
      x: number;
      height: number;
      color: string;
      data: any;
      index: number;
    }> = [];
    const negBars: Array<{
      x: number;
      height: number;
      color: string;
      data: any;
      index: number;
    }> = [];

    for (let i = 0; i < totalBars; i++) {
      const dataIndex = Math.floor(
        (i / (totalBars - 1)) * (sortedData.length - 1)
      );
      const item = sortedData[dataIndex];
      const value = item?.netVal || 0;

      // Scale height (max 50px for positive, 80px for negative)
      const maxHeight = value >= 0 ? 50 : 80;
      const height =
        Math.abs(value) > 0
          ? Math.max(5, (Math.abs(value) / maxAbsValue) * maxHeight)
          : 5;

      const x = i * (barWidth + actualSpacing);
      const color = value >= 0 ? "rgb(5, 177, 104)" : "rgb(232, 96, 102)";

      if (value >= 0) {
        chartBars.push({ x, height, color, data: item, index: dataIndex });
      } else {
        negBars.push({ x, height, color, data: item, index: dataIndex });
      }
    }

    // Format values (convert to tỷ units - billions)
    const formatValue = (value: number) => {
      const inBillion = value / 1000000000; // Convert to billions (tỷ)
      return `${inBillion.toFixed(1)}`;
    };

    const formatValueYi = (value: number) => {
      const inYi = value / 100000000;
      return `${inYi.toFixed(2)}`;
    };

    // Calculate metrics
    const calculateNetFlow = (days: number) => {
      const recentData = sortedData.slice(-days);
      const total = recentData.reduce(
        (sum, item) => sum + (item.netVal || 0),
        0
      );
      return formatValueYi(total);
    };

    // Get date range
    const startDate = sortedData[0]?.time;
    const endDate = sortedData[sortedData.length - 1]?.time;
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
    };

    return {
      chartBars,
      negBars,
      topValue: formatThousands(formatValue(maxValue)),
      bottomValue: formatThousands(
        formatValue(minValue < 0 ? minValue : -Math.abs(maxValue) * 0.3)
      ), // Ensure we always show a negative bottom value
      dateRange: {
        start: startDate ? formatDate(startDate) : "08-22",
        end: endDate ? formatDate(endDate) : "09-19",
      },
      metrics: {
        net20: calculateNetFlow(20),
        net10: calculateNetFlow(10),
        net5: calculateNetFlow(5),
        net3: calculateNetFlow(3),
      },
    };
  }, [dataNuocNgoai]);

  // Process column chart data tu doanh from API
  const processColumnCharTuDoanhData = useMemo(() => {
    if (!dataTuDoanh || dataTuDoanh.length === 0) {
      // Return default static data if no API data
      return {
        chartBars: [
          {
            x: 0,
            height: 25,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 50000000000,
              buyVal: 75000000000,
              sellVal: 25000000000,
              time: "2024-08-22",
              netVol: 1000000,
            },
            index: 0,
          },
          {
            x: 16,
            height: 30,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 60000000000,
              buyVal: 85000000000,
              sellVal: 25000000000,
              time: "2024-08-23",
              netVol: 1200000,
            },
            index: 1,
          },
          {
            x: 32,
            height: 8,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 15000000000,
              buyVal: 40000000000,
              sellVal: 25000000000,
              time: "2024-08-24",
              netVol: 800000,
            },
            index: 2,
          },
          {
            x: 48,
            height: 35,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              time: "2024-08-25",
              netVol: 1100000,
            },
            index: 3,
          },
          {
            x: 64,
            height: 40,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 80000000000,
              buyVal: 105000000000,
              sellVal: 25000000000,
              time: "2024-08-26",
              netVol: 1300000,
            },
            index: 4,
          },
          {
            x: 80,
            height: 32,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              time: "2024-08-27",
              netVol: 950000,
            },
            index: 5,
          },
          {
            x: 96,
            height: 38,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              time: "2024-08-28",
              netVol: 1150000,
            },
            index: 6,
          },
          {
            x: 112,
            height: 35,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              time: "2024-08-29",
              netVol: 1050000,
            },
            index: 7,
          },
          {
            x: 128,
            height: 15,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 30000000000,
              buyVal: 55000000000,
              sellVal: 25000000000,
              time: "2024-08-30",
              netVol: 750000,
            },
            index: 8,
          },
          {
            x: 144,
            height: 42,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 85000000000,
              buyVal: 110000000000,
              sellVal: 25000000000,
              time: "2024-09-01",
              netVol: 1250000,
            },
            index: 9,
          },
          {
            x: 160,
            height: 28,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 55000000000,
              buyVal: 80000000000,
              sellVal: 25000000000,
              time: "2024-09-02",
              netVol: 900000,
            },
            index: 10,
          },
          {
            x: 176,
            height: 32,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              time: "2024-09-03",
              netVol: 980000,
            },
            index: 11,
          },
          {
            x: 192,
            height: 38,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              time: "2024-09-04",
              netVol: 1180000,
            },
            index: 12,
          },
          {
            x: 208,
            height: 45,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 90000000000,
              buyVal: 115000000000,
              sellVal: 25000000000,
              time: "2024-09-05",
              netVol: 1330000,
            },
            index: 13,
          },
          {
            x: 224,
            height: 40,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 80000000000,
              buyVal: 105000000000,
              sellVal: 25000000000,
              time: "2024-09-06",
              netVol: 1280000,
            },
            index: 14,
          },
          {
            x: 240,
            height: 38,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              time: "2024-09-07",
              netVol: 1200000,
            },
            index: 15,
          },
          {
            x: 256,
            height: 35,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              time: "2024-09-08",
              netVol: 1150000,
            },
            index: 16,
          },
          {
            x: 272,
            height: 32,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              time: "2024-09-09",
              netVol: 1080000,
            },
            index: 17,
          },
          {
            x: 288,
            height: 36,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 72000000000,
              buyVal: 97000000000,
              sellVal: 25000000000,
              time: "2024-09-10",
              netVol: 1220000,
            },
            index: 18,
          },
          {
            x: 304,
            height: 50,
            color: "rgb(232, 96, 102)",
            data: {
              netVal: -100000000000,
              buyVal: 15000000000,
              sellVal: 115000000000,
              time: "2024-09-11",
              netVol: -500000,
            },
            index: 19,
          },
          {
            x: 330,
            height: 45,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: 90000000000,
              buyVal: 115000000000,
              sellVal: 25000000000,
              time: "2024-09-12",
              netVol: 1400000,
            },
            index: 20,
          },
        ],
        negBars: [
          {
            x: 64,
            height: 60,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: -120000000000,
              buyVal: 20000000000,
              sellVal: 140000000000,
              time: "2024-08-26",
              netVol: -800000,
            },
            index: 4,
          },
          {
            x: 80,
            height: 80,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: -160000000000,
              buyVal: 15000000000,
              sellVal: 175000000000,
              time: "2024-08-27",
              netVol: -1200000,
            },
            index: 5,
          },
          {
            x: 144,
            height: 70,
            color: "rgb(5, 177, 104)",
            data: {
              netVal: -140000000000,
              buyVal: 18000000000,
              sellVal: 158000000000,
              time: "2024-09-01",
              netVol: -950000,
            },
            index: 9,
          },
        ],
        topValue: "900.0",
        bottomValue: "-1600.0",
        dateRange: { start: "08-22", end: "09-19" },
        metrics: {
          net20: "-240.28亿",
          net10: "-104.37亿",
          net5: "-57.20亿",
          net3: "-23.75亿",
        },
      };
    }

    // Sort data by trading date
    const sortedData = [...dataTuDoanh].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    // Calculate chart dimensions
    const chartWidth = 330;
    const barWidth = 12;
    const spacing = 8;
    const totalBars = Math.min(
      sortedData.length,
      Math.floor((chartWidth + spacing) / (barWidth + spacing))
    );
    const actualSpacing =
      totalBars > 1 ? (chartWidth - totalBars * barWidth) / (totalBars - 1) : 0;

    // Find min/max values for scaling
    const allValues = sortedData.map((d) => d.netVal || 0);
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const maxAbsValue = Math.max(Math.abs(maxValue), Math.abs(minValue));

    // Generate bars
    const chartBars: Array<{
      x: number;
      height: number;
      color: string;
      data: any;
      index: number;
    }> = [];
    const negBars: Array<{
      x: number;
      height: number;
      color: string;
      data: any;
      index: number;
    }> = [];

    for (let i = 0; i < totalBars; i++) {
      const dataIndex = Math.floor(
        (i / (totalBars - 1)) * (sortedData.length - 1)
      );
      const item = sortedData[dataIndex];
      const value = item?.netVal || 0;

      // Scale height (max 50px for positive, 80px for negative)
      const maxHeight = value >= 0 ? 50 : 80;
      const height =
        Math.abs(value) > 0
          ? Math.max(5, (Math.abs(value) / maxAbsValue) * maxHeight)
          : 5;

      const x = i * (barWidth + actualSpacing);
      const color = value >= 0 ? "rgb(5, 177, 104)" : "rgb(232, 96, 102)";

      if (value >= 0) {
        chartBars.push({ x, height, color, data: item, index: dataIndex });
      } else {
        negBars.push({ x, height, color, data: item, index: dataIndex });
      }
    }

    // Format values (convert to tỷ units - billions)
    const formatValue = (value: number) => {
      const inBillion = value / 1000000000; // Convert to billions (tỷ)
      return `${inBillion.toFixed(1)}`;
    };

    const formatValueYi = (value: number) => {
      const inYi = value / 100000000;
      return `${inYi.toFixed(2)}`;
    };

    // Calculate metrics
    const calculateNetFlow = (days: number) => {
      const recentData = sortedData.slice(-days);
      const total = recentData.reduce(
        (sum, item) => sum + (item.netVal || 0),
        0
      );
      return formatValueYi(total);
    };

    // Get date range
    const startDate = sortedData[0]?.time;
    const endDate = sortedData[sortedData.length - 1]?.time;
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
    };

    return {
      chartBars,
      negBars,
      topValue: formatThousands(formatValue(maxValue)),
      bottomValue: formatThousands(
        formatValue(minValue < 0 ? minValue : -Math.abs(maxValue) * 0.3)
      ), // Ensure we always show a negative bottom value
      dateRange: {
        start: startDate ? formatDate(startDate) : "08-22",
        end: endDate ? formatDate(endDate) : "09-19",
      },
      metrics: {
        net20: calculateNetFlow(20),
        net10: calculateNetFlow(10),
        net5: calculateNetFlow(5),
        net3: calculateNetFlow(3),
      },
    };
  }, [dataTuDoanh]);

  // Get route parameters - only symbol needed now
  const { symbol } = useLocalSearchParams<{
    symbol: string;
  }>();

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

  // Parse numeric parameters from stockDetail (keep for backward compatibility)
  const parsedCurrentPrice = stockDetail
    ? parseFloat(stockDetail.currentPrice)
    : "";
  const parsedChangePercent = stockDetail
    ? parseFloat(stockDetail.percentChange) / 1000
    : "";
  const parsedChange = stockDetail ? parseFloat(stockDetail.priceChange) : "";
  const parsedHigh = stockDetail ? parseFloat(stockDetail.high) : 0;
  const parsedAverage = stockDetail ? parseFloat(stockDetail.average) : 0;
  const parsedLow = stockDetail ? parseFloat(stockDetail.low) : 0;
  const parsedCeiling = stockDetail ? parseFloat(stockDetail.ceiling) : 0;
  const parsedReference = stockDetail ? parseFloat(stockDetail.reference) : 0;
  const parsedFloor = stockDetail ? parseFloat(stockDetail.floor) : 0;

  const tabs = ["Tổng quan", "Hồ sơ", "Biểu đồ tài chính", "Tin tức"];

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

  // Fetch stock data similar to CoPhieuTab
  const fetchStockData = async () => {
    try {
      const response = await axiosClient.get(`/stock-overview`);
      if (response.status === 200) {
        setStockData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  // Handle navigation to stock detail
  const handleStockPress = (stock: StockData) => {
    router.push({
      pathname: "/stock-detail",
      params: {
        symbol: stock.c,
      },
    });
  };

  // Force reload chart when returning to this screen
  useFocusEffect(
    useCallback(() => {
      // Check if we should skip chart reload (returning from trade-history)
      const checkSkipReload = async () => {
        try {
          const skipReload = await AsyncStorage.getItem("skipChartReload");
          if (skipReload === "true") {
            // Clear the flag
            await AsyncStorage.removeItem("skipChartReload");
            // Don't reload chart
            return;
          }
          // Increment chart key to force WebView remount
          setChartKey((prev) => prev + 1);
        } catch (error) {
          console.error("Error checking skipChartReload:", error);
          // On error, reload chart as fallback
          setChartKey((prev) => prev + 1);
        }
      };
      checkSkipReload();
    }, [])
  );

  // Fetch topics when component mounts
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await postsApi.getAllTopics({
          page: 1,
          pageSize: 20,
          sortLike: "newest",
        });
        setTopics(response.data.topics);

        // Clear the refresh flag after fetching
        await AsyncStorage.removeItem("refreshPosts");
      } catch (err) {
        setError("Failed to load topics");
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch real topics from new API
    const fetchRealTopics = async () => {
      try {
        setLoading(true);
        // Fetch topics for specific symbol if available
        const response = await topicsApi.getTopicsBySymbol(
          symbol || "",
          1,
          20,
          "newest"
        );
        if (response.data && response.data.topics) {
          setRealTopics(response.data.topics);
        }
      } catch (error) {
        console.error("Error fetching real topics:", error);
      } finally {
        setLoading(false);
      }
    };

    getDataNuocNgoai();
    fetchTopics();
    fetchRealTopics();
    fetchStockData();
    getProfileData(); // Fetch profile data

    if (symbol) {
      fetchStockDetail(symbol); // Fetch stock detail from API
      getMuaBanChuDongShort(symbol);
    }
  }, [refreshFlag, symbol, fetchStockDetail]);

  // Socket connection for real-time order book data
  useEffect(() => {
    if (!symbol) return;

    const SOCKET_URL = "wss://api.dautubenvung.vn/marketStream";
    console.log("Connecting to socket:", SOCKET_URL);

    // TODO: Uncomment when socket.io-client is installed

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
      if (!parsedData?.isDuplicate) {
        setListMatchOrder((prev) => [parsedData, ...prev]);
        setTotalVol(parsedData.TotalVol);
      }

      setLastOrder(parsedData);

      if (parsedData.type === "B") {
        setTotalBuyVol((prev) => prev + (parsedData.LastVol || 0));
      } else if (parsedData.type === "S") {
        setTotalSellVol((prev) => prev + (parsedData.LastVol || 0));
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // // For now, just refresh data periodically until socket is implemented
    // const interval = setInterval(() => {
    //   if (symbol) {
    //     getMuaBanChuDongShort(symbol);
    //   }
    // }, 5000);

    return () => {
      socket.disconnect();
      // clearInterval(interval);
    };
  }, [symbol, getMuaBanChuDongShort]);

  // Trading Detail Modal state
  const [showTradingModal, setShowTradingModal] = useState<boolean>(false);
  const [tradingData, setTradingData] = useState<any>(null);

  const handleBarPress = useCallback(
    (event: any, barData: any, barX: number, barY: number) => {
      if (barData) {
        // Format the trading data
        const formattedDate = new Date(barData.time).toLocaleDateString(
          "vi-VN"
        );
        const formattedNetVal = (barData.netVal / 1000000000).toFixed(2); // Convert to billions
        const formattedBuyVal = (barData.buyVal / 1000000000).toFixed(2);
        const formattedSellVal = (barData.sellVal / 1000000000).toFixed(2);

        setTradingData({
          date: formattedDate,
          netVal: formattedNetVal,
          buyVal: formattedBuyVal,
          sellVal: formattedSellVal,
          netVol: barData.netVol || 0,
          rawNetVal: barData.netVal,
        });

        setShowTradingModal(true);
      }
    },
    []
  );

  // Check for refresh flag periodically
  useEffect(() => {
    const interval = setInterval(async () => {
      const shouldRefresh = await AsyncStorage.getItem("refreshPosts");
      if (shouldRefresh === "true") {
        setRefreshFlag((prev) => !prev); // Toggle to trigger refresh
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const getDataNuocNgoai = useCallback(async () => {
    try {
      const responseNuocNgoai = await axiosClient.get(`/propdata/${symbol}`);

      const dataNuocNgoai = responseNuocNgoai?.data?.data?.roombars;
      const dataTuDoanh = responseNuocNgoai?.data?.data?.propdata;

      setDataNuocNgoai(dataNuocNgoai);
      setDataTuDoanh(dataTuDoanh);
    } catch (error) {
      console.error("Error fetching nuoc ngoai chart data:", error);
    }
  }, [symbol]);

  // Fetch profile data
  const getProfileData = useCallback(async () => {
    if (!symbol) return;

    try {
      // Get company detail info
      const detailResponse = await axiosClient.get(
        `company-info?symbol=${symbol}`
      );
      if (detailResponse.status === 200) {
        setDetailInfoSymbol(detailResponse.data.data[0]);
      }

      // Get company statistics
      const statisticResponse = await axiosClient.get(
        `/company-statistic?symbol=${symbol}&language=vn`
      );
      if (statisticResponse.status === 200) {
        setGeneralIndex(statisticResponse.data.data);
      }

      // Get business plan data
      const businessResponse = await axiosClient.get(
        `/financial_analysis?symbol=${symbol}`
      );
      if (businessResponse.status === 200) {
        setBusinessPlan(businessResponse?.data?.data[0]);
      }

      // Get analysis reports
      const reportsResponse = await axiosClient.get(
        `/bao_cao_phan_tich?symbol=${symbol}`
      );
      if (reportsResponse.status === 200) {
        setListAnalysisReport(reportsResponse?.data?.data);
      }

      // Get news data
      const newsResponse = await axiosClient.get(`/news?symbol=${symbol}`);
      if (newsResponse.status === 200) {
        setNewsData(newsResponse?.data?.data);
      }

      // Get downloadable reports
      const downloadResponse = await axios.get(
        `${API_HOST}/financial-reports/${symbol}`
      );
      if (downloadResponse.status === 200) {
        setDownloadReportMap(downloadResponse?.data?.data);
      }

      // Get shareholder structure
      const shareholderResponse = await axiosClient.get(
        `/co-dong?symbol=${symbol}`
      );
      if (shareholderResponse.status === 200) {
        setShareholderStructure(shareholderResponse.data.listCoDong);
      }

      // Get subsidiary companies
      const subsidiaryResponse = await axiosClient.get(
        `/sub-companies?symbol=${symbol}&language=vn`
      );
      if (subsidiaryResponse.status === 200) {
        setNewSubCompany(subsidiaryResponse?.data?.data);
      }

      // Get leadership team
      const leadershipResponse = await axiosClient.get(
        `/leadership?symbol=${symbol}&language=vn&page=1&pageSize=100`
      );
      if (leadershipResponse.status === 200) {
        setLeadership(leadershipResponse?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, [symbol]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          {/* <Text style={[styles.backButton, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>← </Text> */}
          <BackIcon color={theme.mode === "dark" ? "#C7C8D1" : "#000000"} />
        </TouchableOpacity>
        <Text
          style={[
            {
              flex: 1,
              color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 20,
            },
          ]}
        >
          {symbol || "SSI"}
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Company Info - Using StockInfoCard component */}
        <View
          style={{
            paddingHorizontal: 8,
            backgroundColor: theme.colors.background,
          }}
        >
          <StockInfoCard
            data={{
              companyName:
                stockDetail?.companyName || "Công ty Cổ phần Chứng khoán SSI",
              exchange: stockDetail?.exchange || "HOSE",
              currentPrice: lastOrder?.LastPrice || parsedCurrentPrice,
              changePercent: lastOrder?.RatioChange || parsedChangePercent,
              high: lastOrder?.High || parsedHigh,
              change: lastOrder?.Change || parsedChange,
              average: lastOrder?.AvgPrice || parsedAverage,
              low: lastOrder?.Low || parsedLow,
              ceiling: lastOrder?.Ceiling || parsedCeiling,
              reference: lastOrder?.RefPrice || parsedReference,
              floor: lastOrder?.Floor || parsedFloor,
              lastOrder: lastOrder,
            }}
          />
        </View>

        {/* Settings Section */}
        <LinearGradient
          colors={
            theme?.mode === "dark"
              ? ["#112C26", "#121317"]
              : ["#F4F5F6", "#F4F5F6"]
          }
          style={[
            styles.section,
            {
              borderColor: "#235a4e",
              borderWidth: 1,
              borderRadius: 12,
            },
          ]}
          start={{ x: 0.089, y: 0 }}
          end={{ x: 0.531, y: 1 }}
        >

          {/* <View
          style={[styles.section, { backgroundColor: colors.cardBackground }, {
            borderColor: "#235a4e",
            borderWidth: 1,
            borderRadius: 12,
          },]}
        > */}
          <View
            style={styles.settingsHeader}

          >
            <View style={styles.settingsInfo}>
              <View style={styles.settingsRow}>
                {/* <Text style={[styles.settingsIcon, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>⚙️</Text> */}
                <SettingIcon
                  style={{ marginTop: 8 }}
                  color={theme.mode === "dark" ? "#fff" : "#000000"}
                />
                <Text
                  style={[
                    styles.settingsTitle,
                    { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  Cài đặt tín hiệu
                </Text>
              </View>
              <Text
                style={[
                  styles.settingsSubtitle,
                  { color: theme.colors.textResult },
                ]}
              >
                Cài đặt cảnh báo {symbol} hỗ trợ hay kháng cự?
              </Text>
            </View>
            <TouchableOpacity
              style={styles.unlockButton}
              onPress={async () => {
                try {
                  const res = await axiosClient.get(
                    `/api/alerts/trendline/${symbol}`
                  );
                  console.log(res);

                  router.push({
                    pathname: "/signal-settings",
                    params: {
                      symbol: symbol,
                    },
                  });
                } catch (err: any) {
                  console.log("Error:", err);
                  // Nếu lỗi 401 Unauthorized → chuyển về màn login
                  if (err.response?.status === 401) {
                    console.log("Unauthorized - redirecting to login");
                    // Store the current route before logout and redirecting to login
                    // Since we don't have access to the current route, we'll store a generic object
                    const currentRoute = {
                      pathname: "/stock-detail",
                      params: { symbol },
                    };
                    await AsyncStorage.setItem(
                      "PREVIOUS_ROUTE",
                      JSON.stringify(currentRoute)
                    );
                    await logout();
                    router.push("/auth/login");
                  } else {
                    router.push({
                      pathname: "/signal-settings",
                      params: {
                        symbol: symbol,
                      },
                    });
                  }
                }
              }}
            >
              <Text style={styles.unlockButtonText}>Cài đặt</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </LinearGradient>


        {/* Tabs Navigation */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                activeOpacity={1}
                style={[
                  styles.tab,
                  activeTab === tab && {
                    borderBottomColor: "#004AEA",
                    borderBottomWidth: 2,
                  },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === tab
                          ? theme.colors.activeTabText
                          : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {activeTab === "Hồ sơ" && (
          <View style={{ paddingHorizontal: 16 }}>
            {/* Company Profile Section */}
            <View
              style={[
                styles.profileSection,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Text
                style={[styles.profileSectionTitle, { color: colors.text }]}
              >
                Thông tin công ty
              </Text>
              <View style={{ marginBottom: 12 }}>
                {/* <Text style={[{ color: colors.text, fontSize: 13, lineHeight: 18, marginBottom: 8 }]}>
                  {detailInfoSymbol?.companyProfile ? 
                    detailInfoSymbol.companyProfile.replace(/<[^>]*>/g, '') : 
                    'Thông tin công ty đang được cập nhật...'
                  }
                </Text> */}
                <RenderHTML
                  contentWidth={200}
                  source={{ html: detailInfoSymbol?.companyProfile }}
                  tagsStyles={{
                    p: {
                      color: theme.colors.text,
                      fontSize: 11,
                      lineHeight: 12,
                      textAlign: "justify",
                    },
                    div: {
                      color: "#fff",
                      fontSize: 8,
                    },
                  }}
                />
                {detailInfoSymbol?.subSectorCode && (
                  <View style={styles.companyDetailRow}>
                    <Text
                      style={[
                        styles.companyDetailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Mã ngành ICB:
                    </Text>
                    <Text
                      style={[
                        styles.companyDetailValue,
                        { color: colors.text },
                      ]}
                    >
                      {detailInfoSymbol.subSectorCode}
                    </Text>
                  </View>
                )}

                {detailInfoSymbol?.foundingDate && (
                  <View style={styles.companyDetailRow}>
                    <Text
                      style={[
                        styles.companyDetailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Năm thành lập:
                    </Text>
                    <Text
                      style={[
                        styles.companyDetailValue,
                        { color: colors.text },
                      ]}
                    >
                      {detailInfoSymbol.foundingDate.split(" ")[0]}
                    </Text>
                  </View>
                )}

                {detailInfoSymbol?.charterCapital && (
                  <View style={styles.companyDetailRow}>
                    <Text
                      style={[
                        styles.companyDetailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Vốn điều lệ:
                    </Text>
                    <Text
                      style={[
                        styles.companyDetailValue,
                        { color: colors.text },
                      ]}
                    >
                      {formatToBillion(detailInfoSymbol.charterCapital)}
                    </Text>
                  </View>
                )}

                {detailInfoSymbol?.listingDate && (
                  <View style={styles.companyDetailRow}>
                    <Text
                      style={[
                        styles.companyDetailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Ngày niêm yết:
                    </Text>
                    <Text
                      style={[
                        styles.companyDetailValue,
                        { color: colors.text },
                      ]}
                    >
                      {detailInfoSymbol.listingDate.split(" ")[0]}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Financial Overview */}
            {/* <View style={[styles.profileSection, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.profileSectionTitle, { color: colors.text }]}>Tổng quan tài chính</Text> */}
            <ScrollView
              horizontal
              style={styles.tabsContainer}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[
                    styles.overview,
                    styles.profileSection,
                    {
                      backgroundColor: theme.colors.backgroundCoPhieu,
                    },
                  ]}
                >
                  <Text
                    style={[styles.profileSectionTitle, { color: colors.text }]}
                  >
                    Tổng quan
                  </Text>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Mã cổ phiếu:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {detailInfoSymbol?.symbol || symbol || "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Vốn hóa:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {generalIndex?.marketCap
                        ? formatToBillion(generalIndex.marketCap)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Số lượng CP lưu hành:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {generalIndex?.sharesOutstanding
                        ? formatThousands(generalIndex.sharesOutstanding)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Tổng doanh thu:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {generalIndex?.totalRevenue
                        ? formatToBillion(generalIndex.totalRevenue)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Lợi nhuận:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {generalIndex?.profit
                        ? formatToBillion(generalIndex.profit)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Tài sản:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {generalIndex?.totalAssets
                        ? formatToBillion(generalIndex.totalAssets)
                        : "--"}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.overview,
                    styles.profileSection,
                    {
                      backgroundColor: theme.colors.backgroundCoPhieu,
                    },
                  ]}
                >
                  <Text
                    style={[styles.profileSectionTitle, { color: colors.text }]}
                  >
                    Tài chính
                  </Text>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      P/E (TTM):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryd21
                        ? Number(businessPlan.ryd21).toFixed(2)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      P/B (TTM):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryd25
                        ? Number(businessPlan.ryd25).toFixed(2)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      P/S (TTM):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryd22
                        ? Number(businessPlan.ryd22).toFixed(2)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      EPS (TTM):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryd14
                        ? Number(businessPlan.ryd14).toFixed(0)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      ROA (%):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryq14
                        ? `${Number(businessPlan.ryq14).toFixed(2)}%`
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      ROE (%):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryq12
                        ? `${Number(businessPlan.ryq12).toFixed(2)}%`
                        : "--"}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.overview,
                    styles.profileSection,
                    {
                      backgroundColor: theme.colors.backgroundCoPhieu,
                    },
                  ]}
                >
                  <Text
                    style={[styles.profileSectionTitle, { color: colors.text }]}
                  >
                    Kết quả kinh doanh
                  </Text>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Doanh thu:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {generalIndex?.totalRevenue
                        ? formatToBillion(generalIndex.totalRevenue)
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Biên EBIT (%):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryq27
                        ? `${Number(businessPlan.ryq27).toFixed(2)}%`
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Lợi nhuận ròng (%):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryq29
                        ? `${Number(businessPlan.ryq29).toFixed(2)}%`
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Lợi nhuận gộp (%):
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryq28
                        ? `${Number(businessPlan.ryq28).toFixed(2)}%`
                        : "--"}
                    </Text>
                  </View>

                  <View style={styles.overviewItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Đòn bẩy tài chính:
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {businessPlan?.ryq31
                        ? Number(businessPlan.ryq31).toFixed(2)
                        : "--"}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            {/* </View> */}

            {/* Analysis Reports Section */}
            <View
              style={[
                styles.profileSection,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <View style={styles.profileSectionHeader}>
                <Text
                  style={[styles.profileSectionTitle, { color: colors.text }]}
                >
                  Báo cáo phân tích
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.profileViewMore, { color: "#99BAFF" }]}>
                    Xem thêm ›
                  </Text>
                </TouchableOpacity>
              </View>

              {listAnalysisReport && listAnalysisReport.length > 0 ? (
                <View>
                  {listAnalysisReport.slice(0, 3).map((report, index) => (
                    <View
                      key={index}
                      style={[
                        styles.reportItem,
                        { borderBottomColor: colors.border },
                      ]}
                    >
                      <Text
                        style={[styles.reportTitle, { color: colors.text }]}
                      >
                        {report.title || "Báo cáo phân tích"}
                      </Text>
                      <Text
                        style={[
                          styles.reportDate,
                          { color: colors.secondaryText },
                        ]}
                      >
                        {report.publishDate ||
                          new Date().toLocaleDateString("vi-VN")}
                      </Text>
                      <Text
                        style={[
                          styles.reportSummary,
                          { color: colors.secondaryText },
                        ]}
                        numberOfLines={2}
                      >
                        {report.summary ||
                          "Phân tích chi tiết về tình hình hoạt động của công ty..."}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={[{ color: colors.secondaryText, fontSize: 12 }]}>
                  Chưa có báo cáo phân tích
                </Text>
              )}
            </View>

            {/* News Section */}
            <View
              style={[
                styles.profileSection,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <View style={styles.profileSectionHeader}>
                <Text
                  style={[styles.profileSectionTitle, { color: colors.text }]}
                >
                  Tin tức sự kiện
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.profileViewMore, { color: "#99BAFF" }]}>
                    Xem thêm ›
                  </Text>
                </TouchableOpacity>
              </View>

              {newsData && newsData.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.newsContainer}
                >
                  {newsData.slice(0, 5).map((news, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.newsCard,
                        {
                          backgroundColor: isDark ? "#2a3340" : "#f8f9fa",
                        },
                      ]}
                    >
                      <Text
                        style={[styles.newsTitle, { color: colors.text }]}
                        numberOfLines={2}
                      >
                        {news.title || "Tin tức mới nhất"}
                      </Text>
                      <Text
                        style={[
                          styles.newsDate,
                          { color: colors.secondaryText },
                        ]}
                      >
                        {news.publishDate ||
                          new Date().toLocaleDateString("vi-VN")}
                      </Text>
                      <Text
                        style={[
                          styles.newsSummary,
                          { color: colors.secondaryText },
                        ]}
                        numberOfLines={3}
                      >
                        {news.summary ||
                          "Thông tin cập nhật về hoạt động của công ty và ngành..."}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <Text style={[{ color: colors.secondaryText, fontSize: 12 }]}>
                  Chưa có tin tức
                </Text>
              )}
            </View>

            {/* Subsidiary Companies Section - Using Real Data */}
            {newSubCompany && newSubCompany.length > 0 && (
              <View
                style={[
                  styles.profileSection,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[styles.profileSectionTitle, { color: colors.text }]}
                >
                  Công ty con
                </Text>

                <View>
                  {newSubCompany
                    .filter((company) => company.roleId === "11")
                    .slice(0, 3)
                    .map((company, index) => (
                      <View
                        key={index}
                        style={[
                          styles.companyRow,
                          { borderBottomColor: colors.border },
                        ]}
                      >
                        <Text
                          style={[styles.companyName, { color: colors.text }]}
                        >
                          {company.childCompanyName ||
                            `Công ty con ${index + 1}`}
                        </Text>
                        <Text
                          style={[
                            styles.companyOwnership,
                            { color: colors.secondaryText },
                          ]}
                        >
                          Tỷ lệ sở hữu:{" "}
                          {company.percentage
                            ? `${company.percentage}%`
                            : "N/A"}
                        </Text>
                        <Text
                          style={[
                            styles.companyIndustry,
                            { color: colors.secondaryText },
                          ]}
                        >
                          Vốn điều lệ:{" "}
                          {company.charterCapital
                            ? formatToBillion(Number(company.charterCapital))
                            : "N/A"}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            )}

            {/* Leadership Team Section - Using Real Data */}
            <View
              style={[
                styles.profileSection,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Text
                style={[styles.profileSectionTitle, { color: colors.text }]}
              >
                Ban lãnh đạo
              </Text>

              {leadership && leadership.length > 0 ? (
                <View>
                  {leadership.slice(0, 5).map((leader, index) => (
                    <View
                      key={index}
                      style={[
                        styles.leadershipRow,
                        { borderBottomColor: colors.border },
                      ]}
                    >
                      <View
                        style={[
                          styles.leadershipAvatar,
                          { backgroundColor: colors.border },
                        ]}
                      >
                        <Text
                          style={[
                            styles.leadershipAvatarText,
                            { color: colors.text },
                          ]}
                        >
                          {leader.fullName
                            ? leader.fullName.charAt(0).toUpperCase()
                            : leader.name?.charAt(0).toUpperCase() || "L"}
                        </Text>
                      </View>
                      <View style={styles.leadershipInfo}>
                        <Text
                          style={[
                            styles.leadershipName,
                            { color: colors.text },
                          ]}
                        >
                          {leader.fullName ||
                            leader.name ||
                            `Lãnh đạo ${index + 1}`}
                        </Text>
                        <Text
                          style={[
                            styles.leadershipPosition,
                            { color: colors.secondaryText },
                          ]}
                        >
                          {leader.position || "Thành viên HĐQT"}
                        </Text>
                        {leader.education && (
                          <Text
                            style={[
                              styles.leadershipExperience,
                              { color: colors.secondaryText },
                            ]}
                            numberOfLines={2}
                          >
                            {leader.education}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  {[
                    "Chủ tịch HĐQT",
                    "Tổng Giám đốc",
                    "Phó Tổng Giám đốc",
                    "Giám đốc Tài chính",
                    "Thành viên HĐQT",
                  ].map((position, index) => (
                    <View
                      key={index}
                      style={[
                        styles.leadershipRow,
                        { borderBottomColor: colors.border },
                      ]}
                    >
                      <View
                        style={[
                          styles.leadershipAvatar,
                          { backgroundColor: colors.border },
                        ]}
                      >
                        <Text
                          style={[
                            styles.leadershipAvatarText,
                            { color: colors.text },
                          ]}
                        >
                          {position.charAt(0)}
                        </Text>
                      </View>
                      <View style={styles.leadershipInfo}>
                        <Text
                          style={[
                            styles.leadershipName,
                            { color: colors.text },
                          ]}
                        >
                          Đang cập nhật
                        </Text>
                        <Text
                          style={[
                            styles.leadershipPosition,
                            { color: colors.secondaryText },
                          ]}
                        >
                          {position}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {activeTab === "Tổng quan" && (
          <>
            {/* Chart Section */}
            <View
              style={{
                height: 410,
                width: "100%",
                marginVertical: 8,
                paddingHorizontal: 8,
              }}
            >
              <ChartWebViews
                key={chartKey}
                symbol={symbol}
                colors={chartColors}
              />
              {/* <WebView
            originWhitelist={['*']}
            source={{
              uri: `https://app.dautubenvung.vn/chart/${symbol || 'VNINDEX'}`,
            }}
            bounces={false}                 // iOS: tắt bounce
  scrollEnabled={false}           // tắt scroll WebView
  overScrollMode="never"          // Android: tắt glow overscroll
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
  contentInsetAdjustmentBehavior="never" // iOS
            style={styles.webview}
          /> */}
            </View>
            {/* <TouchableOpacity 
            onPress={() => setIsFullScreen(true)}
            style={styles.fullscreenButton}
          >
            <MaterialIcons name="fullscreen" size={24} color="#99BAFF" />
          </TouchableOpacity> */}

            {/* Order Book */}
            <View
              style={[
                styles.section,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                ]}
              >
                Khớp lệnh
              </Text>

              <View style={styles.tableContainer}>
                <View
                  style={[
                    styles.tableHeader,
                    {
                      borderBottomColor: theme.colors.borderBottom,
                      borderTopColor: theme.colors.borderBottom,
                    },
                  ]}
                >
                  <View
                    style={[styles.tableColumn, { alignItems: "flex-start" }]}
                  >
                    {/* <Text style={[styles.tableHeaderText, { color: '#8E8E93' }]}>KL</Text> */}
                  </View>
                  <View style={[styles.tableColumn, { alignItems: "center" }]}>
                    <Text
                      style={[styles.tableHeaderText, { color: "#8E8E93" }]}
                    >
                      Giá mua
                    </Text>
                  </View>
                  <View style={[styles.tableColumn, { alignItems: "center" }]}>
                    <Text
                      style={[styles.tableHeaderText, { color: "#8E8E93" }]}
                    >
                      Giá bán
                    </Text>
                  </View>
                  <View
                    style={[styles.tableColumn, { alignItems: "flex-end" }]}
                  >
                    {/* <Text style={[styles.tableHeaderText, { color: '#8E8E93' }]}>KL</Text> */}
                  </View>
                </View>

                {/* Order Book Rows */}
                {[1, 2, 3].map((index) => {
                  const bidPriceKey = `BidPrice${index}`;
                  const bidVolKey = `BidVol${index}`;
                  const askPriceKey = `AskPrice${index}`;
                  const askVolKey = `AskVol${index}`;

                  const bidPrice = lastOrder?.[
                    `BidPrice${index}` as keyof Order
                  ] as number;
                  const bidVol = lastOrder?.[
                    `BidVol${index}` as keyof Order
                  ] as number;
                  const askPrice = lastOrder?.[
                    `AskPrice${index}` as keyof Order
                  ] as number;
                  const askVol = lastOrder?.[
                    `AskVol${index}` as keyof Order
                  ] as number;

                  return (
                    <View
                      key={index}
                      style={[
                        styles.tableRow,
                        {
                          borderBottomWidth: index === 3 ? 0 : 1,
                          borderBottomColor: theme.colors.borderBottom,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.tableColumn,
                          { alignItems: "flex-start" },
                        ]}
                      >
                        <Text
                          style={[
                            styles.orderVolume,
                            {
                              color: bidVol
                                ? theme.mode === "dark"
                                  ? "#FFFFFF"
                                  : "#000000"
                                : "#097f5",
                              backgroundColor: bgColors[bidVolKey],
                            },
                          ]}
                        >
                          {bidVol ? formatNumberComma(bidVol ?? "") : "-"}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableColumn, { alignItems: "center" }]}
                      >
                        <Text
                          style={[
                            styles.orderPrice,
                            {
                              color: bidPrice
                                ? getPriceColor(
                                  +formatNumber(bidPrice),
                                  parsedReference,
                                  parsedCeiling,
                                  parsedFloor,
                                  theme
                                )
                                : "#097f5",
                              backgroundColor: bgColors[bidPriceKey],
                            },
                          ]}
                        >
                          {bidPrice ? formatNumber(bidPrice ?? "") : "-"}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableColumn, { alignItems: "center" }]}
                      >
                        <Text
                          style={[
                            styles.orderPrice,
                            {
                              color: askPrice
                                ? getPriceColor(
                                  +formatNumber(askPrice),
                                  parsedReference,
                                  parsedCeiling,
                                  parsedFloor,
                                  theme
                                )
                                : "#C663E9",
                              backgroundColor: bgColors[askPriceKey],
                            },
                          ]}
                        >
                          {askPrice ? formatNumber(askPrice ?? "") : "-"}
                        </Text>
                      </View>
                      <View
                        style={[styles.tableColumn, { alignItems: "flex-end" }]}
                      >
                        <Text
                          style={[
                            styles.orderVolume,
                            {
                              color: askVol
                                ? theme.mode === "dark"
                                  ? "#FFFFFF"
                                  : "#000000"
                                : "#C663E9",
                              backgroundColor: bgColors[askVolKey],
                            },
                          ]}
                        >
                          {askVol ? formatNumberComma(askVol ?? 0) : "-"}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              {/* Order Book Summary */}
              <View
                style={[
                  styles.summaryContainer,
                  {
                    backgroundColor: theme.colors.backgroundItemTinHieu,
                    flexDirection: "row",
                  },
                ]}
              >
                <View style={styles.summaryColumn}>
                  <Text
                    style={[
                      styles.summaryLabel,
                      {
                        color: theme.mode === "dark" ? "#8E8E93" : "#464A53",
                        textAlign: "center",
                      },
                    ]}
                  >
                    KL MUA chủ động
                  </Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      {
                        color: "#22C55E",
                        textAlign: "center",
                        backgroundColor: bgColors.TotalBuyVol,
                      },
                    ]}
                  >
                    {formatNumberComma(totalBuyVol)}
                  </Text>
                </View>
                {/* <View
                  style={[
                    styles.columnSeparator,
                    { backgroundColor: "#3A3A3C" },
                  ]}
                /> */}
                <View style={styles.summaryColumn}>
                  <Text
                    style={[
                      styles.summaryLabel,
                      {
                        color: theme.mode === "dark" ? "#8E8E93" : "#464A53",
                        textAlign: "center",
                      },
                    ]}
                  >
                    Tổng KL khớp
                  </Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      {
                        color: theme.mode === "dark" ? "#FFFFFF" : "#464A53",
                        textAlign: "center",
                        backgroundColor: bgColors.TotalVol,
                      },
                    ]}
                  >
                    {formatNumberComma(totalVol)}
                  </Text>
                </View>
                {/* <View
                  style={[
                    styles.columnSeparator,
                    { backgroundColor: "#3A3A3C" },
                  ]}
                /> */}
                <View style={styles.summaryColumn}>
                  <Text
                    style={[
                      styles.summaryLabel,
                      {
                        color: theme.mode === "dark" ? "#8E8E93" : "#464A53",
                        textAlign: "center",
                      },
                    ]}
                  >
                    KL BÁN chủ động
                  </Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      {
                        color: "#EF4444",
                        textAlign: "center",
                        backgroundColor: bgColors.TotalSellVol,
                      },
                    ]}
                  >
                    {formatNumberComma(totalSellVol)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Trading History */}
            <View
              style={[
                styles.section,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  Lịch sử khớp lệnh
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // Store data in AsyncStorage to avoid URL parameter size limits
                    const storeTradeData = async () => {
                      try {
                        const tradeData = JSON.stringify(listMatchOrder);
                        await AsyncStorage.setItem("tempTradeData", tradeData);
                        // Set flag to prevent chart reload when returning
                        await AsyncStorage.setItem("skipChartReload", "true");
                        router.push({
                          pathname: "/trade-history",
                          params: {
                            symbol: symbol, // Pass symbol for socket connection
                          },
                        });
                      } catch (error) {
                        console.error("Error storing trade data:", error);
                        // Fallback to limited data if storage fails
                        const limitedData = listMatchOrder.slice(0, 100); // Only first 100 items
                        await AsyncStorage.setItem("skipChartReload", "true");
                        router.push({
                          pathname: "/trade-history",
                          params: {
                            listMatchOrder: JSON.stringify(limitedData),
                            symbol: symbol,
                          },
                        });
                      }
                    };
                    storeTradeData();
                  }}
                >
                  <Text
                    style={[styles.viewMore, { color: theme.colors.xemThem }]}
                  >
                    Xem thêm ›
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableContainer}>
                <View
                  style={[
                    styles.tableHeader,
                    {
                      borderBottomColor: theme.colors.borderBottom,
                      borderTopColor: theme.colors.borderBottom,
                    },
                  ]}
                >
                  <View
                    style={[styles.tableColumn, { alignItems: "flex-start" }]}
                  >
                    <Text
                      style={[styles.tableHeaderText, { color: "#8E8E93" }]}
                    >
                      Giá
                    </Text>
                  </View>
                  <View style={[styles.tableColumn, { alignItems: "center" }]}>
                    <Text
                      style={[styles.tableHeaderText, { color: "#8E8E93" }]}
                    >
                      Khối lượng
                    </Text>
                  </View>
                  <View style={[styles.tableColumn, { alignItems: "center" }]}>
                    <Text
                      style={[styles.tableHeaderText, { color: "#8E8E93" }]}
                    >
                      Biểu đồ
                    </Text>
                  </View>
                  <View
                    style={[styles.tableColumn, { alignItems: "flex-end" }]}
                  >
                    <Text
                      style={[styles.tableHeaderText, { color: "#8E8E93" }]}
                    >
                      %
                    </Text>
                  </View>
                </View>

                {/* Process and display trading history data */}
                {(() => {
                  // Group data by price using lodash-like logic
                  const groupByLastPrice = listMatchOrder.reduce(
                    (acc: any, item: any) => {
                      const price = item.LastPrice;
                      if (!acc[price]) acc[price] = [];
                      acc[price].push(item);
                      return acc;
                    },
                    {}
                  );

                  // Calculate total volume
                  const totalVolume = listMatchOrder.reduce(
                    (sum: number, item: any) => sum + (item.LastVol || 0),
                    0
                  );

                  // Process grouped data
                  const processedData = Object.entries(groupByLastPrice)
                    .map(([price, items]: [string, any[]]) => {
                      const totalBuy = items
                        .filter((item) => item.type === "B")
                        .reduce((sum, item) => sum + (item.LastVol || 0), 0);
                      const totalSell = items
                        .filter((item) => item.type === "S")
                        .reduce((sum, item) => sum + (item.LastVol || 0), 0);
                      const volume = items.reduce(
                        (sum, item) => sum + (item.LastVol || 0),
                        0
                      );

                      const totalTransactions = totalBuy + totalSell;
                      const buyRatio =
                        totalTransactions > 0
                          ? totalBuy / totalTransactions
                          : 0;
                      const sellRatio =
                        totalTransactions > 0
                          ? totalSell / totalTransactions
                          : 0;
                      const neutralRatio = Math.max(
                        0,
                        1 - (buyRatio + sellRatio)
                      );

                      return {
                        price: parseFloat(price),
                        volume,
                        buyRatio,
                        sellRatio,
                        neutralRatio,
                        percent:
                          totalVolume > 0 ? (volume / totalVolume) * 100 : 0,
                      };
                    })
                    .sort((a, b) => b.volume - a.volume)
                    .slice(0, 7); // Show top 7 by volume

                  return processedData.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.tableRow,
                          {
                            borderBottomWidth: index === 6 ? 0 : 1,
                            borderBottomColor: theme.colors.borderBottom,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.tableColumn,
                            { alignItems: "flex-start" },
                          ]}
                        >
                          <Text
                            style={[
                              styles.cellText,
                              {
                                color: getPriceColor(
                                  +formatNumber(item.price),
                                  parsedReference,
                                  parsedCeiling,
                                  parsedFloor,
                                  theme
                                ),
                              },
                            ]}
                          >
                            {formatNumber(item.price)}
                          </Text>
                        </View>
                        <View
                          style={[styles.tableColumn, { alignItems: "center" }]}
                        >
                          <Text
                            style={[
                              styles.cellText,
                              {
                                color:
                                  theme.mode === "dark" ? "#FFFFFF" : "#000000",
                              },
                            ]}
                          >
                            {item.volume >= 1000000
                              ? `${(item.volume / 1000000).toFixed(2)} M`
                              : item.volume >= 1000
                                ? `${(item.volume / 1000).toFixed(1)} K`
                                : formatNumberComma(item.volume)}
                          </Text>
                        </View>
                        <View
                          style={[styles.tableColumn, { alignItems: "center" }]}
                        >
                          <View style={styles.chartBarContainer}>
                            {item.buyRatio > 0 && (
                              <View
                                style={[
                                  styles.volumeBar,
                                  {
                                    backgroundColor: "#34C759",
                                    width: `${Math.max(
                                      5,
                                      item.buyRatio * 100
                                    )}%`,
                                  },
                                ]}
                              />
                            )}
                            {item.sellRatio > 0 && (
                              <View
                                style={[
                                  styles.volumeBar,
                                  {
                                    backgroundColor: "#FF6B6B",
                                    width: `${Math.max(
                                      5,
                                      item.sellRatio * 100
                                    )}%`,
                                  },
                                ]}
                              />
                            )}
                            {item.neutralRatio > 0 && (
                              <View
                                style={[
                                  styles.volumeBar,
                                  {
                                    backgroundColor: "#FFD60A",
                                    width: `${Math.max(
                                      5,
                                      item.neutralRatio * 100
                                    )}%`,
                                  },
                                ]}
                              />
                            )}
                          </View>
                        </View>
                        <View
                          style={[
                            styles.tableColumn,
                            { alignItems: "flex-end" },
                          ]}
                        >
                          <Text
                            style={[
                              styles.cellText,
                              { color: "#34C759", textAlign: "right" },
                            ]}
                          >
                            {item.percent.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    );
                  });
                })()}
              </View>
            </View>

            {/* Column Chart Nuoc Ngoai */}
            <View
              style={[
                styles.columnChartContainer,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Text
                style={[
                  styles.impactTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Giao dịch NĐTNN
              </Text>
              {/* Chart Area */}
              <View style={styles.chartArea}>
                {/* Chart bars */}
                <View style={styles.barsContainer}>
                  <Svg
                    width="100%"
                    height={170}
                    viewBox="0 0 330 170"
                    preserveAspectRatio="none"
                  >
                    <G>
                      {/* Positive bars */}
                      {processColumnChartNuocNgoaiData.chartBars.map(
                        (bar, index) => (
                          <G key={index}>
                            <Rect
                              x={bar.x}
                              y={60 - bar.height}
                              width={12}
                              height={bar.height}
                              fill={bar.color}
                              rx={2}
                            />
                            {/* Invisible touch area for interaction */}
                            <Rect
                              x={bar.x - 2}
                              y={60 - bar.height - 5}
                              width={16}
                              height={bar.height + 10}
                              fill="transparent"
                              onPress={(event) =>
                                handleBarPress(
                                  event,
                                  bar.data,
                                  bar.x + 6,
                                  60 - bar.height - 10
                                )
                              }
                            />
                          </G>
                        )
                      )}

                      {/* Negative bars below baseline */}
                      {processColumnChartNuocNgoaiData.negBars.map(
                        (bar, index) => (
                          <G key={`neg-${index}`}>
                            <Rect
                              x={bar.x}
                              y={60}
                              width={12}
                              height={bar.height}
                              fill={bar.color}
                              rx={2}
                            />
                            {/* Invisible touch area for interaction */}
                            <Rect
                              x={bar.x - 2}
                              y={60 - 5}
                              width={16}
                              height={bar.height + 10}
                              fill="transparent"
                              onPress={(event) =>
                                handleBarPress(
                                  event,
                                  bar.data,
                                  bar.x + 6,
                                  60 + bar.height + 10
                                )
                              }
                            />
                          </G>
                        )
                      )}

                      {/* Horizontal dashed line at top (max value) - positioned at highest green bar */}
                      {(() => {
                        const highestBar =
                          processColumnChartNuocNgoaiData.chartBars.reduce(
                            (max, bar) => (bar.height > max.height ? bar : max),
                            processColumnChartNuocNgoaiData.chartBars[0] || {
                              height: 0,
                              x: 15,
                            }
                          );
                        const topLineY = 60 - highestBar.height;
                        return (
                          <Path
                            d={`M0,${topLineY} L${width - 32},${topLineY}`}
                            stroke={colors.secondaryText}
                            strokeWidth={0.8}
                            strokeDasharray="8,3"
                            opacity={0.6}
                          />
                        );
                      })()}

                      {/* Horizontal dashed line at bottom (min value) - always show */}
                      {(() => {
                        // If there are negative bars, position at the bottom of the lowest one
                        // Otherwise, use a position that's safely within the expanded viewBox (y=140)
                        const lowestBar =
                          processColumnChartNuocNgoaiData.negBars.length > 0
                            ? processColumnChartNuocNgoaiData.negBars.reduce(
                              (max, bar) =>
                                bar.height > max.height ? bar : max,
                              processColumnChartNuocNgoaiData.negBars[0]
                            )
                            : null;

                        const bottomLineY = lowestBar
                          ? 60 + lowestBar.height
                          : 140;

                        return (
                          <Path
                            d={`M0,${bottomLineY} L330,${bottomLineY}`}
                            stroke={colors.secondaryText}
                            strokeWidth={0.8}
                            strokeDasharray="8,3"
                            opacity={0.6}
                          />
                        );
                      })()}

                      {/* Top value label above the dashed line */}
                      {(() => {
                        const highestBar =
                          processColumnChartNuocNgoaiData.chartBars.reduce(
                            (max, bar) => (bar.height > max.height ? bar : max),
                            processColumnChartNuocNgoaiData.chartBars[0] || {
                              height: 0,
                              x: 15,
                            }
                          );
                        const topLineY = 60 - highestBar.height;
                        return (
                          <SvgText
                            x={0}
                            y={topLineY - 2}
                            fontSize={10}
                            fill={colors.text}
                            fontWeight="400"
                          >
                            {processColumnChartNuocNgoaiData.topValue} tỷ
                          </SvgText>
                        );
                      })()}

                      {/* Bottom value label below the dashed line - always show */}
                      {(() => {
                        // If there are negative bars, position at the bottom of the lowest one
                        // Otherwise, use a position that's safely within the expanded viewBox (y=155)
                        const lowestBar =
                          processColumnChartNuocNgoaiData.negBars.length > 0
                            ? processColumnChartNuocNgoaiData.negBars.reduce(
                              (max, bar) =>
                                bar.height > max.height ? bar : max,
                              processColumnChartNuocNgoaiData.negBars[0]
                            )
                            : null;

                        const bottomLineY = lowestBar
                          ? 60 + lowestBar.height
                          : 140;

                        return (
                          <SvgText
                            x={0}
                            y={bottomLineY + 15}
                            fontSize={10}
                            fill={colors.text}
                            fontWeight="400"
                          >
                            {processColumnChartNuocNgoaiData.bottomValue} tỷ
                          </SvgText>
                        );
                      })()}
                    </G>
                  </Svg>
                </View>

                {/* Date range */}
                <View style={styles.dateRange}>
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: theme.colors.text,
                      },
                    ]}
                  >
                    {processColumnChartNuocNgoaiData.dateRange.start}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: theme.colors.text,
                      },
                    ]}
                  >
                    {processColumnChartNuocNgoaiData.dateRange.end}
                  </Text>
                </View>
              </View>
            </View>

            {/* Column Chart Tu Doanh */}
            <View
              style={[
                styles.columnChartContainer,
                {
                  backgroundColor: colors.cardBackground,
                  marginBottom: 8,
                  marginTop: 8,
                },
              ]}
            >
              <Text
                style={[
                  styles.impactTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Giao dịch tự doanh
              </Text>
              {/* Chart Area */}
              <View style={styles.chartArea}>
                {/* Chart bars */}
                <View style={styles.barsContainer}>
                  <Svg
                    width="100%"
                    height={170}
                    viewBox="0 0 330 170"
                    preserveAspectRatio="none"
                  >
                    <G>
                      {/* Positive bars */}
                      {processColumnCharTuDoanhData.chartBars.map(
                        (bar, index) => (
                          <G key={index}>
                            <Rect
                              x={bar.x}
                              y={60 - bar.height}
                              width={12}
                              height={bar.height}
                              fill={bar.color}
                              rx={2}
                            />
                            {/* Invisible touch area for interaction */}
                            <Rect
                              x={bar.x - 2}
                              y={60 - bar.height - 5}
                              width={16}
                              height={bar.height + 10}
                              fill="transparent"
                              onPress={(event) =>
                                handleBarPress(
                                  event,
                                  bar.data,
                                  bar.x + 6,
                                  60 - bar.height - 10
                                )
                              }
                            />
                          </G>
                        )
                      )}

                      {/* Negative bars below baseline */}
                      {processColumnCharTuDoanhData.negBars.map(
                        (bar, index) => (
                          <G key={`neg-${index}`}>
                            <Rect
                              x={bar.x}
                              y={60}
                              width={12}
                              height={bar.height}
                              fill={bar.color}
                              rx={2}
                            />
                            {/* Invisible touch area for interaction */}
                            <Rect
                              x={bar.x - 2}
                              y={60 - 5}
                              width={16}
                              height={bar.height + 10}
                              fill="transparent"
                              onPress={(event) =>
                                handleBarPress(
                                  event,
                                  bar.data,
                                  bar.x + 6,
                                  60 + bar.height + 10
                                )
                              }
                            />
                          </G>
                        )
                      )}

                      {/* Horizontal dashed line at top (max value) - positioned at highest green bar */}
                      {(() => {
                        const highestBar =
                          processColumnCharTuDoanhData.chartBars.reduce(
                            (max, bar) => (bar.height > max.height ? bar : max),
                            processColumnCharTuDoanhData.chartBars[0] || {
                              height: 0,
                              x: 15,
                            }
                          );
                        const topLineY = 60 - highestBar.height;
                        return (
                          <Path
                            d={`M0,${topLineY} L330,${topLineY}`}
                            stroke={colors.secondaryText}
                            strokeWidth={0.8}
                            strokeDasharray="8,3"
                            opacity={0.6}
                          />
                        );
                      })()}

                      {/* Horizontal dashed line at bottom (min value) - always show */}
                      {(() => {
                        // If there are negative bars, position at the bottom of the lowest one
                        // Otherwise, use a position that's safely within the expanded viewBox (y=140)
                        const lowestBar =
                          processColumnCharTuDoanhData.negBars.length > 0
                            ? processColumnCharTuDoanhData.negBars.reduce(
                              (max, bar) =>
                                bar.height > max.height ? bar : max,
                              processColumnCharTuDoanhData.negBars[0]
                            )
                            : null;

                        const bottomLineY = lowestBar
                          ? 60 + lowestBar.height
                          : 140;

                        return (
                          <Path
                            d={`M0,${bottomLineY} L330,${bottomLineY}`}
                            stroke={colors.secondaryText}
                            strokeWidth={0.8}
                            strokeDasharray="8,3"
                            opacity={0.6}
                          />
                        );
                      })()}

                      {/* Top value label above the dashed line */}
                      {(() => {
                        const highestBar =
                          processColumnCharTuDoanhData.chartBars.reduce(
                            (max, bar) => (bar.height > max.height ? bar : max),
                            processColumnCharTuDoanhData.chartBars[0] || {
                              height: 0,
                              x: 15,
                            }
                          );
                        const topLineY = 60 - highestBar.height;
                        return (
                          <SvgText
                            x={0}
                            y={topLineY - 2}
                            fontSize={10}
                            fill={colors.text}
                            fontWeight="400"
                          >
                            {processColumnCharTuDoanhData.topValue} tỷ
                          </SvgText>
                        );
                      })()}

                      {/* Bottom value label below the dashed line - always show */}
                      {(() => {
                        // If there are negative bars, position at the bottom of the lowest one
                        // Otherwise, use a position that's safely within the expanded viewBox (y=155)
                        const lowestBar =
                          processColumnCharTuDoanhData.negBars.length > 0
                            ? processColumnCharTuDoanhData.negBars.reduce(
                              (max, bar) =>
                                bar.height > max.height ? bar : max,
                              processColumnCharTuDoanhData.negBars[0]
                            )
                            : null;

                        const bottomLineY = lowestBar
                          ? 60 + lowestBar.height
                          : 140;

                        return (
                          <SvgText
                            x={0}
                            y={bottomLineY + 15}
                            fontSize={10}
                            fill={colors.text}
                            fontWeight="400"
                          >
                            {processColumnCharTuDoanhData.bottomValue} tỷ
                          </SvgText>
                        );
                      })()}
                    </G>
                  </Svg>
                </View>

                {/* Date range */}
                <View style={styles.dateRange}>
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: theme.colors.text,
                      },
                    ]}
                  >
                    {processColumnCharTuDoanhData.dateRange.start}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: theme.colors.text,
                      },
                    ]}
                  >
                    {processColumnCharTuDoanhData.dateRange.end}
                  </Text>
                </View>
              </View>
            </View>
            {/* Posts List */}
            <View style={[{ backgroundColor: colors.cardBackground }]}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                </View>
              ) : error ? (
                <View style={styles.errorContainer}>
                  <Text
                    style={[styles.errorText, { color: theme.colors.text }]}
                  >
                    {error}
                  </Text>
                </View>
              ) : (
                <View>
                  {/* Real Topics from new API */}
                  {realTopics.length > 0
                    ? realTopics.map((topic) => (
                      <TopicItem
                        key={topic.topic_id}
                        topic={topic}
                        onPress={(topicId) =>
                          router.push(`/post-detail?postId=${topicId}`)
                        }
                        onCommentPress={(e, topicId) => {
                          e.stopPropagation();
                          router.push(
                            `/post-detail?postId=${topicId}&scrollToComments=true`
                          );
                        }}
                        onLikeUpdate={() => {
                          // Refresh topics after like
                          topicsApi
                            .getTopicsBySymbol(symbol || "", 1, 20, "newest")
                            .then((response) => {
                              if (response.data && response.data.topics) {
                                setRealTopics(response.data.topics);
                              }
                            });
                        }}
                      />
                    ))
                    : /* Fallback to old topics if no real topics */
                    topics.map((topic) => (
                      <TopicItem
                        key={topic.topic_id}
                        topic={topic}
                        onPress={(topicId) =>
                          router.push(`/post-detail?postId=${topicId}`)
                        }
                        onCommentPress={(e, topicId) => {
                          e.stopPropagation();
                          router.push(
                            `/post-detail?postId=${topicId}&scrollToComments=true`
                          );
                        }}
                        onLikeUpdate={() => {
                          // Refresh topics after like
                          topicsApi
                            .getTopicsBySymbol(symbol || "", 1, 20, "newest")
                            .then((response) => {
                              if (response.data && response.data.topics) {
                                setRealTopics(response.data.topics);
                              }
                            });
                        }}
                      />
                      // <PostItem
                      //   key={topic.topic_id}
                      //   post={topic}
                      //   stockData={stockData}
                      //   onStockPress={handleStockPress}
                      // />
                    ))}
                </View>
              )}
            </View>
          </>
        )}
        {activeTab === "Biểu đồ tài chính" && (
          <View style={{ height: 1700 }}>
            <WebView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              // ref={webviewRef}
              originWhitelist={["*"]}
              source={{
                uri: `https://app.dautubenvung.vn/bieu-do-tai-chinh/${symbol}`,
              }}
              style={{ flex: 1 }}
            // onMessage={ListenMessageWebview}
            />
          </View>
        )}
      </ScrollView>
      {/* Trading Detail Modal */}
      <Modal
        visible={showTradingModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTradingModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowTradingModal(false)}
        >
          <Pressable
            style={[
              styles.tradingModalContent,
              { backgroundColor: isDark ? "#1a1e2b" : "#ffffff" },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {tradingData && (
              <>
                {/* Trading Header */}
                <View style={styles.tradingModalHeader}>
                  <Text
                    style={[
                      styles.tradingModalTitle,
                      { color: isDark ? "#ffffff" : "#000000" },
                    ]}
                  >
                    Chi tiết giao dịch
                  </Text>
                  <Text
                    style={[
                      styles.tradingModalDate,
                      { color: isDark ? "#8e8e93" : "#666666" },
                    ]}
                  >
                    {tradingData.date}
                  </Text>
                </View>

                {/* Net Value Summary */}
                <View style={styles.netValueContainer}>
                  <Text
                    style={[
                      styles.netValueAmount,
                      {
                        color:
                          parseFloat(tradingData.netVal) >= 0
                            ? "#22C55E"
                            : "#EF4444",
                      },
                    ]}
                  >
                    {parseFloat(tradingData.netVal) >= 0 ? "+" : ""}
                    {parseFloat(tradingData.netVal).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    tỷ
                  </Text>
                  <Text
                    style={[
                      styles.netValueLabel,
                      { color: isDark ? "#8e8e93" : "#666666" },
                    ]}
                  >
                    Giá trị ròng
                  </Text>
                </View>

                {/* Trading Details Grid */}
                <View style={styles.tradingDetailsGrid}>
                  <View style={styles.tradingDetailRow}>
                    <Text
                      style={[
                        styles.tradingDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Ngày giao dịch
                    </Text>
                    <Text
                      style={[
                        styles.tradingDetailValue,
                        { color: isDark ? "#ffffff" : "#000000" },
                      ]}
                    >
                      {tradingData.date}
                    </Text>
                  </View>

                  <View style={styles.tradingDetailRow}>
                    <Text
                      style={[
                        styles.tradingDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Giá trị mua
                    </Text>
                    <Text
                      style={[styles.tradingDetailValue, { color: "#22C55E" }]}
                    >
                      +
                      {parseFloat(tradingData.buyVal).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      tỷ
                    </Text>
                  </View>

                  <View style={styles.tradingDetailRow}>
                    <Text
                      style={[
                        styles.tradingDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Giá trị bán
                    </Text>
                    <Text
                      style={[styles.tradingDetailValue, { color: "#EF4444" }]}
                    >
                      -
                      {parseFloat(tradingData.sellVal).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      tỷ
                    </Text>
                  </View>

                  <View style={styles.tradingDetailRow}>
                    <Text
                      style={[
                        styles.tradingDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Giá trị ròng
                    </Text>
                    <Text
                      style={[
                        styles.tradingDetailValue,
                        {
                          color:
                            parseFloat(tradingData.netVal) >= 0
                              ? "#22C55E"
                              : "#EF4444",
                        },
                      ]}
                    >
                      {parseFloat(tradingData.netVal) >= 0 ? "+" : ""}
                      {parseFloat(tradingData.netVal).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      tỷ
                    </Text>
                  </View>

                  {tradingData.netVol !== 0 && (
                    <View style={styles.tradingDetailRow}>
                      <Text
                        style={[
                          styles.tradingDetailLabel,
                          { color: isDark ? "#8e8e93" : "#666666" },
                        ]}
                      >
                        Khối lượng ròng
                      </Text>
                      <Text
                        style={[
                          styles.tradingDetailValue,
                          {
                            color:
                              parseFloat(tradingData.netVol) >= 0
                                ? "#22C55E"
                                : "#EF4444",
                          },
                        ]}
                      >
                        {tradingData.netVol.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </Text>
                    </View>
                  )}

                  <View style={styles.tradingDetailRow}>
                    <Text
                      style={[
                        styles.tradingDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Xu hướng
                    </Text>
                    <Text
                      style={[
                        styles.tradingDetailValue,
                        {
                          color:
                            parseFloat(tradingData.netVal) >= 0
                              ? "#22C55E"
                              : "#EF4444",
                        },
                      ]}
                    >
                      {parseFloat(tradingData.netVal) >= 0
                        ? "Mua ròng"
                        : "Bán ròng"}
                    </Text>
                  </View>
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  style={[
                    styles.closeModalButton,
                    { backgroundColor: "#99BAFF" },
                  ]}
                  onPress={() => setShowTradingModal(false)}
                >
                  <Text style={styles.closeModalText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Fullscreen Chart Modal */}
      <Modal
        visible={isFullScreen}
        animationType="slide"
        onRequestClose={() => setIsFullScreen(false)}
      >
        <SafeAreaView
          style={[
            styles.fullscreenContainer,
            { backgroundColor: colors.background },
          ]}
        >
          {/* Fullscreen Chart */}
          <View style={styles.fullscreenChartContainer}>
            <TouchableOpacity
              onPress={() => setIsFullScreen(false)}
              style={styles.minimizeButton}
            >
              <MaterialIcons name="fullscreen-exit" size={24} color="#99BAFF" />
            </TouchableOpacity>
            <WebView
              originWhitelist={["*"]}
              source={{
                uri: `https://app.dautubenvung.vn/chart/${symbol || "VNINDEX"}`,
              }}
              bounces={false} // iOS: tắt bounce
              scrollEnabled={false} // tắt scroll WebView
              overScrollMode="never" // Android: tắt glow overscroll
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentInsetAdjustmentBehavior="never" // iOS
              style={styles.webview}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// Styles for StockInfoCard component
const stockInfoStyles = StyleSheet.create({
  card: {
    // backgroundColor: Colors.charade,
    borderRadius: 6,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
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
    fontSize: 13,
    fontWeight: "400",
    width: "30%",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: "row",
  },
  backButton: {
    fontSize: 16,
  },
  settingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  unlockButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
    backgroundColor: "#004CEB",
    borderWidth: 1,
    borderColor: "#004CEB",
  },
  unlockButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  tabsContainer: {
    // borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    paddingVertical: 8
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  viewMore: {
    fontSize: 13,
  },
  chartHeader: {
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },
  chartText: {
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 0,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#30323a",
    borderTopWidth: 1,
    borderTopColor: "#30323a",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#30323a",
  },
  tableColumn: {
    flex: 1,
    paddingHorizontal: 4,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "600",
  },
  cellText: {
    fontSize: 14,
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: "400",
  },
  orderVolume: {
    fontSize: 12,
    marginTop: 2,
  },
  volumeBar: {
    height: 2,
    marginTop: 2,
  },
  chartBarContainer: {
    flexDirection: "row",
    width: "100%",
    height: 2,
    marginTop: 2,
  },
  summaryContainer: {
    marginTop: 12,
    padding: 0,
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  // Order Book Summary styles
  summaryColumn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  columnSeparator: {
    width: 1,
    marginVertical: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "400",
  },
  thinSeparator: {
    height: 0.5,
    marginVertical: 4,
  },
  foreignTradingContainer: {
    marginTop: 8,
  },
  foreignTradingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  foreignLabel: {
    fontSize: 14,
  },
  foreignValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  // Post styles
  postContainer: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#3b5998",
  },
  username: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  postTime: {
    color: "#8e8e93",
    fontSize: 12,
    marginTop: 2,
  },
  postContent: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  stockMention: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  stockNameInPost: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  stockChangeInPost: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  postActions: {
    flexDirection: "row",
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#333333",
  },
  actionButton: {
    marginRight: 30,
    padding: 5,
  },
  actionWithCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCount: {
    color: "#8e8e93",
    fontSize: 14,
    marginLeft: 5,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
  },
  // Column Chart Styles
  columnChartContainer: {
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  chartArea: {
    height: 160, // Reduced from 240 to bring chart closer to title
    position: "relative",
  },
  topValue: {
    position: "absolute",
    top: 15,
    left: 20,
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  referenceLine: {
    position: "absolute",
    top: 45,
    left: 100,
    right: 20,
    height: 20,
    justifyContent: "center",
  },
  dottedLine: {
    fontSize: 8,
    color: "#4B5563",
    letterSpacing: 0.5,
  },
  barsContainer: {
    position: "absolute",
    top: -30, // Reduced from 20 to move chart closer to title
    left: 5,
    right: 5,
    height: 170, // Increased from 160 to give more room at bottom
    justifyContent: "center",
    alignItems: "flex-start",
  },
  barsContainerTuDoanh: {
    position: "absolute",
    top: -30, // Reduced from 20 to move chart closer to title
    left: 5,
    right: 5,
    height: 230, // Increased from 160 to give more room at bottom
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bottomValue: {
    position: "absolute",
    bottom: 50,
    right: 20,
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  dateRange: {
    position: "absolute",
    bottom: 15,
    left: 5,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  impactTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 40,
  },
  // Stock Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  stockModalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  stockModalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  stockTitleContainer: {
    alignItems: "center",
  },
  stockModalTicker: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  stockModalSector: {
    fontSize: 16,
    fontWeight: "500",
  },
  stockPriceContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  stockModalPrice: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  stockModalChange: {
    fontSize: 16,
    fontWeight: "600",
  },
  stockDetailsGrid: {
    marginBottom: 24,
  },
  stockDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(128, 128, 128, 0.3)",
  },
  stockDetailLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  stockDetailValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  viewDetailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 16,
  },
  viewDetailText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#99BAFF",
    marginRight: 8,
  },
  viewDetailArrow: {
    fontSize: 18,
    color: "#99BAFF",
    fontWeight: "600",
  },
  closeModalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  tradingDetailsGrid: {
    marginBottom: 24,
  },
  tradingDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(128, 128, 128, 0.3)",
  },
  tradingDetailLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  tradingDetailValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  metricItem: {
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
    fontWeight: "500",
  },
  metricValue: {
    fontSize: 14,
    color: "#rgb(5, 177, 104)",
    fontWeight: "600",
  },
  // Trading Detail Modal Styles
  tradingModalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  tradingModalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  tradingModalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  tradingModalDate: {
    fontSize: 16,
    fontWeight: "500",
  },
  netValueContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  netValueAmount: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  netValueLabel: {
    fontSize: 14,
    fontWeight: "500",
  },

  // Profile Tab Styles
  profileSection: {
    backgroundColor: "#202127",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  profileSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  profileSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  profileViewMore: {
    fontSize: 12,
    fontWeight: "500",
  },
  companyDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  companyDetailLabel: {
    fontSize: 12,
    color: "#8E8E93",
  },
  companyDetailValue: {
    fontSize: 12,
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
  },
  financialOverviewContainer: {
    flexDirection: "row",
  },
  financialColumn: {
    flex: 1,
  },
  financialColumnLeft: {
    marginRight: 8,
  },
  financialColumnRight: {
    marginLeft: 8,
  },
  financialColumnTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  financialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  financialLabel: {
    fontSize: 12,
    color: "#8E8E93",
  },
  financialValue: {
    fontSize: 12,
  },
  // New styles for horizontal scrolling financial overview
  tabsContainer: {
    flexDirection: "row",
  },
  overview: {
    width: 332,
    minWidth: 200,
    marginRight: 16,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    backgroundColor: "#202127",
    borderRadius: 12,
  },
  overviewTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  overviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  detailLabel: {
    fontSize: 12,
    flex: 1,
    textAlign: "left",
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
    maxWidth: 80,
  },
  reportItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3340",
  },
  reportTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  reportDate: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
  },
  reportSummary: {
    fontSize: 11,
    color: "#8E8E93",
    marginTop: 4,
  },
  newsContainer: {
    flexDirection: "row",
  },
  newsCard: {
    marginRight: 12,
    width: 200,
    padding: 8,
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  newsDate: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 4,
  },
  newsSummary: {
    fontSize: 11,
    color: "#8E8E93",
    marginTop: 4,
  },
  downloadReportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3340",
  },
  downloadReportInfo: {
    flex: 1,
  },
  downloadReportTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  downloadReportMeta: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
  },
  downloadButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#99BAFF",
    borderRadius: 6,
  },
  downloadButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
  },
  shareholderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3340",
  },
  shareholderName: {
    fontSize: 12,
    flex: 1,
  },
  shareholderPercentage: {
    fontSize: 12,
    fontWeight: "500",
  },
  companyRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3340",
  },
  companyName: {
    fontSize: 12,
    fontWeight: "500",
  },
  companyOwnership: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
  },
  companyIndustry: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 1,
  },
  leadershipRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3340",
  },
  leadershipAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  leadershipAvatarText: {
    fontSize: 16,
    fontWeight: "600",
  },
  leadershipInfo: {
    flex: 1,
  },
  leadershipName: {
    fontSize: 12,
    fontWeight: "500",
  },
  leadershipPosition: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
  },
  leadershipExperience: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 1,
  },
  // Fullscreen button styles
  fullscreenButton: {
    position: "absolute",
    top: 586,
    right: 0,
    paddingVertical: 3,
    paddingHorizontal: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(153, 186, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#99BAFF",
    zIndex: 100,
  },
  fullscreenButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  // Fullscreen modal styles
  fullscreenContainer: {
    flex: 1,
  },
  fullscreenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  fullscreenTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  minimizeButton: {
    position: "absolute",
    bottom: 50,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "rgba(153, 186, 255, 0.2)",
    zIndex: 100,
  },
  minimizeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  fullscreenChartContainer: {
    width: "100%",
    height: Dimensions.get("window").height - 80,
  },
  fullscreenWebview: {
    flex: 1,
  },
});
