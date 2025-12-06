import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { getCriterionInfoFromKey } from "./CRITERIA_DEFS";

interface ResultListProps {
  rows: any[];
  total: number;
  loading: boolean;
  onItemPress?: (item: any) => void;
  onLoadMore?: () => void;
  theme: any;
  active?: any[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FIXED_COL_WIDTH = 100; // Width for sticky columns (Index + Symbol)
const DEFAULT_COL_WIDTH = 120; // Width for other columns

export const ResultList: React.FC<ResultListProps> = ({
  rows,
  total,
  loading,
  onItemPress,
  onLoadMore,
  theme,
  active = [],
}) => {
  console.log("rows", rows);

  // Extract dynamic columns from the first row, excluding fixed and ignored ones
  const dynamicColumns = React.useMemo(() => {
    if (!rows || rows.length === 0) return [];
    const firstRow = rows[0];
    const ignoredKeys = [
      "Symbol",
      "symbol",
      "CompTypeCode",
      "FSCreationTime",
      "Quarter",
      "Year",
      "Exchange",
      "exchange",
      "Industry",
      "industry",
      "Sector",
      "sector",
    ];

    // Check if "Vốn hoá" is active
    const isMarketCapActive = active.some(
      (criterion) =>
        criterion.id === "von_hoa" || criterion.id === "von_hoa_popular"
    );

    return Object.keys(firstRow).filter((key) => {
      if (ignoredKeys.includes(key)) return false;
      if (key === "MarketCap" && !isMarketCapActive) return false;
      return true;
    });
  }, [rows, active]);

  // Calculate dynamic column width
  const dynamicColWidth = React.useMemo(() => {
    const availableWidth = SCREEN_WIDTH - FIXED_COL_WIDTH;
    if (dynamicColumns.length > 0 && dynamicColumns.length <= 2) {
      return Math.max(DEFAULT_COL_WIDTH, availableWidth / dynamicColumns.length);
    }
    return DEFAULT_COL_WIDTH;
  }, [dynamicColumns.length]);

  // Memoize column metadata (label, unit)
  const columnsMetadata = React.useMemo(() => {
    const metadata: Record<string, { label: string; unit?: string }> = {};
    dynamicColumns.forEach((col) => {
      const info = getCriterionInfoFromKey(col);
      if (info) {
        metadata[col] = info;
      }
    });
    return metadata;
  }, [dynamicColumns]);

  const scrollX = useRef(new Animated.Value(0)).current;

  const formatValue = (value: any, key: string) => {
    if (value === undefined || value === null) return "--";

    const unit = columnsMetadata[key]?.unit;

    if (typeof value === "number") {
      if (unit === "Tỷ") {
        return (value / 1_000_000_000).toFixed(1) + " tỷ";
      }
      if (unit === "%") {
        return (value * 100).toFixed(2) + "%";
      }
      // Default number formatting
      return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
    }
    return String(value);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        style={[
          styles.row,
          {
            backgroundColor: theme.colors.backgroundTab,
            borderBottomColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
          },
        ]}
        onPress={() => onItemPress?.(item)}
      >
        {/* Sticky Columns Container */}
        <Animated.View
          style={[
            styles.stickyCellContainer,
            {
              backgroundColor: theme.colors.backgroundTab,
              transform: [{ translateX: scrollX }],
              zIndex: 1, // Ensure sticky columns are on top
            },
          ]}
        >
          <Text style={[styles.index, { color: theme.colors.secondaryText }]}>
            {index + 1}
          </Text>
          <Text style={[styles.symbol, { color: theme.colors.text }]}>
            {item.Symbol || item.symbol || "--"}
          </Text>
          <View
            style={[
              styles.separator,
              { backgroundColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7" },
            ]}
          />
        </Animated.View>

        {/* Scrollable Columns */}
        <View style={{ paddingLeft: FIXED_COL_WIDTH, flexDirection: "row" }}>
          {dynamicColumns.map((col) => (
            <View
              key={col}
              style={[
                styles.cell,
                {
                  width: dynamicColWidth,
                  borderRightWidth: 0.5,
                  borderRightColor:
                    theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                },
              ]}
            >
              <Text style={[styles.cellText, { color: theme.colors.text }]}>
                {formatValue(item[col], col)}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.backgroundTab,
          borderBottomColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.stickyCellContainer,
          {
            backgroundColor: theme.colors.backgroundTab,
            transform: [{ translateX: scrollX }],
            zIndex: 1,
          },
        ]}
      >
        <Text style={[styles.headerText, styles.indexHeader, { color: theme.colors.secondaryText }]}>
          #
        </Text>
        <Text style={[styles.headerText, styles.symbolHeader, { color: theme.colors.secondaryText }]}>
          Mã
        </Text>
        <View
          style={[
            styles.separator,
            { backgroundColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7" },
          ]}
        />
      </Animated.View>

      <View style={{ paddingLeft: FIXED_COL_WIDTH, flexDirection: "row" }}>
        {dynamicColumns.map((col) => (
          <View
            key={col}
            style={[
              styles.cell,
              {
                width: dynamicColWidth,
                borderRightWidth: 0.5,
                borderRightColor:
                  theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
              },
            ]}
          >
            <Text style={[styles.headerText, { color: theme.colors.secondaryText }]}>
              {columnsMetadata[col]?.label || col}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
          Không có kết quả lọc
        </Text>
        <Text
          style={[styles.emptySubtext, { color: theme.colors.secondaryText }]}
        >
          Vui lòng chọn tiêu chí và bấm "Lọc"
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loading || rows.length === 0) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Result count header */}
      <View style={styles.resultHeader}>
        <Text style={[styles.resultText, { color: theme.colors.textResult }]}>
          Kết quả:
        </Text>
        <Text style={{ color: theme.colors.text }}>{total}</Text>
      </View>

      {/* Table Content */}
      {rows.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View>
            {renderHeader()}
            <FlatList
              data={rows}
              renderItem={renderItem}
              keyExtractor={(item, index) =>
                item.Symbol || item.symbol || `item-${index}`
              }
              ListFooterComponent={renderFooter}
              onEndReached={onLoadMore}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </ScrollView>
      ) : (
        renderEmpty()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultHeader: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: "row",
    gap: 4,
  },
  resultText: {
    fontSize: 13,
    fontWeight: "400",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
  },
  stickyCellContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    width: FIXED_COL_WIDTH,
    paddingLeft: 16,
  },
  index: {
    fontSize: 13,
    width: 30,
  },
  symbol: {
    fontSize: 13,
    fontWeight: "500",
    width: 50,
  },
  indexHeader: {
    width: 30,
  },
  symbolHeader: {
    width: 50,
  },
  cell: {
    width: DEFAULT_COL_WIDTH,
    paddingHorizontal: 8,
    justifyContent: "center",
    paddingVertical: 12,
  },
  separator: {
    width: 1,
    height: "100%",
    position: "absolute",
    right: 0,
  },
  cellText: {
    fontSize: 13,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
