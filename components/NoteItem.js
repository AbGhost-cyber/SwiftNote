import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const NoteItem = ({ dummyData, width, aspectRatio, isSmall }) => {
  const { name, color: backgroundColor } = dummyData;
  return (
    <View
      style={[
        styles.parent,
        { backgroundColor, width, height: width * aspectRatio },
      ]}
    >
      <Text
        numberOfLines={isSmall ? 2 : 4}
        style={{ ...styles.title, width: width }}
      >
        {name}
      </Text>
      {!isSmall && (
        <Text numberOfLines={5} style={[styles.desc, { width: width }]}>
          Hi, im description
          textgsgsgsgsgsgggsgsgsgsgsgsgsgsgsgssgsggsgsgsgsgsgsggsgssgsgsggsgsgssggsgsgsgsgsgsgs
        </Text>
      )}
      <Text style={[styles.subText]}>2 sept 2020</Text>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  parent: {
    marginVertical: 7,
    paddingVertical: 20,
    borderRadius: 11,
  },
  title: {
    justifyContent: "flex-start",
    color: "white",
    fontSize: 22,
    paddingHorizontal: 20,
  },
  subText: {
    width: 120,
    padding: 3,
    fontSize: 17,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 10,
    borderRadius: 9,
    textAlign: "center",
    marginStart: 20,
  },
  desc: {
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});
