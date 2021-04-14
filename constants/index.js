import { StyleSheet } from "react-native";

export const colors = {
  primary: "2E3342",
  accent: "#8D0696",
};

export const fontsMapper = {
  pro_sans: "product-sans",
  pro_sans_bold: "product-sans-bold",
};

export const SWIFT_SERVER_URL = "http://172.20.10.4:8082";

export const authStyle = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    padding: 20,
    fontFamily: fontsMapper.pro_sans_bold,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: fontsMapper.pro_sans,
  },
  footerText: { color: colors.accent, fontFamily: fontsMapper.pro_sans_bold },
});
