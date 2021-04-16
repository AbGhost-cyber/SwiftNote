import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import NoteItem from "../../components/NoteItem";
import * as noteActions from "../../store/actions/note";
import { colors, fontsMapper, id } from "../../constants/index";

const { width } = Dimensions.get("window");

const NoteScreen = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const wWidth = (width - 15 * 2 - 7) / 2;

  const handleAddNote = useCallback(async () => {
    try {
      const date = new Date();
      let result = await SecureStore.getItemAsync("user_profile");
      if (result) {
        const user = JSON.parse(result);
        await dispatch(noteActions.getAllNotes());
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20 }}>
        <Text style={styles.headerText}>Notes</Text>
      </View>
      <View style={styles.emptyNotes}>
        <Ionicons color={colors.accent} size={130} name="file-tray-stacked" />
        <Text style={styles.emptyNotesText}>No Note Added yet 🙂</Text>
        <Text style={styles.emptySubText}>
          click the + icon below your thumb to add one
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  subContainer: {
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  headerText: {
    fontFamily: fontsMapper.pro_sans_bold,
    color: "white",
    fontSize: 38,
  },
  emptyNotes: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyNotesText: {
    fontFamily: fontsMapper.pro_sans_bold,
    color: "white",
  },
  emptySubText: {
    fontFamily: fontsMapper.pro_sans,
    color: "#ccc",
  },
});

// <SafeAreaView style={styles.container}>
// <ScrollView contentContainerStyle={styles.subContainer}>
//   <View style={{ flexDirection: "row" }}>
//     <View style={{ marginRight: 15 }}>
//       {dummyData
//         .filter((_, i) => i % 2 !== 0)
//         .map((item, index) => (
//           <NoteItem
//             key={item.id}
//             dummyData={item}
//             width={wWidth}
//             aspectRatio={index % 2 !== 0 ? 120 / 165 : 1}
//             isSmall={index % 2 !== 0}
//           />
//         ))}
//     </View>
//     <View>
//       {dummyData
//         .filter((_, i) => i % 2 === 0)
//         .map((item, index) => (
//           <NoteItem
//             key={item.id}
//             dummyData={item}
//             width={wWidth}
//             aspectRatio={index % 2 === 0 ? 120 / 165 : 1}
//             isSmall={index % 2 === 0}
//           />
//         ))}
//     </View>
//   </View>
// </ScrollView>
// </SafeAreaView>
