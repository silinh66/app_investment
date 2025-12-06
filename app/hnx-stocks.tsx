import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function HnxStocksScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const hnxStockData = [
    { symbol: 'VCS', description: 'CTCP Vinacomin - Vận tải', price: '18.45', change: '+0.35 (+1.93%)', changeColor: '#34C759' },
    { symbol: 'TNG', description: 'CTCP Đầu tư và Thương mại TNG', price: '12.80', change: '-0.20 (-1.54%)', changeColor: '#FF6B6B' },
    { symbol: 'CEO', description: 'CTCP Tập đoàn C.E.O', price: '15.60', change: '+0.40 (+2.63%)', changeColor: '#34C759' },
    { symbol: 'VIG', description: 'CTCP Viglacera', price: '22.30', change: '-0.15 (-0.67%)', changeColor: '#FF6B6B' },
    { symbol: 'SHB', description: 'Ngân hàng TMCP Sài Gòn - Hà Nội', price: '8.25', change: '+0.10 (+1.23%)', changeColor: '#34C759' },
    { symbol: 'API', description: 'CTCP Đầu tư API', price: '14.90', change: '+0.25 (+1.71%)', changeColor: '#34C759' },
    { symbol: 'SHS', description: 'CTCP Chứng khoán Sài Gòn - Hà Nội', price: '16.75', change: '-0.30 (-1.76%)', changeColor: '#FF6B6B' },
    { symbol: 'PVS', description: 'CTCP Dịch vụ Kỹ thuật Dầu khí VN', price: '19.40', change: '+0.60 (+3.19%)', changeColor: '#34C759' },
    { symbol: 'NVB', description: 'Ngân hàng TMCP Quốc Dân', price: '11.30', change: '-0.05 (-0.44%)', changeColor: '#FF6B6B' },
    { symbol: 'BVS', description: 'CTCP Chứng khoán Bảo Việt', price: '13.85', change: '+0.15 (+1.10%)', changeColor: '#34C759' },
    { symbol: 'IDV', description: 'CTCP Phát triển Hạ tầng Viettel', price: '7.95', change: '+0.05 (+0.63%)', changeColor: '#34C759' },
    { symbol: 'THD', description: 'CTCP Thaiholdings', price: '20.50', change: '-0.45 (-2.15%)', changeColor: '#FF6B6B' },
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
        <Text style={[styles.headerTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>HNX</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stock List */}
      <ScrollView style={styles.stockContainer} showsVerticalScrollIndicator={false}>
        {hnxStockData.map((stock, index) => (
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