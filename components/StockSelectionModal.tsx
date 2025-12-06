import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Keyboard,
    Modal,
    ActivityIndicator
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../context/ThemeContext";
import axiosClient from "@/api/request";
import { MaterialIcons } from "@expo/vector-icons";

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

interface StockSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (symbol: string | null) => void;
    selectedSymbol?: string | null;
}

export const StockSelectionModal: React.FC<StockSelectionModalProps> = ({
    visible,
    onClose,
    onSelect,
    selectedSymbol,
}) => {
    const { theme } = useTheme();
    const [searchText, setSearchText] = useState("");


    const [stockData, setStockData] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(false);

    const isDark = theme.mode === "dark";

    const fetchStockData = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/stock-overview`);
            if (response.status === 200) {
                setStockData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (visible) {
            fetchStockData();
            // Optional: Polling if needed, but for selection maybe not strictly necessary
            // const interval = setInterval(fetchStockData, 5000);
            // return () => clearInterval(interval);
        }
    }, [visible]);

    // Color scheme based on theme (copied from CoPhieuTab)
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
    };

    let filteredData =
        stockData?.length > 0
            ? stockData?.filter((item) =>
                item.c.toLowerCase().includes(searchText.toLowerCase())
            )
            : [];

    filteredData = filteredData.sort((a, b) => {
        if (a.c.length !== b.c.length) {
            return a.c.length - b.c.length;
        }
        return 0;
    });

    const handleSymbolPress = (item: StockData) => {
        Keyboard.dismiss();
        onSelect(item.c);
        onClose();
    };

    const renderItem = ({ item }: { item: StockData }) => {
        return (
            <TouchableOpacity onPress={() => handleSymbolPress(item)}>
                <View style={styles.itemContainer}>
                    <View style={styles.leftSection}>
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
                    <View style={styles.rightSection}>
                        <Text
                            style={[
                                styles.price,
                                {
                                    color: (() => {
                                        const currentPrice = item.p;
                                        const reference = item.rp;
                                        const ceiling = item.ce;
                                        const floor = item.f;

                                        if (currentPrice != null && reference != null) {
                                            if (ceiling != null && currentPrice === ceiling)
                                                return theme.colors.purple;
                                            if (floor != null && currentPrice === floor)
                                                return theme.colors.cyan;
                                            if (currentPrice === reference)
                                                return theme.colors.yellow;
                                            if (currentPrice > reference) return theme.colors.green;
                                            if (currentPrice < reference) return theme.colors.red;
                                        }
                                        return theme.colors.yellow;
                                    })(),
                                },
                            ]}
                        >
                            {((item.p || 0) / 1000)?.toFixed(2) || "0.00"}
                        </Text>
                        <Text
                            style={[
                                styles.percent,
                                {
                                    color: (() => {
                                        const currentPrice = item.p;
                                        const reference = item.rp;
                                        const ceiling = item.ce;
                                        const floor = item.f;

                                        if (currentPrice != null && reference != null) {
                                            if (ceiling != null && currentPrice === ceiling)
                                                return theme.colors.purple;
                                            if (floor != null && currentPrice === floor)
                                                return theme.colors.cyan;
                                            if (currentPrice === reference)
                                                return theme.colors.yellow;
                                            if (currentPrice > reference) return theme.colors.green;
                                            if (currentPrice < reference) return theme.colors.red;
                                        }
                                        return theme.colors.yellow;
                                    })(),
                                },
                            ]}
                        >
                            {`${item.dc > 0 ? "+" : ""}${((item.dc || 0) / 1000)?.toFixed(2) || "0.00"
                                } /${item.dc > 0 ? "+" : ""}${(item.dcp || 0).toFixed(2)}%`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            presentationStyle="fullScreen"
        >
            <SafeAreaView
                style={[styles.container, { backgroundColor: colors.background }]}
            >
                {/* Search Bar with Back Button */}
                <View
                    style={[styles.searchContainer, { backgroundColor: colors.background }]}
                >
                    <View
                        style={[
                            styles.searchInputContainer,
                            { backgroundColor: theme.colors.backgroundTab },
                        ]}
                    >
                        <TouchableOpacity onPress={onClose} style={{ marginRight: 8 }}>
                            <MaterialIcons name="arrow-back" size={24} color={theme.colors.iconColor} />
                        </TouchableOpacity>

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
                            onChangeText={(text) => {
                                console.log("text", text);

                                setSearchText(text);
                                if (text === '') {
                                    onSelect(null);
                                }
                            }}
                            autoCapitalize="characters"
                            autoFocus
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
                    {loading && stockData.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    ) : (
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item) => item.c}
                            renderItem={renderItem}
                            style={styles.stockList}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            keyboardShouldPersistTaps="always"
                        />
                    )}
                </View>
                {selectedSymbol && (
                    <TouchableOpacity
                        style={{
                            padding: 16,
                            alignItems: 'center',
                            borderTopWidth: StyleSheet.hairlineWidth,
                            borderTopColor: theme.colors.border,
                            backgroundColor: colors.cardBackground
                        }}
                        onPress={() => {
                            onSelect(null);
                            onClose();
                        }}
                    >
                        <Text style={{ color: theme.colors.red, fontSize: 16, fontWeight: '500' }}>Bỏ chọn</Text>
                    </TouchableOpacity>
                )}
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#30323B",
    },
    leftSection: {
        flex: 1,
    },
    rightSection: {
        alignItems: "flex-end",
    },
    symbol: {
        fontSize: 14,
        fontWeight: "400",
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
});
