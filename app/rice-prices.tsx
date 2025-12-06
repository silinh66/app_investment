import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function RicePricesScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const ricePriceData = [
    { name: 'Nếp Ruột', icon: '🌾', price: '16.000 - 18.000', priceColor: '#FF6B6B' },
    { name: 'Gạo Thường', icon: '🌾', price: '15.000 - 16.000', priceColor: '#FF6B6B' },
    { name: 'Gạo Nàng Nhen', icon: '🌾', price: '26.000', priceColor: '#34C759' },
    { name: 'Gạo Thơm Thái Hạt Dài', icon: '🌾', price: '19.000 - 20.000', priceColor: '#34C759' },
    { name: 'Gạo Thơm Jasmine', icon: '🌾', price: '17.500 - 18.500', priceColor: '#FF6B6B' },
    { name: 'Gạo Hương Lài', icon: '🌾', price: '19.500', priceColor: '#34C759' },
    { name: 'Gạo Trắng Thông Dụng', icon: '🌾', price: '17.000', priceColor: '#FF6B6B' },
    { name: 'Gạo Nàng Hoa', icon: '🌾', price: '19.400', priceColor: '#34C759' },
    { name: 'Gạo Sóc Thường', icon: '🌾', price: '17.000 - 18.000', priceColor: '#FF6B6B' },
    { name: 'Gạo Sóc Thái', icon: '🌾', price: '19.500', priceColor: '#34C759' },
    { name: 'Gạo Thơm Đài Loan', icon: '🌾', price: '20.000', priceColor: '#34C759' },
    { name: 'Gạo Nhật', icon: '🌾', price: '22.000', priceColor: '#FF6B6B' },
    { name: 'Cám', icon: '🌾', price: '9.000 - 10.000', priceColor: '#FF6B6B' },
    { name: 'Tấm', icon: '🌾', price: '12.000', priceColor: '#FF6B6B' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>Giá gạo</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Rice Price Table */}
      <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
        {/* Table Header */}
        <View style={[styles.tableHeader, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.headerTextName, { color: '#8E8E93' }]}>Tên</Text>
          <Text style={[styles.headerTextPrice, { color: '#8E8E93' }]}>Giá</Text>
        </View>

        {/* Table Data */}
        {ricePriceData.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: theme.colors.background }]}>
            <View style={styles.riceNameContainer}>
              <View style={[styles.riceIcon, { backgroundColor: '#8E8E93' }]} />
              <Text style={[styles.riceName, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
                {item.name}
              </Text>
            </View>
            <Text style={[styles.priceText, { color: item.priceColor }]}>
              {item.price}
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
    textAlign: 'right',
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
  riceNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  riceIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riceName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
    fontWeight: '500',
  },
});