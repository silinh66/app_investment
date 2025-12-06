import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Keyboard,
  FlatList,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useRouter } from "expo-router";
import axiosClient from "@/api/request";
import { useAuth } from "@/context/AuthContext";
import {
  useStockFilter,
  ActiveConfigBar,
  FilterModal,
  ResultList,
  filterData,
} from "../../features/stockFilter";
import { CRITERIA_DEFS } from "../../features/stockFilter/CRITERIA_DEFS";
import PlusIcon from "@/components/icons/PlusIcon";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons";
import SignalIcon from "@/components/icons/SignalIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { LIST_SYMBOL } from "../home_tab/constants";

export default function FilterScreen() {
  const { theme } = useTheme();
  const { loading } = useAuthRedirect();
  const { user } = useAuth();
  const router = useRouter();
  const [loadingSignals, setLoadingSignals] = useState(false);

  // Use stock filter hook
  const { state, dispatch, buildPayload } = useStockFilter();
  console.log("state.active: ", state.active);

  // Modal state
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Original tab state for backward compatibility
  const [activeTab, setActiveTab] = useState("Lọc chỉ tiêu");
  const [searchQuery, setSearchQuery] = useState("");

  // Technical indicator dropdown states (for "Lọc kỹ thuật" tab - backward compatibility)
  const [expandedRSI, setExpandedRSI] = useState(false);
  const [expandedMA, setExpandedMA] = useState(false);
  const [expandedEMA, setExpandedEMA] = useState(false);
  const [expandedMACD, setExpandedMACD] = useState(false);
  const [expandedStock, setExpandedStock] = useState(false);

  // Selected technical indicator values
  const [selectedRSI, setSelectedRSI] = useState<string[]>([]);
  const [selectedMA, setSelectedMA] = useState<string[]>([
    // "Giá cắt lên MA 20",
    // "Giá cắt lên MA 200",
  ]);
  const [selectedEMA, setSelectedEMA] = useState<string[]>([]);
  const [selectedMACD, setSelectedMACD] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);

  // Stock symbol picker
  const [listSymbolPicked, setListSymbolPicked] = useState<string[]>([]);
  const [showSymbolModal, setShowSymbolModal] = useState(false);
  const [symbolSearchQuery, setSymbolSearchQuery] = useState("");

  // Memoize filtered symbols for better performance
  const filteredSymbols = React.useMemo(() => {
    if (!symbolSearchQuery) return LIST_SYMBOL;
    const query = symbolSearchQuery.toLowerCase();
    return LIST_SYMBOL.filter((symbol) => symbol.toLowerCase().includes(query));
  }, [symbolSearchQuery]);

  // Saved signals state
  const [savedSignals, setSavedSignals] = useState<
    Array<{
      SignalID: number;
      SignalName: string;
      SignalInfo: string;
      symbol: string;
      CreatedAt: string;
      OwnerID: number;
    }>
  >([]);
  const [editingSignalId, setEditingSignalId] = useState<number | null>(null);
  const [newSignalName, setNewSignalName] = useState("");
  const [activeSavedSignal, setActiveSavedSignal] = useState<number | null>(
    null
  );

  // Technical indicator options
  const maOptions = [
    "Giá cắt lên MA 20",
    "Giá cắt lên MA 50",
    "Giá cắt lên MA 100",
    "Giá cắt lên MA 200",
    "Giá cắt xuống MA 20",
    "Giá cắt xuống MA 50",
  ];

  const RSIOptions = [
    "RSI > 80",
    "RSI < 20",
    "RSI cắt lên 50",
    "RSI cắt xuống 50",
  ];

  const emaOptions = [
    "Giá cắt lên EMA 12",
    "Giá cắt lên EMA 26",
    "Giá cắt xuống EMA 12",
    "Giá cắt xuống EMA 26",
  ];

  const macdOptions = [
    "MACD cắt lên Signal",
    "MACD cắt xuống Signal",
    "MACD > 0",
    "MACD < 0",
  ];

  const stockOptions = [
    "Tất cả cổ phiếu",
    "Chỉ cổ phiếu HOSE",
    "Chỉ cổ phiếu HNX",
    "Chỉ cổ phiếu UPCOM",
  ];

  // Load saved signals from API
  useEffect(() => {
    loadSavedSignals();
  }, []);

  const loadSavedSignals = async () => {
    try {
      setLoadingSignals(true);
      const response = await axiosClient.get("/listChiTieu");
      if (response?.data?.success && response?.data?.signals) {
        setSavedSignals(response.data.signals);
      }
    } catch (error) {
      console.error("Error loading signals:", error);
    } finally {
      setLoadingSignals(false);
    }
  };

  // Helper functions for multiple selection
  const toggleSelection = (
    item: string,
    selectedArray: string[],
    setSelected: (items: string[]) => void
  ) => {
    if (selectedArray.includes(item)) {
      setSelected(selectedArray.filter((selected) => selected !== item));
    } else {
      setSelected([...selectedArray, item]);
    }
  };

  const removeSelection = (
    item: string,
    selectedArray: string[],
    setSelected: (items: string[]) => void
  ) => {
    setSelected(selectedArray.filter((selected) => selected !== item));
  };

  // Check if any indicators are selected
  const hasSelectedIndicators = () => {
    return (
      selectedRSI.length > 0 ||
      selectedMA.length > 0 ||
      selectedEMA.length > 0 ||
      selectedMACD.length > 0 ||
      selectedStock.length > 0
    );
  };

  // Load signal data into indicators
  const loadSignalData = (signal: any) => {
    try {
      const signalInfo = JSON.parse(signal.SignalInfo);

      // Clear current selections first
      setSelectedRSI([]);
      setSelectedMA([]);
      setSelectedEMA([]);
      setSelectedMACD([]);
      setListSymbolPicked([]);

      // Load each indicator's selected values
      signalInfo.forEach((indicator: any) => {
        const selectedOptions = indicator.dropdown
          .filter((item: any) => item.isCheck)
          .map((item: any) => item.label);

        switch (indicator.label) {
          case "Chỉ số RSI":
            setSelectedRSI(selectedOptions);
            break;
          case "Chỉ số MA":
            setSelectedMA(selectedOptions);
            break;
          case "Chỉ số EMA":
            setSelectedEMA(selectedOptions);
            break;
          case "Chỉ số MACD":
            setSelectedMACD(selectedOptions);
            break;
        }
      });

      // Load symbol if exists
      if (signal.symbol) {
        try {
          const symbols = JSON.parse(signal.symbol);
          if (Array.isArray(symbols)) {
            setListSymbolPicked(symbols);
          }
        } catch (e) {
          // If symbol is string, treat as single symbol
          setListSymbolPicked([signal.symbol]);
        }
      }

      // Set active signal
      setActiveSavedSignal(signal.SignalID);
    } catch (error) {
      console.error("Error loading signal data:", error);
      Alert.alert("Lỗi", "Không thể tải dữ liệu tín hiệu");
    }
  };

  // Reset to new signal mode
  const resetToNewSignal = () => {
    setActiveSavedSignal(null);
    setSelectedRSI([]);
    setSelectedMA([]);
    setSelectedEMA([]);
    setSelectedMACD([]);
    setSelectedStock([]);
    setListSymbolPicked([]);
  };

  // Save current signal
  const saveSignal = async () => {
    if (!hasSelectedIndicators()) return;

    // Check if symbols are selected
    if (listSymbolPicked.length === 0) {
      Alert.alert("", "Vui lòng chọn mã cổ phiếu để lưu tín hiệu");
      return;
    }

    try {
      setLoadingSignals(true);

      // Build signalInfo structure matching API format
      const signalInfo = [
        {
          label: "Chỉ số RSI",
          dropdown: RSIOptions.map((option) => ({
            label: option,
            value: 0,
            isCheck: selectedRSI.includes(option),
          })),
        },
        {
          label: "Chỉ số MA",
          dropdown: maOptions.map((option) => ({
            label: option,
            value: 0,
            isCheck: selectedMA.includes(option),
          })),
        },
        {
          label: "Chỉ số EMA",
          dropdown: emaOptions.map((option) => ({
            label: option,
            value: 0,
            isCheck: selectedEMA.includes(option),
          })),
        },
        {
          label: "Chỉ số MACD",
          dropdown: macdOptions.map((option) => ({
            label: option,
            value: 0,
            isCheck: selectedMACD.includes(option),
          })),
        },
      ];

      let response;
      if (activeSavedSignal) {
        // Update existing signal
        response = await axiosClient.put("/listChiTieu/update", {
          SignalID: activeSavedSignal,
          updatedInfo: signalInfo,
        });
      } else {
        // Create new signal
        const signalName = `Tín hiệu ${savedSignals.length + 1}`;
        const payload = {
          ownerId: user?.id || 0,
          symbol: listSymbolPicked.length > 0 ? listSymbolPicked : ["SSI"],
          signalName,
          signalInfo,
        };
        response = await axiosClient.post("/listChiTieu/add", payload);
      }

      if (response?.data?.success) {
        // Alert.alert(
        //   "Thành công",
        //   activeSavedSignal
        //     ? "Cập nhật tín hiệu thành công"
        //     : "Lưu tín hiệu thành công"
        // );
        // Reload signals from API
        await loadSavedSignals();

        // Clear current selections
        setSelectedRSI([]);
        setSelectedMA([]);
        setSelectedEMA([]);
        setSelectedMACD([]);
        setSelectedStock([]);
        setListSymbolPicked([]);
        setActiveSavedSignal(null);
      } else {
        Alert.alert(
          "Lỗi",
          activeSavedSignal
            ? "Không thể cập nhật tín hiệu"
            : "Không thể lưu tín hiệu"
        );
      }
    } catch (error: any) {
      console.error("Error saving signal:", error);
      Alert.alert(
        "Lỗi",
        error?.response?.data?.message ||
        (activeSavedSignal
          ? "Không thể cập nhật tín hiệu"
          : "Không thể lưu tín hiệu")
      );
    } finally {
      setLoadingSignals(false);
    }
  };

  // Delete saved signal
  const deleteSignal = async (signalId: number) => {
    try {
      Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa tín hiệu này?", [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              setLoadingSignals(true);

              // Call delete API
              const response = await axiosClient.delete(
                `/listChiTieu/delete/${signalId}`
              );

              if (response?.data?.success) {
                // Reload signals from API
                await loadSavedSignals();

                // If deleted signal was active, reset to new signal mode
                if (activeSavedSignal === signalId) {
                  resetToNewSignal();
                }
              } else {
                Alert.alert("Lỗi", "Không thể xóa tín hiệu");
              }
            } catch (error: any) {
              console.error("Error deleting signal:", error);
              Alert.alert(
                "Lỗi",
                error?.response?.data?.message || "Không thể xóa tín hiệu"
              );
            } finally {
              setLoadingSignals(false);
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Error deleting signal:", error);
    }
  };

  // Update signal name
  const updateSignalName = async (signalId: number, newName: string) => {
    try {
      setLoadingSignals(true);
      // Call update API here if available
      // For now, just update locally
      setSavedSignals(
        savedSignals.map((signal) =>
          signal.SignalID === signalId
            ? { ...signal, SignalName: newName }
            : signal
        )
      );
      setEditingSignalId(null);
      setNewSignalName("");
    } catch (error) {
      console.error("Error updating signal name:", error);
      Alert.alert("Lỗi", "Không thể cập nhật tên tín hiệu");
    } finally {
      setLoadingSignals(false);
    }
  };

  // Handle filter action
  const handleFilter = async () => {
    // Validate range criteria (min <= max)
    for (const criterion of state.active) {
      if (criterion.control === "range") {
        const { min, max } = criterion.values;
        if (
          min !== undefined &&
          max !== undefined &&
          Number(min) > Number(max)
        ) {
          Alert.alert(
            "Lỗi",
            `Tiêu chí "${criterion.label}": Giá trị Min phải nhỏ hơn hoặc bằng Max`
          );
          return;
        }
      }
    }

    try {
      //hide keyboard
      Keyboard.dismiss();
      dispatch({ type: "LOAD_START" });

      const payload = buildPayload();
      const response = await filterData(payload);

      const items = response?.data?.data?.result?.items ?? [];
      const total = response?.data?.data?.result?.totalCount ?? 0;
      console.log("All items:", items);

      dispatch({ type: "LOAD_SUCCESS", rows: items, total });
    } catch (error: any) {
      console.error("Filter error:", error);
      dispatch({
        type: "LOAD_FAIL",
        error: error.message || "Lỗi khi lọc dữ liệu",
      });
      Alert.alert(
        "Lỗi",
        error.message || "Không thể lọc dữ liệu. Vui lòng thử lại."
      );
    }
  };

  // Handle reset
  const handleReset = () => {
    dispatch({ type: "RESET_ALL" });
  };

  const getExchangeColor = (exchange: string) => {
    switch (exchange) {
      case "HOSE":
        return "#34C759"; // Green
      case "HNX":
        return "#FF6B6B"; // Red
      case "Upcom":
        return "#007AFF"; // Blue
      default:
        return "#8E8E93"; // Gray
    }
  };

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Lọc cổ phiếu
        </Text>
      </View>

      {/* Tab Navigation */}
      <View
        style={[
          styles.tabContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {["Lọc chỉ tiêu", "Lọc kỹ thuật"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              {
                backgroundColor:
                  activeTab === tab
                    ? theme.colors.blue
                    : theme.colors.inactiveTab,
              },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === tab
                      ? theme.colors.text
                      : theme.colors.textInactiveTab,
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content based on active tab */}
      {activeTab === "Lọc chỉ tiêu" && (
        <>
          {/* Filter Button */}
          <View
            style={[
              styles.filterSection,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor: theme.colors.backgroundTabActive,
                  borderColor: theme.colors.backgroundTabActive,
                },
              ]}
              onPress={() => setShowFilterModal(true)}
            >
              <View style={styles.filterHeader}>
                <View style={[styles.filterTitleContainer]}>
                  <Text
                    style={[styles.filterTitle, { color: theme.colors.text }]}
                  >
                    Tiêu chí lọc ({state.stagedIds.length + state.active.length}
                    )
                  </Text>
                  {/* <View style={[styles.addButton, { backgroundColor: theme.mode === 'dark' ? '#3A3A3C' : '#D1D1D6' }]}>
                    <Text style={[styles.addButtonText, { color: theme.colors.text }]}>+</Text>
                  </View> */}
                  <PlusIcon size={16} color={theme.colors.text} />
                </View>
                {/* <Text style={[styles.expandIcon, { color: theme.colors.text }]}>⌄</Text> */}
                <ArrowDownIcon size={16} color={theme.colors.text} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Active Config Bar and Result List Container */}
          {state.active.length > 0 && (
            <View style={{ flex: 1 }}>
              {/* Active Config Bar with ScrollView inside (max height 400) */}
              <ActiveConfigBar
                active={state.active}
                onChange={(id, values) =>
                  dispatch({ type: "ACTIVE_UPDATE", id, values })
                }
                onRemove={(id) => dispatch({ type: "ACTIVE_REMOVE", id })}
                theme={theme}
              />

              {/* Filter & Reset Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.resetButton,
                    {
                      backgroundColor: theme.colors.backgroundItemTinHieu,
                    },
                  ]}
                  onPress={handleReset}
                >
                  <Text
                    style={[
                      styles.resetButtonText,
                      { color: theme.colors.text },
                    ]}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterActionButton,
                    {
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                  onPress={handleFilter}
                  disabled={state.loading}
                >
                  <Text style={styles.filterActionButtonText}>
                    {state.loading ? "Đang lọc..." : "Lọc"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Result List - FlatList handles its own scrolling */}
              <ResultList
                rows={state.rows}
                total={state.total}
                loading={state.loading}
                onItemPress={(item) => {
                  // Navigate to stock detail
                  router.push(
                    `/stock-detail?symbol=${item.Symbol || item.symbol}`
                  );
                }}
                theme={theme}
                active={state.active}
              />
            </View>
          )}

          {/* Result List when no active filters */}
          {state.active.length === 0 && (
            <ResultList
              rows={state.rows}
              total={state.total}
              loading={state.loading}
              onItemPress={(item) => {
                // Navigate to stock detail
                router.push(
                  `/stock-detail?symbol=${item.Symbol || item.symbol}`
                );
              }}
              theme={theme}
              active={state.active}
            />
          )}
        </>
      )}

      {activeTab === "Lọc kỹ thuật" && (
        <ScrollView
          style={styles.technicalFilterContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Saved Signals Section */}
          {savedSignals.length > 0 && (
            <View
              style={[
                styles.savedSignalsSection,
                { backgroundColor: theme.colors.background },
              ]}
            >
              {savedSignals.map((signal) => {
                // Parse SignalInfo to count active indicators
                let indicatorCount = 0;
                try {
                  const signalInfo = JSON.parse(signal.SignalInfo);
                  indicatorCount = signalInfo.reduce(
                    (acc: number, indicator: any) => {
                      const activeCount =
                        indicator.dropdown?.filter((item: any) => item.isCheck)
                          .length || 0;
                      return acc + activeCount;
                    },
                    0
                  );
                } catch (e) {
                  console.error("Error parsing SignalInfo:", e);
                }

                return (
                  <TouchableOpacity
                    key={signal.SignalID}
                    style={[
                      styles.savedSignalItem,
                      {
                        backgroundColor: theme.colors.backgroundItemTinHieu,
                        borderColor:
                          activeSavedSignal === signal.SignalID
                            ? theme.colors.primary
                            : theme.mode === "dark"
                              ? "#3A3A3C"
                              : "#E5E5E7",
                        borderWidth:
                          activeSavedSignal === signal.SignalID ? 2 : 1,
                      },
                    ]}
                    onPress={() => loadSignalData(signal)}
                  >
                    <View style={styles.signalItemContent}>
                      <SignalIcon size={16} color={theme.colors.textTab} />
                      {/* Signal Info */}
                      <View style={styles.signalInfo}>
                        <View
                        // onPress={() => {
                        //   setEditingSignalId(signal.SignalID);
                        //   setNewSignalName(signal.SignalName);
                        // }}
                        >
                          <Text
                            style={[
                              styles.signalName,
                              { color: theme.colors.text },
                            ]}
                          >
                            {signal.SignalName}
                          </Text>
                        </View>
                        {/* {editingSignalId === signal.SignalID ? (
                          <TextInput
                            style={[
                              styles.signalNameInput,
                              {
                                color: theme.colors.text,
                                backgroundColor: "transparent",
                                borderWidth: 0,
                                paddingHorizontal: 0,
                                paddingVertical: 0,
                              },
                            ]}
                            value={newSignalName}
                            onChangeText={setNewSignalName}
                            placeholder="Tên tín hiệu"
                            placeholderTextColor="#8E8E93"
                            autoFocus
                            onBlur={() => {
                              if (newSignalName.trim()) {
                                updateSignalName(
                                  signal.SignalID,
                                  newSignalName
                                );
                              } else {
                                setEditingSignalId(null);
                                setNewSignalName("");
                              }
                            }}
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setEditingSignalId(signal.SignalID);
                              setNewSignalName(signal.SignalName);
                            }}
                          >
                            <Text
                              style={[
                                styles.signalName,
                                { color: theme.colors.text },
                              ]}
                            >
                              {signal.SignalName}
                            </Text>
                          </TouchableOpacity>
                        )} */}

                        {/* Signal Description */}
                        <Text
                          style={[
                            styles.signalDescription,
                            { color: theme.colors.textTab },
                          ]}
                        >
                          {signal.symbol} • {indicatorCount} tiêu chí
                        </Text>
                      </View>

                      {/* Action Buttons */}
                      <View style={styles.signalActions}>
                        {/* Share Button */}
                        <TouchableOpacity
                          style={styles.shareButton}
                          onPress={() =>
                            router.push({
                              pathname: "/share-signal",
                              params: { signalName: signal.SignalName },
                            })
                          }
                        >
                          <MaterialIcons
                            name="reply"
                            size={20}
                            color={theme.colors.iconColor}
                          />
                        </TouchableOpacity>

                        {/* Delete Button */}
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => deleteSignal(signal.SignalID)}
                        >
                          <Text
                            style={[styles.deleteIcon, { color: "#8E8E93" }]}
                          >
                            ×
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* No Signal Section */}
          {savedSignals.length === 0 && (
            <View
              style={[
                styles.noSignalSection,
                { backgroundColor: theme.colors.backgroundTab },
              ]}
            >
              {/* <View style={[styles.signalIconContainer, { backgroundColor: theme.colors.backgroundItemTinHieu }]}>
                <Text style={[styles.signalIcon, { color: '#8E8E93' }]}>📡</Text>
              </View> */}
              <SignalIcon size={24} color={theme.colors.textResult} />
              <Text
                style={[
                  styles.noSignalText,
                  { color: theme.colors.textResult, marginTop: 8 },
                ]}
              >
                Không có tín hiệu nào được lưu
              </Text>
            </View>
          )}

          {/* Save Signal Section */}
          <View
            style={[
              styles.saveSignalSection,
              // { backgroundColor: theme.colors.backgroundTab },
            ]}
          >
            <View
              style={[
                styles.saveSignalHeader,
                {
                  borderBottomColor: theme.colors.borderBottom,
                  borderBottomWidth: 1,
                },
              ]}
            >
              <TouchableOpacity onPress={resetToNewSignal}>
                <Text
                  style={[styles.saveSignalTitle, { color: theme.colors.text }]}
                >
                  Chọn tín hiệu mới
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.saveSignalButton,
                  {
                    opacity:
                      hasSelectedIndicators() && !loadingSignals ? 1 : 0.5,
                    flexDirection: "row",
                    backgroundColor: theme.colors.backgroundTabActive,
                    borderRadius: 16,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    alignItems: "center",
                  },
                ]}
                onPress={saveSignal}
                disabled={!hasSelectedIndicators() || loadingSignals}
              >
                <Text
                  style={[
                    styles.saveSignalButtonText,
                    {
                      color:
                        hasSelectedIndicators() && !loadingSignals
                          ? theme.colors.text
                          : "#8E8E93",
                    },
                  ]}
                >
                  {activeSavedSignal ? "Cập nhật tín hiệu" : "Lưu tín hiệu"}
                </Text>
                {!loadingSignals && (
                  <SignalIcon size={12} color={theme.colors.textResult} />
                )}
              </TouchableOpacity>
            </View>

            {/* Technical Indicators */}
            <View style={styles.indicatorsContainer}>
              <View style={styles.indicatorSection}>
                <TouchableOpacity
                  style={[
                    styles.indicatorItem,
                    { backgroundColor: theme.colors.backgroundTabActive },
                  ]}
                  onPress={() => setShowSymbolModal(true)}
                >
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Chọn cổ phiếu nhận tín hiệu
                    {listSymbolPicked.length > 0
                      ? ` (${listSymbolPicked.length})`
                      : ""}
                  </Text>
                  <ArrowDownIcon size={12} color={theme.colors.text} />
                </TouchableOpacity>

                {/* Selected Tags */}
                {listSymbolPicked.length > 0 && (
                  <View style={styles.selectedTagsContainer}>
                    {listSymbolPicked.slice(0, 10).map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.selectedTag,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <Text style={styles.selectedTagText}>{item}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            setListSymbolPicked((prev) =>
                              prev.filter((s) => s !== item)
                            )
                          }
                        >
                          <Text
                            style={[styles.removeTag, { color: "#FFFFFF" }]}
                          >
                            ×
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    {listSymbolPicked.length > 10 && (
                      <Text
                        style={[
                          styles.moreSymbolsText,
                          { color: theme.colors.textResult },
                        ]}
                      >
                        +{listSymbolPicked.length - 10} mã khác
                      </Text>
                    )}
                  </View>
                )}
              </View>
              {/* RSI Indicator */}
              <View style={styles.indicatorSection}>
                <TouchableOpacity
                  style={[
                    styles.indicatorItem,
                    { backgroundColor: theme.colors.backgroundTabActive },
                  ]}
                  onPress={() => setExpandedRSI(!expandedRSI)}
                >
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Chỉ số RSI:
                  </Text>
                  {/* <TouchableOpacity style={[styles.indicatorDropdown, { backgroundColor: theme.mode === 'dark' ? '#1C1C1E' : '#E5E5E7' }]}>
                    <Text style={[styles.dropdownArrow, { color: '#8E8E93', transform: [{ rotate: expandedRSI ? '180deg' : '0deg' }] }]}>⌄</Text>
                  </TouchableOpacity> */}
                  {expandedRSI ? (
                    <ArrowUpIcon size={12} color={theme.colors.text} />
                  ) : (
                    <ArrowDownIcon size={12} color={theme.colors.text} />
                  )}
                </TouchableOpacity>

                {/* Selected Tags */}
                {selectedRSI.length > 0 && (
                  <View style={styles.selectedTagsContainer}>
                    {selectedRSI.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.selectedTag,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <Text style={styles.selectedTagText}>{item}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            removeSelection(item, selectedRSI, setSelectedRSI)
                          }
                        >
                          <Text
                            style={[styles.removeTag, { color: "#FFFFFF" }]}
                          >
                            ×
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {expandedRSI && (
                  <View
                    style={[
                      styles.dropdownOptions,
                      {
                        // backgroundColor: theme.colors.backgroundItemTinHieu,
                        // borderColor:
                        //   theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                      },
                    ]}
                  >
                    {RSIOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownOption,
                          {
                            borderBottomColor:
                              theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                            // backgroundColor: selectedRSI.includes(option)
                            //   ? theme.colors.backgroundTabActive
                            //   : "transparent",
                          },
                        ]}
                        onPress={() =>
                          toggleSelection(option, selectedRSI, setSelectedRSI)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            {
                              //  color: theme.colors.text
                              color: selectedRSI.includes(option)
                                ? theme.colors.textTab
                                : theme.colors.textTieuChi,
                            },
                          ]}
                        >
                          {option}
                        </Text>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: selectedRSI.includes(option)
                                ? theme.colors.primary
                                : "transparent",
                              borderColor: selectedRSI.includes(option)
                                ? theme.colors.primary
                                : "#8E8E93",
                            },
                          ]}
                        >
                          {selectedRSI.includes(option) && (
                            <Text style={styles.checkIconText}>✓</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* MA Indicator */}
              <View style={styles.indicatorSection}>
                <TouchableOpacity
                  style={[
                    styles.indicatorItem,
                    { backgroundColor: theme.colors.backgroundTabActive },
                  ]}
                  onPress={() => setExpandedMA(!expandedMA)}
                >
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Chỉ số MA:
                  </Text>
                  {expandedMA ? (
                    <ArrowUpIcon size={12} color={theme.colors.text} />
                  ) : (
                    <ArrowDownIcon size={12} color={theme.colors.text} />
                  )}
                </TouchableOpacity>

                {/* Selected Tags */}
                {selectedMA.length > 0 && (
                  <View style={styles.selectedTagsContainer}>
                    {selectedMA.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.selectedTag,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <Text style={styles.selectedTagText}>{item}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            removeSelection(item, selectedMA, setSelectedMA)
                          }
                        >
                          <Text
                            style={[styles.removeTag, { color: "#FFFFFF" }]}
                          >
                            ×
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {expandedMA && (
                  <View
                    style={[
                      styles.dropdownOptions,
                      {
                        // backgroundColor: theme.colors.backgroundItemTinHieu,
                        borderColor:
                          theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                      },
                    ]}
                  >
                    {maOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownOption,
                          {
                            borderBottomColor:
                              theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                          },
                        ]}
                        onPress={() =>
                          toggleSelection(option, selectedMA, setSelectedMA)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            {
                              color: selectedMA.includes(option)
                                ? theme.colors.textTab
                                : theme.colors.textTieuChi,
                            },
                          ]}
                        >
                          {option}
                        </Text>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: selectedMA.includes(option)
                                ? theme.colors.primary
                                : "transparent",
                              borderColor: selectedMA.includes(option)
                                ? theme.colors.primary
                                : "#8E8E93",
                            },
                          ]}
                        >
                          {selectedMA.includes(option) && (
                            <Text style={styles.checkIconText}>✓</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* EMA Indicator */}
              <View style={styles.indicatorSection}>
                <TouchableOpacity
                  style={[
                    styles.indicatorItem,
                    { backgroundColor: theme.colors.backgroundTabActive },
                  ]}
                  onPress={() => setExpandedEMA(!expandedEMA)}
                >
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Chỉ số EMA:
                  </Text>
                  {expandedEMA ? (
                    <ArrowUpIcon size={12} color={theme.colors.text} />
                  ) : (
                    <ArrowDownIcon size={12} color={theme.colors.text} />
                  )}
                </TouchableOpacity>

                {/* Selected Tags */}
                {selectedEMA.length > 0 && (
                  <View style={styles.selectedTagsContainer}>
                    {selectedEMA.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.selectedTag,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <Text style={styles.selectedTagText}>{item}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            removeSelection(item, selectedEMA, setSelectedEMA)
                          }
                        >
                          <Text
                            style={[styles.removeTag, { color: "#FFFFFF" }]}
                          >
                            ×
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {expandedEMA && (
                  <View
                    style={[
                      styles.dropdownOptions,
                      {
                        // backgroundColor: theme.colors.backgroundItemTinHieu,
                        borderColor:
                          theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                      },
                    ]}
                  >
                    {emaOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownOption,
                          {
                            borderBottomColor:
                              theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                          },
                        ]}
                        onPress={() =>
                          toggleSelection(option, selectedEMA, setSelectedEMA)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            {
                              color: selectedEMA.includes(option)
                                ? theme.colors.textTab
                                : theme.colors.textTieuChi,
                            },
                          ]}
                        >
                          {option}
                        </Text>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: selectedEMA.includes(option)
                                ? theme.colors.primary
                                : "transparent",
                              borderColor: selectedEMA.includes(option)
                                ? theme.colors.primary
                                : "#8E8E93",
                            },
                          ]}
                        >
                          {selectedEMA.includes(option) && (
                            <Text style={styles.checkIconText}>✓</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* MACD Indicator */}
              <View style={styles.indicatorSection}>
                <TouchableOpacity
                  style={[
                    styles.indicatorItem,
                    { backgroundColor: theme.colors.backgroundTabActive },
                  ]}
                  onPress={() => setExpandedMACD(!expandedMACD)}
                >
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    Chỉ số MACD:
                  </Text>
                  {expandedMACD ? (
                    <ArrowUpIcon size={12} color={theme.colors.text} />
                  ) : (
                    <ArrowDownIcon size={12} color={theme.colors.text} />
                  )}
                </TouchableOpacity>

                {/* Selected Tags */}
                {selectedMACD.length > 0 && (
                  <View style={styles.selectedTagsContainer}>
                    {selectedMACD.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.selectedTag,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <Text style={styles.selectedTagText}>{item}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            removeSelection(item, selectedMACD, setSelectedMACD)
                          }
                        >
                          <Text
                            style={[styles.removeTag, { color: "#FFFFFF" }]}
                          >
                            ×
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {expandedMACD && (
                  <View
                    style={[
                      styles.dropdownOptions,
                      {
                        // backgroundColor: theme.colors.backgroundItemTinHieu,
                        borderColor:
                          theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                      },
                    ]}
                  >
                    {macdOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownOption,
                          {
                            borderBottomColor:
                              theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                          },
                        ]}
                        onPress={() =>
                          toggleSelection(option, selectedMACD, setSelectedMACD)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            {
                              color: selectedMACD.includes(option)
                                ? theme.colors.textTab
                                : theme.colors.textTieuChi,
                            },
                          ]}
                        >
                          {option}
                        </Text>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: selectedMACD.includes(option)
                                ? theme.colors.primary
                                : "transparent",
                              borderColor: selectedMACD.includes(option)
                                ? theme.colors.primary
                                : "#8E8E93",
                            },
                          ]}
                        >
                          {selectedMACD.includes(option) && (
                            <Text style={styles.checkIconText}>✓</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Stock Signal Indicator */}
            </View>
          </View>
        </ScrollView>
      )}

      {activeTab === "Cài đặt tín hiệu" && (
        <View style={styles.signalSettingsContainer}>
          {/* Empty State with Signal Icon */}
          <View style={styles.emptySignalState}>
            <View
              style={[
                styles.emptySignalIcon,
                { backgroundColor: theme.colors.backgroundItemTinHieu },
              ]}
            >
              <Text style={[styles.signalIconText, { color: "#8E8E93" }]}>
                📡
              </Text>
            </View>
            <Text style={[styles.emptySignalText, { color: "#8E8E93" }]}>
              Không có tín hiệu nào được lưu
            </Text>
          </View>

          {/* Setup Signal Button */}
          <View style={styles.setupButtonContainer}>
            <TouchableOpacity
              style={[
                styles.setupSignalButton,
                { borderColor: theme.colors.primary },
              ]}
              onPress={() => router.push("/signal-settings")}
            >
              <Text
                style={[
                  styles.setupSignalButtonText,
                  { color: theme.colors.primary },
                ]}
              >
                + Cài đặt tín hiệu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        stagedIds={state.stagedIds}
        onToggle={(def) => dispatch({ type: "STAGE_TOGGLE", id: def.id })}
        onApply={() => dispatch({ type: "APPLY" })}
        theme={theme}
      />

      {/* Symbol Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSymbolModal}
        onRequestClose={() => setShowSymbolModal(false)}
      >
        <View style={styles.symbolModalContainer}>
          <View
            style={[
              styles.symbolModalContent,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {/* Header */}
            <View
              style={[
                styles.symbolModalHeader,
                {
                  borderBottomColor:
                    theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                },
              ]}
            >
              <Text
                style={[styles.symbolModalTitle, { color: theme.colors.text }]}
              >
                Chọn cổ phiếu nhận tín hiệu
              </Text>
              <TouchableOpacity onPress={() => setShowSymbolModal(false)}>
                <Text
                  style={[
                    styles.symbolModalClose,
                    { color: theme.colors.text },
                  ]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.symbolSearchContainer}>
              <TextInput
                style={[
                  styles.symbolSearchInput,
                  {
                    backgroundColor: theme.colors.backgroundTabActive,
                    color: theme.colors.text,
                  },
                ]}
                placeholder="Tìm kiếm mã cổ phiếu..."
                placeholderTextColor="#8E8E93"
                value={symbolSearchQuery}
                onChangeText={setSymbolSearchQuery}
              />
            </View>

            {/* Selected Count */}
            <View style={styles.symbolSelectedCount}>
              <Text
                style={[
                  styles.symbolCountText,
                  { color: theme.colors.textResult },
                ]}
              >
                Đã chọn: {listSymbolPicked.length} mã
              </Text>
              {listSymbolPicked.length > 0 && (
                <TouchableOpacity onPress={() => setListSymbolPicked([])}>
                  <Text
                    style={[
                      styles.clearAllText,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Xóa tất cả
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Symbol List */}
            <FlatList
              data={filteredSymbols}
              keyExtractor={(item) => item}
              style={styles.symbolList}
              initialNumToRender={15}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={true}
              getItemLayout={(data, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
              renderItem={({ item: symbol }) => {
                const isSelected = listSymbolPicked.includes(symbol);
                return (
                  <TouchableOpacity
                    style={[
                      styles.symbolItem,
                      {
                        borderBottomColor:
                          theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                        backgroundColor: isSelected
                          ? theme.colors.backgroundTabActive
                          : "transparent",
                      },
                    ]}
                    onPress={() => {
                      if (isSelected) {
                        setListSymbolPicked((prev) =>
                          prev.filter((s) => s !== symbol)
                        );
                      } else {
                        setListSymbolPicked((prev) => [...prev, symbol]);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.symbolItemText,
                        { color: theme.colors.text },
                      ]}
                    >
                      {symbol}
                    </Text>
                    <View
                      style={[
                        styles.checkbox,
                        {
                          backgroundColor: isSelected
                            ? theme.colors.primary
                            : "transparent",
                          borderColor: isSelected
                            ? theme.colors.primary
                            : "#8E8E93",
                        },
                      ]}
                    >
                      {isSelected && (
                        <Text style={styles.checkIconText}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />

            {/* Footer Buttons */}
            <View
              style={[
                styles.symbolModalFooter,
                {
                  borderTopColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.symbolModalButton,
                  { backgroundColor: theme.colors.backgroundTabActive },
                ]}
                onPress={() => {
                  setShowSymbolModal(false);
                  setSymbolSearchQuery("");
                }}
              >
                <Text
                  style={[
                    styles.symbolModalButtonText,
                    { color: theme.colors.text },
                  ]}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 80,
    alignItems: "center",
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  filterSection: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  filterButton: {
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 16,
    marginBottom: 8,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  addButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  expandIcon: {
    fontSize: 16,
  },
  resultText: {
    fontSize: 14,
    marginLeft: 4,
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "left",
  },
  stockList: {
    flex: 1,
  },
  stockRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  stockIndex: {
    fontSize: 14,
    textAlign: "left",
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
  },
  stockExchange: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
  },
  stockIndustry: {
    fontSize: 14,
    textAlign: "left",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tabContentText: {
    fontSize: 18,
    fontWeight: "600",
  },
  // Technical Filter Styles
  technicalFilterContainer: {
    flex: 1,
  },
  savedSignalsSection: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  savedSignalsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  savedSignalItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 0,
    marginBottom: 12,
    overflow: "hidden",
  },
  signalItemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  signalItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  signalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  signalName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  signalDescription: {
    fontSize: 13,
    lineHeight: 16,
  },
  signalActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  shareButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  shareIcon: {
    fontSize: 18,
    fontWeight: "500",
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    fontSize: 20,
    fontWeight: "400",
  },
  signalNameInput: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  signalIndicators: {
    gap: 8,
  },
  indicatorSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  saveSignalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveSignalButtonText: {
    fontSize: 15,
    fontWeight: "500",
  },
  // New styles for Technical Filter
  noSignalSection: {
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 76,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  signalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  signalIcon: {
    fontSize: 36,
  },
  noSignalText: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
  },
  saveSignalSection: {
    // paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 8,
    // marginHorizontal: 8,
    borderRadius: 12,
  },
  saveSignalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  saveSignalTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  saveSignalSubtitle: {
    fontSize: 14,
  },
  indicatorsContainer: {
    gap: 12,
    paddingHorizontal: 8,
  },
  indicatorSection: {
    marginBottom: 0,
  },
  indicatorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  indicatorLabel: {
    fontSize: 14,
    fontWeight: "400",
    flex: 1,
  },
  indicatorDropdown: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownArrow: {
    fontSize: 14,
    fontWeight: "600",
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 8,
  },
  selectedTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  selectedTagText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  removeTag: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownOptions: {
    marginTop: 4,
    // marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 0,
    overflow: "hidden",
  },
  dropdownOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 14,
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
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalTabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
  },
  modalTab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  modalActiveTab: {
    borderBottomWidth: 2,
  },
  modalTabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  modalSearchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalSearchBar: {
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
  modalSearchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  modalFilterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalFilterCount: {
    fontSize: 14,
    fontWeight: "500",
  },
  modalFilterTotal: {
    fontSize: 14,
  },
  modalContent: {
    flex: 1,
  },
  criteriaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    flex: 1,
  },
  modalFooter: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalApplyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalApplyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  // Signal Settings Styles
  signalSettingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptySignalState: {
    alignItems: "center",
    marginBottom: 32,
  },
  emptySignalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  signalIconText: {
    fontSize: 36,
  },
  emptySignalText: {
    fontSize: 16,
    textAlign: "center",
  },
  setupButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  setupSignalButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "dashed",
  },
  setupSignalButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  // Symbol Picker Modal Styles
  symbolModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  symbolModalContent: {
    height: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  symbolModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  symbolModalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  symbolModalClose: {
    fontSize: 24,
    fontWeight: "400",
  },
  symbolSearchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  symbolSearchInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 14,
  },
  symbolSelectedCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  symbolCountText: {
    fontSize: 14,
    fontWeight: "500",
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  symbolList: {
    flex: 1,
  },
  symbolItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    height: 50,
  },
  symbolItemText: {
    fontSize: 15,
    fontWeight: "500",
  },
  symbolModalFooter: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  symbolModalButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  symbolModalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  moreSymbolsText: {
    fontSize: 12,
    fontWeight: "500",
    paddingVertical: 6,
  },
  // Action buttons for filter
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  filterActionButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  filterActionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
