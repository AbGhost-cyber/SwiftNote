import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontsMapper } from "../constants";

const SearchNoteItem = ({ title, content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={3} style={styles.content}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchNoteItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "white",
  },
  title: {
    fontFamily: fontsMapper.pro_sans_bold,
    color: "black",
    fontSize: 20,
    paddingHorizontal: 10,
  },
  content: {
    fontFamily: fontsMapper.pro_sans,
    color: "#252525",
    fontSize: 17,
    paddingHorizontal: 10,
    marginTop: 6,
  },
});
