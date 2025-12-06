import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    padding: 12,
    borderRadius: 12,
  },
  titleSmall: {
    fontSize: 13,
    marginBottom: 6,
  },
  bigPrice: {
    fontSize: 28,
    fontWeight: "700",
  },
  subText: {
    fontSize: 12,
  },
  tableHeader: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "600",
  },
  subTextSmall: {
    fontSize: 12,
    color: "#888",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
  },
  smallSub: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
});
