import React, { useState, useMemo, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import axiosClient from "@/api/request";
import {
    LIST_BAT_DONG_SAN_FIN,
    LIST_NGAN_HANG_FIN,
    LIST_CHUNG_KHOAN_FIN,
    LIST_TIEU_DUNG_FIN,
    LIST_DAU_KHI_FIN,
    LIST_LOGISTICS_FIN,
    LIST_CONG_NGHE_FIN,
    LIST_VAT_LIEU_FIN,
} from "../app/home_tab/constants";
import { StockSelectionModal } from "./StockSelectionModal";

interface FilterBarProps {
    currentSort: string;
    onSortChange: (sort: string) => void;
    selectedIndustry: string | null;
    onIndustryChange: (industry: string | null) => void;
    selectedSymbol: string | null;
    onSymbolChange: (symbol: string | null) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    currentSort,
    onSortChange,
    selectedIndustry,
    onIndustryChange,
    selectedSymbol,
    onSymbolChange,
}) => {
    const { theme } = useTheme();
    const [industryModalVisible, setIndustryModalVisible] = useState(false);
    const [symbolModalVisible, setSymbolModalVisible] = useState(false);

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

    const items = [
        { id: "newest", label: "Mới nhất", isSort: true, sortValue: "newest" },
        { id: "featured", label: "Nổi bật", isSort: true, sortValue: "more-interaction" },
        { id: "followers", label: "Bài viết theo dõi", isSort: true, sortValue: "followers" },
        { id: "symbol", label: selectedSymbol || "Mã CK", hasDropdown: true, isSort: false, action: () => setSymbolModalVisible(true) },
        // { id: "industry", label: selectedIndustry || "Ngành", hasDropdown: true, isSort: false, action: () => setIndustryModalVisible(true) },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.backgroundCoPhieu }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {items.map((item) => {
                    const isActive = item.isSort
                        ? currentSort === item.sortValue
                        : (item.id === 'industry' && !!selectedIndustry) || (item.id === 'symbol' && !!selectedSymbol);

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.filterChip,
                                isActive
                                    ? [styles.chipActive, {
                                        borderBottomColor: theme.colors.borderBottomTab,

                                    }]
                                    : (theme.mode === 'dark' ? styles.chipInactiveDark : styles.chipInactiveLight),
                                // Remove border width/color as per new style
                                { borderWidth: 0 }
                            ]}
                            onPress={() => {
                                if (item.isSort && item.sortValue) {
                                    onSortChange(item.sortValue);
                                } else if (item.action) {
                                    item.action();
                                }
                            }}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    isActive
                                        ? [styles.textActive, {
                                            color: theme.colors.activeTabText
                                        }]
                                        : (theme.mode === 'dark' ? styles.textInactiveDark : styles.textInactiveLight)
                                ]}
                            >
                                {item.label}
                            </Text>
                            {item.hasDropdown && (
                                <MaterialIcons
                                    name="arrow-drop-down"
                                    size={20}
                                    color={isActive ? "#FFFFFF" : (theme.mode === 'dark' ? "#8B92A0" : "#6B7280")}
                                />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Industry Modal */}
            <Modal
                visible={industryModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIndustryModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIndustryModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
                                <View style={styles.modalHeader}>
                                    <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Chọn Ngành</Text>
                                    <TouchableOpacity onPress={() => setIndustryModalVisible(false)}>
                                        <MaterialIcons name="close" size={24} color={theme.colors.text} />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={listDropdown}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.modalItem,
                                                selectedIndustry === item.title && { backgroundColor: theme.colors.primary + '20' }
                                            ]}
                                            onPress={() => {
                                                onIndustryChange(item.title);
                                                setIndustryModalVisible(false);
                                            }}
                                        >
                                            <Text style={[
                                                styles.modalItemText,
                                                { color: theme.colors.text },
                                                selectedIndustry === item.title && { color: theme.colors.primary, fontWeight: 'bold' }
                                            ]}>
                                                {item.title}
                                            </Text>
                                            {selectedIndustry === item.title && (
                                                <MaterialIcons name="check" size={20} color={theme.colors.primary} />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                                {selectedIndustry && (
                                    <TouchableOpacity
                                        style={[styles.clearButton, { borderTopColor: theme.colors.border }]}
                                        onPress={() => {
                                            onIndustryChange(null);
                                            setIndustryModalVisible(false);
                                        }}
                                    >
                                        <Text style={{ color: theme.colors.red }}>Bỏ chọn</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Symbol Modal */}
            <StockSelectionModal
                visible={symbolModalVisible}
                onClose={() => setSymbolModalVisible(false)}
                onSelect={(symbol) => {
                    onSymbolChange(symbol);
                    // setSymbolModalVisible(false); // Handled in modal
                }}
                selectedSymbol={selectedSymbol}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginHorizontal: 8,
        marginBottom: 4,
        marginTop: 4,
    },
    scrollContent: {
        gap: 10,
    },
    filterChip: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginRight: 0,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    chipActive: {
        borderBottomColor: "#FFFFFF",
    },
    chipInactiveDark: {
        // No background
    },
    chipInactiveLight: {
        // No background
    },
    filterText: {
        fontSize: 14,
        fontWeight: "500",
        marginRight: 4,
    },
    textActive: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    textInactiveDark: {
        color: "#8B92A0",
    },
    textInactiveLight: {
        color: "#6B7280",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
    },
    fullScreenModal: {
        flex: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    stockItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#333',
    },
    stockSymbol: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    stockName: {
        fontSize: 12,
    },
    stockPrice: {
        fontSize: 16,
        fontWeight: '600',
    },
    clearButton: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
