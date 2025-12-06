// CoPhieuTab.tsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axiosClient from "@/api/request";
import { BackIcon, SearchIcon } from "@/components/icons";
import { useTheme } from "@/context/ThemeContext";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

// Type definition for stock data
type StockData = {
  c: string; // stock symbol
  sn?: string; // stock name
  p?: number; // price (same unit as API, in your UI you divide by 1000)
  dc?: number; // change (in same unit as p)
  dcp?: number; // change percent
  e?: string;
  hp?: number;
  ap?: number;
  lp?: number;
  ce?: number;
  rp?: number;
  f?: number;
  dve?: number | string;
  dv?: number | string;
  [key: string]: any;
};

export default function CoPhieuTab() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loadingStocks, setLoadingStocks] = useState<boolean>(false);

  // favorites: list of symbols user followed
  const [favorites, setFavorites] = useState<string[]>([]);
  // map symbol -> snapshot (optional, useful if you want to send snapshot)
  const favoritesSnapshotRef = useRef<Record<string, any>>({});
  // pending ops to prevent duplicate taps
  const pendingRef = useRef<Set<string>>(new Set());

  const isDark = theme.mode === "dark";

  const fetchStockData = async () => {
    try {
      setLoadingStocks(true);
      const response = await axiosClient.get(`/stock-overview`);
      if (response.status === 200) {
        setStockData(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoadingStocks(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const res = await axiosClient.get("/user/favorites");
      if (res?.data?.success) {
        const favs: string[] = (res.data.data || []).map((r: any) => r.symbol);
        console.log("[CoPhieuTab] Loaded favorites from API:", favs);
        setFavorites(favs);
        // save snapshot map for upsert (if backend expects snapshot)
        const snapMap: Record<string, any> = {};
        for (const r of res.data.data || []) {
          if (r.symbol) snapMap[r.symbol] = r.snapshot || null;
        }
        favoritesSnapshotRef.current = snapMap;
      }
    } catch (err) {
      console.error("Load favorites error", err);
    }
  };

  useEffect(() => {
    fetchStockData();
    loadFavorites();
  }, []);

  // Reload favorites when screen is focused
  useFocusEffect(
    useCallback(() => {
      console.log("[CoPhieuTab] Screen focused - reloading favorites");
      loadFavorites();
    }, [])
  );

  // ---------------------------
  // Realtime socket integration
  // ---------------------------

  // refs for websocket + batching
  const wsRef = useRef<any | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);

  // map ticker -> index in stockData for O(1) updates
  const tickerIndexRef = useRef<Map<string, number>>(new Map());

  // pending updates buffer: symbol -> partial update
  const pendingUpdatesRef = useRef<Record<string, Partial<StockData>>>({});
  const flushTimeoutRef = useRef<number | null>(null);
  const FLUSH_DELAY = 150; // ms: batch apply every 150ms

  // build tickerIndexRef whenever stockData changes
  useEffect(() => {
    const map = new Map<string, number>();
    stockData.forEach((s, idx) => {
      if (s?.c) map.set(s.c, idx);
    });
    tickerIndexRef.current = map;
  }, [stockData]);

  // parse socket message (reuse structure you provided)
  const parseMessage = useCallback((message: string) => {
    try {
      const parts = (message || "").split("|");
      const statusAndStock = (parts[1] || "").split("#");
      const stock = statusAndStock[1];
      if (!stock) return null;

      const now = moment();
      const isATO = now.isBetween(
        moment("09:00", "HH:mm"),
        moment("09:15", "HH:mm"),
        "minutes",
        "[)"
      );
      const isATC = now.isBetween(
        moment("14:30", "HH:mm"),
        moment("14:45", "HH:mm"),
        "minutes",
        "[)"
      );

      // NOTE: parse fields exactly as in your parseMessage - you used indexes
      // keep them same, but do NOT rely on formatNumber here (we'll parse to numbers)
      const currentPriceRaw = parts[42]; // was formatNumber(parts[42])
      const changeRaw = parts[52];
      const changePercentRaw = parts[53];
      const totalVolumeRaw = parts[54];

      // parse to numbers where possible
      const currentPrice = Number(currentPriceRaw) || null; // may be string like "1234.56"
      const change = Number(changeRaw) || null;
      const changePercent = Number(changePercentRaw) || null;
      const totalVolume =
        Number((totalVolumeRaw || "").toString().replace(/,/g, "")) || null;

      return {
        stock,
        // keep both raw & numeric if needed
        currentPrice,
        change,
        changePercent,
        totalVolume,
        // also include deep orderbook fields (strings) if you want to surface them
        priceBuy1: isATO ? "ATO" : isATC ? "ATC" : parts[2],
        volumeBuy1: parts[3],
        priceSell1: isATO ? "ATO" : isATC ? "ATC" : parts[22],
        volumeSell1: parts[23],
        high: Number(parts[44]) || null,
        low: Number(parts[46]) || null,
        averagePrice: Number(parts[48]) || null,
        ceiling: Number(parts[59]) || null,
        floor: Number(parts[60]) || null,
        reference: Number(parts[61]) || null,
        foreignBuy: parts[72],
        foreignSell: parts[76],
        room: parts[73],
      };
    } catch (e) {
      console.warn("parseMessage error", e);
      return null;
    }
  }, []);

  // queue updates into pendingUpdatesRef and schedule flush
  const queueRealtimeUpdate = useCallback((parsed: any) => {
    if (!parsed || !parsed.stock) return;
    const ticker = parsed.stock;

    // only update if ticker exists in current stockData (no additions)
    if (!tickerIndexRef.current.has(ticker)) return;

    const partial: Partial<StockData> = {};
    // map parsed fields into StockData fields (keep same units as original stockData)
    if (parsed.currentPrice != null) {
      // In UI you divide item.p by 1000 to display. The parsed.currentPrice likely is in the same scale as display before *1000.
      // To be conservative, set p = parsed.currentPrice * 1000 if parsed is not tiny.
      // If parsed.currentPrice seems already scaled, this still works reasonably.
      partial.p = Number(parsed.currentPrice) * 1000;
    }
    if (parsed.change != null) {
      partial.dc = Number(parsed.change) * 1000;
    }
    if (parsed.changePercent != null) {
      partial.dcp = Number(parsed.changePercent);
    }
    if (parsed.totalVolume != null) {
      partial.dv = parsed.totalVolume;
      partial.dve = parsed.totalVolume; // keep both if UI expects dve/dv
    }
    // You can add more mappings as needed

    if (Object.keys(partial).length === 0) return;

    // merge with existing pending for same ticker
    pendingUpdatesRef.current = {
      ...pendingUpdatesRef.current,
      [ticker]: {
        ...(pendingUpdatesRef.current[ticker] || {}),
        ...partial,
      },
    };

    // schedule flush
    if (flushTimeoutRef.current == null) {
      // RN environment: use global.setTimeout
      flushTimeoutRef.current = global.setTimeout(() => {
        flushTimeoutRef.current = null;
        flushPendingUpdates();
      }, FLUSH_DELAY) as unknown as number;
    }
  }, []);

  // flush pending updates to state in batch
  const flushPendingUpdates = useCallback(() => {
    const pending = { ...pendingUpdatesRef.current };
    if (!pending || Object.keys(pending).length === 0) return;

    setStockData((prev) => {
      // shallow copy once
      const updated = [...prev];
      let didChange = false;

      for (const [ticker, partial] of Object.entries(pending)) {
        const idx = tickerIndexRef.current.get(ticker);
        if (idx == null) continue;
        const orig: StockData = updated[idx];
        if (!orig) continue;

        let changed = false;
        const next: StockData = { ...orig };

        // Only set fields that actually changed to minimize diffs
        if (partial.p !== undefined && partial.p !== orig.p) {
          next.p = partial.p;
          changed = true;
        }
        if (partial.dc !== undefined && partial.dc !== orig.dc) {
          next.dc = partial.dc;
          changed = true;
        }
        if (partial.dcp !== undefined && partial.dcp !== orig.dcp) {
          next.dcp = partial.dcp;
          changed = true;
        }
        if (partial.dv !== undefined && partial.dv !== orig.dv) {
          next.dv = partial.dv;
          next.dve = partial.dve ?? partial.dv;
          changed = true;
        }

        if (changed) {
          updated[idx] = next;
          didChange = true;
        }
      }

      // clear pending buffer
      pendingUpdatesRef.current = {};

      return didChange ? updated : prev;
    });
  }, []);

  // open websocket and subscribe to current symbols
  const openWebSocket = useCallback(
    (symbols: string[]) => {
      try {
        // close previous if exists
        if (wsRef.current) {
          try {
            wsRef.current.close();
          } catch (e) {}
          wsRef.current = null;
        }

        const ws = new WebSocket("wss://iboard-pushstream.ssi.com.vn/realtime");
        wsRef.current = ws;

        ws.onopen = () => {
          try {
            // subscribe list of symbols
            if (Array.isArray(symbols) && symbols.length > 0) {
              const message = {
                type: "sub",
                topic: "stockRealtimeByListV2",
                variables: symbols,
                component: "priceTableEquities",
              };
              ws.send(JSON.stringify(message));
            }
          } catch (e) {
            console.warn("ws send error", e);
          }
        };

        ws.onmessage = (evt: any) => {
          const data = typeof evt.data === "string" ? evt.data : "";
          const parsed = parseMessage(data);
          if (parsed) {
            // queue for treelist update
            queueRealtimeUpdate(parsed);
          }
        };

        ws.onclose = (ev: any) => {
          // try reconnect after short delay
          if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current as any);
            reconnectTimerRef.current = null;
          }
          reconnectTimerRef.current = global.setTimeout(() => {
            reconnectTimerRef.current = null;
            // reopen with current list of tickers
            const list = Array.from(tickerIndexRef.current.keys());
            openWebSocket(list);
          }, 2000) as unknown as number;
        };

        ws.onerror = (err: any) => {
          console.warn("ws error", err);
          // close will trigger reconnect
        };
      } catch (e) {
        console.warn("openWebSocket error", e);
      }
    },
    [parseMessage, queueRealtimeUpdate]
  );

  // subscribe when we have stockData loaded (only run when stockData changes)
  useEffect(() => {
    const symbols = stockData?.map((s) => s.c).filter(Boolean);
    if (symbols && symbols.length > 0) {
      openWebSocket(symbols);
    }
    // cleanup on unmount: close ws and timers
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current as any);
        reconnectTimerRef.current = null;
      }
      if (flushTimeoutRef.current) {
        clearTimeout(flushTimeoutRef.current as any);
        flushTimeoutRef.current = null;
      }
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (e) {}
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockData.length]); // reopen ws when the number of symbols changes

  // ---------------------------
  // end realtime socket logic
  // ---------------------------

  // Color scheme based on theme
  const colors = {
    background: isDark ? "#12161f" : "#f5f5f5",
    cardBackground: isDark ? "#1a1e2b" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    secondaryText: isDark ? "#8e8e93" : "#666666",
    border: isDark ? "#2a3340" : "#e0e0e0",
    searchBackground: isDark ? "#1e2732" : "#f0f0f0",
    searchPlaceholder: isDark ? "#8e8e93" : "#999999",
    positive: "#10B981",
    negative: "#EF4444",
    inputText: isDark ? "#ffffff" : "#000000",
    inputBackground: isDark ? "#1e2732" : "#f8f9fa",
    starActive: "#F5C512",
    starInactive: "#4B5563",
  };

  // Filter and sort data
  let filteredData =
    stockData?.length > 0
      ? stockData?.filter((item) =>
          item.c.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  filteredData = filteredData.sort((a, b) => {
    if (a.c.length !== b.c.length) return a.c.length - b.c.length;
    return a.c.localeCompare(b.c);
  });

  // quick lookup set for rendering stars
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  // Helper: optimistic toggle favorite
  // Use batch upsert API (same as BangGiaTab) for consistency
  const handleSymbolPress = async (item: StockData) => {
    const sym = item.c;
    if (!sym) return;

    // prevent double taps while pending
    if (pendingRef.current.has(sym)) return;
    pendingRef.current.add(sym);

    const isFav = favoritesSet.has(sym);

    // optimistic update
    if (isFav) {
      setFavorites((prev) => prev.filter((s) => s !== sym));
    } else {
      setFavorites((prev) => {
        if (prev.includes(sym)) return prev;
        return [...prev, sym];
      });
      // store snapshot to send if needed
      favoritesSnapshotRef.current[sym] = item;
    }

    try {
      if (!isFav) {
        // Add favorite using batch upsert API (consistent with BangGiaTab)
        await axiosClient.put("/user/favorites/batch", {
          list: [
            {
              symbol: sym,
              exchange: item.e || null,
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
            },
          ],
        });
        console.log("[CoPhieuTab] Added favorite:", sym);
      } else {
        // Remove favorite
        await axiosClient.delete(`/user/favorites/${encodeURIComponent(sym)}`);
        // optional: remove snapshot from ref
        delete favoritesSnapshotRef.current[sym];
        console.log("[CoPhieuTab] Removed favorite:", sym);
      }
      // success -> nothing more, optimistic UI already updated
    } catch (err) {
      console.error("Toggle favorite error", err);
      // rollback optimistic update on error
      if (isFav) {
        // we tried to remove but failed => re-add
        setFavorites((prev) => {
          if (prev.includes(sym)) return prev;
          return [...prev, sym];
        });
      } else {
        // we tried to add but failed => remove
        setFavorites((prev) => prev.filter((s) => s !== sym));
      }
      // optionally show toast/error UI (not included)
    } finally {
      pendingRef.current.delete(sym);
    }
  };

  const renderItem = ({ item }: { item: StockData }) => {
    const isPositive = (item.dc || 0) > 0;
    const isNeutral = (item.dc || 0) === 0;

    const currentPrice = item.p;
    const reference = item.rp;
    const ceiling = item.ce;
    const floor = item.f;

    const priceColor = (() => {
      if (currentPrice != null && reference != null) {
        if (ceiling != null && currentPrice === ceiling) return "#845af3";
        if (floor != null && currentPrice === floor) return "#4097f5";
        if (currentPrice === reference) return "rgb(245, 197, 18)";
        if (currentPrice > reference) return "rgb(5, 177, 104)";
        if (currentPrice < reference) return "rgb(232, 96, 102)";
      }
      return "rgb(245, 197, 18)";
    })();

    return (
      <View
        style={[styles.itemContainer, { borderBottomColor: colors.border }]}
      >
        <View style={styles.leftSection}>
          <TouchableOpacity
            onPress={() => handleSymbolPress(item)}
            style={styles.starIcon}
          >
            <Text
              style={
                favoritesSet.has(item.c)
                  ? styles.starTextActive
                  : styles.starText
              }
            >
              {favoritesSet.has(item.c) ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
          <View style={{ marginLeft: 8, maxWidth: "78%" }}>
            <Text style={[styles.symbol, { color: colors.text }]}>
              {item.c}
            </Text>
            <Text
              style={[styles.name, { color: theme.colors.textResult }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item?.sn}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.price, { color: priceColor }]}>
            {((item.p || 0) / 1000)?.toFixed(2) || "0.00"}
          </Text>
          <Text style={[styles.percent, { color: priceColor }]}>
            {`${item.dc > 0 ? "+" : ""}${
              ((item.dc || 0) / 1000)?.toFixed(2) || "0.00"
            } /${item.dc > 0 ? "+" : ""}${(item.dcp || 0).toFixed(2)}%`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
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
          Thêm mã cổ phiếu
        </Text>
        <View style={{ width: 32 }} />
        {/* placeholder để cân header */}
      </View>

      {/* Search Bar */}
      <View
        style={[styles.searchContainer, { backgroundColor: colors.background }]}
      >
        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: theme.colors.backgroundTab },
          ]}
        >
          {/* <SearchIcon size={24} color={theme.mode === 'dark' ? '#C7C8D1' : '#2E3138'} /> */}
          <MaterialIcons
            name="search"
            size={20}
            color={theme.colors.iconColor}
          />
          <TextInput
            style={[
              styles.searchInput,
              {
                color: colors.inputText,
                flex: 1,
              },
            ]}
            placeholder="Tìm kiếm mã cổ phiếu..."
            placeholderTextColor={theme.colors.placeholderText}
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="characters"
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.backgroundCoPhieu,
          marginHorizontal: 8,
          flex: 1,
          borderRadius: 12,
        }}
      >
        {loadingStocks ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.c}
            renderItem={renderItem}
            style={styles.stockList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            initialNumToRender={30}
            maxToRenderPerBatch={30}
            windowSize={11}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    fontSize: 16,
    fontWeight: "400",
  },
  stockList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
    width: 110,
  },
  symbol: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  name: {
    fontSize: 11,
    fontWeight: "400",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  percent: {
    fontSize: 13,
  },
  starIcon: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  starText: {
    fontSize: 16,
    color: "#4B5563",
  },
  starTextActive: {
    fontSize: 16,
    color: "#F5C512",
  },
});
