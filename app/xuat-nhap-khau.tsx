import React, { useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';

export default function ImportExportScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const webviewRef = useRef(null);

  const handleWebViewMessage = (event: any) => {
    if (event.nativeEvent.data === 'listLine') {
      // Handle webview messages
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Xuất nhập khẩu
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* WebView Content - Full Screen */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{
            uri: `https://app.dautubenvung.vn/vi-mo-full/xuat-nhap-khau`,
          }}
          style={styles.webview}
          onMessage={handleWebViewMessage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  webviewContainer: {
    flex: 1,
    width: '100%',
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  webview: {
    flex: 1,
    width: 500,
  },
});