import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import axios from "axios";
import axiosClient from "@/api/request";
import VnFlagIcon from "@/components/icons/VnFlagIcon";
import { LIST_MAP_GOLD_NAME } from "./constants";
import GoldListScreen from "../GoldListScreen";

// API Base URL - Thay đổi theo config của bạn
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://your-api-domain.com";

export default function ThiTruongTab() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showFuelInfoModal, setShowFuelInfoModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for API data
  const [listLaiSuat, setListLaiSuat] = useState([]);
  const [listLaiSuatOnline, setListLaiSuatOnline] = useState([]);
  const [listGiaVang, setListGiaVang] = useState([]);
  const [listGiaXangDau, setListGiaXangDau] = useState([]);
  const [listGiaXangDauHistory, setListGiaXangDauHistory] = useState([]);
  const [listTyGiaNgoaiTe, setListTyGiaNgoaiTe] = useState([]);
  const [listGiaGao, setListGiaGao] = useState([]);
  const [listGiaHeo, setListGiaHeo] = useState([]);
  const [listGiaThep, setListGiaThep] = useState([]);
  const [listGiaCaTra, setListGiaCaTra] = useState([]);
  const [listGiaPhan, setListGiaPhan] = useState([]);
  const [listGiaDien, setListGiaDien] = useState([]);

  const [typeLaiSuat, setTypeLaiSuat] = useState("guiTaiQuay");
  const [curTabTop, setCurTabTop] = useState("laiSuat");

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        getLaiSuat(),
        getLaiSuatOnline(),
        getGiaVang(),
        getGiaXangDau(),
        // getGiaXangDauHistory(),
        getTyGiaNgoaiTe(),
        getGiaGao(),
        getGiaHeo(),
        getGiaThep(),
        getGiaCaTra(),
        getGiaPhan(),
        getGiaDien(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // API calls
  const getGiaVang = async () => {
    try {
      // const responseGiaVang = await axiosClient.get(`/giaVang`);
      const responseGiaVang = await axiosClient.get(`/giaVang/latest`);
      const dataGiaVang = responseGiaVang?.data?.data;
      setListGiaVang(dataGiaVang || []);
    } catch (error) {
      console.error("Error fetching gia vang:", error);
      setListGiaVang([]);
    }
  };

  const getLaiSuat = async () => {
    try {
      const responseLaiSuat = await axiosClient.get(`/lai_suat`);
      const dataLaiSuat = responseLaiSuat?.data?.data;
      setListLaiSuat(dataLaiSuat || []);
    } catch (error) {
      console.error("Error fetching lai suat:", error);
      setListLaiSuat([]);
    }
  };

  const getLaiSuatOnline = async () => {
    try {
      const responseLaiSuat = await axiosClient.get(`/lai_suat_online`);
      const dataLaiSuat = responseLaiSuat?.data?.data;
      setListLaiSuatOnline(dataLaiSuat || []);
    } catch (error) {
      console.error("Error fetching lai suat online:", error);
      setListLaiSuatOnline([]);
    }
  };

  const getGiaXangDau = async () => {
    try {
      const responseGiaXangDau = await axiosClient.get("/gia_xang_dau");
      const dataGiaXangDau = responseGiaXangDau?.data?.data;
      setListGiaXangDau(dataGiaXangDau || []);
    } catch (error) {
      console.error("Error fetching gia xang dau:", error);
      setListGiaXangDau([]);
    }
  };

  const getGiaXangDauHistory = async () => {
    try {
      const responseGiaXangDau = await axiosClient.get(`/gia_xang_dau_history`);
      const dataGiaXangDau = responseGiaXangDau?.data?.data;
      setListGiaXangDauHistory(dataGiaXangDau || []);
    } catch (error) {
      console.error("Error fetching gia xang dau history:", error);
      setListGiaXangDauHistory([]);
    }
  };

  const getTyGiaNgoaiTe = async () => {
    try {
      const responseTyGiaNgoaiTe = await axiosClient.get(`/ty_gia_ngoai_te`);
      const dataTyGiaNgoaiTe = responseTyGiaNgoaiTe?.data?.data;
      setListTyGiaNgoaiTe(dataTyGiaNgoaiTe || []);
    } catch (error) {
      console.error("Error fetching ty gia ngoai te:", error);
      setListTyGiaNgoaiTe([]);
    }
  };

  const getGiaGao = async () => {
    try {
      const response = await axiosClient.get(`/gia_gao`);
      setListGiaGao(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching gia gao:", error);
      setListGiaGao([]);
    }
  };

  const getGiaHeo = async () => {
    try {
      const response = await axiosClient.get(`/gia_heo`);
      setListGiaHeo(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching gia heo:", error);
      setListGiaHeo([]);
    }
  };

  const getGiaThep = async () => {
    try {
      const response = await axiosClient.get(`/gia_thep`);
      setListGiaThep(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching gia thep:", error);
      setListGiaThep([]);
    }
  };

  const getGiaCaTra = async () => {
    try {
      const response = await axiosClient.get(`/gia_ca_tra`);
      setListGiaCaTra(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching gia ca tra:", error);
      setListGiaCaTra([]);
    }
  };

  const getGiaPhan = async () => {
    try {
      const response = await axiosClient.get(`/gia_phan`);
      setListGiaPhan(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching gia phan:", error);
      setListGiaPhan([]);
    }
  };

  const getGiaDien = async () => {
    try {
      const response = await axiosClient.get(`/gia_dien`);
      setListGiaDien(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching gia dien:", error);
      setListGiaDien([]);
    }
  };

  // Helper function to format gold price
  const formatGoldPrice = (price) => {
    if (!price) return "-";
    return parseFloat(price).toLocaleString("vi-VN");
  };

  // Get current data based on selected tab
  const getCurrentTabData = () => {
    switch (curTabTop) {
      case "laiSuat":
        return typeLaiSuat === "guiTaiQuay" ? listLaiSuat : listLaiSuatOnline;
      case "giaVang":
        return listGiaVang;
      case "xangDau":
        return listGiaXangDau;
      case "giaHeo":
        return listGiaHeo;
      case "giaThep":
        return listGiaThep;
      case "giaGao":
        return listGiaGao;
      case "giaCaTra":
        return listGiaCaTra;
      case "giaPhan":
        return listGiaPhan;
      case "giaDien":
        return listGiaDien;
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text
          style={[
            styles.loadingText,
            { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
          ]}
        >
          Đang tải dữ liệu...
        </Text>
      </View>
    );
  }

  // Render item for FlatList (Lãi suất tab)
  const renderLaiSuatItem = ({ item, index }) => (
    <View
      style={[
        styles.tableRow,
        {
          backgroundColor: theme.colors.backgroundCoPhieu,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#30323B",
          paddingHorizontal: 8,
        },
      ]}
    >
      <View style={[styles.nameContainer, { flex: 1.7 }]}>
        <Text
          style={[
            styles.nameText,
            {
              color: theme.mode === "dark" ? "#99BAFF" : "#2E3138",
              textAlign: "left",
              paddingLeft: 8,
            },
          ]}
        >
          {item.bankName}
        </Text>
      </View>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.value1Month}%
      </Text>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.value3Month}%
      </Text>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.value6Month}%
      </Text>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.value12Month}%
      </Text>
    </View>
  );

  // Render item for FlatList (Giá vàng tab)
  const renderGiaVangItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/GoldListScreen",
            params: {
              goldName: item.name,
              goldData: JSON.stringify(item),
            },
          });
        }}
        style={[
          styles.tableRow,
          {
            backgroundColor: theme.colors.backgroundCoPhieu,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#30323B",
            paddingHorizontal: 8,
          },
        ]}
      >
        <View style={[styles.nameContainer, { flex: 1.5 }]}>
          {/* <View style={[styles.icon, { backgroundColor: "#FFD60A" }]} /> */}
          <Text
            style={[
              styles.nameText,
              {
                color: theme.mode === "dark" ? "#99BAFF" : "#2E3138",
                textAlign: "left",
                paddingLeft: 8,
              },
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
        </View>
        <Text
          style={[
            styles.dataText,
            {
              color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
            },
          ]}
        >
          {formatGoldPrice(item.buy)}
        </Text>
        <Text
          style={[
            styles.dataText,
            {
              color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
            },
          ]}
        >
          {formatGoldPrice(item.sell)}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render item for FlatList (Xăng dầu tab)
  const renderXangDauItem = ({ item, index }) => (
    <View
      style={[
        styles.tableRow,
        {
          backgroundColor: theme.colors.backgroundCoPhieu,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#30323B",
          paddingHorizontal: 8,
        },
      ]}
    >
      <View style={[styles.nameContainer, { flex: 1.5 }]}>
        {/* <View style={[styles.icon, { backgroundColor: "#FF6B6B" }]} /> */}
        <Text
          style={[
            styles.nameText,
            {
              color: theme.mode === "dark" ? "#99BAFF" : "#2E3138",
              textAlign: "left",
              paddingLeft: 8,
            },
          ]}
          numberOfLines={1}
        >
          {item.petroName}
        </Text>
      </View>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.area1}
      </Text>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.area2}
      </Text>
    </View>
  );

  // Render item for FlatList (Other commodities tabs)
  const renderCommodityItem = ({ item, index }) => (
    <View
      style={[
        styles.tableRow,
        {
          backgroundColor: theme.colors.backgroundCoPhieu,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#30323B",
          paddingHorizontal: 8,
        },
      ]}
    >
      <View style={[styles.nameContainer, { flex: 1 }]}>
        {/* <View style={[styles.icon, { backgroundColor: "#8E8E93" }]} /> */}
        <Text
          style={[
            styles.nameText,
            {
              color: theme.mode === "dark" ? "#99BAFF" : "#2E3138",
              textAlign: "left",
              paddingLeft: 8,
            },
          ]}
          numberOfLines={1}
        >
          {item.type || item.name || item.area}
        </Text>
      </View>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.price}
      </Text>
    </View>
  );

  // Render item for FlatList (Giá điện tab - wider name column)
  const renderGiaDienItem = ({ item, index }) => (
    <View
      style={[
        styles.tableRow,
        {
          backgroundColor: theme.colors.backgroundCoPhieu,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#30323B",
          paddingHorizontal: 8,
        },
      ]}
    >
      <View style={[styles.nameContainer, { flex: 2 }]}>
        {/* <View style={[styles.icon, { backgroundColor: "#8E8E93" }]} /> */}
        <Text
          style={[
            styles.nameText,
            {
              color: theme.mode === "dark" ? "#99BAFF" : "#2E3138",
              textAlign: "left",
              paddingLeft: 8,
            },
          ]}
          numberOfLines={1}
        >
          {item.type || item.name || item.area}
        </Text>
      </View>
      <Text
        style={[
          styles.dataText,
          {
            color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
          },
        ]}
      >
        {item.price}
      </Text>
    </View>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Top Tab Navigation - Fixed Header */}
        <View
          style={[
            styles.headerSection,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
          >
            {[
              { key: "laiSuat", label: "Lãi suất" },
              { key: "giaVang", label: "Giá vàng" },
              { key: "xangDau", label: "Xăng dầu" },
              { key: "giaHeo", label: "Giá heo" },
              { key: "giaThep", label: "Giá thép" },
              { key: "giaGao", label: "Giá gạo" },
              { key: "giaCaTra", label: "Cá tra" },
              { key: "giaPhan", label: "Giá phân" },
              { key: "giaDien", label: "Giá điện" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setCurTabTop(tab.key)}
                style={[
                  styles.topTab,
                  curTabTop === tab.key && styles.topTabActive,
                  {
                    backgroundColor:
                      curTabTop === tab.key
                        ? theme.colors.blue
                        : theme.colors.inactiveTab,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.topTabText,
                    {
                      color:
                        curTabTop === tab.key
                          ? theme.colors.textActiveTab
                          : theme.colors.textInactiveTab,
                      fontWeight: curTabTop === tab.key ? "600" : "400",
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Lãi suất toggle - only show for laiSuat tab */}
          {curTabTop === "laiSuat" && (
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  {
                    backgroundColor:
                      typeLaiSuat === "guiTaiQuay"
                        ? theme.mode === "dark"
                          ? "#22304F"
                          : "#CCDDFF"
                        : theme.mode === "dark"
                        ? "#292B32"
                        : "#DEDFE3",
                  },
                ]}
                onPress={() => setTypeLaiSuat("guiTaiQuay")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    {
                      color:
                        typeLaiSuat === "guiTaiQuay"
                          ? theme.mode === "dark"
                            ? "#99BAFF"
                            : "#004AEA"
                          : theme.mode === "dark"
                          ? "#E3E4E8"
                          : "#565B67",
                    },
                  ]}
                >
                  Lãi suất tại quầy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  {
                    backgroundColor:
                      typeLaiSuat === "guiOnline"
                        ? theme.mode === "dark"
                          ? "#22304F"
                          : "#CCDDFF"
                        : theme.mode === "dark"
                        ? "#292B32"
                        : "#DEDFE3",
                  },
                ]}
                onPress={() => setTypeLaiSuat("guiOnline")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    {
                      color:
                        typeLaiSuat === "guiOnline"
                          ? theme.mode === "dark"
                            ? "#99BAFF"
                            : "#004AEA"
                          : theme.mode === "dark"
                          ? "#E3E4E8"
                          : "#565B67",
                    },
                  ]}
                >
                  Lãi suất online
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Content Area - Flex 1 to fill remaining space */}
        <View style={styles.contentContainer}>
          {/* Render data based on selected tab */}
          {curTabTop === "laiSuat" && (
            <>
              <View
                style={[
                  styles.tableHeader,
                  {
                    // backgroundColor: isDark ? colors.darkBg : colors.lightBg
                    backgroundColor: theme.colors.backgroundCoPhieu,
                    // marginHorizontal: 8,
                    borderRadius: 12,
                    marginBottom: 8,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: "#8E8E93",
                      flex: 1.7,
                      textAlign: "left",
                      paddingLeft: 8,
                    },
                  ]}
                >
                  Ngân hàng
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  1T
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  3T
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  6T
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  12T
                </Text>
              </View>
              <FlatList
                data={getCurrentTabData()}
                renderItem={renderLaiSuatItem}
                keyExtractor={keyExtractor}
                style={[
                  styles.tableScrollView,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                  },
                ]}
                contentContainerStyle={{
                  backgroundColor: theme.colors.backgroundCoPhieu,
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
                windowSize={5}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}

          {/* {curTabTop === "giaVang" && (
            <>
              <GoldListScreen navigation={{ navigation: router }} />
            </>
          )} */}
          {curTabTop === "giaVang" && (
            <>
              <View
                style={[
                  styles.tableHeader,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                    borderRadius: 12,
                    marginBottom: 8,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: "#8E8E93",
                      flex: 1.5,
                      textAlign: "left",
                      paddingLeft: 8,
                    },
                  ]}
                >
                  Tên
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  Giá mua
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  Giá bán
                </Text>
              </View>
              <FlatList
                data={getCurrentTabData()}
                renderItem={renderGiaVangItem}
                keyExtractor={keyExtractor}
                style={[
                  styles.tableScrollView,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                  },
                ]}
                contentContainerStyle={{
                  backgroundColor: theme.colors.backgroundCoPhieu,
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
                windowSize={5}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}

          {curTabTop === "xangDau" && (
            <>
              <View style={styles.sectionHeader}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  Xăng dầu
                </Text>
                <TouchableOpacity
                  style={styles.infoIcon}
                  onPress={() => setShowFuelInfoModal(true)}
                >
                  <Text style={[styles.infoText, { color: "#8E8E93" }]}>ⓘ</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.tableHeader,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                    borderRadius: 12,
                    marginBottom: 8,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: "#8E8E93",
                      flex: 1.5,
                      textAlign: "left",
                      paddingLeft: 8,
                    },
                  ]}
                >
                  Tên sản phẩm
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  Vùng 1
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  Vùng 2
                </Text>
              </View>
              <FlatList
                data={getCurrentTabData()}
                renderItem={renderXangDauItem}
                keyExtractor={keyExtractor}
                style={[
                  styles.tableScrollView,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                  },
                ]}
                contentContainerStyle={{
                  backgroundColor: theme.colors.backgroundCoPhieu,
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
                windowSize={5}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}

          {/* Other tabs - render similarly */}
          {["giaHeo", "giaThep", "giaGao", "giaCaTra", "giaPhan"].includes(
            curTabTop
          ) && (
            <>
              <View
                style={[
                  styles.tableHeader,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                    borderRadius: 12,
                    marginBottom: 8,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: "#8E8E93",
                      flex: 1,
                      textAlign: "left",
                      paddingLeft: 8,
                    },
                  ]}
                >
                  Tên
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  Giá
                </Text>
              </View>
              <FlatList
                data={getCurrentTabData()}
                renderItem={renderCommodityItem}
                keyExtractor={keyExtractor}
                style={[
                  styles.tableScrollView,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                  },
                ]}
                contentContainerStyle={{
                  backgroundColor: theme.colors.backgroundCoPhieu,
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
                windowSize={5}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}

          {/* Giá điện tab - wider name column */}
          {curTabTop === "giaDien" && (
            <>
              <View
                style={[
                  styles.tableHeader,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                    borderRadius: 12,
                    marginBottom: 8,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: "#8E8E93",
                      flex: 2,
                      textAlign: "left",
                      paddingLeft: 8,
                    },
                  ]}
                >
                  Tên
                </Text>
                <Text style={[styles.headerText, { color: "#8E8E93" }]}>
                  Giá
                </Text>
              </View>
              <FlatList
                data={getCurrentTabData()}
                renderItem={renderGiaDienItem}
                keyExtractor={keyExtractor}
                style={[
                  styles.tableScrollView,
                  {
                    backgroundColor: theme.colors.backgroundCoPhieu,
                  },
                ]}
                contentContainerStyle={{
                  backgroundColor: theme.colors.backgroundCoPhieu,
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
                windowSize={5}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>
      </View>

      {/* Fuel Info Modal */}
      <Modal
        visible={showFuelInfoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFuelInfoModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowFuelInfoModal(false)}
        >
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.card },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                ]}
              >
                Xăng dầu
              </Text>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.regionInfo}>
                <View style={styles.regionHeader}>
                  <View style={styles.locationIcon} />
                  <Text
                    style={[
                      styles.regionTitle,
                      { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                    ]}
                  >
                    Vùng 1:
                  </Text>
                </View>
                <Text style={[styles.regionDescription, { color: "#8E8E93" }]}>
                  Hà Nội, Cần Thơ, TP Hồ Chí Minh, Hậu Giang, Bà Rịa Vũng Tàu,
                  Sóc Trăng, Bình Thuận, Bạc Liêu, Bình Dương, Đồng Nai, Đồng
                  Tháp, Bình Phước, Bến Tre, Tây Ninh, Tiền Giang, Long An, Vĩnh
                  Long, Trà Vinh.
                </Text>
              </View>

              <View style={styles.regionInfo}>
                <View style={styles.regionHeader}>
                  <View style={styles.locationIcon} />
                  <Text
                    style={[
                      styles.regionTitle,
                      { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                    ]}
                  >
                    Vùng 2:
                  </Text>
                </View>
                <Text style={[styles.regionDescription, { color: "#8E8E93" }]}>
                  Hà Giang, Hòa Bình, Nam Định, Bắc Ninh, Lạng Sơn, Gia Lai, Hà
                  Nam, Ninh Thuận, Bắc Kạn, Kon Tum, Ninh Bình, Bình Phước, Lào
                  Cai, Đắk Nông, Thanh Hóa, An Giang.
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: "#007AFF" }]}
              onPress={() => setShowFuelInfoModal(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabScrollContent: {
    gap: 8,
    paddingRight: 16,
    marginBottom: 16,
    height: 32,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  section: {
    // marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 16,
    // padding: 16,
  },
  headerSection: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  topTabContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#30323B",
  },
  topTab: {
    // paddingHorizontal: 16,
    // paddingVertical: 10.5,
    // borderBottomWidth: 2,
    // marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  topTabActive: {
    // borderBottomWidth: 2,
    backgroundColor: "#3B82F6",
  },
  topTabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: "400",
  },
  infoIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
  },
  tableHeader: {
    // flexDirection: "row",
    // paddingVertical: 8,
    // marginBottom: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: "#30323B",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  tableScrollView: {
    flex: 1,
    borderRadius: 12,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    // flexDirection: "row",
    // alignItems: "center",
    // paddingVertical: 12,
    // borderBottomWidth: 0.5,
    // borderBottomColor: "#3A3A3C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    // paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  nameText: {
    // fontSize: 13,
    // fontWeight: "400",
    // flex: 1,
    lineHeight: 18,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 2,
    flex: 1,
    textAlign: "center",
  },
  dataText: {
    fontSize: 12,
    textAlign: "center",
    flex: 1,
    fontWeight: "500",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalBody: {
    marginBottom: 24,
    maxHeight: 400,
  },
  regionInfo: {
    marginBottom: 20,
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    marginRight: 8,
  },
  regionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  regionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 24,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
