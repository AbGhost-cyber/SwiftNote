import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors, fontsMapper } from "../../constants";
import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

// { showModal, onSwipeComplete }
const AddEditNoteModal = ({ navigation }) => {
  return (
    <View style={styles.centeredView}>
      <View style={{ alignItems: "flex-end", margin: 10 }}>
        <TouchableOpacity>
          <Ionicons
            name="ios-close-outline"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <InputText
          holder="Title"
          inputFocusColor="white"
          inputUnFocusColor="#333333"
          placeholderColor="#ccc"
        />
        <InputText
          holder="Content"
          inputFocusColor="white"
          inputUnFocusColor="#333333"
          placeholderColor="#ccc"
          multilineEnabled
          height={150}
        />
        <CustomButton bgColor={colors.accent} text="Create" />
      </View>
    </View>
  );
};

export default AddEditNoteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "#ccc2",
    borderTopEndRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 5,
    justifyContent: "flex-start",
    height: height / 1.7,
  },
  //   titleText: {
  //     fontFamily: fontsMapper.pro_sans_bold,
  //     fontSize: 21,
  //     color: "#ccc",
  //   },
  descText: {
    fontFamily: fontsMapper.pro_sans_bold,
    fontSize: 21,
    color: "#ccc",
  },
});
