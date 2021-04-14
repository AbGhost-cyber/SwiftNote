import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontsMapper } from "../constants";

const TextInputError = ({ showError, errorText }) => {
  return (
    <View>
      {showError ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default TextInputError;

const styles = StyleSheet.create({
  error: {
    fontFamily: fontsMapper.pro_sans,
    color: "red",
    paddingHorizontal: 6,
  },
});
