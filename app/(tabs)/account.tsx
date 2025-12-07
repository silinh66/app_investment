import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  Switch,
  Dimensions,
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilterIcon, SettingIcon } from '@/components/icons';

const { width } = Dimensions.get('window');

export default function AccountScreen() {
  const router = useRouter();
  const { theme, toggleTheme, themeType } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    // router.push('/auth/login'); // Usually logout stays on the same screen or goes to home, but here we just update state
  };

  const QuickAccessItem = ({ icon, title, onPress }: { icon: any, title: string, onPress?: () => void }) => (
    <TouchableOpacity style={[styles.quickAccessItem, { backgroundColor: theme.colors.backgroundTabActive }]} onPress={onPress}>
      <View style={styles.quickAccessHeader}>
        {icon}
        <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.secondaryText} />
      </View>
      <Text style={[styles.quickAccessTitle, { color: theme.colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );

  const SectionItem = ({ icon, title, onPress, showArrow = true, showBottomBorder = true }: { icon: any, title: string, onPress?: () => void, showArrow?: boolean, showBottomBorder?: boolean }) => (
    <TouchableOpacity style={[styles.sectionItem, {
      borderBottomWidth: showBottomBorder ? 0.5 : 0,
      borderBottomColor: theme.colors.border,
    }]} onPress={onPress}>
      <View style={styles.sectionItemLeft}>
        <View style={{ width: 24, alignItems: 'center', marginRight: 12 }}>
          {icon}
        </View>
        <Text style={[styles.sectionItemTitle, { color: theme.colors.text }]}>{title}</Text>
      </View>
      {showArrow && <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.secondaryText} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => { }}>
              <View style={styles.starIconContainer}>
                <MaterialIcons name="star" size={16} color="#FFFF00" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon} onPress={() => setSettingsVisible(true)}>
              <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Auth Section */}
        <View style={styles.authSection}>
          {isAuthenticated && user ? (
            <View style={styles.loggedInContainer}>
              <Image
                source={{ uri: user.avatar || 'https://i.pravatar.cc/150?img=3' }}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.userInfo}>
                <Text style={[styles.userName, { color: theme.colors.text }]}>{user.name || 'Nguyễn Linh'}</Text>

              </View>
            </View>
          ) : (
            <View style={styles.loggedOutContainer}>
              <TouchableOpacity style={[styles.authButton, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/auth/register')}>
                <Text style={styles.authButtonText}>Đăng Ký</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.authButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#333' }]} onPress={() => router.push('/auth/login')}>
                <Text style={[styles.authButtonText, { color: theme.colors.text }]}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Banner */}
        {/* <LinearGradient
          colors={['#004CEB', '#E11D48']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.banner}
        >
          <View style={styles.bannerContent}>
            <View style={styles.bannerLeft}>
              <View style={styles.shieldIcon}>
                <MaterialIcons name="security" size={20} color="#fff" />
              </View>
              <Text style={styles.bannerText}>Gia Hạn Ưu Đãi</Text>
            </View>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>Giảm 55%</Text>
            </View>
          </View>
        </LinearGradient> */}
        {/* Settings Section */}
        <LinearGradient
          colors={
            theme?.mode === "dark"
              ? ["#112C26", "#121317"]
              : ["#F4F5F6", "#F4F5F6"]
          }
          style={[
            styles.section,
            {
              borderColor: "#235a4e",
              borderWidth: 1,
              borderRadius: 12,
            },
          ]}
          start={{ x: 0.089, y: 0 }}
          end={{ x: 0.531, y: 1 }}
        >

          {/* <View
                  style={[styles.section, { backgroundColor: colors.cardBackground }, {
                    borderColor: "#235a4e",
                    borderWidth: 1,
                    borderRadius: 12,
                  },]}
                > */}
          <View
            style={styles.settingsHeader}

          >
            <View style={styles.settingsInfo}>
              <View style={styles.settingsRow}>
                {/* <Text style={[styles.settingsIcon, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>⚙️</Text> */}
                <SettingIcon
                  style={{ marginTop: 8 }}
                  color={theme.mode === "dark" ? "#fff" : "#000000"}
                />
                <Text
                  style={[
                    styles.settingsTitle,
                    { color: theme.mode === "dark" ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  Cài đặt tín hiệu
                </Text>
              </View>
              <Text
                style={[
                  styles.settingsSubtitle,
                  { color: theme.colors.textResult },
                ]}
              >
                Cài đặt cảnh báo hỗ trợ hay kháng cự?
              </Text>
            </View>
            <TouchableOpacity
              style={styles.unlockButton}
            // onPress={async () => {
            //   try {
            //     const res = await axiosClient.get(
            //       `/api/alerts/trendline/${symbol}`
            //     );
            //     console.log(res);

            //     router.push({
            //       pathname: "/signal-settings",
            //       params: {
            //         symbol: symbol,
            //       },
            //     });
            //   } catch (err: any) {
            //     console.log("Error:", err);
            //     // Nếu lỗi 401 Unauthorized → chuyển về màn login
            //     if (err.response?.status === 401) {
            //       console.log("Unauthorized - redirecting to login");
            //       // Store the current route before logout and redirecting to login
            //       // Since we don't have access to the current route, we'll store a generic object
            //       const currentRoute = {
            //         pathname: "/stock-detail",
            //         params: { symbol },
            //       };
            //       await AsyncStorage.setItem(
            //         "PREVIOUS_ROUTE",
            //         JSON.stringify(currentRoute)
            //       );
            //       await logout();
            //       router.push("/auth/login");
            //     } else {
            //       router.push({
            //         pathname: "/signal-settings",
            //         params: {
            //           symbol: symbol,
            //         },
            //       });
            //     }
            //   }
            // }}
            >
              <Text style={styles.unlockButtonText}>Cài đặt</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </LinearGradient>

        {/* Truy Cập Nhanh */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionHeaderText, { color: theme.colors.secondaryText }]}>Truy Cập Nhanh</Text>
        </View>
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <QuickAccessItem
              icon={<MaterialCommunityIcons name="star" size={24} color={theme.colors.text} />}
              title="Cổ phiếu theo dõi"
            />
            <QuickAccessItem
              icon={<View style={{ borderWidth: 1, borderColor: theme.colors.text, borderRadius: 4, paddingHorizontal: 2 }}><Text style={{ fontSize: 10, color: theme.colors.text, fontWeight: 'bold' }}>AI</Text></View>}
              title="Tín hiệu đã cài đặt"
            />
          </View>
          <View style={styles.gridRow}>
            <QuickAccessItem
              icon={
                <MaterialCommunityIcons name="account-star" size={24} color={theme.colors.text} />

              }
              title="Chuyên gia theo dõi"
            />
            <QuickAccessItem
              icon={
                // <Feather name="trending-up" size={24} color={theme.colors.text} />
                <MaterialCommunityIcons name="post" size={24} color={theme.colors.text} />

              }
              title="Bài viết theo dõi"
            />
          </View>
          <View style={styles.gridRow}>
            <QuickAccessItem
              icon={<MaterialCommunityIcons name="movie-open-outline" size={24} color={theme.colors.text} />}
              title="Tìm Nhà Môi Giới Hàng Đầu"
            />
            <QuickAccessItem
              icon={<MaterialIcons name="monetization-on" size={24} color={theme.colors.text} />}
              title="Cộng tác viên Affiliate"
            />
          </View>
        </View>

        {/* Theo Dõi */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionHeaderText, { color: theme.colors.secondaryText }]}>Theo Dõi</Text>
        </View>
        <View style={styles.listContainer}>
          <SectionItem
            icon={<MaterialCommunityIcons name="bell-outline" size={22} color={theme.colors.secondaryText} />}
            title="Lịch sử cảnh báo"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="briefcase-outline" size={22} color={theme.colors.secondaryText} />}
            title="Danh mục nắm giữ của Tôi"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="bookmark-outline" size={22} color={theme.colors.secondaryText} />}
            title="Mục Đã Lưu"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="chart-line-variant" size={22} color={theme.colors.secondaryText} />}
            title="Tâm lý của Tôi"
            showBottomBorder={false}
          />
        </View>

        {/* Thị Trường Trực Tiếp */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionHeaderText, { color: theme.colors.secondaryText }]}>Thị Trường Trực Tiếp</Text>
        </View>
        <View style={styles.listContainer}>
          {/* <SectionItem
            icon={<MaterialCommunityIcons name="bitcoin" size={22} color={theme.colors.secondaryText} />}
            title="Tiền điện tử"
          /> */}
          <SectionItem
            icon={<Ionicons name="stats-chart-outline" size={22} color={theme.colors.secondaryText} />}
            title="Cổ Phiếu Theo Xu Hướng"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="weather-sunset" size={22} color={theme.colors.secondaryText} />}
            title="Trước giờ mở cửa"
          />
          <SectionItem
            icon={<Ionicons name="analytics-outline" size={22} color={theme.colors.secondaryText} />}
            title="Phân tích & Ý kiến"
            showBottomBorder={false}
          />
        </View>

        {/* Công cụ */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionHeaderText, { color: theme.colors.secondaryText }]}>Công cụ</Text>
        </View>
        <View style={styles.listContainer}>
          <SectionItem
            icon={<MaterialCommunityIcons name="calculator" size={22} color={theme.colors.secondaryText} />}
            title="Công cụ chuyển đổi tiền tệ"
          />
          <SectionItem
            icon={
              // <FilterIcon color={theme.colors.secondaryText} size={22} />
              <MaterialCommunityIcons name="filter" size={22} color={theme.colors.secondaryText} />
            }
            title="Lọc Cổ Phiếu"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="monitor-dashboard" size={22} color={theme.colors.secondaryText} />}
            title="Các Buổi Hội Thảo Trực Tuyến"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="percent-outline" size={22} color={theme.colors.secondaryText} />}
            title="Giám Sát L.Suất Fed"
            showBottomBorder={false}
          />
        </View>

        {/* Thêm */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionHeaderText, { color: theme.colors.secondaryText }]}>Thêm</Text>
        </View>
        <View style={[styles.listContainer, {
          marginBottom: 40,

        }]}>
          <SectionItem
            icon={<MaterialIcons name="monetization-on" size={22} color={theme.colors.secondaryText} />}
            title="Đăng ký Affiliate"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="email-outline" size={22} color={theme.colors.secondaryText} />}
            title="Gửi Phản Hồi"
          />
          <SectionItem
            icon={<Ionicons name="notifications-outline" size={22} color={theme.colors.secondaryText} />}
            title="Cài đặt thông báo"
          />
          <SectionItem
            icon={<Ionicons name="settings-outline" size={22} color={theme.colors.secondaryText} />}
            title="Cài đặt"
            onPress={() => setSettingsVisible(true)}
          />

          {/* <SectionItem
            icon={<MaterialCommunityIcons name="flask-outline" size={22} color={theme.colors.secondaryText} />}
            title="Tham Gia Thử Nghiệm Beta"
          />
          <SectionItem
            icon={<MaterialCommunityIcons name="shield-check-outline" size={22} color={theme.colors.secondaryText} />}
            title="Pháp Lý"
          /> */}
          {isAuthenticated && (
            <SectionItem
              icon={<MaterialIcons name="logout" size={22} color={theme.colors.secondaryText} />}
              title="Đăng Xuất"
              onPress={handleLogout}
              showBottomBorder={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Cài đặt</Text>
              <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name={themeType === 'dark' ? "moon" : "sunny"} size={24} color={theme.colors.text} />
                <Text style={[styles.settingText, { color: theme.colors.text }]}>Giao diện {themeType === 'dark' ? 'Tối' : 'Sáng'}</Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={themeType === 'dark' ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={themeType === 'dark'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  section: {
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    paddingVertical: 8
  },
  settingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsInfo: {
    flex: 1,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  settingsSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  unlockButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
    backgroundColor: "#004CEB",
    borderWidth: 1,
    borderColor: "#004CEB",
  },
  unlockButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  starIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444', // Red background for star
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  authSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  loggedInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  loggedOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    marginRight: 8,
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bannerBadge: {
    backgroundColor: '#D9F99D', // Light green
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bannerBadgeText: {
    color: '#166534', // Dark green
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quickAccessItem: {
    width: (width - 44) / 2,
    padding: 16,
    borderRadius: 8,
    height: 100,
    justifyContent: 'space-between',
  },
  quickAccessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  quickAccessTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  listContainer: {
    marginBottom: 24,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionItemTitle: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 200,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
});