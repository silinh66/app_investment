import React, { useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useTheme } from "../../context/ThemeContext";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useLocalSearchParams } from "expo-router";

// === Tab list ===
export const listTabs = [
  { key: "bien-dong", title: "Trang chủ" },
  { key: "co-phieu", title: "Cổ phiếu" },
  { key: "bang-gia", title: "Biến động" },
  { key: "suc-manh-thi-truong", title: "Sức mạnh thị trường" },
  // { key: "tin-tuc", title: "Tin tức" },
  { key: "thi-truong", title: "Thị trường" },
  { key: "tien-te", title: "Tiền tệ" },
];

// === Screens con (placeholder) ===
import BienDongTab from "../home_tab/BienDongTab";
import CoPhieuTab from "../home_tab/CoPhieuTab";
import BangGiaTab from "../home_tab/BangGiaTab";
import TinTucTab from "../home_tab/TinTucTab";
import ThiTruongTab from "../home_tab/ThiTruongTab";
import TienTeTab from "../home_tab/TienTeTab";
import SucManhThiTruongTab from "../home_tab/SucManhThiTruongTab";

const renderScene = SceneMap({
  "bien-dong": BienDongTab,
  "co-phieu": CoPhieuTab,
  "bang-gia": BangGiaTab,
  "tin-tuc": TinTucTab,
  "thi-truong": ThiTruongTab,
  "tien-te": TienTeTab,
  "suc-manh-thi-truong": SucManhThiTruongTab,
});

export default function HomeScreen() {
  const { theme } = useTheme();
  const { loading } = useAuthRedirect();
  const layout = Dimensions.get("window");
  const params = useLocalSearchParams();
  console.log("params");

  const [index, setIndex] = useState(0);
  const routes = useMemo(() => listTabs, []);

  // Handle tab parameter from URL
  useEffect(() => {
    if (params.tab) {
      const tabIndex = routes.findIndex((route) => route.key === params.tab);
      if (tabIndex !== -1) {
        setIndex(tabIndex);
      }
    }
  }, [params.tab, routes]);

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </View>
    );
  }

  // Bảng màu theo theme, bám sát ảnh mẫu (light) & ảnh dark trước đó
  const isDark = theme.mode === "dark";

  const colors = {
    bg: isDark ? "#101114" : "#ffffff",
    chipBg: isDark ? "#202127" : "#EEF1F5", // pill inactive
    chipText: isDark ? "#FFFFFF" : "#475569", // text inactive
    chipActiveBg: theme.colors.primary ?? "#2F6BFF",
    chipActiveText: "#ffffff",
    divider: isDark ? "#2A3340" : "#E5E7EB", // đường kẻ dưới thanh tabs
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={styles.safeArea}>
        {/* ===== Tabs kiểu pill (giống ảnh) ===== */}
        <View
          style={[
            styles.tabsWrapper,
            { borderBottomColor: colors.bg, backgroundColor: colors.bg },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
          >
            {routes.map((r, i) => {
              const focused = i === index;
              return (
                <TouchableOpacity
                  key={r.key}
                  activeOpacity={0.9}
                  onPress={() => setIndex(i)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: focused
                        ? colors.chipActiveBg
                        : colors.chipBg,
                      borderColor: focused
                        ? colors.chipActiveBg
                        : colors.chipBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      {
                        color: focused
                          ? colors.chipActiveText
                          : colors.chipText,
                        fontWeight: focused ? "600" : "400",
                      },
                    ]}
                  >
                    {r.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ===== Pager nội dung ===== */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={() => null}
          style={{ backgroundColor: colors.bg }}
          lazy
        />
      </SafeAreaView>
    </View>
  );
}

const TAB_H = 36;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  tabsWrapper: {
    paddingTop: Platform.OS === "android" ? 8 : 4,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabsScroll: {
    paddingHorizontal: 12,
  },
  chip: {
    height: TAB_H,
    paddingHorizontal: 14,
    borderRadius: TAB_H / 2,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
