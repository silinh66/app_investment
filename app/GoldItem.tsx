import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { useTheme } from "@/context/ThemeContext";

export default function GoldItem({ item, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[
        styles.row,
        {
          backgroundColor: theme.colors.card,
          borderRadius: 8,
          marginBottom: 8,
        },
      ]}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1.5 }}>
        <Text
          style={[styles.nameText, { color: theme.colors.text }]}
          numberOfLines={1}
        >
          {item.company}
        </Text>
        <Text style={[styles.subText, { color: theme.colors.secondaryText }]}>
          {item.price_date
            ? new Date(item.price_date).toLocaleDateString()
            : ""}
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text
          style={[styles.priceText, { color: theme.colors.stockTextNegative }]}
        >
          {item.buy != null ? item.buy.toLocaleString() : "-"}
        </Text>
        <Text style={[styles.smallSub, { color: theme.colors.secondaryText }]}>
          Mua vào
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text
          style={[styles.priceText, { color: theme.colors.stockTextPositive }]}
        >
          {item.sell != null ? item.sell.toLocaleString() : "-"}
        </Text>
        <Text style={[styles.smallSub, { color: theme.colors.secondaryText }]}>
          Bán ra
        </Text>
      </View>
    </TouchableOpacity>
  );
}
