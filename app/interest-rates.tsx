import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function InterestRatesScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Lãi suất gửi tại quầy');
  const [selectedPeriod, setSelectedPeriod] = useState('1,3,6');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);

  const filterOptions = [
    'Lãi suất gửi tại quầy',
    'Lãi suất gửi online'
  ];

  const periodOptions = [
    '1,3,6',
    '9,12,13',
    '18,24,36'
  ];

  const interestRateData = [
    { bank: 'ABBANK', icon: '🇻🇳', m1: '3.00 %', m3: '3.40 %', m6: '4.60 %' },
    { bank: 'AGRIBANK', icon: '🇻🇳', m1: '2.20 %', m3: '2.50 %', m6: '3.50 %' },
    { bank: 'Bảo Việt', icon: '🇻🇳', m1: '3.10 %', m3: '4.10 %', m6: '5.00 %' },
    { bank: 'BIDV', icon: '🇻🇳', m1: '1.70 %', m3: '2.00 %', m6: '3.00 %' },
    { bank: 'CBBANK', icon: '🇻🇳', m1: '3.70 %', m3: '3.90 %', m6: '5.30 %' },
    { bank: 'Đông Á', icon: '🇻🇳', m1: '-', m3: '-', m6: '-' },
    { bank: 'GPBANK', icon: '🇻🇳', m1: '3.00 %', m3: '3.52 %', m6: '4.60 %' },
    { bank: 'Hong Leong', icon: '🇻🇳', m1: '2.50 %', m3: '2.90 %', m6: '3.90 %' },
    { bank: 'Indovina', icon: '🇻🇳', m1: '3.80 %', m3: '4.10 %', m6: '10 %' },
    { bank: 'Kiên Long', icon: '🇻🇳', m1: '3.10 %', m3: '3.10 %', m6: '4.80 %' },
    { bank: 'MSB', icon: '🇻🇳', m1: '3.40 %', m3: '3.40 %', m6: '4.50 %' },
    { bank: 'MB', icon: '🇰🇷', m1: '2.90 %', m3: '3.30 %', m6: '4.00 %' },
    { bank: 'Nam Á', icon: '🇻🇳', m1: '-', m3: '-', m6: '-' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>Lãi suất</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Section - Same Row */}
      <View style={styles.filterSection}>
        <View style={styles.filterRow}>
          {/* Filter Dropdown */}
          <TouchableOpacity 
            style={[styles.dropdown, { backgroundColor: theme.colors.card }]}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={[styles.dropdownText, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
              {selectedFilter}
            </Text>
            <Text style={[styles.dropdownIcon, { color: '#8E8E93' }]}>⌄</Text>
          </TouchableOpacity>

          {/* Period Dropdown */}
          <TouchableOpacity 
            style={[styles.dropdown, { backgroundColor: theme.colors.card }]}
            onPress={() => setShowPeriodModal(true)}
          >
            <Text style={[styles.dropdownText, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
              Số tháng gửi: {selectedPeriod}
            </Text>
            <Text style={[styles.dropdownIcon, { color: '#8E8E93' }]}>⌄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Interest Rate Table */}
      <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
        {/* Table Header */}
        <View style={[styles.tableHeader, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.headerText, { color: '#8E8E93' }]}>Ngân hàng</Text>
          <Text style={[styles.headerText, { color: '#8E8E93' }]}>1 tháng</Text>
          <Text style={[styles.headerText, { color: '#8E8E93' }]}>3 tháng</Text>
          <Text style={[styles.headerText, { color: '#8E8E93' }]}>6 tháng</Text>
        </View>

        {/* Table Data */}
        {interestRateData.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: theme.colors.background }]}>
            <View style={styles.bankNameContainer}>
              <View style={[styles.bankIcon, { 
                backgroundColor: item.icon === '🇰🇷' ? '#007AFF' : '#FF6B6B' 
              }]} />
              <Text style={[styles.bankName, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
                {item.bank}
              </Text>
            </View>
            <Text style={[styles.rateText, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
              {item.m1}
            </Text>
            <Text style={[styles.rateText, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
              {item.m3}
            </Text>
            <Text style={[styles.rateText, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
              {item.m6}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
              Chọn loại lãi suất
            </Text>
            {filterOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedFilter(option);
                  setShowFilterModal(false);
                }}
              >
                <Text style={[styles.modalOptionText, { 
                  color: selectedFilter === option ? '#007AFF' : (theme.mode === 'dark' ? '#FFFFFF' : '#000000')
                }]}>
                  {option}
                </Text>
                {selectedFilter === option && (
                  <Text style={[styles.checkIcon, { color: '#007AFF' }]}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
      
      {/* Period Modal */}
      <Modal
        visible={showPeriodModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPeriodModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowPeriodModal(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.mode === 'dark' ? '#FFFFFF' : '#000000' }]}>
              Chọn kỳ hạn
            </Text>
            {periodOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedPeriod(option);
                  setShowPeriodModal(false);
                }}
              >
                <Text style={[styles.modalOptionText, { 
                  color: selectedPeriod === option ? '#007AFF' : (theme.mode === 'dark' ? '#FFFFFF' : '#000000')
                }]}>
                  Số tháng gửi: {option}
                </Text>
                {selectedPeriod === option && (
                  <Text style={[styles.checkIcon, { color: '#007AFF' }]}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
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
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    minHeight: 40,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 12,
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
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 0,
    marginBottom: 2,
  },
  bankNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 14,
    fontWeight: '500',
  },
  rateText: {
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#3A3A3C',
  },
  modalOptionText: {
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
});