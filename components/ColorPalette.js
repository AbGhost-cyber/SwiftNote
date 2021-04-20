import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import COLORS from "../data/colors";

const ColorRender = ({ hexCode, selected, onPress }) => {
  return (
    <View
      style={{
        ...styles.colorItem,
        backgroundColor: hexCode,
      }}
    >
      <MaterialCommunityIcons
        name={selected ? "checkbox-marked" : "checkbox-blank"}
        size={20}
        onPress={onPress}
        color={selected ? "black" : "#ccc"}
      />
    </View>
  );
};
const ColorPalette = ({ onSelectColor, noteColor }) => {
  const flatListRef = useRef();
  const [selectedColor, setSelectedColor] = useState(
    noteColor ? noteColor : "#F0F8FF"
  );
  let colorIndex = COLORS.findIndex((color) => color.hexCode === selectedColor);

  useEffect(() => {
    if (onSelectColor) {
      onSelectColor(selectedColor);
    }
    scrollToIndex();
  }, [selectedColor]);

  const scrollToIndex = () => {
    if (flatListRef) {
      flatListRef.current.scrollToIndex({ animated: true, index: colorIndex });
    }
  };
  return (
    <FlatList
      initialNumToRender={90}
      ref={(ref) => {
        flatListRef.current = ref;
      }}
      removeClippedSubviews
      keyExtractor={(item) => item.colorName}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={COLORS}
      renderItem={({ item }) => {
        return (
          <ColorRender
            hexCode={item.hexCode}
            selected={item.hexCode === selectedColor}
            onPress={() => setSelectedColor(item.hexCode)}
          />
        );
      }}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
          });
        });
      }}
    />
  );
};

export default ColorPalette;

const styles = StyleSheet.create({
  colorItem: {
    height: 50,
    width: 60,
    marginHorizontal: 5,
    borderRadius: 3,
  },
});
