import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { postsApi } from "../../api/posts";
import { Topic } from "../../api/topics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "@/api/request";
import { formatThousands, formatToTy } from "@/utils/formatNumber";
import { newsApi, NewsItem } from "../../api/news";
import { CreateTopicModal } from "../../components/CreateTopicModal";
import { TopicItem } from "../../components/TopicItem";
import { ForumListItem } from "../../components/ForumListItem";
import { FilterBar } from "../../components/FilterBar";
import { topicsApi, Topic as TopicType } from "../../api/topics";
import { LIST_NHOM_NGANH } from "../home_tab/constants";

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



// Simple Pagination Component removed


// Define types for props
type StockCardProps = {
  name: string;
  change: string;
  isPositive: boolean;
};

// This component represents a stock ticker card
const StockCard = ({ name, change, isPositive }: StockCardProps) => {
  const { theme } = useTheme();
  const backgroundColor = isPositive
    ? theme.mode === "dark"
      ? theme.colors.stockCardPositive
      : "#ffebee"
    : theme.mode === "dark"
      ? theme.colors.stockCardNegative
      : "#e0f2f1";
  const textColor = isPositive
    ? theme.colors.stockTextPositive
    : theme.colors.stockTextNegative;
  const changeText = isPositive ? `+${change}%` : `${change}%`;

  return (
    <View style={[styles.stockCard, { backgroundColor }]}>
      <Text style={[styles.stockName, { color: theme.colors.text }]}>
        {name}
      </Text>
      <Text style={[styles.stockChange, { color: textColor }]}>
        {changeText}
      </Text>
    </View>
  );
};

// This component represents the hot topics section
const HotTopics = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Get news data (same as TinTucTab.tsx)
  const getNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getAllNews();
      if (response.data) {
        setNews(response.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // Filter news by type (same as TinTucTab.tsx)
  const chungKhoan = news.filter(
    (item) =>
      item.type === "Chứng khoán" &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const batDongSan = news.filter(
    (item) =>
      item.type === "Bất động sản" &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const taiChinh = news.filter(
    (item) =>
      item.type === "Tài chính" &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const nganHang = news.filter(
    (item) =>
      item.type === "Ngân hàng" &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const kinhTeVietNam = news.filter(
    (item) =>
      item.type === "Kinh tế việt nam" &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );

  // Get first article from each of the first 5 categories
  const topics = [
    chungKhoan[0],
    batDongSan[0],
    taiChinh[0],
    nganHang[0],
    kinhTeVietNam[0],
  ].filter(Boolean); // Remove undefined items

  // Navigate to home tab (Tin tức)
  const handleSeeMore = () => {
    router.push("/?tab=tin-tuc" as any);
  };

  return (
    <View
      style={[
        styles.hotTopicsContainer,
        { backgroundColor: theme.mode === "dark" ? "#1a1a1a" : "#f5f5f5" },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Chủ đề nóng gần đây
        </Text>
        <TouchableOpacity onPress={handleSeeMore}>
          <Text
            style={[styles.seeMoreText, { color: theme.colors.secondaryText }]}
          >
            Xem thêm ›
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      ) : (
        topics.map((topic, index) => (
          <TouchableOpacity
            key={topic.id || index}
            style={styles.topicItem}
            onPress={() =>
              router.push({
                pathname: "/news-detail",
                params: {
                  id: topic.id,
                  title: topic.title,
                  description: topic.description,
                  image: topic.image,
                  type: topic.type,
                  time: topic.time,
                },
              } as any)
            }
          >
            <Text style={styles.hashtagSymbol}>#</Text>
            <Text
              style={[styles.topicText, { color: theme.colors.text }]}
              numberOfLines={1}
            >
              {topic.title}
            </Text>
            <View style={styles.viewsContainer}>
              <Text
                style={[
                  styles.viewsText,
                  {
                    color: theme.colors.communityHotNews,
                  },
                ]}
              >
                {topic.type}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default function CommunityScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [stockData, setStockData] = useState<StockData[]>([]);
  // Vietnamese indices state
  const [vietnameseIndices, setVietnameseIndices] = useState<any[]>([]);
  // Calculate status bar height for proper SafeAreaView padding
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
  // Topic modal state
  const [createTopicModalVisible, setCreateTopicModalVisible] = useState(false);
  const [realTopics, setRealTopics] = useState<TopicType[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);

  // New state for refactoring
  const [sortLike, setSortLike] = useState<string>("newest");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [posts, setPosts] = useState<Topic[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const allPostsRef = React.useRef<Topic[]>([]);
  const scrollViewRef = React.useRef<FlatList>(null);

  // Fetch stock data similar to CoPhieuTab
  const fetchStockData = async () => {
    try {
      // Define the list of stock symbols to use
      const stockSymbols = [
        "ACB",
        "AGR",
        "ANV",
        "APG",
        "AST",
        "BCC",
        "BCM",
        "BID",
        "BMP",
        "BSI",
        "BSR",
        "BVS",
        "CEO",
        "CII",
        "CMX",
        "CTD",
        "CTG",
        "CTS",
        "DBC",
        "DGW",
        "DIG",
        "DPG",
        "DXG",
        "DXS",
        "EIB",
        "FMC",
        "FRT",
        "FTS",
        "GAS",
        "GMD",
        "GVR",
        "HAH",
        "HAX",
        "HBC",
        "HCM",
        "HDB",
        "HDC",
        "HDG",
        "HPG",
        "HPX",
        "HQC",
        "HSG",
        "HT1",
        "HUT",
        "HVN",
        "IDC",
        "IDI",
        "IJC",
        "ITA",
        "KBC",
        "KDC",
        "KDH",
        "KHG",
        "KSB",
        "L14",
        "LCG",
        "LDG",
        "LPB",
        "MBB",
        "MBS",
        "MPC",
        "MSB",
        "MSN",
        "MWG",
        "NKG",
        "NLG",
        "NTC",
        "NTL",
        "NVL",
        "OCB",
        "OIL",
        "ORS",
        "PAN",
        "PC1",
        "PDR",
        "PET",
        "PHR",
        "PLX",
        "PNJ",
        "PTB",
        "PVC",
        "PVD",
        "PVS",
        "PVT",
        "QNS",
        "SAB",
        "SBS",
        "SBT",
        "SCR",
        "SCS",
        "SHB",
        "SHS",
        "SIP",
        "SKG",
        "SMC",
        "SSB",
        "SSI",
        "STB",
        "SZC",
        "TCB",
        "TCH",
        "TCM",
        "TNG",
        "TPB",
        "VCB",
        "VCG",
        "VCI",
        "VCS",
        "VGC",
        "VGT",
        "VHC",
        "VHM",
        "VIB",
        "VIC",
        "VIP",
        "VIX",
        "VJC",
        "VND",
        "VNM",
        "VOS",
        "VPB",
        "VPI",
        "VRE",
        "VSC",
        "VTP",
      ];

      // Create a minimal stockData array with just the symbols
      // Since we only need the symbols to match in post descriptions, we don't need the full API data
      const minimalStockData = stockSymbols.map((symbol) => ({
        c: symbol,
      }));

      setStockData(minimalStockData as StockData[]);
    } catch (error) {
      console.error("Error creating stock data:", error);
    }
  };

  // API call function for Vietnamese indices data
  const getVietnameseIndices = useCallback(async () => {
    try {
      const response = await axiosClient.get("/indexes-overview");

      const indexData = response?.data?.data;

      if (indexData && Array.isArray(indexData)) {
        // Filter to get the main Vietnamese indices
        const filteredIndices = indexData;
        // .filter((index: any) =>
        //   ['VNIndex', 'HNXIndex', 'VN30'].includes(index.c)
        // );

        // Sort indices in the desired order: VNIndex, HNXIndex, VN30
        const sortedIndices = filteredIndices.sort((a: any, b: any) => {
          const order = [
            "VNIndex",
            "HNXIndex",
            "VN30",
            "HNX30",
            "HNXUpcomIndex",
          ];
          return order.indexOf(a.c) - order.indexOf(b.c);
        });

        setVietnameseIndices(sortedIndices);
      }
    } catch (error) {
      console.error("Error fetching Vietnamese indices data:", error);
    }
  }, []);

  useEffect(() => {
    getVietnameseIndices();
  }, []);

  // Function to find stock symbols in text
  const findStockSymbolsInText = (text: string): StockData[] => {
    if (!stockData || stockData.length === 0 || !text) return [];

    const foundStocks: StockData[] = [];
    const textUpper = text.toUpperCase();

    stockData.forEach((stock) => {
      // Check if stock symbol appears in the text
      if (textUpper.includes(stock.c.toUpperCase())) {
        // Avoid duplicates
        if (!foundStocks.find((s) => s.c === stock.c)) {
          foundStocks.push(stock);
        }
      }
    });

    return foundStocks;
  };

  // Handle navigation to stock detail
  const handleStockPress = (stock: StockData) => {
    router.push({
      pathname: "/stock-detail",
      params: {
        symbol: stock.c,
        companyName: stock?.sn,
        exchange: stock?.e,
        currentPrice: stock?.p?.toString(),
        changePercent: stock?.dcp?.toString(),
        high: stock?.hp?.toString(),
        average: stock?.ap?.toString(),
        low: stock?.lp?.toString(),
        ceiling: stock?.ce?.toString(),
        reference: stock?.rp?.toString(),
        floor: stock?.f?.toString(),
      },
    });
  };

  const handleCreatePost = () => {
    // Check if user is authenticated before allowing post creation
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    setCreateTopicModalVisible(true);
  };

  // Fetch real topics from API
  const fetchRealTopics = async () => {
    try {
      setTopicsLoading(true);
      // Fetch topics from all symbols or a specific symbol
      const response = await topicsApi.getTopicsBySymbol(
        "ACB",
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
      setTopicsLoading(false);
    }
  };

  // Handle topic creation success
  const handleTopicCreated = () => {
    fetchRealTopics(); // Refresh topics list
  };

  // Handle topic press - navigate to topic detail
  const handleTopicPress = (topicId: number) => {
    console.log("Topic pressed:", topicId);

    router.push(`/post-detail?postId=${topicId}`);
  };

  // Handle comment press on topic
  const handleTopicCommentPress = (e: any, topicId: number) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    router.push(`/post-detail?postId=${topicId}&scrollToComments=true`);
  };



  // Handle sort change
  useEffect(() => {
    setPosts([]);
    setPage(1);
    allPostsRef.current = [];
    listPosts(sortLike, 1);
  }, [sortLike]);

  // Helper to get the symbol from a topic
  const getSymbol = (topic: Topic) => {
    if (topic.symbol_name) return topic.symbol_name;
    // Try to find first 3-letter uppercase word in description
    const match = topic.description?.match(/\b[A-Z]{3}\b/);
    return match ? match[0] : "";
  };

  const listPosts = async (currentSort: string, pageNum: number) => {
    // if (posts.length === 0) setLoading(true); // Removed to prevent loading on tab switch
    try {
      if (allPostsRef.current.length === 0) {
        const res = await postsApi.getAllTopics({
          page: 1,
          pageSize: 100, // Fetch more to simulate "all" for local slicing if needed, or rely on API pagination
          sortLike: currentSort as "newest" | "more-interaction",
        });

        if (res && res.data && res.data.topics) {
          // Map image to expected format if needed
          const mappedTopics = res.data.topics.map((t: any) => ({
            ...t,
            image: Array.isArray(t.image) && typeof t.image[0] === 'string'
              ? t.image.map((url: string) => ({ url }))
              : t.image
          }));

          allPostsRef.current = mappedTopics;
        } else {
          allPostsRef.current = [];
        }
      }

      // Apply Filters
      let filtered = allPostsRef.current;

      if (selectedSymbol) {
        filtered = filtered.filter(t => getSymbol(t) === selectedSymbol);
      }

      if (selectedIndustry) {
        // Find list of codes for this industry
        let industryCodes: string[] = [];
        Object.values(LIST_NHOM_NGANH).forEach((industry: any) => {
          if (industry.industryName === selectedIndustry) {
            industryCodes = industry.listCode;
          }
        });

        if (industryCodes.length > 0) {
          filtered = filtered.filter(t => industryCodes.includes(getSymbol(t)));
        }
      }

      setTotal(filtered.length);

      // Slice locally for infinite scroll (show up to current page * pageSize)
      const pageSize = 20;
      const end = pageNum * pageSize;
      const slicedPosts = filtered.slice(0, end);

      setPosts(slicedPosts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    listPosts(sortLike, newPage);
  };

  // Effect for Sort and Refresh: Clear cache and fetch new data
  useEffect(() => {
    allPostsRef.current = [];
    setPage(1);
    listPosts(sortLike, 1);
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [sortLike, refreshFlag]);

  // Effect for Filters: Reset page and re-apply filters (using existing cache)
  useEffect(() => {
    setPage(1);
    listPosts(sortLike, 1);
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [selectedIndustry, selectedSymbol]);

  // Initial Stock Data Fetch
  useEffect(() => {
    fetchStockData();
  }, []);

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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />

      {loading && posts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          ref={scrollViewRef}
          data={posts}
          keyExtractor={(item, index) => item.topic_id?.toString() || index.toString()}
          renderItem={({ item, index }) => (
            <ForumListItem
              topic={item}
              onPress={handleTopicPress}
              index={index}
            />
          )}
          contentContainerStyle={[

          ]}
          onEndReached={() => {
            if (posts.length < total) {
              handlePageChange(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <View style={{ flex: 1 }}>
              {/* Stock Cards Row */}
              <ScrollView
                style={styles.globalIndicesContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {vietnameseIndices.map((index, indexKey) => {
                  const isPositive = (index.dc || 0) >= 0;
                  const strokeColor = isPositive ? "#05B168" : "#E86066";

                  // Format volume (dve) to billions
                  const formatVolume = (volume: number) => {
                    const inBillion = volume / 1000000000000;
                    return `${inBillion.toFixed(1)} K tỷ`;
                  };

                  // Format price
                  const formatPrice = (price: number) => {
                    return price.toFixed(2);
                  };

                  // Format change
                  const formatChange = (change: number) => {
                    const sign = change >= 0 ? "+" : "";
                    return `${sign}${change.toFixed(2)}`;
                  };

                  // Format change percent
                  const formatChangePercent = (changePercent: number) => {
                    const sign = changePercent >= 0 ? "+" : "";
                    return `${sign}${changePercent.toFixed(2)}%`;
                  };

                  // Define gradient colors and border colors based on index position
                  const getGradientAndBorderColors = (indexPosition: number) => {
                    const remainder = indexPosition % 3;

                    if (remainder === 0) {
                      return {
                        gradientColors: ["#112C26", "#121317"] as [string, string],
                        borderColor: "#112B25",
                      };
                    } else if (remainder === 1) {
                      return {
                        gradientColors: ["#33142C", "#121317"] as [string, string],
                        borderColor: "#33142C",
                      };
                    } else {
                      return {
                        gradientColors: ["#332414", "#121317"] as [string, string],
                        borderColor: "#332414",
                      };
                    }
                  };

                  const colorConfig = getGradientAndBorderColors(indexKey);

                  return (
                    <LinearGradient
                      key={indexKey}
                      colors={
                        theme?.mode === "dark"
                          ? colorConfig.gradientColors
                          : ["#F4F5F6", "#F4F5F6"]
                      }
                      style={[
                        styles.indexCard,
                        {
                          borderColor:
                            theme?.mode === "dark"
                              ? colorConfig.borderColor
                              : "#F4F5F6",
                        },
                      ]}
                      start={{ x: 0.089, y: 0 }}
                      end={{ x: 0.531, y: 1 }}
                    >
                      <Text
                        style={[styles.indexTitle, { color: theme.colors.text }]}
                      >
                        {index.c}
                      </Text>
                      <Text style={styles.indexValue}>
                        {formatThousands(index.p)}
                      </Text>
                      <View style={styles.indexChangeContainer}>
                        <Text style={[styles.indexChange, { color: strokeColor }]}>
                          {formatChange(index.dc)}
                        </Text>
                        <Text
                          style={[
                            styles.indexChangePercent,
                            { color: strokeColor },
                          ]}
                        >
                          {formatChangePercent(index.dcp)}
                        </Text>
                      </View>
                      <Text style={styles.indexVolume}>
                        GT: {formatToTy(index.dve)}
                      </Text>
                    </LinearGradient>
                  );
                })}

                {/* Fallback to static data if no API data */}
                {vietnameseIndices.length === 0 && (
                  <>
                    <LinearGradient
                      colors={["#4A4A4C", "#2A2A2C"]}
                      style={styles.indexCard}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={styles.indexTitle}>VNIndex</Text>
                      <Text style={styles.indexValue}>1660.00</Text>
                      <View style={styles.indexChangeContainer}>
                        <Text style={styles.indexChange}>-6.09</Text>
                        <Text style={styles.indexChangePercent}>-0.37%</Text>
                      </View>
                    </LinearGradient>

                    <LinearGradient
                      colors={["#4A4A4C", "#2A2A2C"]}
                      style={styles.indexCard}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={styles.indexTitle}>HNXIndex</Text>
                      <Text style={styles.indexValue}>276.27</Text>
                      <View style={styles.indexChangeContainer}>
                        <Text style={styles.indexChange}>-1.38</Text>
                        <Text style={styles.indexChangePercent}>-0.50%</Text>
                      </View>
                    </LinearGradient>

                    <LinearGradient
                      colors={["#4A4A4C", "#2A2A2C"]}
                      style={styles.indexCard}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={styles.indexTitle}>VN30</Text>
                      <Text style={styles.indexValue}>1850.80</Text>
                      <View style={styles.indexChangeContainer}>
                        <Text style={styles.indexChange}>-7.87</Text>
                        <Text style={styles.indexChangePercent}>-0.42%</Text>
                      </View>
                    </LinearGradient>
                  </>
                )}
              </ScrollView>

              <FilterBar
                currentSort={sortLike}
                onSortChange={setSortLike}
                selectedIndustry={selectedIndustry}
                onIndustryChange={setSelectedIndustry}
                selectedSymbol={selectedSymbol}
                onSymbolChange={setSelectedSymbol}
              />
            </View>
          }
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreatePost}
      >
        <MaterialIcons name="edit" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Create Topic Modal */}
      <CreateTopicModal
        visible={createTopicModalVisible}
        onClose={() => setCreateTopicModalVisible(false)}
        onSuccess={handleTopicCreated}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#121212",
  },
  navTabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333333",
    backgroundColor: "#0c0c0c",
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
  },
  activeTabItem: {
    backgroundColor: "transparent",
  },
  tabText: {
    color: "#8e8e93",
    fontSize: 16,
    fontWeight: "400",
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  searchIcon: {
    marginLeft: "auto",
    marginRight: 15,
  },
  messageIcon: {
    marginRight: 15,
  },
  accountIcon: {
    marginRight: 15,
  },
  themeIcon: {
    marginRight: 5,
  },
  stockCardsRow: {
    paddingLeft: 10,
    paddingVertical: 15,
    backgroundColor: "#121212",
  },
  stockCard: {
    width: 120,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
  },
  stockName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  stockChange: {
    fontSize: 14,
    fontWeight: "600",
  },
  seeMoreCard: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  seeMoreCardText: {
    color: "#8e8e93",
    fontSize: 12,
  },
  hotTopicsContainer: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  seeMoreText: {
    color: "#8e8e93",
    fontSize: 14,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  hashtagSymbol: {
    color: "#4785f5",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
  topicText: {
    color: "#ffffff",
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  viewsContainer: {
    backgroundColor: "#333333",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewsText: {
    color: "#8e8e93",
    fontSize: 12,
  },
  postContainer: {
    padding: 15,
    backgroundColor: "#121212",
    marginBottom: 10,
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
  followButton: {
    backgroundColor: "#4785f5",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  followButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
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
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4785f5",
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    bottom: 40,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  stockTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 8,
  },
  stockTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#1f1f1f",
  },
  stockTagSymbol: {
    fontSize: 13,
    fontWeight: "600",
    marginRight: 6,
  },
  stockTagChange: {
    fontSize: 12,
    fontWeight: "500",
  },
  chartContainer: {
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  chartTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  chartPrice: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  chartChange: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  chart: {
    height: 180,
    marginBottom: 5,
  },
  candleChart: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  candleStick: {
    width: 20,
    height: "100%",
    justifyContent: "center",
  },
  redCandle: {
    backgroundColor: "#E53935",
    height: "40%",
    width: "60%",
    marginLeft: "20%",
  },
  greenCandle: {
    backgroundColor: "#009688",
    height: "30%",
    width: "60%",
    marginLeft: "20%",
  },
  relatedStocksContainer: {
    marginBottom: 15,
  },
  relatedStocksRow: {
    flexDirection: "row",
  },
  relatedStockCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    width: 120,
  },
  relatedStockName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  relatedStockPrice: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },
  relatedStockChange: {
    fontSize: 13,
    fontWeight: "600",
  },
  positiveChange: {
    color: "#E53935",
  },
  negativeChange: {
    color: "#009688",
  },
  commentsSection: {
    borderTopWidth: 5,
    borderTopColor: "#1f1f1f",
    paddingTop: 15,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  commentUserInfo: {
    marginRight: 10,
  },
  commentUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3b5998",
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },
  commentText: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  commentMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentTime: {
    color: "#8e8e93",
    fontSize: 12,
    marginRight: 15,
  },
  commentActions: {
    flexDirection: "row",
  },
  commentAction: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  commentActionCount: {
    color: "#8e8e93",
    fontSize: 12,
    marginLeft: 3,
  },
  commentInputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#333333",
    backgroundColor: "#000000",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: "#ffffff",
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  // Global Market Indices Styles
  globalIndicesContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    // Removed justifyContent to allow horizontal scrolling
  },
  indexCard: {
    minWidth: 114.33, // Fixed minimum width for proper scrolling
    width: 114.33, // Fixed width instead of percentage
    // marginHorizontal: 4, // Increased margin for better spacing
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 12,
    height: 109, // Match design height
    borderWidth: 1,
    marginRight: 8,
    // borderColor will be set dynamically
    // backgroundColor removed since we're using LinearGradient
  },
  indexTitle: {
    fontSize: 14,
    fontWeight: "500", // Medium weight
    marginBottom: 8,
    lineHeight: 20,
  },
  indexValue: {
    fontSize: 18,
    fontWeight: "600", // SemiBold
    marginBottom: 8,
    color: "#D6665C", // White color for values
    lineHeight: 18, // 100% line height
  },
  indexChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  indexChange: {
    fontSize: 12,
    fontWeight: "400",
    marginRight: 4,
    lineHeight: 16,
    // Color will be set dynamically based on positive/negative
  },
  indexChangePercent: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    // Color will be set dynamically based on positive/negative
  },
  indexVolume: {
    fontSize: 11,
    fontWeight: "400",
    color: "#ABADBA", // Light gray for volume
    lineHeight: 16,
  },
});
