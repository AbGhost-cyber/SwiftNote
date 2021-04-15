import React from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { colors, fontsMapper } from "../constants/index";

const CustomButton = ({ onPress, text, showProgIndicator, enabled }) => {
  return (
    <RectButton style={[styles.container]} onPress={onPress} enabled={enabled}>
      {showProgIndicator ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.label}>{text}</Text>
      )}
    </RectButton>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 10,
    padding: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
  },
  label: {
    fontSize: 15,
    fontFamily: fontsMapper.pro_sans_bold,
    textAlign: "center",
    color: "white",
  },
});
