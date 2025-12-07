import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useFocusEffect, useRouter } from "expo-router";
import WebView from "react-native-webview";
import axios from "axios";
import Svg, { G, Rect, Text as SvgText, Path } from "react-native-svg";
import * as d3 from "d3-hierarchy";
import { scaleLinear } from "d3-scale";
import { LinearGradient } from "expo-linear-gradient";
import {
  LIST_DAU_KHI,
  LIST_HOA_CHAT,
  LIST_TAI_NGUYEN,
  LIST_XAY_DUNG_VAT_LIEU,
  LIST_HANG_HOA_DICH_VU_CONG_NGHIEP,
  LIST_OTO_LINH_KIEN_PHU_TUNG,
  LIST_THUC_PHAM_DO_UONG,
  DO_DUNG_CA_NHAN_DO_GIA_DUNG,
  LIST_Y_TE,
  LIST_DICH_VU_BAN_LE,
  LIST_PHUONG_TIEN_TRUYEN_THONG,
  LIST_DU_LICH_GIAI_TRI,
  LIST_VIEN_THONG,
  LIST_DICH_VU_TIEN_ICH,
  LIST_NGAN_HANG,
  LIST_BAO_HIEM,
  LIST_BAT_DONG_SAN,
  LIST_DICH_VU_TAI_CHINH,
  LIST_CONG_NGHE,
  LIST_BAT_DONG_SAN_FIN,
  LIST_NGAN_HANG_FIN,
  LIST_CHUNG_KHOAN_FIN,
  LIST_TIEU_DUNG_FIN,
  LIST_DAU_KHI_FIN,
  LIST_LOGISTICS_FIN,
  LIST_CONG_NGHE_FIN,
  LIST_VAT_LIEU_FIN,
} from "./constants";
import axiosClient from "@/api/request";
import { formatThousands, formatToTy } from "@/utils/formatNumber";
import RNFS from "react-native-fs";
import ChartWebViews from "../ChartWebView";

// Data types for treemap
type StockNode = {
  ticker: string;
  name?: string;
  sector: string;
  value: number;
  changePct: number;
  originalValue?: number;
};

type Snapshot = {
  asOf: number;
  items: StockNode[];
};

// Fake real-time data simulation flag
const isFake = false;

// CACHE HTML GLOBALLY
let CACHED_HTML: string | null = null;
let HTML_LOAD_PROMISE: Promise<string> | null = null;

// Generate fake real-time stock data with random price changes
const generateFakeRealtimeData = (baseData: StockNode[]): StockNode[] => {
  return baseData.map((stock) => {
    const randomChange = (Math.random() - 0.5) * 10;
    const isVolatile = Math.random() < 0.1;
    const volatilityMultiplier = isVolatile ? 2 : 1;
    const newChangePct = randomChange * volatilityMultiplier;
    const valueChange = (newChangePct / 100) * stock.value;
    const newValue = Math.max(1000, stock.value + valueChange);

    return {
      ...stock,
      changePct: Number(newChangePct.toFixed(2)),
      value: Math.round(newValue),
    };
  });
};

// Simulate WebSocket connection for real-time data
const useFakeRealtimeData = (staticData: StockNode[]): StockNode[] => {
  const [realtimeData, setRealtimeData] = useState<StockNode[]>(staticData);

  useEffect(() => {
    if (!isFake) {
      setRealtimeData(staticData);
      return;
    }

    const interval = setInterval(() => {
      setRealtimeData((prevData) => generateFakeRealtimeData(prevData));
    }, 2000);

    return () => clearInterval(interval);
  }, [staticData]);

  return realtimeData;
};

// Throttle function
const throttle = (func: Function, delay: number) => {
  let timeoutId: any = null;
  let lastExecuted = 0;

  return (...args: any[]) => {
    const now = Date.now();

    if (now - lastExecuted >= delay) {
      func(...args);
      lastExecuted = now;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecuted = Date.now();
      }, delay - (now - lastExecuted));
    }
  };
};

export default function BienDongTab() {
  const { theme } = useTheme();
  const router = useRouter();
  const layout = Dimensions.get("window");
  const isDark = theme.mode === "dark";

  // Modal states
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockNode | null>(null);
  const [stockDetail, setStockDetail] = useState<any>(null);
  const [currentSymbolTreemap, setCurrentSymbolTreemap] = useState<
    string | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState<string>("VNIndex");

  const [dataListDropdown, setDataListDropdown] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showTreemap, setShowTreemap] = useState<boolean>(true);
  const [treemapData, setTreemapData] = useState<StockNode[]>([]);

  const [upCount, setUpCount] = useState<number>(0);
  const [downCount, setDownCount] = useState<number>(0);
  const [noChangeCount, setNoChangeCount] = useState<number>(0);

  const [dataChangeNuocNgoaiAll, setDataChangeNuocNgoaiAll] = useState<any[]>(
    []
  );
  const [dataChangeTuDoanhAll, setDataChangeTuDoanhAll] = useState<any[]>([]);

  const [showTradingModal, setShowTradingModal] = useState<boolean>(false);
  const [tradingData, setTradingData] = useState<any>(null);

  const [stockOverviewData, setStockOverviewData] = useState<any[]>([]);
  const [vietnameseIndices, setVietnameseIndices] = useState<any[]>([]);

  const wsRef = React.useRef<any>(null);
  const reconnectTimeoutRef = React.useRef<number | null>(null);
  const isSubscribedRef = React.useRef(false);

  const [refreshing, setRefreshing] = useState(false);
  // onRefresh defined later to avoid hoisting issues

  // Memoize the sector list to prevent recreations
  const listDropdown = useMemo(
    () => [
      { id: 1, title: "Ngân hàng", listSymbol: LIST_NGAN_HANG_FIN },
      { id: 2, title: "Chứng khoán", listSymbol: LIST_CHUNG_KHOAN_FIN },
      { id: 3, title: "Bất động sản", listSymbol: LIST_BAT_DONG_SAN_FIN },
      { id: 4, title: "Tiêu dùng", listSymbol: LIST_TIEU_DUNG_FIN },
      { id: 5, title: "Dầu khí", listSymbol: LIST_DAU_KHI_FIN },
      { id: 6, title: "Logistics", listSymbol: LIST_LOGISTICS_FIN },
      { id: 7, title: "Công nghệ", listSymbol: LIST_CONG_NGHE_FIN },
      { id: 8, title: "Vật liệu", listSymbol: LIST_VAT_LIEU_FIN },
    ],
    []
  );

  // Helper function to find sector for a stock symbol
  const findSectorForStock = useCallback(
    (stockSymbol: string): string => {
      for (const sector of listDropdown) {
        if (sector.listSymbol?.includes(stockSymbol)) {
          return sector.title;
        }
      }
      return "Khác";
    },
    [listDropdown]
  );

  const updateStockDetailFromSocket = useCallback(
    (parsed: any) => {
      if (!parsed || !parsed.stock) return;

      setStockDetail((prev) => {
        if (currentSymbolTreemap && parsed.stock !== currentSymbolTreemap)
          return prev;

        const companyName = prev?.companyName || "Đang cập nhật";
        const marketCap = prev?.marketCap || formatToTy ? formatToTy(0) : "0";

        const mapped = {
          ticker: parsed.stock,
          companyName,
          sector: findSectorForStock(parsed.stock),
          currentPrice:
            parsed.currentPrice !== undefined && parsed.currentPrice !== null
              ? String(parsed.currentPrice)
              : prev?.currentPrice || "0.00",
          priceChange:
            parsed.change !== undefined && parsed.change !== null
              ? String(parsed.change)
              : prev?.priceChange || "0.00",
          percentChange:
            parsed.changePercent !== undefined && parsed.changePercent !== null
              ? String(parsed.changePercent)
              : prev?.percentChange || "0.00",
          volume:
            parsed.totalVolume !== undefined && parsed.totalVolume !== null
              ? String(parsed.totalVolume)
              : prev?.volume || "",
          marketCap,
          high: parsed.high ?? prev?.high ?? "0.00",
          low: parsed.low ?? prev?.low ?? "0.00",
          reference: parsed.reference ?? prev?.reference ?? "0.00",
          ceiling: parsed.ceiling ?? prev?.ceiling ?? "0.00",
          floor: parsed.floor ?? prev?.floor ?? "0.00",
          average: parsed.averagePrice ?? prev?.average ?? "0.00",
          exchange: prev?.exchange || "HOSE",
          priceBuy1: parsed.priceBuy1 ?? prev?.priceBuy1,
          volumeBuy1: parsed.volumeBuy1 ?? prev?.volumeBuy1,
          priceSell1: parsed.priceSell1 ?? prev?.priceSell1,
          volumeSell1: parsed.volumeSell1 ?? prev?.volumeSell1,
          foreignBuy: parsed.foreignBuy ?? prev?.foreignBuy,
          foreignSell: parsed.foreignSell ?? prev?.foreignSell,
          room: parsed.room ?? prev?.room,
        };

        return mapped;
      });
    },
    [currentSymbolTreemap, findSectorForStock]
  );

  const parseMessageFromSocket = useCallback((message: string) => {
    try {
      const parts = (message || "").split("|");
      const statusAndStock = (parts[1] || "").split("#");
      const stock = statusAndStock[1];
      if (!stock) return null;

      const now = Date.now();
      return {
        stock,
        totalVolume: Number(parts[54]) || 0,
        changePercent: Number(parts[53]) || 0,
        currentPrice: parseFloat(parts[42]) || null,
        priceBuy1: parts[2] || null,
        priceSell1: parts[22] || null,
      };
    } catch (e) {
      console.warn("parse socket message fail", e);
      return null;
    }
  }, []);

  const tickerIndexRef = React.useRef<Map<string, number>>(new Map());
  const pendingUpdatesRef = React.useRef<Record<string, Partial<StockNode>>>(
    {}
  );
  const flushTimeoutRef = React.useRef<number | null>(null);
  const FLUSH_DELAY = 500; // Tăng từ 150ms lên 500ms

  useEffect(() => {
    const map = new Map<string, number>();
    treemapData.forEach((item, idx) => {
      if (item?.ticker) map.set(item.ticker, idx);
    });
    tickerIndexRef.current = map;
  }, [treemapData]);

  // Throttled version
  const queueRealtimeUpdate = useCallback(
    throttle((msgData: any) => {
      if (!msgData || !msgData.stock) return;

      const ticker = msgData.stock;
      if (!tickerIndexRef.current.has(ticker)) return;

      const partial: Partial<StockNode> = {};
      if (msgData.totalVolume !== undefined && msgData.totalVolume !== null) {
        const vol = Number(msgData.totalVolume);
        if (!Number.isNaN(vol)) partial.value = vol;
      }
      if (
        msgData.changePercent !== undefined &&
        msgData.changePercent !== null
      ) {
        const cp = Number(msgData.changePercent);
        if (!Number.isNaN(cp)) partial.changePct = cp;
      }

      if (Object.keys(partial).length === 0) return;
      pendingUpdatesRef.current = {
        ...pendingUpdatesRef.current,
        [ticker]: {
          ...(pendingUpdatesRef.current[ticker] || {}),
          ...partial,
        },
      };

      if (flushTimeoutRef.current) return;
      flushTimeoutRef.current = window.setTimeout(() => {
        flushTimeoutRef.current = null;
        flushPendingUpdates();
      }, FLUSH_DELAY) as unknown as number;
    }, 500),
    []
  );

  const flushPendingUpdates = useCallback(() => {
    const pending = pendingUpdatesRef.current;

    if (!pending || Object.keys(pending).length === 0) return;

    setTreemapData((prev) => {
      const updated = [...prev];
      let didChange = false;

      for (const [ticker, partial] of Object.entries(pending)) {
        const idx = tickerIndexRef.current.get(ticker);
        if (idx === undefined) continue;
        const orig = updated[idx];
        const next = { ...orig };
        let changed = false;

        if (partial.value !== undefined && partial.value !== next.value) {
          next.value = partial.value as number;
          changed = true;
        }
        if (
          partial.changePct !== undefined &&
          partial.changePct !== next.changePct
        ) {
          next.changePct = partial.changePct as number;
          changed = true;
        }

        if (changed) {
          updated[idx] = next;
          didChange = true;
        }
      }

      pendingUpdatesRef.current = {};

      return didChange ? updated : prev;
    });
  }, []);

  const updateTreemapWithRealtime = useCallback(
    (msgData: any) => {
      if (!msgData || !msgData.stock) return;

      setTreemapData((prev) => {
        const idx = prev.findIndex((p) => {
          return p.ticker === msgData.stock;
        });

        if (idx !== -1) {
          const updated = [...prev];
          const newValue =
            msgData.totalVolume && Number(msgData.totalVolume) > 0
              ? Number(msgData.totalVolume)
              : updated[idx].value || 0;

          const newChange =
            msgData.changePercent !== undefined &&
              !Number.isNaN(msgData.changePercent)
              ? Number(msgData.changePercent)
              : updated[idx].changePct || 0;

          updated[idx] = {
            ...updated[idx],
            value: newValue,
            originalValue: updated[idx].originalValue ?? newValue,
            changePct: newChange,
          };
          return updated;
        } else {
          return [...prev];
        }
      });
    },
    [findSectorForStock]
  );

  const subscribeTickers = useCallback((tickers: string[]) => {
    try {
      if (!wsRef.current || wsRef.current.readyState !== wsRef.current.OPEN) {
        return;
      }
      wsRef.current.send(
        JSON.stringify({
          type: "sub",
          topic: "stockRealtimeByListV2",
          variables: tickers,
          component: "priceTableEquities",
        })
      );
      isSubscribedRef.current = true;
    } catch (e) {
      console.warn("subscribeTickers failed", e);
    }
  }, []);

  useEffect(() => {
    const openSocket = () => {
      if (wsRef.current && wsRef.current.readyState === wsRef.current.OPEN)
        return;

      const ws = new WebSocket("wss://iboard-pushstream.ssi.com.vn/realtime");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WS opened");
        if (treemapData && treemapData.length > 0) {
          const tickers = treemapData.map((t) => t.ticker);
          if (tickers.length > 0) subscribeTickers(tickers);
        }
      };

      ws.onmessage = (evt: any) => {
        const msg = typeof evt.data === "string" ? evt.data : "";
        const parsed = parseMessageFromSocket(msg);
        if (parsed) queueRealtimeUpdate(parsed);

        if (
          currentSymbolTreemap &&
          parsed &&
          parsed.stock === currentSymbolTreemap
        ) {
          updateStockDetailFromSocket(parsed);
        }
      };

      ws.onclose = (ev: any) => {
        console.log("WS closed, will try reconnect", ev?.code, ev?.reason);
        isSubscribedRef.current = false;
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current as any);
        }
        reconnectTimeoutRef.current = window.setTimeout(() => {
          openSocket();
        }, 2000);
      };

      ws.onerror = (err: any) => {
        console.warn("WS error", err);
      };
    };

    // openSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current as any);
        reconnectTimeoutRef.current = null;
      }
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (e) { }
        wsRef.current = null;
      }
    };
  }, []);

  const baseUrl = useMemo(
    () => `file://${RNFS.MainBundlePath}/tradingview/`,
    []
  );
  const [baseHtml, setBaseHtml] = useState<string>(CACHED_HTML || "");
  // Load HTML với cache
  React.useEffect(() => {
    if (CACHED_HTML) {
      setBaseHtml(CACHED_HTML);
      setIsLoading(false);
      return;
    }

    loadHTMLOnce()
      .then((content) => {
        setBaseHtml(content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load HTML:", err);
        setIsLoading(false);
      });
  }, []);

  const loadHTMLOnce = async (): Promise<string> => {
    if (CACHED_HTML) return CACHED_HTML;

    if (HTML_LOAD_PROMISE) return HTML_LOAD_PROMISE;

    HTML_LOAD_PROMISE = (async () => {
      try {
        const bundlePath = RNFS.MainBundlePath;
        const indexPath = `${bundlePath}/tradingview/index.html`;
        const content = await RNFS.readFile(indexPath, "utf8");
        CACHED_HTML = content;
        console.log("✅ TradingView HTML cached");
        return content;
      } catch (err) {
        console.error("Error loading TradingView HTML:", err);
        throw err;
      }
    })();

    return HTML_LOAD_PROMISE;
  };
  const LAYOUT_STORAGE_KEY = "tradingview_layout_global";

  useEffect(() => {
    if (!wsRef.current) return;
    if (wsRef.current.readyState !== wsRef.current.OPEN) return;

    if (treemapData && treemapData.length > 0 && !isSubscribedRef.current) {
      const tickers = treemapData.map((t) => t.ticker);
      if (tickers.length > 0) {
        subscribeTickers(tickers);
      }
    }
  }, [treemapData, subscribeTickers]);

  const fetchStockOverviewData = useCallback(async () => {
    try {
      const response = await axiosClient.get("/stock-overview");
      if (response.status === 200) {
        setStockOverviewData(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching stock overview data:", error);
    }
  }, []);

  const currentTreemapData = useFakeRealtimeData(treemapData);

  const formatNumber = useCallback((num: any) => {
    if (!num && num !== 0) return "";
    return parseFloat(num).toFixed(2);
  }, []);

  const formatNumberComma = useCallback((num: any) => {
    if (!num && num !== 0) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

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
              marketCap: formatToTy(stock.dve),
              high: stock.hp?.toFixed(2) || "0.00",
              low: stock.lp?.toFixed(2) || "0.00",
              reference: stock.rp?.toFixed(2) || "0.00",
              ceiling: stock.ce?.toFixed(2) || "0.00",
              floor: stock.f?.toFixed(2) || "0.00",
              average: stock.ap?.toFixed(2) || "0.00",
              exchange: stock.e || "HOSE",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching stock detail:", error);
      }
    },
    [findSectorForStock]
  );

  const handleStockPress = useCallback(
    (stock: StockNode) => {
      // 1. Mở modal ngay lập tức (Optimistic UI)
      setCurrentSymbolTreemap(stock.ticker);
      setSelectedStock(stock);
      // Clear stale data immediately
      setStockDetail(null);
      setShowStockModal(true);

      // 2. Gọi API lấy detail ngầm
      fetchStockDetail(stock.ticker).catch((err) => {
        console.warn("Fetch detail failed silently", err);
      });
    },
    [fetchStockDetail]
  );

  const sendToWeb = useCallback((ref: React.RefObject<WebView>, msg: any) => {
    try {
      ref.current?.postMessage(JSON.stringify(msg));
    } catch (e) {
      console.warn("Send to web failed:", e);
    }
  }, []);
  const smallRef = useRef<WebView>(null);
  // Update theme
  React.useEffect(() => {
    if (!baseHtml || isLoading) return;

    const themeMessage = {
      type: "changeTheme",
      payload: theme.mode,
    };

    sendToWeb(smallRef, themeMessage);
  }, [theme.mode, baseHtml, isLoading, sendToWeb]);

  const handleBarPress = useCallback(
    (event: any, barData: any, barX: number, barY: number) => {
      if (barData) {
        const formattedDate = new Date(barData.tradingDate).toLocaleDateString(
          "vi-VN"
        );
        const formattedNetVal = (barData.netVal / 1000000000).toFixed(2);
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

  const navigateToStockDetail = useCallback(() => {
    if (stockDetail) {
      setShowStockModal(false);

      router.push({
        pathname: "/stock-detail",
        params: {
          symbol: stockDetail.ticker,
          companyName: stockDetail.companyName,
          exchange: stockDetail.exchange,
          currentPrice: stockDetail.currentPrice * 1000,
          changePercent: stockDetail.percentChange,
          high: stockDetail.high,
          average: stockDetail.average,
          low: stockDetail.low,
          ceiling: stockDetail.ceiling,
          reference: stockDetail.reference,
          floor: stockDetail.floor,
        },
      });
    }
  }, [stockDetail, router]);

  const getTreemapData = useCallback(async () => {
    try {
      setIsLoading(true);
      // const response = await axiosClient.get("/stocks/iboard");
      // const dataBoard = response?.data;

      // if (!dataBoard || !Array.isArray(dataBoard)) {
      //   console.warn("Invalid treemap data received from API");
      //   setIsLoading(false);
      //   return;
      // }

      // let sortedDataBoard = dataBoard.sort((a: any, b: any) => {
      //   return (a?.os?.c || "").localeCompare(b?.os?.c || "");
      // });

      // sortedDataBoard = sortedDataBoard.filter(
      //   (item: any) => item?.os?.c?.length === 3
      // );

      // const mappedTreemapData: StockNode[] = sortedDataBoard
      //   .map((item: any) => {
      //     const stockSymbol = item?.os?.c || "";
      //     const sector = findSectorForStock(stockSymbol);

      //     return {
      //       ticker: stockSymbol,
      //       name: stockSymbol,
      //       sector: sector,
      //       value: item?.os?.dv || 0,
      //       changePct: item?.os?.dcp || 0,
      //     };
      //   })
      //   .filter(
      //     (item: StockNode) =>
      //       item.ticker && item.value > 0 && item.sector !== "Khác"
      //   );

      const response = await axiosClient.get("/stock-overview");
      const dataBoard = response?.data?.data;

      if (!dataBoard || !Array.isArray(dataBoard)) {
        console.warn("Invalid treemap data received from API");
        setIsLoading(false);
        return;
      }

      let sortedDataBoard = dataBoard.sort((a: any, b: any) => {
        return (a?.c || "").localeCompare(b?.c || "");
      });

      sortedDataBoard = sortedDataBoard.filter(
        (item: any) => item?.c?.length === 3
      );

      const mappedTreemapData: StockNode[] = sortedDataBoard
        .map((item: any) => {
          const stockSymbol = item?.c || "";
          const sector = findSectorForStock(stockSymbol);

          return {
            ticker: stockSymbol,
            name: stockSymbol,
            sector: sector,
            value: item?.dv || 0,
            changePct: item?.dcp || 0,
          };
        })
        .filter(
          (item: StockNode) =>
            item.ticker && item.value > 0 && item.sector !== "Khác"
        );

      const maxValue = Math.max(...mappedTreemapData.map((item) => item.value));
      const minVisibleValue = maxValue * 0.16;

      const adjustedTreemapData = mappedTreemapData.map((item) => ({
        ...item,
        originalValue: item.value,
        value: Math.max(item.value, minVisibleValue),
      }));

      const groupedBySector = adjustedTreemapData.reduce((acc, stock) => {
        if (!acc[stock.sector]) {
          acc[stock.sector] = [];
        }
        acc[stock.sector].push(stock);
        return acc;
      }, {} as Record<string, StockNode[]>);

      const filteredTreemapData: StockNode[] = [];
      Object.keys(groupedBySector).forEach((sector) => {
        let topCount = 15;
        switch (sector) {
          case "Ngân hàng":
            topCount = 15;
            break;
          case "Chứng khoán":
            topCount = 8;
            break;
          case "Bất động sản":
            topCount = 15;
            break;
          case "Tiêu dùng":
            topCount = 8;
            break;
          case "Logistics":
            topCount = 8;
            break;
          case "Dầu khí":
            topCount = 5;
            break;
          case "Công nghệ":
            topCount = 4;
          case "Vật liệu":
            topCount = 4;
          default:
            topCount = 15;
        }

        const sortedStocks = groupedBySector[sector]
          .sort(
            (a, b) =>
              (b.originalValue || b.value) - (a.originalValue || a.value)
          )
          .slice(0, topCount);

        filteredTreemapData.push(...sortedStocks);
      });

      setTreemapData(filteredTreemapData);
    } catch (error) {
      console.error("Error fetching treemap data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [findSectorForStock]);

  const getChangeCount = useCallback(async () => {
    try {
      const response = await axiosClient.get("/change_count/VNINDEX");
      const dataTop20 = response?.data?.data?.[0];
      if (dataTop20) {
        setUpCount(dataTop20?.advance || 0);
        setDownCount(dataTop20?.decline || 0);
        setNoChangeCount(dataTop20?.noChange || 0);
      }
    } catch (error) {
      console.error("Error fetching change count data:", error);
    }
  }, []);

  const [curSan, setCurSan] = useState("HOSE");
  const [dataChangeTuDoanh, setDataChangeTuDoanh] = useState<any>({});
  const [dataTopTuDoanhBan, setDataTopTuDoanhBan] = useState<any[]>([]);
  const [dataTopTuDoanhMua, setDataTopTuDoanhMua] = useState<any[]>([]);

  const reorderFromMiddle = useCallback((arr: any[]) => {
    if (!arr || arr.length === 0) return [];
    const result = [];
    const mid = Math.floor(arr.length / 2);

    for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 0) {
        result.push(arr[mid + Math.floor(i / 2)]);
      } else {
        result.push(arr[mid - Math.ceil(i / 2)]);
      }
    }

    return result.filter((item) => item !== undefined);
  }, []);

  const getDataTuDoanhAll = useCallback(async () => {
    try {
      const responseNuocNgoai = await axiosClient.get(`/tu_doanh_all`);
      const responseTuDoanh = await axiosClient.get(`/tu_doanh`);
      const dataTuDoanh = responseTuDoanh?.data?.data;

      const dataTuDoanhFilter = dataTuDoanh?.filter(
        (item: any, index: number) => {
          return (
            !!item?.ma_ck && item?.ma_ck !== "all" && item?.ma_ck?.length === 3
          );
        }
      );
      const filterSumData = dataTuDoanh?.filter((item: any, index: number) => {
        return item?.ma_ck === "all";
      });

      const dataTuDoanhMap = dataTuDoanhFilter?.map(
        (item: any, index: number) => {
          return {
            ...item,
            sell_val: +item?.sell_val,
            buy_val: +item?.buy_val,
            sell_vol: +item?.sell_vol,
            buy_vol: +item?.buy_vol,
            net_val: +item?.buy_val - +item?.sell_val,
            net_vol: +item?.buy_vol - +item?.sell_vol,
          };
        }
      );

      let topDataTuDoanhMua = dataTuDoanhMap
        ?.slice()
        ?.sort((a: any, b: any) => b.net_val - a.net_val);

      let topDataTuDoanhBan = dataTuDoanhMap
        ?.slice()
        ?.sort((a: any, b: any) => a.net_val - b.net_val);

      let objectDataTuDoanh = {
        sellVol: filterSumData[0]?.sell_vol,
        buyVol: filterSumData[0]?.buy_vol,
        netVol: +filterSumData[0]?.buy_vol - +filterSumData[0]?.sell_vol,
        sellVal: filterSumData[0]?.sell_val,
        buyVal: filterSumData[0]?.buy_val,
        netVal: filterSumData[0]?.buy_val - filterSumData[0]?.sell_val,
      };
      if (curSan === "HOSE") {
        objectDataTuDoanh = {
          sellVol: "6660000",
          buyVol: " 14870000",
          netVol: 11269500,
          sellVal: "930335742",
          buyVal: "492215742",
          netVal: -438120000,
        };
      } else {
        objectDataTuDoanh = {
          sellVol: "260000 ",
          buyVol: "1929500",
          netVol: 4060300,
          sellVal: "103941565",
          buyVal: "89391565",
          netVal: -14550000,
        };
        topDataTuDoanhBan = [
          {
            ma_ck: "PVS",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 52114665,
            buy_val: 52114665,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: -32800000,
            net_vol: 346300,
          },
          {
            ma_ck: "PVS",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 47114665,
            buy_val: 47114665,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: -3280000,
            net_vol: 346300,
          },
          {
            ma_ck: "MBS",
            sell_vol: -535400,
            buy_vol: 951700,
            sell_val: 43114665,
            buy_val: 43114665,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: -4730000,
            net_vol: 810000,
          },
          {
            ma_ck: "DL1",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 19114665,
            buy_val: 19114665,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: -600000,
            net_vol: 346300,
          },
          {
            ma_ck: "NTP",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 61114665,
            buy_val: 61114665,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: -440000,
            net_vol: 346300,
          },
        ].sort((a, b) => a.net_val - b.net_val);
        topDataTuDoanhMua = [
          {
            ma_ck: "MST",
            sell_vol: 1410400,
            buy_vol: 951700,
            sell_val: 14098985,
            buy_val: 770000,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: 3780000,
            net_vol: 770000,
          },
          {
            ma_ck: "IDC",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 14098985,
            buy_val: 429000,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: 57220000,
            net_vol: 429000,
          },
          {
            ma_ck: "IDC",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 14098985,
            buy_val: 22114665,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: 572200000,
            net_vol: 429000,
          },
          {
            ma_ck: "CEO",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 14098985,
            buy_val: 14098985,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: 134000,
            net_vol: 429000,
          },
          {
            ma_ck: "TNG",
            sell_vol: 605400,
            buy_vol: 951700,
            sell_val: 14098985,
            buy_val: 605400,
            date_time: "2024-08-09T01:16:03.000Z",
            net_val: 130000,
            net_vol: 429000,
          },
        ].sort((a, b) => b.net_val - a.net_val);
      }
      let reorderSell = reorderFromMiddle(topDataTuDoanhBan);
      let reorderBuy = reorderFromMiddle(topDataTuDoanhMua);

      setDataChangeTuDoanh(objectDataTuDoanh);
      setDataTopTuDoanhBan(reorderSell);
      setDataTopTuDoanhMua(reorderBuy);
      let dataNuocNgoai = responseNuocNgoai?.data?.data;
      dataNuocNgoai = dataNuocNgoai?.map((item: any) => {
        return {
          ...item,
          tradingDate: item?.date,
        };
      });
      const filterCurSan = dataNuocNgoai?.filter((item: any) => {
        return item?.code === `${curSan === "HOSE" ? "VNINDEX" : curSan}`;
      });
      let sliceData = filterCurSan?.slice(0, 17);

      if (sliceData.length > 0) setDataChangeTuDoanhAll([...sliceData]);
    } catch (error) {
      console.error("Error fetching tu doanh chart data:", error);
    }
  }, [curSan, reorderFromMiddle]);

  const getDataNuocNgoaiAll = useCallback(async () => {
    try {
      const response = await axiosClient.get("/nuoc_ngoai_all");
      const dataNuocNgoai = response?.data?.data;

      if (!dataNuocNgoai) {
        console.warn("No data received from nuoc_ngoai_all API");
        return;
      }

      const filterCurSan = dataNuocNgoai?.filter((item: any) => {
        return item?.code === "STOCK_HOSE";
      });

      const groupBy = (array: any[], key: string) => {
        return array.reduce((acc: any, item: any) => {
          const group = item[key];
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(item);
          return acc;
        }, {});
      };

      const sumBy = (array: any[], key: string) => {
        return array.reduce(
          (sum: number, item: any) => sum + (item[key] || 0),
          0
        );
      };

      const groupData = groupBy(filterCurSan, "tradingDate");
      let chartData = Object.values(groupData)?.map((item: any) => {
        return {
          netVal: sumBy(item, "netVal"),
          netVol: sumBy(item, "netVol"),
          buyVal: sumBy(item, "buyVal"),
          sellVal: sumBy(item, "sellVal"),
          tradingDate: item[0]?.tradingDate,
        };
      });

      chartData = chartData.slice(0, 17);
      if (chartData.length > 0) {
        setDataChangeNuocNgoaiAll(chartData);
      }
    } catch (error) {
      console.error("Error fetching column chart data:", error);
    }
  }, []);

  const getVietnameseIndices = useCallback(async () => {
    try {
      const response = await axiosClient.get("/indexes-overview");

      const indexData = response?.data?.data;

      if (indexData && Array.isArray(indexData)) {
        const filteredIndices = indexData;

        const sortedIndices = filteredIndices.sort((a: any, b: any) => {
          const order = [
            "VNIndex",
            "VN30",
            "HNXIndex",
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
    getTreemapData();
    getChangeCount();
    getDataNuocNgoaiAll();
    getDataTuDoanhAll();
    getVietnameseIndices();
    fetchStockOverviewData();

    const interval = setInterval(() => {
      getTreemapData();
      getChangeCount();
      getDataNuocNgoaiAll();
      getDataTuDoanhAll();
      getVietnameseIndices();
      fetchStockOverviewData();
    }, 5000);

    return () => clearInterval(interval);
  }, [
    getTreemapData,
    getChangeCount,
    getDataNuocNgoaiAll,
    getDataTuDoanhAll,
    getVietnameseIndices,
    fetchStockOverviewData,
  ]);

  const processColumnChartData = useMemo(() => {
    if (!dataChangeNuocNgoaiAll || dataChangeNuocNgoaiAll.length === 0) {
      return {
        chartBars: [
          {
            x: 0,
            height: 25,
            color: theme.colors.green,
            data: {
              netVal: 50000000000,
              buyVal: 75000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-22",
              netVol: 1000000,
            },
            index: 0,
          },
          {
            x: 16,
            height: 30,
            color: theme.colors.green,
            data: {
              netVal: 60000000000,
              buyVal: 85000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-23",
              netVol: 1200000,
            },
            index: 1,
          },
          {
            x: 32,
            height: 8,
            color: theme.colors.green,
            data: {
              netVal: 15000000000,
              buyVal: 40000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-24",
              netVol: 800000,
            },
            index: 2,
          },
          {
            x: 48,
            height: 35,
            color: theme.colors.green,
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-25",
              netVol: 1100000,
            },
            index: 3,
          },
          {
            x: 64,
            height: 40,
            color: theme.colors.green,
            data: {
              netVal: 80000000000,
              buyVal: 105000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-26",
              netVol: 1300000,
            },
            index: 4,
          },
          {
            x: 80,
            height: 32,
            color: theme.colors.green,
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-27",
              netVol: 950000,
            },
            index: 5,
          },
          {
            x: 96,
            height: 38,
            color: theme.colors.green,
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-28",
              netVol: 1150000,
            },
            index: 6,
          },
          {
            x: 112,
            height: 35,
            color: theme.colors.green,
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-29",
              netVol: 1050000,
            },
            index: 7,
          },
          {
            x: 128,
            height: 15,
            color: theme.colors.green,
            data: {
              netVal: 30000000000,
              buyVal: 55000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-30",
              netVol: 750000,
            },
            index: 8,
          },
          {
            x: 144,
            height: 42,
            color: theme.colors.green,
            data: {
              netVal: 85000000000,
              buyVal: 110000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-01",
              netVol: 1250000,
            },
            index: 9,
          },
          {
            x: 160,
            height: 28,
            color: theme.colors.green,
            data: {
              netVal: 55000000000,
              buyVal: 80000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-02",
              netVol: 900000,
            },
            index: 10,
          },
          {
            x: 176,
            height: 32,
            color: theme.colors.green,
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-03",
              netVol: 980000,
            },
            index: 11,
          },
          {
            x: 192,
            height: 38,
            color: theme.colors.green,
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-04",
              netVol: 1180000,
            },
            index: 12,
          },
          {
            x: 208,
            height: 45,
            color: theme.colors.green,
            data: {
              netVal: 90000000000,
              buyVal: 115000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-05",
              netVol: 1370000,
            },
            index: 13,
          },
          {
            x: 224,
            height: 40,
            color: theme.colors.green,
            data: {
              netVal: 80000000000,
              buyVal: 105000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-06",
              netVol: 1280000,
            },
            index: 14,
          },
          {
            x: 240,
            height: 38,
            color: theme.colors.green,
            data: {
              netVal: 75000000000,
              buyVal: 100000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-07",
              netVol: 1200000,
            },
            index: 15,
          },
          {
            x: 256,
            height: 35,
            color: theme.colors.green,
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-08",
              netVol: 1150000,
            },
            index: 16,
          },
          {
            x: 272,
            height: 32,
            color: theme.colors.green,
            data: {
              netVal: 65000000000,
              buyVal: 90000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-09",
              netVol: 1080000,
            },
            index: 17,
          },
          {
            x: 288,
            height: 36,
            color: theme.colors.green,
            data: {
              netVal: 72000000000,
              buyVal: 97000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-10",
              netVol: 1220000,
            },
            index: 18,
          },
          {
            x: 304,
            height: 50,
            color: theme.colors.red,
            data: {
              netVal: -100000000000,
              buyVal: 15000000000,
              sellVal: 115000000000,
              tradingDate: "2024-09-11",
              netVol: -500000,
            },
            index: 19,
          },
          {
            x: 320,
            height: 45,
            color: theme.colors.green,
            data: {
              netVal: 90000000000,
              buyVal: 115000000000,
              sellVal: 25000000000,
              tradingDate: "2024-09-12",
              netVol: 1400000,
            },
            index: 20,
          },
        ],
        negBars: [
          {
            x: 64,
            height: 60,
            color: theme.colors.green,
            data: {
              netVal: -120000000000,
              buyVal: 20000000000,
              sellVal: 140000000000,
              tradingDate: "2024-08-26",
              netVol: -800000,
            },
            index: 4,
          },
          {
            x: 80,
            height: 80,
            color: theme.colors.green,
            data: {
              netVal: -160000000000,
              buyVal: 15000000000,
              sellVal: 175000000000,
              tradingDate: "2024-08-27",
              netVol: -1200000,
            },
            index: 5,
          },
          {
            x: 144,
            height: 70,
            color: theme.colors.green,
            data: {
              netVal: -140000000000,
              buyVal: 18000000000,
              sellVal: 158000000000,
              tradingDate: "2024-09-01",
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

    const sortedData = [...dataChangeNuocNgoaiAll].sort(
      (a, b) =>
        new Date(a.tradingDate).getTime() - new Date(b.tradingDate).getTime()
    );

    const chartWidth = layout.width - 48; // 16 (marginHorizontal) + 32 (padding)
    const barWidth = 12;
    const spacing = 8;
    const totalBars = Math.min(
      sortedData.length,
      Math.floor((chartWidth + spacing) / (barWidth + spacing))
    );
    const actualSpacing =
      totalBars > 1 ? (chartWidth - totalBars * barWidth) / (totalBars - 1) : 0;

    const allValues = sortedData.map((d) => d.netVal || 0);
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const maxAbsValue = Math.max(Math.abs(maxValue), Math.abs(minValue));

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

      const maxHeight = value >= 0 ? 50 : 80;
      const height =
        Math.abs(value) > 0
          ? Math.max(5, (Math.abs(value) / maxAbsValue) * maxHeight)
          : 5;

      const x = i * (barWidth + actualSpacing);
      const color = value >= 0 ? theme.colors.green : theme.colors.red;

      if (value >= 0) {
        chartBars.push({ x, height, color, data: item, index: dataIndex });
      } else {
        negBars.push({ x, height, color, data: item, index: dataIndex });
      }
    }

    const formatValue = (value: number) => {
      const inBillion = value / 1000000000;
      return `${inBillion.toFixed(1)}`;
    };

    const formatValueYi = (value: number) => {
      const inYi = value / 100000000;
      return `${inYi.toFixed(2)}`;
    };

    const calculateNetFlow = (days: number) => {
      const recentData = sortedData.slice(-days);
      const total = recentData.reduce(
        (sum, item) => sum + (item.netVal || 0),
        0
      );
      return formatValueYi(total);
    };

    const startDate = sortedData[0]?.tradingDate;
    const endDate = sortedData[sortedData.length - 1]?.tradingDate;
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
      ),
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
  }, [dataChangeNuocNgoaiAll, layout.width]);

  const processColumnChartDataTuDoanh = useMemo(() => {
    if (!dataChangeTuDoanhAll || dataChangeTuDoanhAll.length === 0) {
      return {
        chartBars: [
          {
            x: 0,
            height: 25,
            color: theme.colors.green,
            data: {
              netVal: 50000000000,
              buyVal: 75000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-22",
              netVol: 1000000,
            },
            index: 0,
          },
          {
            x: 16,
            height: 30,
            color: theme.colors.green,
            data: {
              netVal: 60000000000,
              buyVal: 85000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-23",
              netVol: 1200000,
            },
            index: 1,
          },
          {
            x: 32,
            height: 8,
            color: theme.colors.green,
            data: {
              netVal: 15000000000,
              buyVal: 40000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-24",
              netVol: 800000,
            },
            index: 2,
          },
          {
            x: 48,
            height: 35,
            color: theme.colors.green,
            data: {
              netVal: 70000000000,
              buyVal: 95000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-25",
              netVol: 1100000,
            },
            index: 3,
          },
          {
            x: 64,
            height: 40,
            color: theme.colors.green,
            data: {
              netVal: 80000000000,
              buyVal: 105000000000,
              sellVal: 25000000000,
              tradingDate: "2024-08-26",
              netVol: 1300000,
            },
            index: 4,
          },
        ],
        negBars: [
          {
            x: 80,
            height: 60,
            color: theme.colors.red,
            data: {
              netVal: -120000000000,
              buyVal: 20000000000,
              sellVal: 140000000000,
              tradingDate: "2024-08-27",
              netVol: -800000,
            },
            index: 5,
          },
          {
            x: 144,
            height: 70,
            color: theme.colors.red,
            data: {
              netVal: -140000000000,
              buyVal: 18000000000,
              sellVal: 158000000000,
              tradingDate: "2024-09-01",
              netVol: -950000,
            },
            index: 9,
          },
        ],
        topValue: "800.0",
        bottomValue: "-1400.0",
        dateRange: { start: "08-22", end: "09-19" },
        metrics: {
          net20: "-200.28",
          net10: "-90.37",
          net5: "-50.20",
          net3: "-20.75",
        },
      };
    }

    const sortedData = [...dataChangeTuDoanhAll].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const chartWidth = layout.width - 48; // 16 (marginHorizontal) + 32 (padding)
    const barWidth = 12;
    const spacing = 8;
    const totalBars = Math.min(
      sortedData.length,
      Math.floor((chartWidth + spacing) / (barWidth + spacing))
    );
    const actualSpacing =
      totalBars > 1 ? (chartWidth - totalBars * barWidth) / (totalBars - 1) : 0;

    const allValues = sortedData.map((d) => d.netVal || 0);
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const maxAbsValue = Math.max(Math.abs(maxValue), Math.abs(minValue));

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

      const maxHeight = value >= 0 ? 50 : 50;
      const height =
        Math.abs(value) > 0
          ? Math.max(5, (Math.abs(value) / maxAbsValue) * maxHeight)
          : 5;

      const x = i * (barWidth + actualSpacing);
      const color = value >= 0 ? theme.colors.green : theme.colors.red;

      if (value >= 0) {
        chartBars.push({ x, height, color, data: item, index: dataIndex });
      } else {
        negBars.push({ x, height, color, data: item, index: dataIndex });
      }
    }

    const formatValue = (value: number) => {
      const inBillion = value / 1000000000;
      return `${inBillion.toFixed(1)}`;
    };

    const formatValueYi = (value: number) => {
      const inYi = value / 100000000;
      return `${inYi.toFixed(2)}`;
    };

    const calculateNetFlow = (days: number) => {
      const recentData = sortedData.slice(-days);
      const total = recentData.reduce(
        (sum, item) => sum + (item.netVal || 0),
        0
      );
      return formatValueYi(total);
    };

    const startDate = sortedData[0]?.date;
    const endDate = sortedData[sortedData.length - 1]?.date;
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
      ),
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
  }, [dataChangeTuDoanhAll, layout.width]);

  const groupBy = <T, K extends keyof any>(
    array: T[],
    key: (item: T) => K
  ): Map<K, T[]> => {
    return array.reduce((map, item) => {
      const group = key(item);
      const collection = map.get(group);
      if (!collection) {
        map.set(group, [item]);
      } else {
        collection.push(item);
      }
      return map;
    }, new Map<K, T[]>());
  };

  // OPTIMIZED: Memoize treemap computation


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      getTreemapData(),
      fetchStockOverviewData(),
    ]).finally(() => {
      setRefreshing(false);
    });
  }, [getTreemapData, fetchStockOverviewData]);

  const treemapComponent = useMemo(() => {
    const { width } = layout;
    const height = width * 1.4;
    const padding = 0;
    const labelH = 22;
    const gap = 1;

    const sectorsMap = groupBy(currentTreemapData, (d: StockNode) => d.sector);
    const sectors = Array.from(sectorsMap, ([sector, items]) => ({
      sector,
      items,
    }));

    const root = d3
      .hierarchy<any>({
        children: sectors.map((s) => ({
          name: s.sector,
          children: s.items.map((it: StockNode) => ({ ...it })),
        })),
      })
      .sum((d: any) => d.value ?? 0)
      .sort((a: any, b: any) => b.value! - a.value!);

    const treemap = d3
      .treemap<any>()
      .tile(d3.treemapBinary)
      .size([width - padding * 2, height - padding * 2])
      .paddingInner(gap)
      .paddingTop((node: any) => (node.depth === 1 ? labelH : 0))
      .round(true);

    treemap(root);

    return (
      <View
        style={[
          styles.treemapContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Svg width={width} height={height}>
          {root.children?.map((sec: any, i: number) => (
            <G key={`sec-${i}`} pointerEvents="none">
              <Rect
                x={sec.x0 + padding}
                y={sec.y0 + padding}
                width={sec.x1 - sec.x0}
                height={sec.y1 - sec.y0}
                fill="none"
                stroke={isDark ? "#0b0e14" : "#e5e7eb"}
                strokeWidth={1}
              />
              <Rect
                x={sec.x0 + padding}
                y={sec.y0 + padding}
                width={sec.x1 - sec.x0}
                height={labelH}
                fill={isDark ? "#202127" : "#f3f4f6"}
              />
              <SvgText
                x={sec.x0 + padding + 8}
                y={sec.y0 + padding + labelH - 7}
                fontSize={12}
                fontWeight="700"
                fill={isDark ? "#cbd5e1" : "#374151"}
              >
                {sec.data.name}
              </SvgText>
            </G>
          ))}

          {root.leaves().map((leaf: any, index: number) => {
            const n = leaf.data as StockNode;
            const cell = {
              key: `${n.ticker}-${index}`,
              x: leaf.x0 + padding,
              y: leaf.y0 + padding,
              w: Math.max(leaf.x1 - leaf.x0, 0),
              h: Math.max(leaf.y1 - leaf.y0, 0),
              ticker: n.ticker,
              change: n.changePct,
            };
            return (
              <TreemapCell
                key={cell.key}
                cell={cell}
                isDark={isDark}
                stockOverviewData={stockOverviewData}
              />
            );
          })}
        </Svg>

        {/* Overlay Pressables for Instant Touch Response */}
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {root.leaves().map((leaf: any, index: number) => {
            const n = leaf.data as StockNode;
            const x = leaf.x0 + padding;
            const y = leaf.y0 + padding;
            const w = Math.max(leaf.x1 - leaf.x0, 0);
            const h = Math.max(leaf.y1 - leaf.y0, 0);

            return (
              <Pressable
                key={`touch-${n.ticker}-${index}`}
                style={({ pressed }) => ({
                  position: "absolute",
                  left: x,
                  top: y,
                  width: w,
                  height: h,
                  backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "transparent",
                })}
                delayPressIn={0}
                onPress={() => handleStockPress(n)}
              />
            );
          })}
        </View>
      </View>
    );
  }, [
    currentTreemapData,
    layout.width,
    isDark,
    stockOverviewData,
    handleStockPress,
  ]);
  const colors = {
    background: isDark ? "#0f1115" : "#fff",
    cardBackground: isDark ? "#202127" : "#F4F5F6",
    text: isDark ? "#ABADBA" : "#000000",
    secondaryText: isDark ? "#373943" : "#666666",
    border: isDark ? "#2a3340" : "#e0e0e0",
    green: theme.colors.green,
    red: theme.colors.red,
    purple: theme.colors.purple,
    orange: theme.colors.yellow,
    blue: theme.colors.cyan,
  };

  const [htmlContent, setHtmlContent] = useState<string>("");
  const bundlePath = RNFS.MainBundlePath;
  const indexPath = `${bundlePath}/tradingview/index.html`;

  useEffect(() => {
    (async () => {
      try {
        console.log("Bundle Path:", bundlePath);

        const chartingLibExists = await RNFS.exists(
          `${bundlePath}/tradingview/charting_library`
        );
        const datafeedsExists = await RNFS.exists(
          `${bundlePath}/tradingview/datafeeds`
        );

        console.log("charting_library exists?", chartingLibExists);
        console.log("datafeeds exists?", datafeedsExists);

        if (!chartingLibExists || !datafeedsExists) {
          console.error("❌ Required folders not found in bundle!");
          console.log(
            "Please add charting_library and datafeeds folders to Xcode Copy Bundle Resources"
          );
        }

        const exists = await RNFS.exists(indexPath);

        if (exists) {
          const content = await RNFS.readFile(indexPath, "utf8");
          console.log("✅ HTML loaded, length:", content.length);
          setHtmlContent(content);
        } else {
          console.error("❌ index.html not found");
        }
      } catch (err) {
        console.error("Error loading HTML:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const chartColors = useMemo(() => ({ background: "#0B1018" }), []);
  const [chartKey, setChartKey] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      setChartKey((prev) => prev + 1);
    }, [])
  );

  const injectedJavaScriptBeforeContentLoaded = useMemo(() => {
    const sym = currentIndex || "VNINDEX";
    const themeMode = theme.mode || "dark";

    return `
                  window.__INITIAL_SYMBOL__ = '${sym}';
                  window.__INITIAL_THEME__ = '${themeMode}';
                  window.__FAST_LOAD__ = true;
                  true;
                `;
  }, [currentIndex, theme.mode]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        delaysContentTouches={false}
      >  <ScrollView
        style={styles.globalIndicesContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
          {vietnameseIndices.map((index, indexKey) => {
            const isPositive = (index.dc || 0) >= 0;
            const strokeColor = isPositive ? "#05B168" : "#E86066";

            const formatVolume = (volume: number) => {
              const inBillion = volume / 1000000000000;
              return `${inBillion.toFixed(1)} K tỷ`;
            };

            const formatPrice = (price: number) => {
              return price.toFixed(2);
            };

            const formatChange = (change: number) => {
              const sign = change >= 0 ? "+" : "";
              return `${sign}${change.toFixed(2)}`;
            };

            const formatChangePercent = (changePercent: number) => {
              const sign = changePercent >= 0 ? "+" : "";
              return `${sign}${changePercent.toFixed(2)}%`;
            };

            const getGradientAndBorderColors = (indexPosition: number) => {
              const remainder = indexPosition % 3;

              if (remainder === 0) {
                return {
                  gradientColors: ["#112C26", "#121317"] as [string, string],
                  borderColor: "#112B25",
                  borderColorActive: "#235a4e",
                };
              } else if (remainder === 1) {
                return {
                  gradientColors: ["#33142C", "#121317"] as [string, string],
                  borderColor: "#33142C",
                  borderColorActive: "#612152",
                };
              } else {
                return {
                  gradientColors: ["#332414", "#121317"] as [string, string],
                  borderColor: "#332414",
                  borderColorActive: "#ce975c",
                };
              }
            };

            const colorConfig = getGradientAndBorderColors(indexKey);

            return (
              <TouchableOpacity
                key={indexKey}
                activeOpacity={0.8}
                onPress={() => {
                  if (index.c === "HNXIndex") {
                    setCurrentIndex("HNX");
                  } else if (index.c === "HNXUpcomIndex") {
                    setCurrentIndex("UPCOM");
                  } else {
                    setCurrentIndex(index.c);
                  }
                }}
              >
                <LinearGradient
                  colors={
                    theme?.mode === "dark"
                      ? colorConfig.gradientColors
                      : ["#F4F5F6", "#F4F5F6"]
                  }
                  style={[
                    styles.indexCard,
                    {
                      borderColor:
                        currentIndex === index.c ||
                          (currentIndex === "HNX" && index.c === "HNXIndex") ||
                          (currentIndex === "UPCOM" &&
                            index.c === "HNXUpcomIndex")
                          ? colorConfig.borderColorActive
                          : "transparent",
                      borderWidth: 1,
                      borderRadius: 12,
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
                  <Text
                    style={[
                      styles.indexValue,
                      {
                        color:
                          index.dc > 0
                            ? "#05B168"
                            : index.dc < 0
                              ? "#E86066"
                              : theme.colors.text,
                      },
                    ]}
                  >
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
                  <Text
                    style={[
                      styles.indexVolume,
                      {
                        color: theme.colors.textResult,
                      },
                    ]}
                  >
                    GT: {formatToTy(index.dve)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}

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

        {/* CP tác động */}
        <View
          style={[
            styles.stockImpactContainer,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.impactLegendContainer}>
            <View style={styles.impactLegendItem}>
              <View
                style={[
                  styles.impactLegendDot,
                  { backgroundColor: theme.colors.green },
                ]}
              />
              <Text
                style={[
                  styles.impactLegendText,
                  { color: theme.colors.textResult },
                ]}
              >
                Tăng
              </Text>
            </View>
            <View style={styles.impactLegendItem}>
              <View
                style={[
                  styles.impactLegendDot,
                  { backgroundColor: theme.colors.red },
                ]}
              />
              <Text
                style={[
                  styles.impactLegendText,
                  { color: theme.colors.textResult },
                ]}
              >
                Giảm
              </Text>
            </View>
            <View style={styles.impactLegendItem}>
              <View
                style={[
                  styles.impactLegendDot,
                  { backgroundColor: theme.colors.yellow },
                ]}
              />
              <Text
                style={[
                  styles.impactLegendText,
                  { color: theme.colors.textResult },
                ]}
              >
                Không đổi
              </Text>
            </View>
          </View>

          <Text style={[styles.impactTitle, { color: theme.colors.text }]}>
            Số lượng CP, tác động tới VNINDEX
          </Text>

          <View style={styles.impactChartContainer}>
            <View style={styles.impactBar}>
              <View
                style={[
                  styles.impactBarSection,
                  { backgroundColor: theme.colors.green, flex: upCount || 1 },
                ]}
              >
                <Text style={styles.impactBarText}>{upCount}</Text>
              </View>
              <View
                style={[
                  styles.impactBarSection,
                  {
                    backgroundColor: theme.colors.yellow,
                    flex: noChangeCount || 1,
                  },
                ]}
              >
                <Text style={styles.impactBarText}>{noChangeCount}</Text>
              </View>
              <View
                style={[
                  styles.impactBarSection,
                  { backgroundColor: theme.colors.red, flex: downCount || 1 },
                ]}
              >
                <Text style={styles.impactBarText}>{downCount}</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 410,
            width: "100%",
            marginVertical: 8,
            paddingHorizontal: 8,
          }}
        >
          {/* <ChartWebViews key={chartKey} symbol={'VNINDEX'} colors={chartColors} /> */}
          <WebView
            key={currentIndex}
            ref={smallRef}
            source={{
              html: baseHtml,
              baseUrl: baseUrl,
            }}
            originWhitelist={["*"]}
            javaScriptEnabled
            domStorageEnabled={true}
            allowFileAccess
            allowFileAccessFromFileURLs
            allowUniversalAccessFromFileURLs
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentInsetAdjustmentBehavior="never"
            // onMessage={onSmallMessage}
            // onError={onWebViewError}
            // onLoadEnd={onSmallLoadEnd}
            style={styles.webview}
            mixedContentMode="always"
            allowsInlineMediaPlayback
            cacheEnabled={true}
            incognito={false}
            injectedJavaScriptBeforeContentLoaded={
              injectedJavaScriptBeforeContentLoaded
            }
            startInLoadingState={false}
            androidLayerType="hardware"
          />
          {isFake && (
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: theme.colors.green,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  marginRight: 6,
                }}
              />
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
                LIVE
              </Text>
            </View>
          )}
        </View>

        <View
          style={[styles.section, { backgroundColor: colors.cardBackground }]}
        >
          {treemapComponent}
        </View>

        {/* Column Chart NĐTNN */}
        <View
          style={[
            styles.columnChartContainer,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <Text style={[styles.impactTitle, { color: theme.colors.text }]}>
            Giao dịch NĐTNN
          </Text>
          <View style={styles.chartArea}>
            <View style={styles.barsContainer}>
              <Svg
                width={layout.width - 48}
                height={170}
                viewBox={`0 0 ${layout.width - 48} 170`}
              >
                <G>
                  {processColumnChartData.chartBars.map((bar, index) => (
                    <G key={index}>
                      <Rect
                        x={bar.x}
                        y={60 - bar.height}
                        width={12}
                        height={bar.height}
                        fill={bar.color}
                        rx={2}
                      />
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
                  ))}

                  {processColumnChartData.negBars.map((bar, index) => (
                    <G key={`neg-${index}`}>
                      <Rect
                        x={bar.x}
                        y={60}
                        width={12}
                        height={bar.height}
                        fill={bar.color}
                        rx={2}
                      />
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
                  ))}

                  {(() => {
                    const highestBar = processColumnChartData.chartBars.reduce(
                      (max, bar) => (bar.height > max.height ? bar : max),
                      processColumnChartData.chartBars[0] || {
                        height: 0,
                        x: 15,
                      }
                    );
                    const topLineY = 60 - highestBar.height;
                    return (
                      <>
                        <Path
                          d={`M0,${topLineY} L${layout.width - 48},${topLineY}`}
                          stroke={colors.secondaryText}
                          strokeWidth={0.8}
                          strokeDasharray="8,3"
                          opacity={0.6}
                        />
                        <SvgText
                          x={0}
                          y={topLineY - 2}
                          fontSize={10}
                          fill={colors.text}
                          fontWeight="400"
                        >
                          {processColumnChartData.topValue} tỷ
                        </SvgText>
                      </>
                    );
                  })()}

                  {(() => {
                    const lowestBar =
                      processColumnChartData.negBars.length > 0
                        ? processColumnChartData.negBars.reduce(
                          (max, bar) => (bar.height > max.height ? bar : max),
                          processColumnChartData.negBars[0]
                        )
                        : null;

                    const bottomLineY = lowestBar ? 60 + lowestBar.height : 140;

                    return (
                      <>
                        <Path
                          d={`M0,${bottomLineY} L${layout.width - 48
                            },${bottomLineY}`}
                          stroke={colors.secondaryText}
                          strokeWidth={0.8}
                          strokeDasharray="8,3"
                          opacity={0.6}
                        />
                        <SvgText
                          x={0}
                          y={bottomLineY + 15}
                          fontSize={10}
                          fill={colors.text}
                          fontWeight="400"
                        >
                          {processColumnChartData.bottomValue} tỷ
                        </SvgText>
                      </>
                    );
                  })()}
                </G>
              </Svg>
            </View>

            <View style={styles.dateRange}>
              <Text style={styles.dateText}>
                {processColumnChartData.dateRange.start}
              </Text>
              <Text style={styles.dateText}>
                {processColumnChartData.dateRange.end}
              </Text>
            </View>
          </View>
        </View>

        {/* Column Chart Tự doanh */}
        <View
          style={[
            styles.columnChartContainer,
            { backgroundColor: colors.cardBackground, marginBottom: 8 },
          ]}
        >
          <Text style={[styles.impactTitle, { color: theme.colors.text }]}>
            Giao dịch tự doanh
          </Text>
          <View style={styles.chartArea}>
            <View style={styles.barsContainerTuDoanh}>
              <Svg
                width={layout.width - 48}
                height={170}
                viewBox={`0 0 ${layout.width - 48} 170`}
              >
                <G>
                  {processColumnChartDataTuDoanh.chartBars.map((bar, index) => (
                    <G key={index}>
                      <Rect
                        x={bar.x}
                        y={60 - bar.height}
                        width={12}
                        height={bar.height}
                        fill={bar.color}
                        rx={2}
                      />
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
                  ))}

                  {processColumnChartDataTuDoanh.negBars.map((bar, index) => (
                    <G key={`neg-${index}`}>
                      <Rect
                        x={bar.x}
                        y={60}
                        width={12}
                        height={bar.height}
                        fill={bar.color}
                        rx={2}
                      />
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
                  ))}

                  {(() => {
                    const highestBar =
                      processColumnChartDataTuDoanh.chartBars.reduce(
                        (max, bar) => (bar.height > max.height ? bar : max),
                        processColumnChartDataTuDoanh.chartBars[0] || {
                          height: 0,
                          x: 15,
                        }
                      );
                    const topLineY = 60 - highestBar.height;
                    return (
                      <>
                        <Path
                          d={`M0,${topLineY} L${layout.width - 48},${topLineY}`}
                          stroke={colors.secondaryText}
                          strokeWidth={0.8}
                          strokeDasharray="8,3"
                          opacity={0.6}
                        />
                        <SvgText
                          x={0}
                          y={topLineY - 2}
                          fontSize={10}
                          fill={colors.text}
                          fontWeight="400"
                        >
                          {processColumnChartDataTuDoanh.topValue} tỷ
                        </SvgText>
                      </>
                    );
                  })()}

                  {(() => {
                    const lowestBar =
                      processColumnChartDataTuDoanh.negBars.length > 0
                        ? processColumnChartDataTuDoanh.negBars.reduce(
                          (max, bar) => (bar.height > max.height ? bar : max),
                          processColumnChartDataTuDoanh.negBars[0]
                        )
                        : null;

                    const bottomLineY = lowestBar ? 60 + lowestBar.height : 140;

                    return (
                      <>
                        <Path
                          d={`M0,${bottomLineY} L${layout.width - 48
                            },${bottomLineY}`}
                          stroke={colors.secondaryText}
                          strokeWidth={0.8}
                          strokeDasharray="8,3"
                          opacity={0.6}
                        />
                        <SvgText
                          x={0}
                          y={bottomLineY + 15}
                          fontSize={10}
                          fill={colors.text}
                          fontWeight="400"
                        >
                          {processColumnChartDataTuDoanh.bottomValue} tỷ
                        </SvgText>
                      </>
                    );
                  })()}
                </G>
              </Svg>
            </View>

            <View style={styles.dateRange}>
              <Text style={styles.dateText}>
                {processColumnChartDataTuDoanh.dateRange.start}
              </Text>
              <Text style={styles.dateText}>
                {processColumnChartDataTuDoanh.dateRange.end}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Stock Detail Modal */}
      <Modal
        visible={showStockModal}
        transparent={true}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowStockModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressIn={() => setShowStockModal(false)}
        >
          <View
            style={[
              styles.stockModalContent,
              { backgroundColor: isDark ? "#1a1e2b" : "#ffffff" },
            ]}
            onStartShouldSetResponder={() => true}
          >
            onPress={(e) => e.stopPropagation()}
          >
            {stockDetail && (
              <>
                <View style={styles.stockModalHeader}>
                  <View style={styles.stockTitleContainer}>
                    <Text
                      style={[
                        styles.stockModalTicker,
                        { color: isDark ? "#ffffff" : "#000000" },
                      ]}
                    >
                      {stockDetail.ticker}
                    </Text>
                    <Text
                      style={[
                        styles.stockModalSector,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      {stockDetail.sector}
                    </Text>
                  </View>
                </View>

                <View style={styles.stockPriceContainer}>
                  <Text
                    style={[
                      styles.stockModalPrice,
                      {
                        color: (() => {
                          const currentPrice =
                            parseFloat(stockDetail.currentPrice) * 1000;
                          const reference = parseFloat(stockDetail.reference);
                          const ceiling = parseFloat(stockDetail.ceiling);
                          const floor = parseFloat(stockDetail.floor);

                          if (currentPrice === ceiling)
                            return theme.colors.purple;
                          if (currentPrice === floor) return theme.colors.cyan;
                          if (currentPrice === reference)
                            return theme.colors.yellow;
                          if (currentPrice > reference)
                            return theme.colors.green;
                          if (currentPrice < reference) return theme.colors.red;
                          return theme.colors.yellow;
                        })(),
                      },
                    ]}
                  >
                    {stockDetail.currentPrice}
                  </Text>
                  <Text
                    style={[
                      styles.stockModalChange,
                      {
                        color: (() => {
                          const currentPrice =
                            parseFloat(stockDetail.currentPrice) * 1000;
                          const reference = parseFloat(stockDetail.reference);
                          const ceiling = parseFloat(stockDetail.ceiling);
                          const floor = parseFloat(stockDetail.floor);

                          if (currentPrice === ceiling)
                            return theme.colors.purple;
                          if (currentPrice === floor) return theme.colors.cyan;
                          if (currentPrice === reference)
                            return theme.colors.yellow;
                          if (currentPrice > reference)
                            return theme.colors.green;
                          if (currentPrice < reference) return theme.colors.red;
                          return theme.colors.yellow;
                        })(),
                      },
                    ]}
                  >
                    {parseFloat(stockDetail.priceChange) >= 0 ? "+" : ""}
                    {stockDetail.priceChange} /{" "}
                    {parseFloat(stockDetail.percentChange) >= 0 ? "+" : ""}
                    {stockDetail.percentChange}%
                  </Text>
                </View>

                <View style={styles.stockDetailsGrid}>
                  <View style={styles.stockDetailRow}>
                    <Text
                      style={[
                        styles.stockDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Mã
                    </Text>
                    <Text
                      style={[
                        styles.stockDetailValue,
                        { color: isDark ? "#ffffff" : "#000000" },
                      ]}
                    >
                      {stockDetail.ticker}
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text
                      style={[
                        styles.stockDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Ngành
                    </Text>
                    <Text
                      style={[
                        styles.stockDetailValue,
                        { color: isDark ? "#ffffff" : "#000000" },
                      ]}
                    >
                      {stockDetail.sector}
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text
                      style={[
                        styles.stockDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Giá
                    </Text>
                    <Text
                      style={[
                        styles.stockDetailValue,
                        {
                          color: (() => {
                            const currentPrice =
                              parseFloat(stockDetail.currentPrice) * 1000;
                            const reference = parseFloat(stockDetail.reference);
                            const ceiling = parseFloat(stockDetail.ceiling);
                            const floor = parseFloat(stockDetail.floor);

                            if (currentPrice === ceiling)
                              return theme.colors.purple;
                            if (currentPrice === floor)
                              return theme.colors.cyan;
                            if (currentPrice === reference)
                              return theme.colors.yellow;
                            if (currentPrice > reference)
                              return theme.colors.green;
                            if (currentPrice < reference)
                              return theme.colors.red;
                            return theme.colors.yellow;
                          })(),
                        },
                      ]}
                    >
                      {stockDetail.currentPrice}
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text
                      style={[
                        styles.stockDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Thay đổi
                    </Text>
                    <Text
                      style={[
                        styles.stockDetailValue,
                        {
                          color: (() => {
                            const currentPrice =
                              parseFloat(stockDetail.currentPrice) * 1000;
                            const reference = parseFloat(stockDetail.reference);
                            const ceiling = parseFloat(stockDetail.ceiling);
                            const floor = parseFloat(stockDetail.floor);

                            if (currentPrice === ceiling)
                              return theme.colors.purple;
                            if (currentPrice === floor)
                              return theme.colors.cyan;
                            if (currentPrice === reference)
                              return theme.colors.yellow;
                            if (currentPrice > reference)
                              return theme.colors.green;
                            if (currentPrice < reference)
                              return theme.colors.red;
                            return theme.colors.yellow;
                          })(),
                        },
                      ]}
                    >
                      {parseFloat(stockDetail.priceChange) >= 0 ? "+" : ""}
                      {stockDetail.priceChange} /{" "}
                      {parseFloat(stockDetail.percentChange) >= 0 ? "+" : ""}
                      {stockDetail.percentChange}%
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text
                      style={[
                        styles.stockDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Khối lượng
                    </Text>
                    <Text
                      style={[
                        styles.stockDetailValue,
                        { color: isDark ? "#ffffff" : "#000000" },
                      ]}
                    >
                      {stockDetail.volume}
                    </Text>
                  </View>
                  <View style={styles.stockDetailRow}>
                    <Text
                      style={[
                        styles.stockDetailLabel,
                        { color: isDark ? "#8e8e93" : "#666666" },
                      ]}
                    >
                      Giá trị giao dịch
                    </Text>
                    <Text
                      style={[
                        styles.stockDetailValue,
                        { color: isDark ? "#ffffff" : "#000000" },
                      ]}
                    >
                      {stockDetail.marketCap}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.viewDetailButton}
                  onPress={navigateToStockDetail}
                >
                  <Text style={styles.viewDetailText}>Xem chi tiết</Text>
                  <Text style={styles.viewDetailArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.closeModalButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  activeOpacity={0.7}
                  onPressIn={() => setShowStockModal(false)}
                >
                  <Text style={styles.closeModalText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

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

                <View style={styles.netValueContainer}>
                  <Text
                    style={[
                      styles.netValueAmount,
                      {
                        color:
                          parseFloat(tradingData.netVal) >= 0
                            ? theme.colors.green
                            : theme.colors.red,
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
                      style={[
                        styles.tradingDetailValue,
                        { color: theme.colors.green },
                      ]}
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
                      style={[
                        styles.tradingDetailValue,
                        { color: theme.colors.red },
                      ]}
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
                              ? theme.colors.green
                              : theme.colors.red,
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
                                ? theme.colors.green
                                : theme.colors.red,
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
                              ? theme.colors.green
                              : theme.colors.red,
                        },
                      ]}
                    >
                      {parseFloat(tradingData.netVal) >= 0
                        ? "Mua ròng"
                        : "Bán ròng"}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.closeModalButton,
                    { backgroundColor: "#007AFF" },
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
    </SafeAreaView >
  );
}

// OPTIMIZED TreemapCell Component - Loại bỏ Reanimated
type Cell = {
  key: string;
  x: number;
  y: number;
  w: number;
  h: number;
  ticker: string;
  change: number;
};

const TreemapCell = React.memo<{
  cell: any;
  isDark: boolean;
  stockOverviewData: any[];
}>(
  ({ cell, isDark, stockOverviewData }) => {
    const { theme } = useTheme();

    // Cache color calculation
    const fillColor = React.useMemo(() => {
      const stockData = stockOverviewData.find(
        (stock: any) => stock.c === cell.ticker
      );

      if (stockData) {
        const currentPrice = stockData.p;
        const reference = stockData.rp;
        const ceiling = stockData.ce;
        const floor = stockData.f;

        if (currentPrice != null && reference != null) {
          if (ceiling != null && currentPrice === ceiling)
            return theme.colors.purple;
          if (floor != null && currentPrice === floor) return theme.colors.blue;
          if (currentPrice === reference) return theme.colors.yellow;
          if (currentPrice > reference) return theme.colors.green;
          if (currentPrice < reference) return theme.colors.red;
        }
      }

      if (cell.change == null || isNaN(cell.change)) return theme.colors.yellow; // Fallback to yellow if orange missing
      if (cell.change === 0) return theme.colors.yellow;
      if (cell.change > 0) return theme.colors.green;
      if (cell.change < 0) return theme.colors.red;
      return theme.colors.yellow;
    }, [cell.ticker, cell.change, stockOverviewData]);

    // Cache text formatting
    const { tickerSize, pctSize, lineGap, pctText } = React.useMemo(() => {
      const minSide = Math.min(cell.w, cell.h);

      let tickerSize, pctSize;
      if (minSide >= 80) {
        tickerSize = 18;
        pctSize = 14;
      } else if (minSide >= 60) {
        tickerSize = 13;
        pctSize = 11;
      } else if (minSide >= 45) {
        tickerSize = 10;
        pctSize = 9;
      } else {
        tickerSize = 7;
        pctSize = 7;
      }

      const lineGap = Math.max(2, Math.floor(minSide / 20));
      const pctText =
        cell.change != null && !isNaN(cell.change)
          ? `${cell.change > 0 ? "+" : ""}${cell.change.toFixed(2)}%`
          : "—";

      return { tickerSize, pctSize, lineGap, pctText };
    }, [cell.w, cell.h, cell.change]);

    return (
      <G>
        {/* KHÔNG dùng AnimatedRect - dùng Rect thường */}
        <Rect
          x={cell.x}
          y={cell.y}
          width={Math.max(0, cell.w)}
          height={Math.max(0, cell.h)}
          fill={fillColor}
          stroke={isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.9)"}
          strokeWidth={0.6}
        />



        <SvgText
          x={cell.x + cell.w / 2}
          y={cell.y + cell.h / 2 - lineGap / 2}
          fontSize={tickerSize}
          fontWeight="700"
          fill="#fff"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {cell.ticker}
        </SvgText>

        <SvgText
          x={cell.x + cell.w / 2}
          y={
            cell.y + cell.h / 2 + tickerSize / 2 + lineGap / 2 + tickerSize / 2
          }
          fontSize={tickerSize}
          fontWeight="700"
          fill="rgba(255,255,255,0.95)"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {pctText}
        </SvgText>
      </G>
    );
  },
  // Custom comparison để tránh re-render không cần thiết
  (prevProps, nextProps) => {
    return (
      prevProps.cell.x === nextProps.cell.x &&
      prevProps.cell.y === nextProps.cell.y &&
      prevProps.cell.w === nextProps.cell.w &&
      prevProps.cell.h === nextProps.cell.h &&
      prevProps.cell.change === nextProps.cell.change &&
      prevProps.cell.ticker === nextProps.cell.ticker &&
      prevProps.isDark === nextProps.isDark
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tabButtons: {
    flexDirection: "row",
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2460E5",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
  },

  globalIndicesContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  indexCard: {
    minWidth: 114.33,
    width: 114.33,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 12,
    height: 109,
    borderWidth: 1,
    marginRight: 8,
  },
  indexTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    lineHeight: 20,
  },
  indexValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#D6665C",
    lineHeight: 18,
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
  },
  indexChangePercent: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  indexVolume: {
    fontSize: 11,
    fontWeight: "400",
    color: "#c",
    lineHeight: 16,
  },
  miniChartContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 2,
  },

  stockImpactContainer: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  impactLegendContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  impactLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  impactLegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  impactLegendText: {
    fontSize: 12,
    color: "#ABADBA",
    fontWeight: "400",
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  impactChartContainer: {},
  impactBar: {
    flexDirection: "row",
    height: 18,
    borderRadius: 8,
    overflow: "hidden",
    gap: 1,
  },
  impactBarSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  impactBarText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  columnChartContainer: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  chartArea: {
    height: 160,
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
    top: -10,
    left: 0,
    right: 0,
    height: 170,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  barsContainerTuDoanh: {
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    height: 230,
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
    bottom: -10,
    left: 4,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "400",
  },

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
    color: "#05B168",
    fontWeight: "600",
  },

  chartContainer: {
    height: 120,
    marginTop: 16,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 10,
    textAlign: "center",
    width: 30,
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
  },
  barContainer: {
    height: 80,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    width: 12,
    borderRadius: 2,
  },
  barSpacerTop: {
    flex: 1,
  },
  barSpacerBottom: {
    flex: 1,
  },

  treemapContainer: {},

  chartToggle: {
    flexDirection: "row",
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: "#007AFF",
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "600",
  },

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
    color: "#007AFF",
    marginRight: 8,
  },
  viewDetailArrow: {
    fontSize: 18,
    color: "#007AFF",
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
});
