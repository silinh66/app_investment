import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function GoldPricesScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const goldPriceData = [
    { name: 'Vàng thế giới', icon: '💰', buyPrice: '2649.47', sellPrice: '2652.70', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'Hanagold', icon: '💰', buyPrice: '2653.90', sellPrice: '2638.00', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'Nhẫn vàng VIETNAMG...', icon: '💰', buyPrice: '2653.50', sellPrice: '2629.40', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'Nhẫn Doji Hưng Thịnh...', icon: '💰', buyPrice: '2628.20', sellPrice: '2639.10', buyColor: '#34C759', sellColor: '#34C759' },
    { name: 'Nhẫn Trơn Trần Văng R...', icon: '💰', buyPrice: '2645.10', sellPrice: '2609.70', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'BTMC SJC', icon: '💰', buyPrice: '2608.10', sellPrice: '2600.60', buyColor: '#FF6B6B', sellColor: '#34C759' },
    { name: 'Phú Quý SJC', icon: '💰', buyPrice: '2653.30', sellPrice: '2663.30', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'SJC Đà Nẵng', icon: '💰', buyPrice: '2662.00', sellPrice: '2668.00', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'SJC Đà Nẵng', icon: '💰', buyPrice: '2675.80', sellPrice: '2704.90', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'SJC Đà Nẵng', icon: '💰', buyPrice: '2709.40', sellPrice: '2753.60', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'SJC Đà Nẵng', icon: '💰', buyPrice: '2756.70', sellPrice: '2721.20', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'SJC Đà Nẵng', icon: '💰', buyPrice: '2709.40', sellPrice: '2753.60', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'SJC Đà Nẵng', icon: '💰', buyPrice: '2756.70', sellPrice: '2721.20', buyColor: '#34C759', sellColor: '#FF6B6B' },
    { name: 'SJC Đà Nẵng', icon: '💰', buyPrice: '2756.70', sellPrice: '2721.20', buyColor: '#34C759', sellColor: '#FF6B6B' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>Giá vàng</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Gold Price Table */}
      <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
        {/* Table Header */}
        <View style={[styles.tableHeader, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.headerTextName, { color: '#8E8E93' }]}>Tên</Text>
          <Text style={[styles.headerTextPrice, { color: '#8E8E93' }]}>Giá mua</Text>
          <Text style={[styles.headerTextPrice, { color: '#8E8E93' }]}>Giá bán</Text>
        </View>

        {/* Table Data */}
        {goldPriceData.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: theme.colors.background }]}>
            <View style={styles.goldNameContainer}>
              <View style={[styles.goldIcon, { backgroundColor: '#FFD60A' }]} />
              <Text style={[styles.goldName, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
                {item.name}
              </Text>
            </View>
            <Text style={[styles.priceText, { color: item.buyColor }]}>
              {item.buyPrice}
            </Text>
            <Text style={[styles.priceText, { color: item.sellColor }]}>
              {item.sellPrice}
            </Text>
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
  tableContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  headerTextName: {
    fontSize: 12,
    fontWeight: '600',
    flex: 2,
    textAlign: 'left',
  },
  headerTextPrice: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 0,
    marginBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#3A3A3C',
  },
  goldNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  goldIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
  },
});