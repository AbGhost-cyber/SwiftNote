import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { colors, fontsMapper } from "../constants";

const SearchBar = ({ item, onItemChange, onItemSubmit }) => {
  const input = useRef(null);
  const _onPress = () => {
    input.current.focus();
  };

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity style={styles.icon} onPress={_onPress}>
        <Ionicons name="ios-search" size={30} color={colors.accent} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search note..."
        value={item}
        onChangeText={onItemChange}
        onEndEditing={onItemSubmit}
        ref={input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 48,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    fontSize: 17,
    fontFamily: fontsMapper.pro_sans,
  },
  icon: {
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
