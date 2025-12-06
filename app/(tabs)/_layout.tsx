import { Tabs, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FilterIcon, HomeIcon } from "@/components/icons";
import ViMoIcon from "@/components/icons/ViMoIcon";
import CommunityIcon from "@/components/icons/CommunityIcon";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const { theme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarBackground,
          borderTopColor: theme.colors.border,
          borderTopWidth: 0,
          height: 90,
          paddingBottom: 30,
          paddingTop: 5,
        },
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="filter"
        options={{
          title: "Lọc CP",
          tabBarIcon: ({ color }) => <FilterIcon color={color} size={24} />,
        }}
        listeners={{
          tabPress: async (e) => {
            if (!isAuthenticated) {
              // Prevent default navigation
              e.preventDefault();

              // Save current route and redirect to login
              const currentRoute = { pathname: "/(tabs)/filter" };
              await AsyncStorage.setItem(
                "PREVIOUS_ROUTE",
                JSON.stringify(currentRoute)
              );
              await logout();
              router.push("/auth/login");
            }
          },
        }}
      />
      <Tabs.Screen
        name="macro"
        options={{
          title: "Vĩ mô",
          tabBarIcon: ({ color }) => <ViMoIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Cộng đồng",
          tabBarIcon: ({ color }) => <CommunityIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
});
