import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import type { GroupType } from "./types";
import { CRITERIA_DEFS } from "./CRITERIA_DEFS";
import type { CriterionDef } from "./types";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  SearchIcon,
  StarIcon,
} from "@/components/icons";
import { MaterialIcons } from "@expo/vector-icons";
import axiosClient from "@/api/request";

interface MyFilter {
  id?: number;
  userId?: number;
  label: string;
  isMultiple: number | boolean;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  stagedIds: string[];
  onToggle: (def: CriterionDef) => void; // Changed to pass full def object
  onApply: () => void;
  theme: any;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  stagedIds,
  onToggle,
  onApply,
  theme,
}) => {
  console.log("stagedIds", stagedIds);

  const [currentTab, setCurrentTab] = useState<GroupType>("technical");
  const [searchQuery, setSearchQuery] = useState("");
  // State to track which families are expanded (default: all collapsed)
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(
    new Set()
  );
  // State for my filters
  const [myFilters, setMyFilters] = useState<MyFilter[]>([]);
  const [loadingMyFilters, setLoadingMyFilters] = useState(false);

  // Load my filters from API
  const loadMyFilters = async () => {
    try {
      setLoadingMyFilters(true);
      const response = await axiosClient.get("/get-my-filter");
      if (response?.data?.success) {
        setMyFilters(response.data.data || []);
      }
    } catch (error) {
      console.error("Error loading my filters:", error);
    } finally {
      setLoadingMyFilters(false);
    }
  };

  // Load my filters when switching to "mine" tab
  useEffect(() => {
    if (currentTab === "mine" && visible) {
      loadMyFilters();
    }
  }, [currentTab, visible]);

  // Toggle family expand/collapse
  const toggleFamily = (familyKey: string) => {
    setExpandedFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(familyKey)) {
        next.delete(familyKey);
      } else {
        next.add(familyKey);
      }
      return next;
    });
  };

  // Check if a criterion is in my filters
  const isInMyFilters = (label: string) => {
    return myFilters.some((filter) => filter.label === label);
  };

  // Toggle star (add/remove from my filters)
  const handleStarPress = async (criterion: CriterionDef) => {
    try {
      const isCurrentlyFavorite = isInMyFilters(criterion.label);

      let updatedFilters: MyFilter[];

      if (isCurrentlyFavorite) {
        // Remove from my filters
        updatedFilters = myFilters.filter(
          (filter) => filter.label !== criterion.label
        );
      } else {
        // Add to my filters
        const newFilter: MyFilter = {
          label: criterion.label,
          isMultiple: criterion.control === "range" ? 1 : 0,
        };
        updatedFilters = [...myFilters, newFilter];
      }

      // Optimistic update
      setMyFilters(updatedFilters);

      // Call API to update (no await, fire and forget for smooth UX)
      axiosClient
        .post("/add-my-filter", {
          listFilter: updatedFilters,
        })
        .catch((error: any) => {
          console.error("Error updating my filters:", error);
          // Revert optimistic update on error
          loadMyFilters();
          Alert.alert(
            "Lỗi",
            error?.response?.data?.message || "Không thể cập nhật bộ lọc"
          );
        });
    } catch (error: any) {
      console.error("Error updating my filters:", error);
      // Revert optimistic update on error
      await loadMyFilters();
      Alert.alert(
        "Lỗi",
        error?.response?.data?.message || "Không thể cập nhật bộ lọc"
      );
    }
  };

  const tabs: Array<{ key: GroupType; label: string }> = [
    { key: "popular", label: "Lọc phổ biến" },
    { key: "basic", label: "Lọc cơ bản" },
    { key: "technical", label: "Lọc kỹ thuật" },
    { key: "volatility", label: "Lọc biến động" },
    { key: "mine", label: "Bộ lọc của tôi" },
  ];

  // Filter criteria by current tab and search query, grouped by family
  const { families, allCriteria } = useMemo(() => {
    let criteria = CRITERIA_DEFS.filter((def) => def.group === currentTab);

    // Apply filters
    const query = searchQuery.trim().toLowerCase();
    const filtered = query
      ? criteria.filter((def) => def.label.toLowerCase().includes(query))
      : criteria;

    // Group by family
    const familyMap = new Map<string, CriterionDef[]>();
    filtered.forEach((def) => {
      const key = def.familyKey;
      if (!familyMap.has(key)) {
        familyMap.set(key, []);
      }
      familyMap.get(key)!.push(def);
    });

    // Convert to array with family metadata
    const families = Array.from(familyMap.entries()).map(
      ([familyKey, defs]) => {
        const familyTitle = defs[0].familyTitle;
        const selectedCount = defs.filter((d) =>
          stagedIds.includes(d.id)
        ).length;
        return {
          familyKey,
          familyTitle,
          criteria: defs,
          selectedCount,
          totalCount: defs.length,
        };
      }
    );

    return { families, allCriteria: filtered };
  }, [currentTab, searchQuery, stagedIds]);

  const handleApply = () => {
    onApply();
    setSearchQuery("");
    onClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.background,
              borderBottomColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
            },
          ]}
        >
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Tiêu chí lọc
          </Text>
        </View>

        {/* Tab Navigation */}
        <View
          style={[
            styles.tabContainer,
            {
              backgroundColor: theme.colors.background,
              borderBottomColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
            },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  currentTab === tab.key && [
                    styles.activeTab,
                    { borderBottomColor: theme.colors.borderBottomTab },
                  ],
                ]}
                onPress={() => setCurrentTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        currentTab === tab.key
                          ? theme.colors.textTab
                          : theme.colors.text,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: theme.mode === "dark" ? "#292B32" : "#F2F2F7",
              },
            ]}
          >
            {/* <Text style={[styles.searchIcon, { color: '#8E8E93' }]}>🔍</Text> */}
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Tìm kiếm tiêu chí..."
              placeholderTextColor={theme.colors.placeholderText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {/* <Text style={[styles.searchIcon, { color: '#8E8E93' }]}>🔍</Text> */}
            {/* <SearchIcon size={24} color={theme.mode === 'dark' ? '#C7C8D1' : '#2E3138'} /> */}
            <MaterialIcons
              name="search"
              size={20}
              color={theme.colors.iconColor}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={[styles.clearButton, { color: "#8E8E93" }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Header */}
        <View
          style={[
            styles.filterHeader,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text
            style={[
              styles.filterCount,
              { color: theme.colors.placeholderText },
            ]}
          >
            {stagedIds.length} tiêu chí được chọn
          </Text>
          <TouchableOpacity
            onPress={() =>
              stagedIds.forEach((id) => {
                const def = CRITERIA_DEFS.find((d) => d.id === id);
                if (def) onToggle(def);
              })
            }
          >
            <Text
              style={[
                styles.filterClearAll,
                { color: theme.colors.textResult },
              ]}
            >
              Bỏ chọn tất cả
            </Text>
          </TouchableOpacity>
        </View>

        {/* Criteria List */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {currentTab === "mine" ? (
            // "Bộ lọc của tôi" tab
            loadingMyFilters ? (
              <View style={styles.emptyState}>
                <Text
                  style={[
                    styles.emptyStateText,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  Đang tải...
                </Text>
              </View>
            ) : myFilters.length === 0 ? (
              <View style={styles.emptyState}>
                <Text
                  style={[
                    styles.emptyStateText,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  Chưa có tiêu chí nào trong bộ lọc của bạn
                </Text>
                <Text
                  style={[
                    styles.emptyStateSubtext,
                    { color: theme.colors.textResult, marginTop: 8 },
                  ]}
                >
                  Nhấn vào biểu tượng sao để thêm tiêu chí yêu thích
                </Text>
              </View>
            ) : (
              myFilters.map((filter, index) => {
                const criterion = CRITERIA_DEFS.find(
                  (def) => def.label === filter.label
                );
                if (!criterion) return null;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.criteriaItem,
                      {
                        // borderBottomColor:
                        // theme.mode === "dark" ? "#30323B" : "#ECECEF",
                        borderBottomColor: 'red',
                        // borderBottomColor: theme.colors.border,
                      },
                    ]}
                    onPress={() => onToggle(criterion)}
                  >
                    <View style={styles.criteriaLeft}>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          handleStarPress(criterion);
                        }}
                        style={{ marginRight: 4 }}
                      >
                        <StarIcon size={16} color={theme.colors.primary} />
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.criteriaText,
                          {
                            color: stagedIds.includes(criterion.id)
                              ? theme.colors.textTab
                              : theme.colors.textTieuChi,
                          },
                        ]}
                      >
                        {criterion.label}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.checkbox,
                        {
                          backgroundColor: stagedIds.includes(criterion.id)
                            ? theme.colors.primary
                            : "transparent",
                          borderColor: stagedIds.includes(criterion.id)
                            ? theme.colors.primary
                            : theme.colors.secondaryText,
                        },
                      ]}
                    >
                      {stagedIds.includes(criterion.id) && (
                        <Text style={styles.checkIconText}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })
            )
          ) : allCriteria.length === 0 ? (
            <View style={styles.emptyState}>
              <Text
                style={[
                  styles.emptyStateText,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Không tìm thấy tiêu chí phù hợp
              </Text>
            </View>
          ) : (
            families.map((family) => {
              const isExpanded = expandedFamilies.has(family.familyKey);

              return (
                <View key={family.familyKey}>
                  {/* Family Header - Clickable */}
                  <TouchableOpacity
                    style={[
                      styles.familyHeader,
                      {
                        backgroundColor:
                          theme.mode === "dark"
                            ? theme.colors.backgroundTabActive
                            : "#F2F2F7",
                        borderBottomColor:
                          theme.mode === "dark"
                            ? theme.colors.backgroundTabActive
                            : "#E5E5E7",
                        marginTop: 0
                      },
                    ]}
                    onPress={() => toggleFamily(family.familyKey)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[styles.familyTitle, { color: theme.colors.text }]}
                    >
                      {family.familyTitle} ({family.selectedCount}/
                      {family.totalCount})
                    </Text>
                    {/* Arrow Icon */}
                    {/* <Text style={[styles.arrowIcon, { color: theme.colors.text }]}>
                      {isExpanded ? '▲' : '▼'}
                    </Text> */}
                    {isExpanded ? (
                      <ArrowUpIcon size={16} color={theme.colors.text} />
                    ) : (
                      <ArrowDownIcon size={16} color={theme.colors.text} />
                    )}
                  </TouchableOpacity>

                  {/* Family Criteria - Only render when expanded */}
                  {isExpanded &&
                    family.criteria.map((criterion, index) => (
                      <TouchableOpacity
                        key={criterion.id}
                        style={[
                          styles.criteriaItem,
                          {
                            backgroundColor: theme.colors.background,
                            borderBottomColor: theme.colors.border,
                            marginBottom: index === family.criteria.length - 1 ? 12 : 0,
                          },
                        ]}
                        onPress={() => onToggle(criterion)}
                      >
                        <View style={styles.criteriaLeft}>
                          {/* <View
                          style={[
                            styles.criteriaIcon,
                            { backgroundColor: theme.colors.primary },
                          ]}
                        >
                          <Text style={styles.criteriaIconText}>★</Text>
                        </View> */}
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              handleStarPress(criterion);
                            }}
                            style={{ marginRight: 4 }}
                          >
                            <StarIcon
                              size={16}
                              color={
                                isInMyFilters(criterion.label)
                                  ? theme.colors.primary
                                  : theme.mode === "dark"
                                    ? "#40424F"
                                    : "#D0D2D8"
                              }
                            />
                          </TouchableOpacity>
                          <Text
                            style={[
                              styles.criteriaText,
                              {
                                color: stagedIds.includes(criterion.id)
                                  ? theme.colors.textTab
                                  : theme.colors.textTieuChi,
                              },
                            ]}
                          >
                            {criterion.label}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: stagedIds.includes(criterion.id)
                                ? theme.colors.primary
                                : "transparent",
                              borderColor: stagedIds.includes(criterion.id)
                                ? theme.colors.primary
                                : theme.colors.secondaryText,
                            },
                          ]}
                        >
                          {stagedIds.includes(criterion.id) && (
                            <Text style={styles.checkIconText}>✓</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              );
            })
          )}
        </ScrollView>

        {/* Footer */}
        <View
          style={[
            styles.footer,
            {
              backgroundColor: theme.colors.background,
              borderTopColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.cancelButton,
              {
                backgroundColor: theme.mode === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            onPress={handleClose}
          >
            <Text style={[styles.cancelText, { color: theme.colors.text }]}>
              Hủy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.applyButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleApply}
          >
            <Text style={styles.applyText}>Thêm tiêu chí</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  tabContainer: {
    borderBottomWidth: 1,
  },
  tabScrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  searchContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "400",
    paddingVertical: 0,
  },
  clearButton: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterCount: {
    fontSize: 13,
    fontWeight: "400",
  },
  filterClearAll: {
    fontSize: 13,
    fontWeight: "400",
  },
  content: {
    flex: 1,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
  },
  emptyStateSubtext: {
    fontSize: 12,
    textAlign: "center",
  },
  familyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  familyTitle: {
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  arrowIcon: {
    fontSize: 12,
    marginLeft: 8,
  },
  criteriaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  criteriaLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  criteriaIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  criteriaIconText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  criteriaText: {
    fontSize: 14,
    fontWeight: "400",
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIconText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 13,
    fontWeight: "500",
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
});
