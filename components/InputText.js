import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { colors, fontsMapper } from "../constants/index";

const InputText = ({ holder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.holder}>{holder}</Text>
      <TextInput
        style={styles.input}
        onChangeText={() => {}}
        value="Oliver twist"
        numberOfLines={2}
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: colors.accent,
    color: "white",
    padding: 20,
    borderRadius: 12,
    fontFamily: fontsMapper.pro_sans,
  },
  holder: {
    color: "white",
    fontSize: 16,
    padding: 9,
    fontFamily: fontsMapper.pro_sans_bold,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
