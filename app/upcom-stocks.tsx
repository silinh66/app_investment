import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function UpcomStocksScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const upcomStockData = [
    { symbol: 'VEA', description: 'CTCP Môi trường và Công trình Đô thị', price: '6.85', change: '+0.15 (+2.24%)', changeColor: '#34C759' },
    { symbol: 'MCH', description: 'CTCP Cơ khí Xây dựng Miền Trung', price: '4.20', change: '-0.08 (-1.87%)', changeColor: '#FF6B6B' },
    { symbol: 'DST', description: 'CTCP Đầu tư Phát triển Đô thị và KCN Sông Đà', price: '5.50', change: '+0.10 (+1.85%)', changeColor: '#34C759' },
    { symbol: 'BST', description: 'CTCP Dịch vụ Tổng hợp Dầu khí', price: '8.90', change: '-0.05 (-0.56%)', changeColor: '#FF6B6B' },
    { symbol: 'VBC', description: 'CTCP Vinacomin - Than Vàng Danh', price: '3.75', change: '+0.07 (+1.90%)', changeColor: '#34C759' },
    { symbol: 'QBS', description: 'CTCP Xuất nhập khẩu Quảng Bình', price: '12.40', change: '+0.25 (+2.06%)', changeColor: '#34C759' },
    { symbol: 'SMT', description: 'CTCP Sumi - Hanel Tracom', price: '7.60', change: '-0.12 (-1.55%)', changeColor: '#FF6B6B' },
    { symbol: 'DNP', description: 'CTCP Nhựa Đồng Nai', price: '9.30', change: '+0.18 (+1.97%)', changeColor: '#34C759' },
    { symbol: 'BMG', description: 'CTCP Khoáng sản Bình Định', price: '5.95', change: '-0.03 (-0.50%)', changeColor: '#FF6B6B' },
    { symbol: 'VGP', description: 'CTCP Cảng Rau quả', price: '11.20', change: '+0.30 (+2.75%)', changeColor: '#34C759' },
    { symbol: 'HJS', description: 'CTCP Tập đoàn Hòa Phát Dung Quất', price: '4.85', change: '+0.05 (+1.04%)', changeColor: '#34C759' },
    { symbol: 'VGG', description: 'CTCP Gia Lai', price: '8.15', change: '-0.20 (-2.40%)', changeColor: '#FF6B6B' },
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
        <Text style={[styles.headerTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>UPCOM</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stock List */}
      <ScrollView style={styles.stockContainer} showsVerticalScrollIndicator={false}>
        {upcomStockData.map((stock, index) => (
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