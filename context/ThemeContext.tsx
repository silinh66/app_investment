import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

// Define theme colors
export const themes = {
  light: {
    mode: "light",
    colors: {
      primary: "#0066ff", // Blue primary color
      background: "#fff", // Light background
      card: "#ffffff", // White card background
      text: "#000000", // Black text
      secondaryText: "#666666", // Gray text
      border: "#e0e0e0", // Light border
      notification: "#ff3b30",
      headerBackground: "#0066ff", // Blue header
      tabBarBackground: "#ffffff",
      tabBarInactive: "#8e8e93",
      tabBarActive: "#0066ff",
      quickActionBackground: "rgba(0, 102, 255, 0.1)", // Light blue
      menuBackground: "#ffffff", // White background for menu items
      menuItemBorder: "#e0e0e0", // Light borders for menu items
      footerBackground: "#f9f9f9",
      footerItemBackground: "#f0f0f0",
      footerText: "#666666",
      disclaimerText: "#999999",
      stockCardPositive: "#ffebee", // Light red background
      stockCardNegative: "#e0f2f1", // Light green background
      stockTextPositive: "#e53935", // Red text
      stockTextNegative: "#009688", // Green text
      iconColor: "#8e8e93", // Default icon color
      backgroundTabActive: "#DBE7FF",
      backgroundTab: "#ECECEF",
      textTab: "#004CEB",
      textResult: "#464A53",
      textExchange: "#438958",
      borderBottomTab: "#004CEB",
      placeholderText: "#878D9B",
      textTieuChi: "#2E3138",
      backgroundCoPhieu: "#F4F5F6",
      textLuuTinHieu: "#004CEB",
      borderBottom: "#ECECEF",
      backgroundItemTinHieu: "#ECECEF",
      backgroundPostItem: "#F4F5F6",
      backgroundExchangeItem: "#E3E3E8",
      activeTabText: "#144EDA",
      xemThem: "#004CEB",
      iconViMo: "#2E3138",
      communityHotNews: "#ffffff",
      green: "#05B168", // Above reference (green)
      pink: "#EC4899",
      red: "#E86066", // Below reference (red)
      magenta: "#E11D48",
      yellow: "#E8D632", // Reference (yellow)
      purple: "#C663E9", // Ceiling (purple)
      cyan: "#47D3EB", // Floor (cyan/blue)
      blue: "#3B82F6",
      inactiveTab: "#F3F4F6",
      textInactiveTab: "#6B7280",
      textActiveTab: "#FFFFFF",
    },
  },
  dark: {
    mode: "dark",
    colors: {
      primary: "#004CEB", // Slightly lighter blue for dark mode
      background: "#12161f", // Dark background
      card: "#1C1C22", // Card background color matching design
      text: "#ffffff", // White text
      secondaryText: "#8e8e93", // Gray text
      border: "#2a3441", // Dark border
      notification: "#ff453a",
      headerBackground: "#12161f", // Dark blue header
      tabBarBackground: "#12161f",
      tabBarInactive: "#8e8e93",
      tabBarActive: "#ffffff",
      quickActionBackground: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
      menuBackground: "#121923", // Dark background for menu items
      menuItemBorder: "#1e2732", // Dark borders for menu items
      footerBackground: "#121923",
      footerItemBackground: "#1e2732",
      footerText: "#8e8e93",
      disclaimerText: "#4e4e4e",
      stockCardPositive: "#4d211f", // Dark red background
      stockCardNegative: "#1c332c", // Dark green background
      stockTextPositive: "#E53935", // Red text
      stockTextNegative: "#009688", // Green text
      iconColor: "#8e8e93", // Default icon color
      backgroundTabActive: "#22304F",
      backgroundTab: "#202127",
      textTab: "#99BAFF",
      textResult: "#ABADBA",
      textExchange: "#5CD680",
      borderBottomTab: "#004AEA",
      placeholderText: "#818498",
      textTieuChi: "#E3E4E8",
      backgroundCoPhieu: "#202127",
      textLuuTinHieu: "#575A6B",
      borderBottom: "#2E2E2E",
      backgroundItemTinHieu: "#292B32",
      backgroundPostItem: "#202127",
      backgroundExchangeItem: "#30323B",
      activeTabText: "#7faef8",
      xemThem: "#99BAFF",
      iconViMo: "#C7C8D1",
      communityHotNews: "#8e8e93", // Gray text
      green: "#05B168", // Above reference (green)
      pink: "#EC4899",
      red: "#E86066", // Below reference (red)
      magenta: "#E11D48",
      yellow: "#E8D632", // Reference (yellow)
      purple: "#C663E9", // Ceiling (purple)
      cyan: "#47D3EB", // Floor (cyan/blue)
      blue: "#3B82F6",
      inactiveTab: "#1F2937",
      textInactiveTab: "#8B92A0",
      textActiveTab: "#FFFFFF",
    },
  },
};

export type ThemeType = "light" | "dark";
export type ThemeContextType = {
  theme: typeof themes.light | typeof themes.dark;
  themeType: ThemeType;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
};

// Create context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  themeType: "dark",
  toggleTheme: () => {},
  setThemeType: () => {},
});

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceTheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>("dark");

  // Initialize with device theme
  useEffect(() => {
    if (deviceTheme) {
      setThemeType(deviceTheme as ThemeType);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setThemeType((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Current theme object based on theme type
  const theme = themes[themeType];

  return (
    <ThemeContext.Provider
      value={{ theme, themeType, toggleTheme, setThemeType }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
