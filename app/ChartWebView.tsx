// ChartWebViews.tsx - Auto extract trendlines on load
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@/context/ThemeContext";
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  symbol?: string;
  colors?: { background: string };
  onMessage?: (e: any) => void;
};

const LAYOUT_STORAGE_KEY = "tradingview_layout_global";

// CACHE HTML GLOBALLY
let CACHED_HTML: string | null = null;
let HTML_LOAD_PROMISE: Promise<string> | null = null;

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

export default function ChartWebViews({ symbol, colors, onMessage }: Props) {
  const smallRef = useRef<WebView>(null);
  const fullRef = useRef<WebView>(null);
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const [isFull, setIsFull] = useState(false);
  const [baseHtml, setBaseHtml] = useState<string>(CACHED_HTML || "");
  const [isLoading, setIsLoading] = useState(!CACHED_HTML);
  const latestLayoutRef = useRef<any>(null);
  const waitingSyncBackRef = useRef(false);
  const fullLoadedRef = useRef(false);
  const hasLoadedInitialLayoutRef = useRef(false);
  const currentSymbolRef = useRef(symbol);
  const isFirstLoadRef = useRef(true);
  const currentPriceRef = useRef<{ time_t: number; price: number }>({
    time_t: 0,
    price: 0,
  });
  const hasExtractedInitialRef = useRef(false); // NEW: track đã extract lần đầu chưa

  const onMessageRef = useRef(onMessage);
  React.useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // ============================================
  // LAYOUT PERSISTENCE
  // ============================================

  const saveLayoutToStorage = useCallback(async (layout: any) => {
    try {
      await AsyncStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
      console.log("💾 Layout saved to AsyncStorage");
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  }, []);

  const loadLayoutFromStorage = useCallback(async () => {
    try {
      const layoutStr = await AsyncStorage.getItem(LAYOUT_STORAGE_KEY);
      if (layoutStr) {
        console.log("📂 Layout loaded from AsyncStorage");
        return JSON.parse(layoutStr);
      }
      return null;
    } catch (error) {
      console.error("Error loading layout:", error);
      return null;
    }
  }, []);

  // ============================================
  // SIDE DETERMINATION LOGIC (from ReactJS - EXACT)
  // ============================================

  const isAbove = useCallback((C: any, B: any, A: any): number => {
    const a = (B.price - A.price) / (B.time_t - A.time_t);
    const b = A.price - a * A.time_t;

    // Tính y tại thời điểm C.time_t
    const y = a * C.time_t + b;

    console.log("🔍 isAbove calculation:", {
      "C.time_t": C.time_t,
      "C.price": C.price,
      "y (calculated)": y,
      a: a,
      b: b,
      result: C.price >= y ? "above" : "below",
    });

    // So sánh giá hiện tại với giá trên trendline
    if (C.price >= y) {
      return 1; // above
    } else {
      return 0; // below
    }
  }, []);

  // ============================================
  // TRENDLINE EXTRACTION WITH SIDE LOGIC (EXACT từ ReactJS)
  // ============================================

  const extractAndSendTrendlines = useCallback(
    (layout: any) => {
      try {
        if (!layout || !layout.charts || !onMessageRef.current) return;

        const sources = layout.charts?.[0]?.panes?.[0]?.sources || [];
        const currentSymbol = symbol || "VNINDEX";
        const normalizedSymbol = currentSymbol
          .replace(/^HOSE:/, "")
          .toUpperCase();

        // Filter trendlines cho symbol hiện tại
        const trendlines = sources
          .filter((source: any) => {
            if (!source.type || !source.type.startsWith("LineTool"))
              return false;

            const sourceSymbol = source.state?.symbol;
            if (!sourceSymbol) return true;

            const normalizedSource = sourceSymbol
              .replace(/^HOSE:/, "")
              .toUpperCase();
            return normalizedSource === normalizedSymbol;
          })
          .map((source: any) => {
            const points = source.points || [];

            // Tính toán A và B giống ReactJS
            const A = points[0]
              ? {
                  ...points[0],
                  time_t: points[0].time_t + (points[0].offset || 0) * 86400,
                }
              : null;

            const B = points[1]
              ? {
                  ...points[1],
                  time_t: points[1].time_t + (points[1].offset || 0) * 86400,
                }
              : null;

            let a = 0,
              b = 0,
              side = "unknown",
              position = -1;

            if (A && B && A.time_t !== B.time_t) {
              a = (B.price - A.price) / (B.time_t - A.time_t);
              b = A.price - a * A.time_t;

              // Lấy giá hiện tại và xử lý GIỐNG HỆT ReactJS
              const curPrice = currentPriceRef.current;

              if (curPrice && curPrice.price > 0 && curPrice.time_t > 0) {
                // QUAN TRỌNG: Nhân 1000 giống ReactJS
                const curPriceMap = {
                  time_t: Math.round(curPrice.time_t) * 1000,
                  price: curPrice.price,
                };

                const C = curPriceMap;

                console.log("📊 Trendline calculation:", {
                  A: A,
                  B: B,
                  "C (current)": C,
                  a: a,
                  b: b,
                });

                position = isAbove(C, B, A);
                side =
                  position === 1
                    ? "above"
                    : position === 0
                    ? "below"
                    : "unknown";
              }
            }

            return {
              lineId: source.id,
              symbol: currentSymbol,
              points: points,
              a: a,
              b: b,
              side: side,
              position: position,
              type: source.type,
            };
          });

        if (trendlines.length > 0) {
          console.log("📈 Extracted trendlines:", trendlines.length);
          console.log(
            "📊 Trendlines with side:",
            trendlines.map((t) => ({
              lineId: t.lineId,
              side: t.side,
              position: t.position,
            }))
          );
        }

        // Gửi message với trendlines đã có side
        const syntheticEvent = {
          nativeEvent: {
            data: JSON.stringify({
              type: "trendingLineMap",
              payload: trendlines,
            }),
          },
        };
        onMessageRef.current(syntheticEvent);
      } catch (err) {
        console.error("Error extracting trendlines:", err);
      }
    },
    [symbol, isAbove]
  );

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

  // Load layout song song với HTML load
  React.useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      loadLayoutFromStorage().then((savedLayout) => {
        if (savedLayout) {
          latestLayoutRef.current = savedLayout;
          console.log("✅ Initial layout loaded");
        }
        hasLoadedInitialLayoutRef.current = true;
      });
    }
  }, [loadLayoutFromStorage]);

  const baseUrl = useMemo(
    () => `file://${RNFS.MainBundlePath}/tradingview/`,
    []
  );
  const modalBackgroundColor = useMemo(
    () => colors?.background || "#0B1018",
    [colors?.background]
  );
  const fullscreenSafeAreaStyle = useMemo(
    () => [
      styles.fullscreenContainer,
      { backgroundColor: modalBackgroundColor },
    ],
    [modalBackgroundColor]
  );

  const sendToWeb = useCallback((ref: React.RefObject<WebView>, msg: any) => {
    try {
      ref.current?.postMessage(JSON.stringify(msg));
    } catch (e) {
      console.warn("Send to web failed:", e);
    }
  }, []);

  // Update symbol
  React.useEffect(() => {
    if (!baseHtml || isLoading || !hasLoadedInitialLayoutRef.current) return;

    // CRITICAL FIX: Bỏ check currentSymbolRef.current === symbol
    // Luôn gửi changeSymbol để đảm bảo symbol hiện tại được ưu tiên
    // ngay cả khi apply layout có symbol khác

    console.log("🔄 Symbol update triggered:", symbol || "VNINDEX");

    const updateMessage = {
      type: "changeSymbol",
      payload: symbol || "VNINDEX",
    };

    sendToWeb(smallRef, updateMessage);
    if (isFull) {
      sendToWeb(fullRef, updateMessage);
    }

    // Reset extract flag khi đổi symbol
    if (currentSymbolRef.current !== symbol) {
      currentSymbolRef.current = symbol;
      hasExtractedInitialRef.current = false;
    }
  }, [symbol, baseHtml, isLoading, isFull, sendToWeb]);

  // Update theme
  React.useEffect(() => {
    if (!baseHtml || isLoading) return;

    const themeMessage = {
      type: "changeTheme",
      payload: theme.mode,
    };

    sendToWeb(smallRef, themeMessage);
    if (isFull) {
      sendToWeb(fullRef, themeMessage);
    }
  }, [theme.mode, baseHtml, isLoading, isFull, sendToWeb]);

  const openFull = useCallback(() => {
    setIsFull(true);

    setTimeout(() => {
      if (latestLayoutRef.current) {
        console.log("📤 Sending layout to fullscreen");
        sendToWeb(fullRef, {
          type: "applyLayout",
          payload: latestLayoutRef.current,
        });

        // CRITICAL FIX: Force change symbol sau khi apply layout
        setTimeout(() => {
          const currentSymbol = symbol || "VNINDEX";
          console.log(
            "🔄 Forcing symbol update in fullscreen to:",
            currentSymbol
          );
          sendToWeb(fullRef, {
            type: "changeSymbol",
            payload: currentSymbol,
          });
        }, 200);
      } else {
        sendToWeb(smallRef, { type: "requestLayout" });
      }
    }, 500);
  }, [sendToWeb, symbol]);

  const closeFull = useCallback(() => {
    waitingSyncBackRef.current = true;
    sendToWeb(fullRef, { type: "requestLayout" });

    setTimeout(() => {
      setIsFull(false);
      waitingSyncBackRef.current = false;
      fullLoadedRef.current = false;
    }, 300);
  }, [sendToWeb]);

  const onFullLoadEnd = useCallback(() => {
    if (!fullLoadedRef.current) {
      fullLoadedRef.current = true;
      console.log("[Full WebView] Load complete");

      setTimeout(() => {
        if (latestLayoutRef.current) {
          sendToWeb(fullRef, {
            type: "applyLayout",
            payload: latestLayoutRef.current,
          });

          // CRITICAL FIX: Force change symbol sau khi apply layout
          setTimeout(() => {
            const currentSymbol = symbol || "VNINDEX";
            console.log(
              "🔄 Forcing symbol update after full load to:",
              currentSymbol
            );
            sendToWeb(fullRef, {
              type: "changeSymbol",
              payload: currentSymbol,
            });
          }, 200);
        }
      }, 800);
    }
  }, [sendToWeb, symbol]);

  const onSmallLoadEnd = useCallback(() => {
    console.log("[Small WebView] Load complete");

    // Apply layout ngay khi load xong
    if (latestLayoutRef.current && hasLoadedInitialLayoutRef.current) {
      setTimeout(() => {
        console.log("📤 Applying saved layout to small view");
        sendToWeb(smallRef, {
          type: "applyLayout",
          payload: latestLayoutRef.current,
        });

        // CRITICAL FIX: Force change symbol sau khi apply layout
        // để đảm bảo hiển thị đúng symbol hiện tại, không bị ảnh hưởng bởi symbol trong saved layout
        setTimeout(() => {
          const currentSymbol = symbol || "VNINDEX";
          console.log("🔄 Forcing symbol update to:", currentSymbol);
          sendToWeb(smallRef, {
            type: "changeSymbol",
            payload: currentSymbol,
          });
        }, 200);
      }, 100);
    }
  }, [sendToWeb, symbol]);

  const onSmallMessage = useCallback(
    (e: any) => {
      try {
        const data = JSON.parse(e.nativeEvent.data);

        // Lưu giá hiện tại từ onTick
        if (data?.type === "onTick" && data?.payload) {
          currentPriceRef.current = {
            time_t: data.payload.time,
            price: data.payload.close,
          };
          console.log("💰 Current price updated:", currentPriceRef.current);

          // NEW: Trigger extract lần đầu sau khi có giá
          if (!hasExtractedInitialRef.current && latestLayoutRef.current) {
            hasExtractedInitialRef.current = true;
            console.log("🎯 First-time trendline extraction triggered");

            // Đợi 500ms để đảm bảo layout đã stable
            setTimeout(() => {
              extractAndSendTrendlines(latestLayoutRef.current);
            }, 500);
          }
        }

        if (data?.type === "layout" && data?.payload) {
          latestLayoutRef.current = data.payload;
          saveLayoutToStorage(data.payload);
          console.log("💾 Layout saved from small view");

          // Extract và gửi trendline data với side đã xác định
          extractAndSendTrendlines(data.payload);
        }

        if (data?.type === "chartReady") {
          console.log("[Small WebView] Chart ready");

          // NEW: Request layout ngay khi chart ready để trigger extract
          setTimeout(() => {
            if (latestLayoutRef.current && currentPriceRef.current.price > 0) {
              console.log("🎯 Extracting trendlines on chart ready");
              extractAndSendTrendlines(latestLayoutRef.current);
              hasExtractedInitialRef.current = true;
            }
          }, 1000);
        }

        // Forward tất cả messages về parent
        if (onMessageRef.current) {
          onMessageRef.current(e);
        }
      } catch (err) {
        console.warn("Small WebView message parse error:", err);
      }
    },
    [saveLayoutToStorage, extractAndSendTrendlines]
  );

  const onFullMessage = useCallback(
    (e: any) => {
      try {
        const data = JSON.parse(e.nativeEvent.data);

        // Lưu giá hiện tại từ onTick
        if (data?.type === "onTick" && data?.payload) {
          currentPriceRef.current = {
            time_t: data.payload.time,
            price: data.payload.close,
          };
          console.log("💰 Current price updated:", currentPriceRef.current);
        }

        if (data?.type === "layout" && data?.payload) {
          latestLayoutRef.current = data.payload;
          saveLayoutToStorage(data.payload);
          console.log("💾 Layout saved from full view");

          // Extract và gửi trendline data với side đã xác định
          extractAndSendTrendlines(data.payload);

          if (waitingSyncBackRef.current) {
            sendToWeb(smallRef, {
              type: "applyLayout",
              payload: data.payload,
            });
            waitingSyncBackRef.current = false;

            setTimeout(() => {
              setIsFull(false);
            }, 200);
          }
        }

        // Forward tất cả messages về parent
        if (onMessageRef.current) {
          onMessageRef.current(e);
        }
      } catch (err) {
        console.warn("Full WebView message parse error:", err);
      }
    },
    [sendToWeb, saveLayoutToStorage, extractAndSendTrendlines]
  );

  const onWebViewError = useCallback((syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn("❌ WebView error:", nativeEvent);
  }, []);

  // Script inject - KHÔNG override localStorage
  const injectedJavaScriptBeforeContentLoaded = useMemo(() => {
    const sym = symbol || "VNINDEX";
    const themeMode = theme.mode || "dark";

    return `
      window.__INITIAL_SYMBOL__ = '${sym}';
      window.__INITIAL_THEME__ = '${themeMode}';
      window.__FAST_LOAD__ = true;
      true;
    `;
  }, [symbol, theme.mode]);

  const smallWebView = useMemo(
    () => (
      <View style={{ height: 410, width: "100%" }}>
        <WebView
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
          onMessage={onSmallMessage}
          onError={onWebViewError}
          onLoadEnd={onSmallLoadEnd}
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
        <TouchableOpacity onPress={openFull} style={styles.fullscreenButton}>
          <MaterialIcons name="fullscreen" size={24} color="#99BAFF" />
        </TouchableOpacity>
      </View>
    ),
    [
      baseHtml,
      baseUrl,
      injectedJavaScriptBeforeContentLoaded,
      onSmallMessage,
      onWebViewError,
      onSmallLoadEnd,
      openFull,
    ]
  );

  const fullWebView = useMemo(
    () => (
      <WebView
        ref={fullRef}
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
        onLoadEnd={onFullLoadEnd}
        onMessage={onFullMessage}
        onError={onWebViewError}
        style={styles.webview}
        mixedContentMode="always"
        allowsInlineMediaPlayback
        cacheEnabled={true}
        incognito={false}
        injectedJavaScriptBeforeContentLoaded={
          injectedJavaScriptBeforeContentLoaded
        }
        androidLayerType="hardware"
      />
    ),
    [
      baseHtml,
      baseUrl,
      injectedJavaScriptBeforeContentLoaded,
      onFullLoadEnd,
      onFullMessage,
      onWebViewError,
    ]
  );

  if (!baseHtml) {
    return (
      <View style={[styles.loadingContainer, { height: 410 }]}>
        <View style={styles.loadingContent}>
          <MaterialIcons name="show-chart" size={48} color="#6d4cff" />
        </View>
      </View>
    );
  }

  return (
    <>
      {smallWebView}

      {isFull && (
        <Modal
          visible={true}
          animationType="slide"
          onRequestClose={closeFull}
          supportedOrientations={[
            "portrait",
            "landscape",
            "landscape-left",
            "landscape-right",
          ]}
        >
          <SafeAreaView style={fullscreenSafeAreaStyle}>
            <View style={styles.fullscreenChartContainer}>
              <TouchableOpacity
                onPress={closeFull}
                style={styles.minimizeButton}
              >
                <MaterialIcons
                  name="fullscreen-exit"
                  size={24}
                  color="#99BAFF"
                />
              </TouchableOpacity>

              {fullWebView}
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    // backgroundColor: "transparent",
    borderRadius: 12,
  },
  fullscreenButton: {
    position: "absolute",
    right: 0,
    bottom: 45,
    padding: 8,
    zIndex: 10,
  },
  fullscreenContainer: {
    flex: 1,
  },
  fullscreenChartContainer: {
    flex: 1,
  },
  minimizeButton: {
    position: "absolute",
    right: 0,
    bottom: 50,
    zIndex: 10,
    padding: 8,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b1018",
  },
  loadingContent: {
    alignItems: "center",
  },
});
