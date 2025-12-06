import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function HoseStocksScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const hoseStockData = [
    { symbol: 'SSI', description: 'CTCP Chứng khoán SSI', price: '26.35', change: '+0.65 (+2.53%)', changeColor: '#34C759' },
    { symbol: 'VIX', description: 'CTCP Chứng khoán VIX', price: '10.20', change: '-0.15 (-1.45%)', changeColor: '#FF6B6B' },
    { symbol: 'HPG', description: 'CTCP Chứng khoán SSI', price: '26.35', change: '-0.25 (-0.90%)', changeColor: '#FF6B6B' },
    { symbol: 'PDR', description: 'CTCP Phát triển Bất Động sản', price: '26.35', change: '+0.20 (+0.92%)', changeColor: '#34C759' },
    { symbol: 'HCM', description: 'CTCP Chứng khoán Thành phố HCM', price: '26.35', change: '+0.30 (+1.04%)', changeColor: '#34C759' },
    { symbol: 'VND', description: 'CTCP Chứng khoán VnDirect', price: '18.50', change: '+0.45 (+2.49%)', changeColor: '#34C759' },
    { symbol: 'FPT', description: 'CTCP FPT', price: '125.80', change: '-2.20 (-1.72%)', changeColor: '#FF6B6B' },
    { symbol: 'VCB', description: 'Ngân hàng TMCP Ngoại thương Việt Nam', price: '89.50', change: '+1.50 (+1.70%)', changeColor: '#34C759' },
    { symbol: 'VHM', description: 'CTCP Vinhomes', price: '56.20', change: '-0.80 (-1.40%)', changeColor: '#FF6B6B' },
    { symbol: 'BID', description: 'Ngân hàng TMCP Đầu tư và Phát triển VN', price: '47.30', change: '+0.70 (+1.50%)', changeColor: '#34C759' },
    { symbol: 'CTG', description: 'Ngân hàng TMCP Công thương Việt Nam', price: '35.40', change: '+0.90 (+2.61%)', changeColor: '#34C759' },
    { symbol: 'TCB', description: 'Ngân hàng TMCP Kỹ thương Việt Nam', price: '24.85', change: '-0.35 (-1.39%)', changeColor: '#FF6B6B' },
  ];

  const renderMiniChart = (color: string) => {
    return (
      <View style={styles.chartContainer}>
        <View style={[styles.chartLine, { backgroundColor: color }]} />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>HOSE</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stock List */}
      <ScrollView style={styles.stockContainer} showsVerticalScrollIndicator={false}>
        {hoseStockData.map((stock, index) => (
          <View key={index} style={[styles.stockRow, { backgroundColor: theme.colors.background }]}>
            <View style={styles.stockInfo}>
              <View style={styles.stockLeft}>
                <Text style={[styles.stockSymbol, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>{stock.symbol}</Text>
                <Text style={[styles.stockDescription, { color: '#8E8E93' }]}>{stock.description}</Text>
              </View>
              {renderMiniChart(stock.changeColor)}
            </View>
            <View style={styles.stockRight}>
              <Text style={[styles.stockPrice, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>{stock.price}</Text>
              <Text style={[styles.stockChange, { color: stock.changeColor }]}>{stock.change}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    paddingVertical: 12,
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
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  stockContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 0,
    marginBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#3A3A3C',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stockLeft: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stockDescription: {
    fontSize: 12,
    fontWeight: '400',
  },
  chartContainer: {
    width: 60,
    height: 30,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartLine: {
    width: 50,
    height: 2,
    borderRadius: 1,
  },
  stockRight: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stockChange: {
    fontSize: 12,
    fontWeight: '500',
  },
});