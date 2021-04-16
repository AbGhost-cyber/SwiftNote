import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import TabBg from "../components/TabBg";
import { colors } from "../constants";

const TabBarButton = ({ bgColor, showTab, ...props }) => {
  if (showTab) {
    return (
      <View style={styles.container} pointerEvents="box-none">
        <TabBg color={bgColor} style={styles.background} />
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <FontAwesome name="plus" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    );
  } else {
      //view holder
    return <View style={{ flex: 1, backgroundColor: "white" }}></View>;
  }
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 75,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: "white",
  },
  buttonIcon: {
    fontSize: 16,
    color: colors.accent,
  },
});
