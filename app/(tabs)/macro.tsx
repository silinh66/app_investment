import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useRouter } from "expo-router";
import {
  CPIIcon,
  DauTuCongIcon,
  FDIIcon,
  GDPIcon,
  PMIIcon,
  XuatNhapKhauIcon,
} from "@/components/icons";

export default function MacroScreen() {
  const { theme } = useTheme();
  const { loading } = useAuthRedirect();
  const router = useRouter();

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </View>
    );
  }

  const macroItems = [
    {
      id: "GDP",
      title: "Tổng sản phẩm quốc nội",
      subtitle: "GDP Danh nghĩa - GDP Thực",
      icon: <GDPIcon color={theme.colors.iconViMo} />,
      route: "/gdp",
    },
    {
      id: "CPI",
      title: "Bán lẻ tiêu dùng",
      subtitle: "Tổng mức bán lẻ dịch vụ - CPI",
      icon: <CPIIcon color={theme.colors.iconViMo} />,
      route: "/cpi",
    },
    {
      id: "XuatNhapKhau",
      title: "Xuất nhập khẩu",
      subtitle: "Xuất khẩu - Nhập khẩu",
      icon: <XuatNhapKhauIcon color={theme.colors.iconViMo} />, // Placeholder for bank icon
      route: "/xuat-nhap-khau",
    },
    {
      id: "DauTuCong",
      title: "Đầu tư công",
      subtitle: "Vốn ngân sách nhà nước",
      icon: <DauTuCongIcon color={theme.colors.iconViMo} />, // Placeholder for investment icon
      route: "/dau-tu-cong",
    },
    {
      id: "FDI",
      title: "FDI",
      subtitle: "Vốn đầu tư trực tiếp nước ngoài",
      icon: <FDIIcon color={theme.colors.iconViMo} />, // Placeholder for FDI icon
      route: "/fdi",
    },
    {
      id: "PMI",
      title: "Sản xuất công nghiệp",
      subtitle: "PMI - IIP",
      icon: <PMIIcon color={theme.colors.iconViMo} />, // Placeholder for PMI icon
      route: "/pmi",
    },
  ];

  const handleItemPress = (route: string) => {
    // Navigate to the detail screens
    router.push(route);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={[styles.header, { backgroundColor: theme.colors.background }]}
        >
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Vĩ mô
          </Text>
        </View>

        {/* Body */}
        <View style={styles.bodyWrap}>
          {macroItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                {
                  backgroundColor:
                    theme.mode === "dark" ? "#2C2C2E" : "#F2F2F7",
                  borderColor: theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                },
              ]}
              onPress={() => handleItemPress(item.route)}
              activeOpacity={0.7}
            >
              {/* Icon */}
              <View
                style={[
                  styles.iconContainer,
                  {
                    // backgroundColor:
                    //   theme.mode === "dark" ? "#3A3A3C" : "#E5E5E7",
                  },
                ]}
              >
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>

              {/* Content */}
              <View style={styles.wrapTab}>
                <Text style={[styles.name, { color: theme.colors.text }]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.lastContent,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>

              {/* Arrow */}
              <View style={styles.arrowContainer}>
                <Text
                  style={[
                    styles.arrowIcon,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  ›
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  bodyWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  wrapTab: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  lastContent: {
    fontSize: 14,
    lineHeight: 18,
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: 18,
    fontWeight: "300",
  },
});
