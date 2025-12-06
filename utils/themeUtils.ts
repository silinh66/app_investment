import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { useTheme, ThemeContextType } from '../context/ThemeContext';

/**
 * Hook to sync system theme with app theme
 * Can be used in _layout.tsx or any component that needs to respond to theme changes
 */
export const useSystemTheme = () => {
  const { setThemeType } = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme) {
      setThemeType(colorScheme);
    }
  }, [colorScheme, setThemeType]);
};

/**
 * Get theme-based style for any component
 * @param theme Current theme from useTheme()
 * @param lightStyles Styles to apply in light mode
 * @param darkStyles Styles to apply in dark mode
 * @returns Combined styles based on current theme
 */
export const getThemedStyles = (theme: any, lightStyles: any, darkStyles: any) => {
  return theme.mode === 'dark' ? { ...lightStyles, ...darkStyles } : lightStyles;
};

/**
 * Apply theme to status bar
 * Can be used in individual screens to customize status bar
 * @param theme Current theme from useTheme()
 */
export const applyStatusBarTheme = (theme: any) => {
  if (Platform.OS === 'ios') {
    return {
      barStyle: theme.mode === 'dark' ? 'light-content' : 'dark-content',
      backgroundColor: theme.colors.background,
    };
  }
  
  return {
    barStyle: theme.mode === 'dark' ? 'light-content' : 'dark-content',
    backgroundColor: theme.colors.background,
  };
};