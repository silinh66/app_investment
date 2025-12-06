// BangGiaTab.tsx
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import axiosClient from "@/api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import PlusIcon from "@/components/icons/PlusIcon";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

// Type definition for stock data
type StockData = {
  c: string; // stock symbol
  sn?: string; // stock name
  p?: number; // price
  dc: number; // change (value)
  dcp: number; // change percent
  dve: number | string;
  e: string;
  hp?: number;
  ap?: number;
  lp?: number;
  ce?: number; // ceiling price
  rp?: number; // reference price
  f?: number; // floor price
  mkc?: any;
  [key: string]: any;
};

type SortDirection = "asc" | "desc" | null;
type SortField = "symbol" | "volume" | "price" | "dcp" | null;

// Custom hook for fetching stock data
const useStockData = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [allStockData, setAllStockData] = useState<StockData[]>([]); // All stocks from all exchanges
  const [loading, setLoading] = useState(true);
  const [curSan, setCurSan] = useState("HOSE");
  const [flashingItems, setFlashingItems] = useState<Set<string>>(new Set());
  const previousDataRef = useRef<Map<string, StockData>>(new Map());
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Only show loading on initial fetch
        if (isFirstLoadRef.current) {
          setLoading(true);
        }

        const response = await axiosClient.get(`/stock-overview`);
        if (response.status === 200) {
          // Keep ALL stocks from ALL exchanges for favorites matching
          const allData = response.data?.data.filter(
            (item: any) => item.c && item.c.length === 3
          );
          setAllStockData(allData);

          // Filter by current exchange for display in increase/decrease tabs
          let dataFilterSan = allData.filter((item: any) => item.e === curSan);

          // Detect changed items (only after first load)
          if (!isFirstLoadRef.current) {
            const changedSymbols = new Set<string>();
            dataFilterSan.forEach((newItem: StockData) => {
              const oldItem = previousDataRef.current.get(newItem.c);
              if (
                oldItem &&
                (oldItem.p !== newItem.p || oldItem.dcp !== newItem.dcp)
              ) {
                changedSymbols.add(newItem.c);
              }
            });

            // Flash changed items
            if (changedSymbols.size > 0) {
              setFlashingItems(changedSymbols);
              setTimeout(() => {
                setFlashingItems(new Set());
              }, 100);
            }
          }

          // Store stocks from current exchange
          setStockData(dataFilterSan);

          // Update previous data reference
          const newMap = new Map<string, StockData>();
          dataFilterSan.forEach((item: StockData) => {
            newMap.set(item.c, { ...item });
          });
          previousDataRef.current = newMap;

          // Mark first load as complete
          if (isFirstLoadRef.current) {
            isFirstLoadRef.current = false;
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        if (isFirstLoadRef.current) {
          setLoading(false);
          isFirstLoadRef.current = false;
        }
      }
    };

    fetchStockData();

    const interval = setInterval(() => {
      fetchStockData();
    }, 5000);

    return () => clearInterval(interval);
  }, [curSan]);

  return { stockData, allStockData, loading, curSan, setCurSan, flashingItems };
};

export default function BangGiaTab() {
  const { theme } = useTheme();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const { stockData, allStockData, loading, curSan, setCurSan, flashingItems } =
    useStockData();

  const [activeTab, setActiveTab] = useState("topIncrease");
  const [refreshing, setRefreshing] = useState(false);
  const [timeFrameModalVisible, setTimeFrameModalVisible] = useState(false);
  const [curSanModalVisible, setCurSanModalVisible] = useState(false);

  const [selectedTimeFrame, setSelectedTimeFrame] = useState("dcp");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Favorites state (UI) + refs for fast ops and batch
  const [favorites, setFavorites] = useState<StockData[]>([]);
  const [topIncrease, setTopIncrease] = useState<StockData[]>([]);
  const [topDecrease, setTopDecrease] = useState<StockData[]>([]);
  const favoritesRef = useRef<Map<string, StockData>>(new Map()); // current favorites by symbol
  const favoriteOrderRef = useRef<string[]>([]); // maintain order of favorite symbols
  const pendingBatchRef = useRef<{ add: Set<string>; remove: Set<string> }>({
    add: new Set(),
    remove: new Set(),
  });
  const batchTimerRef = useRef<any>(null);
  const hasPendingChangesRef = useRef(false); // Track if we have pending changes
  const lastFocusStateRef = useRef(true); // Track previous focus state to detect actual focus changes
  const isFocused = useIsFocused(); // Current focus state

  const isDark = theme.mode === "dark";

  // Time frame options
  const timeFrameOptions = [
    { label: "1 ngày", value: "dcp" },
    { label: "7 ngày", value: "d7cp" },
    { label: "1 tháng", value: "m1cp" },
    { label: "1 năm", value: "y1cp" },
  ];

  const curSanOptions = [
    { label: "HOSE", value: "HOSE" },
    { label: "HNX", value: "HNX" },
    { label: "UPCOM", value: "UPCOM" },
  ];

  const getTimeFrameLabel = () => {
    const option = timeFrameOptions.find(
      (opt) => opt.value === selectedTimeFrame
    );
    return option ? option.label : "1 ngày";
  };

  // Handle sort click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort indicator
  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return "";
    if (sortDirection === "asc") return " ▲";
    if (sortDirection === "desc") return " ▼";
    return "";
  };

  // Colors matching the design
  const colors = {
    darkBg: "#0A0E13",
    darkCard: "#131820",
    lightBg: "#FFFFFF",
    lightCard: "#FFFFFF",
    textPrimary: "#FFFFFF",
    textSecondary: "#8B92A0",
    textLight: "#0A0E13",
    textLightSecondary: "#6B7280",
    green: "#05B168", // Above reference (green)
    pink: "#EC4899",
    red: "#E86066", // Below reference (red)
    magenta: "#E11D48",
    yellow: "#F5C512", // Reference (yellow)
    purple: "#9D5FBB", // Ceiling (purple)
    cyan: "#4097F5", // Floor (cyan/blue)
    blue: "#3B82F6",
    border: "#1F2937",
    borderLight: "#E5E7EB",
  };

  // Get price color based on ceiling, floor, and reference
  const getPriceColor = (
    currentPrice: number | undefined,
    reference: number | undefined,
    ceiling: number | undefined,
    floor: number | undefined,
    changePercent: number
  ) => {
    if (currentPrice == null || reference == null) {
      return isDark ? colors.textPrimary : colors.textLight;
    }

    if (
      ceiling != null &&
      currentPrice === ceiling &&
      selectedTimeFrame === "dcp"
    ) {
      return theme.colors.purple;
    }

    if (
      floor != null &&
      currentPrice === floor &&
      selectedTimeFrame === "dcp"
    ) {
      return theme.colors.cyan;
    }

    if (currentPrice === reference && selectedTimeFrame === "dcp") {
      return theme.colors.yellow;
    }

    if (currentPrice > reference && selectedTimeFrame === "dcp") {
      return theme.colors.green;
    }
    if (currentPrice < reference && selectedTimeFrame === "dcp") {
      return theme.colors.red;
    }
    if (changePercent >= 0 && selectedTimeFrame !== "dcp") {
      return theme.colors.green;
    }
    if (changePercent < 0 && selectedTimeFrame !== "dcp") {
      return theme.colors.red;
    }

    return isDark ? colors.textPrimary : colors.textLight;
  };

  const getPillColor = (changePercent: number) => {
    if (changePercent >= 0) {
      return theme.colors.green;
    }
    return theme.colors.red;
  };

  // Pre-compute data for all tabs (memoized) so switching is instant
  const topIncreaseData = useMemo(() => {
    // Filter by top market cap FIRST for increase/decrease tabs
    let sortByMkc = [...stockData].sort(
      (a: any, b: any) => Number(b.mkc || 0) - Number(a.mkc || 0)
    );
    let topNumber = curSan === "HOSE" ? 300 : curSan === "HNX" ? 100 : 50;
    let topMarketCap = sortByMkc.slice(0, topNumber);

    // Then filter by positive change
    let data = topMarketCap.filter(
      (item) => item[selectedTimeFrame] != null && item[selectedTimeFrame] > 0
    );
    return data
      .sort((a, b) => (b[selectedTimeFrame] || 0) - (a[selectedTimeFrame] || 0))
      .slice(0, 30);
  }, [stockData, selectedTimeFrame, curSan]);

  const topDecreaseData = useMemo(() => {
    // Filter by top market cap FIRST for increase/decrease tabs
    let sortByMkc = [...stockData].sort(
      (a: any, b: any) => Number(b.mkc || 0) - Number(a.mkc || 0)
    );
    let topNumber = curSan === "HOSE" ? 300 : curSan === "HNX" ? 100 : 50;
    let topMarketCap = sortByMkc.slice(0, topNumber);

    // Then filter by negative change
    let data = topMarketCap.filter(
      (item) => item[selectedTimeFrame] != null && item[selectedTimeFrame] < 0
    );
    return data
      .sort((a, b) => (a[selectedTimeFrame] || 0) - (b[selectedTimeFrame] || 0))
      .slice(0, 30);
  }, [stockData, selectedTimeFrame, curSan]);

  const favoriteData = useMemo(() => favorites, [favorites]);

  // Get current tab data instantly (no filtering needed, already pre-computed)
  const topStocks = useMemo(() => {
    if (activeTab === "topIncrease") return topIncreaseData;
    if (activeTab === "topDecrease") return topDecreaseData;
    if (activeTab === "favorite") return favoriteData;
    return [];
  }, [activeTab, topIncreaseData, topDecreaseData, favoriteData]);

  const handleSymbolPress = (item: StockData) => {
    router.push({
      pathname: "/stock-detail",
      params: {
        symbol: item.c,
        companyName: item?.sn,
        exchange: item?.e,
        currentPrice: item?.p,
        changePercent: item?.dcp,
        high: item?.hp,
        average: item?.ap,
        low: item?.lp,
        ceiling: item?.ce,
        reference: item?.rp,
        floor: item?.f,
      },
    });
  };

  const handleTabPress = useCallback((tab: string) => {
    setActiveTab(tab);
    setSortField(null);
    setSortDirection(null);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  };

  // favoritesSet for quick checks
  const favoritesSet = useMemo(
    () => new Set(favorites?.map((f) => f.c)),
    [favorites]
  );

  const formatPrice = (price: number | undefined) => {
    if (price == null) return "0.00";
    return (price / 1000).toFixed(2);
  };

  const formatVolume = (volume: number | undefined | string) => {
    if (volume == null) return "0.0";
    const v = typeof volume === "string" ? Number(volume) : volume;
    if (!v) return "0.0";
    return (v / 1000000000).toFixed(1);
  };

  // ------------- FAV LIST: load function & mount/focus handlers -------------
  const loadFavorites = useCallback(
    async (stockDataToMatch: StockData[]) => {
      if (!isAuthenticated) return;

      try {
        const res = await axiosClient.get("/user/favorites");
        if (res?.data?.success) {
          // Get favorite symbols from API
          const favoriteSymbols = res.data.data.map((r: any) => r.symbol);

          console.log(
            "[BangGiaTab] Loaded favorites from API:",
            favoriteSymbols
          );

          // Always update order from API (this is the source of truth)
          favoriteOrderRef.current = favoriteSymbols;

          // Match with fresh data from ALL stocks (not just current exchange)
          const favs: StockData[] = [];
          const map = new Map<string, StockData>();
          const notFound: string[] = [];

          for (const symbol of favoriteSymbols) {
            const freshData = stockDataToMatch.find(
              (item) => item.c === symbol
            );
            if (freshData) {
              favs.push(freshData);
              map.set(freshData.c, freshData);
            } else {
              notFound.push(symbol);
            }
          }

          if (notFound.length > 0) {
            console.log(
              "[BangGiaTab] Symbols not found in allStockData:",
              notFound
            );
          }

          console.log(
            "[BangGiaTab] Matched favorites:",
            favs.map((f) => f.c)
          );

          setFavorites(favs);
          favoritesRef.current = map;

          // Clear any pending batch operations after reload
          pendingBatchRef.current = { add: new Set(), remove: new Set() };
        }
      } catch (err: any) {
        console.error("Load favorites error", err);
        // If unauthorized, clear favorites
        if (err?.response?.status === 401) {
          setFavorites([]);
          favoritesRef.current = new Map();
        }
      }
    },
    [isAuthenticated, logout, router]
  );

  const allStockDataRef = useRef<StockData[]>([]);

  useEffect(() => {
    allStockDataRef.current = allStockData;
  }, [allStockData]);

  useEffect(() => {
    // Only load favorites ONCE when allStockData is first populated
    if (
      allStockData.length > 0 &&
      favorites.length === 0 &&
      !hasPendingChangesRef.current
    ) {
      console.log("[BangGiaTab] Initial load of favorites");
      loadFavorites(allStockData);
    }
  }, [allStockData]);

  // Track focus changes and only reload when actually returning to screen
  useEffect(() => {
    const wasFocused = lastFocusStateRef.current;
    const nowFocused = isFocused;

    // Only reload when focus changes from false to true (returning to screen)
    if (
      !wasFocused &&
      nowFocused &&
      !hasPendingChangesRef.current &&
      allStockDataRef.current.length > 0
    ) {
      console.log("[BangGiaTab] Screen gained focus - reloading favorites");
      loadFavorites(allStockDataRef.current);
    } else if (!wasFocused && nowFocused && hasPendingChangesRef.current) {
      console.log(
        "[BangGiaTab] Screen gained focus - skipping reload (pending changes)"
      );
    }

    // Update last focus state
    lastFocusStateRef.current = nowFocused;
  }, [isFocused, loadFavorites]); // cleanup on unmount
  useEffect(() => {
    return () => {
      if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
      batchTimerRef.current = null;
    };
  }, []);

  // schedule batch flush (debounced)
  const scheduleFlushBatch = useCallback(
    (delay = 800) => {
      hasPendingChangesRef.current = true; // Mark that we have pending changes
      if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
      batchTimerRef.current = setTimeout(async () => {
        const batch = pendingBatchRef.current;
        const upsertList: any[] = [];
        const removeList: string[] = [];

        for (const sym of batch.add) {
          const item = favoritesRef.current.get(sym);
          if (item) {
            upsertList.push({
              symbol: item.c,
              exchange: item.e,
              snapshot: {
                p: item.p,
                dcp: item.dcp,
                dc: item.dc,
                rp: item.rp,
                ce: item.ce,
                f: item.f,
                sn: item.sn,
                mkc: item.mkc,
              },
            });
          }
        }
        for (const sym of batch.remove) removeList.push(sym);

        // Sync upserts first (batch)
        try {
          if (upsertList.length) {
            await axiosClient.put("/user/favorites/batch", {
              list: upsertList,
            });
          }
        } catch (err) {
          console.error("Batch upsert error", err);
          if ((err as any)?.response?.status === 401) {
            try {
              console.log("Unauthorized - redirecting to login");
              const currentRoute = { pathname: "/home_tab/BangGiaTab" };
              await AsyncStorage.setItem(
                "PREVIOUS_ROUTE",
                JSON.stringify(currentRoute)
              );
              await logout();
              router.push("/auth/login");
              setFavorites([]);
            } catch (e) {
              console.warn("Error on 401 handling", e);
            }
          }
        }

        // Sync deletes
        try {
          for (const sym of removeList) {
            try {
              await axiosClient.delete(
                `/user/favorites/${encodeURIComponent(sym)}`
              );
            } catch (e) {
              console.warn("Failed delete favorite", sym, e);
            }
          }
        } catch (err) {
          console.error("Batch delete error", err);
        }

        // Clear pending sets after sync completes
        pendingBatchRef.current = { add: new Set(), remove: new Set() };
        hasPendingChangesRef.current = false; // Clear pending flag after sync

        // Don't reload here to avoid screen flashing
        // Optimistic updates already handled the UI
      }, delay);
    },
    [logout, router, loadFavorites]
  );

  // Toggle favorite (optimistic + batch)
  const handleToggleFavorite = useCallback(
    async (item: StockData) => {
      if (!isAuthenticated) {
        console.log("Unauthorized - redirecting to login");
        const currentRoute = { pathname: "/home_tab/BangGiaTab" };
        await AsyncStorage.setItem(
          "PREVIOUS_ROUTE",
          JSON.stringify(currentRoute)
        );
        await logout();
        router.push("/auth/login");
        setFavorites([]);
      } else {
        const sym = item.c;
        const isFav = favoritesRef.current.has(sym);

        if (isFav) {
          // optimistic remove
          setFavorites((prev) => {
            const next = prev.filter((f) => f.c !== sym);
            const map = new Map(favoritesRef.current);
            map.delete(sym);
            favoritesRef.current = map;
            // Remove from order array
            favoriteOrderRef.current = favoriteOrderRef.current.filter(
              (s) => s !== sym
            );
            return next;
          });
          pendingBatchRef.current.remove.add(sym);
          // ensure we don't keep a pending add
          pendingBatchRef.current.add.delete(sym);
        } else {
          // optimistic add
          setFavorites((prev) => {
            // avoid duplicate
            if (prev.some((f) => f.c === sym)) return prev;
            const next = [...(prev || []), item];
            const map = new Map(favoritesRef.current);
            map.set(sym, item);
            favoritesRef.current = map;
            // Add to end of order array
            favoriteOrderRef.current = [...favoriteOrderRef.current, sym];
            return next;
          });
          pendingBatchRef.current.add.add(sym);
          // if previously pending remove, cancel it
          pendingBatchRef.current.remove.delete(sym);
        }

        // schedule sync
        scheduleFlushBatch(800);
      }
    },
    [scheduleFlushBatch, isAuthenticated, logout, router]
  );

  // renderItem uses handleToggleFavorite
  const renderItem = useCallback(
    ({ item }: { item: StockData }) => (
      <StockItem
        key={item.c}
        item={item}
        isFavorite={favoritesSet.has(item.c)}
        onToggleFavorite={() => handleToggleFavorite(item)}
        selectedTimeFrame={selectedTimeFrame}
        isDark={isDark}
        isFlashing={flashingItems.has(item.c)}
      />
    ),
    [
      favoritesSet,
      selectedTimeFrame,
      isDark,
      handleToggleFavorite,
      flashingItems,
    ]
  );

  // Memoize tab button styles for instant rendering
  const getTabStyle = useCallback(
    (tabName: string) => [
      styles.tab,
      activeTab === tabName && styles.tabActive,
      activeTab !== tabName &&
      (isDark ? styles.tabInactiveDark : styles.tabInactiveLight),
    ],
    [activeTab, isDark]
  );

  const getTabTextStyle = useCallback(
    (tabName: string) => [
      styles.tabText,
      activeTab === tabName
        ? styles.tabTextActive
        : {
          color: isDark ? colors.textSecondary : colors.textLightSecondary,
        },
    ],
    [activeTab, isDark]
  );

  const keyExtractor = useCallback((item: StockData) => item.c, []);

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: 70,
      offset: 70 * index,
      index,
    }),
    []
  );

  type Props = {
    item: StockData;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    selectedTimeFrame: string;
    isDark: boolean;
    isFlashing: boolean;
  };

  const StockItem = React.memo(
    ({
      item,
      isFavorite,
      onToggleFavorite,
      selectedTimeFrame,
      isDark,
      isFlashing,
    }: Props) => {
      const isPositive = (item.dcp || 0) >= 0;
      const changePercent =
        selectedTimeFrame === "dcp"
          ? item.dcp || 0
          : (item as any)[selectedTimeFrame] || 0;
      const priceColor = getPriceColor(
        item.p,
        item.rp,
        item.ce,
        item.f,
        changePercent
      );

      return (
        <TouchableOpacity
          onPress={() => handleSymbolPress(item)}
          style={[
            styles.stockRow,
            {
              backgroundColor: isFlashing
                ? isDark
                  ? "rgba(59, 130, 246, 0.3)"
                  : "rgba(59, 130, 246, 0.2)"
                : theme.colors.backgroundCoPhieu,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#30323B",
            },
          ]}
        >
          <View style={styles.leftColumn}>
            <View style={styles.symbolRow}>
              <TouchableOpacity
                onPress={onToggleFavorite}
                style={styles.starIcon}
              >
                <Text
                  style={isFavorite ? styles.starTextActive : styles.starText}
                >
                  {isFavorite ? "★" : "☆"}
                </Text>
              </TouchableOpacity>
              <View style={styles.symbolInfo}>
                <Text style={[styles.symbolText, { color: theme.colors.text }]}>
                  {item.c}
                </Text>
                <View style={styles.volumeRow}>
                  <Text
                    style={[
                      styles.volumeText,
                      { color: theme.colors.textResult },
                    ]}
                  >
                    {formatVolume(item.dve)} Tỷ
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.centerColumn}>
            <Text style={[styles.priceText, { color: priceColor }]}>
              {formatPrice(item.p)}
            </Text>
          </View>

          <View style={styles.priceColumn}>
            <Text style={[styles.changeText, { color: priceColor }]}>
              {(item.dc || 0) >= 0 ? "+" : ""}
              {formatPrice(item.dc)}
            </Text>
          </View>

          <View style={styles.pillColumn}>
            <View style={[styles.percentPill, { backgroundColor: priceColor }]}>
              <Text style={styles.percentText} numberOfLines={1}>
                {changePercent >= 0 ? "+" : ""}
                {(changePercent || 0).toFixed(2)}%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.darkBg : colors.lightBg,
        },
      ]}
    >
      {/* Tab Pills */}
      <View
        style={[
          styles.tabContainer,
          {
            backgroundColor: isDark ? colors.darkBg : colors.lightBg,
          },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
          removeClippedSubviews={false}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleTabPress("topIncrease")}
            style={getTabStyle("topIncrease")}
          >
            <Text style={getTabTextStyle("topIncrease")}>Tăng giá</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleTabPress("topDecrease")}
            style={getTabStyle("topDecrease")}
          >
            <Text style={getTabTextStyle("topDecrease")}>Giảm giá</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={async () => {
              if (!isAuthenticated) {
                const currentRoute = { pathname: "/home_tab/BangGiaTab" };
                await AsyncStorage.setItem(
                  "PREVIOUS_ROUTE",
                  JSON.stringify(currentRoute)
                );
                await logout();
                router.push("/auth/login");
                setFavorites([]);
              } else {
                handleTabPress("favorite");
              }
            }}
            style={getTabStyle("favorite")}
          >
            <Text style={getTabTextStyle("favorite")}>Theo dõi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCurSanModalVisible(true)}
            style={{
              justifyContent: "center",
              marginLeft: 10,
            }}
          >
            <Text style={[styles.tabText, styles.tabTextActive]}>
              {curSan.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Header Labels - Aligned with columns */}
      <View
        style={[
          styles.headerRow,
          {
            // backgroundColor: isDark ? colors.darkBg : colors.lightBg
            backgroundColor: theme.colors.backgroundCoPhieu,
            marginHorizontal: 8,
            borderRadius: 12,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => handleSort("symbol")}
        >
          <Text style={[styles.headerLabel, { color: colors.textSecondary }]}>
            Mã CK{getSortIndicator("symbol")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerLeftValue}
          onPress={() => handleSort("volume")}
        >
          <Text
            style={[styles.headerLabelSub, { color: colors.textSecondary }]}
          >
            / Giá trị GD{getSortIndicator("volume")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerPrice}
          onPress={() => handleSort("price")}
        >
          <Text style={[styles.headerLabel, { color: colors.textSecondary }]}>
            Giá{getSortIndicator("price")}
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.headerCenter} /> */}
        <TouchableOpacity
          style={styles.changePrice}
          onPress={() => handleSort("dcp")}
        >
          <Text style={[styles.headerLabel, { color: colors.textSecondary }]}>
            Thay đổi{getSortIndicator("dcp")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimeFrameModalVisible(true)}
          style={styles.headerChange}
        >
          <Text style={[styles.headerLabel, { color: colors.textSecondary }]}>
            {getTimeFrameLabel()} ▼
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stock List */}
      <ScrollView
        style={[
          styles.scrollView,
          {
            backgroundColor: theme.colors.backgroundCoPhieu,
            marginHorizontal: 8,
            borderRadius: 12,
            marginTop: 8,
          },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? colors.textPrimary : colors.textLight}
          />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text
              style={{ color: isDark ? colors.textPrimary : colors.textLight }}
            >
              Đang tải dữ liệu...
            </Text>
          </View>
        ) : (
          <FlatList
            data={topStocks}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            extraData={favorites}
            removeClippedSubviews={true}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={50}
            initialNumToRender={5}
            windowSize={3}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={isDark ? colors.textPrimary : colors.textLight}
              />
            }
            contentContainerStyle={[
              styles.listContentContainer,
              {
                backgroundColor: theme.colors.backgroundCoPhieu,
              },
            ]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
      {activeTab === "favorite" && (
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            height: 40,
            bottom: 20,
            width: "90%",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            overflow: "hidden",
            marginLeft: 20,
            marginRight: 50,
          }}
          onPress={() => {
            router.push("/co-phieu-tab");
          }}
        >
          <PlusIcon style={{ marginTop: 4 }} size={16} color={"#fff"} />
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Thêm mã vào danh sách
          </Text>
        </TouchableOpacity>
      )}

      {/* Time Frame Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={timeFrameModalVisible}
        onRequestClose={() => setTimeFrameModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setTimeFrameModalVisible(false)}
        >
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: isDark ? colors.darkCard : colors.lightCard },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  { color: isDark ? colors.textPrimary : colors.textLight },
                ]}
              >
                Chọn khung thời gian
              </Text>
              <TouchableOpacity onPress={() => setTimeFrameModalVisible(false)}>
                <Text
                  style={[styles.modalClose, { color: colors.textSecondary }]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {timeFrameOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.timeFrameOption,
                    selectedTimeFrame === option.value &&
                    styles.timeFrameOptionActive,
                    {
                      borderBottomColor: isDark
                        ? colors.border
                        : colors.borderLight,
                    },
                  ]}
                  onPress={() => {
                    setSelectedTimeFrame(option.value);
                    setTimeFrameModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.timeFrameOptionText,
                      { color: isDark ? colors.textPrimary : colors.textLight },
                      selectedTimeFrame === option.value && {
                        color: colors.blue,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {selectedTimeFrame === option.value && (
                    <Text style={[styles.checkmark, { color: colors.blue }]}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={curSanModalVisible}
        onRequestClose={() => setCurSanModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setCurSanModalVisible(false)}
        >
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: isDark ? colors.darkCard : colors.lightCard },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  { color: isDark ? colors.textPrimary : colors.textLight },
                ]}
              >
                Chọn sàn
              </Text>
              <TouchableOpacity onPress={() => setCurSanModalVisible(false)}>
                <Text
                  style={[styles.modalClose, { color: colors.textSecondary }]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {curSanOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.timeFrameOption,
                    curSan === option.value && styles.timeFrameOptionActive,
                    {
                      borderBottomColor: isDark
                        ? colors.border
                        : colors.borderLight,
                    },
                  ]}
                  onPress={() => {
                    setCurSan(option.value);
                    setCurSanModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.timeFrameOptionText,
                      { color: isDark ? colors.textPrimary : colors.textLight },
                      curSan === option.value && {
                        color: colors.blue,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {curSan === option.value && (
                    <Text style={[styles.checkmark, { color: colors.blue }]}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    marginHorizontal: 8,
    borderRadius: 12,
  },
  tabContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  tabScrollContent: {
    gap: 8,
    paddingRight: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "#3B82F6",
  },
  tabInactiveDark: {
    backgroundColor: "#1F2937",
  },
  tabInactiveLight: {
    backgroundColor: "#F3F4F6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "left",
  },
  headerLabelSub: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "left",
  },
  headerLeft: {
    flex: 0.5,
    minWidth: 30,
  },
  headerLeftValue: {
    flex: 0.5,
    minWidth: 70,
  },
  headerCenter: {
    flex: 0.95,
    minWidth: 75,
  },
  headerPrice: {
    flex: 0.15,
    minWidth: 25,
    alignItems: "flex-end",
  },
  changePrice: {
    flex: 0.85,
    minWidth: 65,
    alignItems: "flex-end",
  },
  headerChange: {
    flex: 0.95,
    minWidth: 48,
    alignItems: "flex-end",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 24,
  },
  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftColumn: {
    flex: 1.3,
    minWidth: 100,
  },
  symbolRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  starIcon: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  starText: {
    fontSize: 16,
    color: "#4B5563",
  },
  starTextActive: {
    fontSize: 16,
    color: "#F5C512",
  },
  symbolInfo: {
    flex: 1,
  },
  symbolText: {
    letterSpacing: 0.5,
    lineHeight: 18,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 2,
  },
  volumeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 3,
  },
  volumeIcon: {
    fontSize: 11,
    color: "#6B7280",
  },
  volumeText: {
    fontSize: 11,
    fontWeight: "400",
  },
  centerColumn: {
    flex: 0.95,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 75,
  },
  priceColumn: {
    flex: 0.85,
    alignItems: "flex-end",
    paddingRight: 4,
    minWidth: 65,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  changeText: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 19,
  },
  pillColumn: {
    flex: 0.95,
    alignItems: "flex-end",
    minWidth: 78,
  },
  percentPill: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 4,
    minWidth: 78,
    alignItems: "center",
    justifyContent: "center",
  },
  percentText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 15,
  },
  loadingContainer: {
    padding: 32,
    alignItems: "center",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#1F2937",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalClose: {
    fontSize: 24,
    fontWeight: "400",
  },
  modalScroll: {
    paddingHorizontal: 20,
  },
  timeFrameOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  timeFrameOptionActive: {
    backgroundColor: "rgba(59, 130, 246, 0.08)",
  },
  timeFrameOptionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  checkmark: {
    fontSize: 20,
    fontWeight: "700",
  },
});

const miniStyles = StyleSheet.create({
  chartWrap: {
    width: 72,
    height: 34,
    position: "relative",
    justifyContent: "center",
  },
  baseLine: {
    position: "absolute",
    left: 6,
    right: 6,
    bottom: 6,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 0.5,
    borderColor: "rgba(139, 146, 160, 0.3)",
  },
  area: {
    position: "absolute",
    left: 6,
    right: 6,
    bottom: 6,
    top: 4,
    borderRadius: 4,
  },
  line: {
    position: "absolute",
    left: 8,
    right: 8,
    height: 2,
    bottom: 12,
    borderRadius: 2,
  },
});
