import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { Topic, TopicImage } from "../api/topics";
import { topicsApi } from "../api/topics";
import { getDataStorage, STORAGE_KEY } from "../utils/storage";
import axiosClient from "../api/request";

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

interface TopicItemProps {
  topic: Topic;
  onPress: (topicId: number) => void;
  onCommentPress: (e: GestureResponderEvent, topicId: number) => void;
  onLikeUpdate?: (
    topicId: number,
    newLikeCount: number,
    isLiked: boolean
  ) => void;
}

export const TopicItem: React.FC<TopicItemProps> = ({
  topic,
  onPress,
  onCommentPress,
  onLikeUpdate,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(topic.like_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    // Get current user ID
    const getUserId = async () => {
      try {
        const userData = await getDataStorage(STORAGE_KEY.USER_DATA);
        if (userData && userData.id) {
          setCurrentUserId(Number(userData.id));
        }
      } catch (err) {
        console.warn("Could not get user id", err);
      }
    };
    getUserId();

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
    fetchStockData();
  }, []);

  useEffect(() => {
    // Check if current user has liked this topic
    if (currentUserId && topic.likes) {
      const userLiked = topic.likes.some(
        (like) => like.userId === currentUserId
      );
      setIsLiked(userLiked);
    }
    setLikeCount(topic.like_count || 0);
  }, [topic, currentUserId]);

  const handleLikeToggle = async (e: GestureResponderEvent) => {
    e.stopPropagation();

    if (likeLoading) return;

    // Optimistic update
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    setIsLiked(!previousIsLiked);
    setLikeCount((prev) => prev + (previousIsLiked ? -1 : 1));
    setLikeLoading(true);

    try {
      if (previousIsLiked) {
        await topicsApi.unlikeTopic(topic.topic_id);
      } else {
        await topicsApi.likeTopic(topic.topic_id);
      }

      // Notify parent component
      if (onLikeUpdate) {
        onLikeUpdate(topic.topic_id, likeCount, !previousIsLiked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Rollback on error
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
    } finally {
      setLikeLoading(false);
    }
  };

  // Truncate description to first paragraph
  const truncateDescription = (text: string) => {
    const listParagraphs = text.split("\n");
    if (listParagraphs?.length > 1) {
      return listParagraphs[0] + "...";
    }
    return text;
  };

  // Parse images
  let parsedImages: TopicImage[] = [];
  try {
    if (typeof topic.image === "string") {
      parsedImages = JSON.parse(topic.image);
    } else if (Array.isArray(topic.image)) {
      parsedImages = topic.image;
    }
  } catch (e) {
    // If parsing fails, ignore
    parsedImages = [];
  }

  // Find stock symbols in the topic description
  const foundStocks = React.useMemo(() => {
    if (!stockData || stockData.length === 0 || !topic.description) return [];

    const foundStocks: StockData[] = [];

    // Regex to match exactly 3 uppercase letters without Vietnamese accents
    // \b ensures word boundary, [A-Z]{3} matches exactly 3 uppercase letters
    const stockPattern = /\b[A-Z]{3}\b/g;

    const matches = topic.description.match(stockPattern);

    if (matches) {
      matches.forEach((symbol) => {
        // Check if this symbol exists in stockData
        const stock = stockData.find((s) => s.c.toUpperCase() === symbol);

        if (stock) {
          // Avoid duplicates
          if (!foundStocks.find((s) => s.c === stock.c)) {
            foundStocks.push(stock);
          }
        }
      });
    }

    return foundStocks;
  }, [topic.description, stockData]);

  // Handle stock tag press
  const handleStockPress = (stock: StockData) => {
    console.log("Stock pressed:", stock);
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

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundPostItem },
      ]}
      onPress={() => onPress(topic.topic_id)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: topic.avatar || "https://i.pravatar.cc/40?img=1" }}
            style={styles.avatar}
          />
          <View>
            <Text style={[styles.username, { color: theme.colors.text }]}>
              {topic.author}
            </Text>
            <Text style={[styles.time, { color: theme.colors.secondaryText }]}>
              {topic.created_at
                ? new Date(topic.created_at).toLocaleString("vi-VN")
                : ""}
            </Text>
          </View>
        </View>
      </View>

      {/* Title */}
      {topic.title && (
        <Text
          style={[styles.title, { color: theme.colors.text }]}
          numberOfLines={2}
        >
          {topic.title}
        </Text>
      )}

      {/* Content */}
      <Text
        style={[styles.content, { color: theme.colors.text }]}
        numberOfLines={3}
      >
        {truncateDescription(topic.description)}
      </Text>

      {/* Stock Tags */}
      {foundStocks.length > 0 && (
        <View style={styles.stockTagsContainer}>
          {foundStocks.map((stock, index) => {
            const isPositive = stock.dc > 0;
            const isNeutral = stock.dc === 0;
            const changeColor = isPositive
              ? "#10B981"
              : isNeutral
              ? "#F59E0B"
              : "#EF4444";

            return (
              <TouchableOpacity
                key={`${stock.c}-${index}`}
                style={[
                  styles.stockTag,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: changeColor,
                  },
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  handleStockPress(stock);
                }}
              >
                <Text
                  style={[styles.stockTagSymbol, { color: theme.colors.text }]}
                >
                  {stock.c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Images */}
      {parsedImages.length > 0 && (
        <View style={styles.imageContainer}>
          {parsedImages.map((img, index) => {
            return (
              <Image
                key={index}
                source={{ uri: img.url }}
                style={[
                  styles.image,
                  parsedImages.length === 1 && styles.singleImage,
                ]}
                contentFit="cover"
              />
            );
          })}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action}>
          <MaterialIcons
            name="reply"
            size={20}
            color={theme.colors.iconColor}
          />
          <Text
            style={[styles.actionText, { color: theme.colors.secondaryText }]}
          >
            {topic.view_count || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={(e) => onCommentPress(e, topic.topic_id)}
        >
          <FontAwesome
            name="comment-o"
            size={20}
            color={theme.colors.iconColor}
          />
          <Text
            style={[styles.actionText, { color: theme.colors.secondaryText }]}
          >
            {topic.comment_count || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={handleLikeToggle}>
          {likeLoading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <>
              <MaterialIcons
                name={isLiked ? "favorite" : "favorite-border"}
                size={20}
                color={isLiked ? "#ff4444" : theme.colors.iconColor}
              />
              <Text
                style={[
                  styles.actionText,
                  { color: isLiked ? "#ff4444" : theme.colors.secondaryText },
                ]}
              >
                {likeCount}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreAction}>
          <MaterialIcons
            name="more-horiz"
            size={20}
            color={theme.colors.iconColor}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 22,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  imageContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  image: {
    width: "48%",
    height: 150,
    borderRadius: 8,
  },
  singleImage: {
    width: "100%",
    height: 200,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 4,
  },
  moreAction: {
    marginLeft: "auto",
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
});
