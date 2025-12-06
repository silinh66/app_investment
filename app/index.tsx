import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { router } from 'expo-router';

export default function SplashScreen() {
  const { isAuthenticated, loading } = useAuth();
  const { theme } = useTheme();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Check authentication status and redirect accordingly
    const checkAuthAndRedirect = async () => {
      if (!loading && !redirecting) {
        setRedirecting(true);
        // Always navigate to the main tabs, regardless of authentication status
        router.replace('/(tabs)');
      }
    };

    checkAuthAndRedirect();
  }, [isAuthenticated, loading, redirecting]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background
    }}>
      <Text style={{ 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: theme.colors.text,
        marginBottom: 20
      }}>
        Snowball App
      </Text>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}