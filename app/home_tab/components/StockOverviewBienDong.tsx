import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const stockInfo = [
  { label: "Tham chiếu", value: "27.50" },
  { label: "Mở cửa", value: "27.60" },
  { label: "Thấp - Cao", value: "27.40 - 28.00" },
  { label: "Khối lượng", value: "1,200,000" },
  { label: "Giá trị", value: "33.0 tỷ" },
  { label: "Giá trung bình", value: "27.65" },
  { label: "Beta", value: "0.92" },
  { label: "Thị giá vốn", value: "18,500.00 tỷ" },
  { label: "Số lượng CPLH", value: "672,000,000" },
  { label: "P/E", value: "11.25" },
  { label: "EPS", value: "2,445" },
];

const foreignTrade = [
  { label: "KL Mua", value: "120,000" },
  { label: "KL Bán", value: "95,000" },
  { label: "KL Mua - Bán", value: "+25,000", type: "green" },
  { label: "GT Mua", value: "3.30 tỷ", type: "green" },
  { label: "GT Bán", value: "2.60 tỷ", type: "red" },
  { label: "GT Mua - Bán", value: "+0.70 tỷ", type: "green" },
];

const StockOverviewBienDong = () => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.label}</Text>
      <Text
        style={[
          styles.value,
          item.type === "green" && styles.green,
          item.type === "red" && styles.red,
        ]}
      >
        {item.value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Bảng thông tin cổ phiếu */}
      {/* <View style={styles.card}>
        {stockInfo.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View> */}

      {/* Giao dịch NĐTNN */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Giao dịch NĐTNN</Text>
        <FlatList
          data={foreignTrade}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "#0B0F1A",
    flex: 1,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#12151C",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomColor: "#1F242F",
    borderBottomWidth: 0.5,
  },
  label: {
    color: "#AAAAAA",
    fontSize: 13,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  green: {
    color: "#00C46B",
  },
  red: {
    color: "#FF4D4F",
  },
});

export default StockOverviewBienDong;
