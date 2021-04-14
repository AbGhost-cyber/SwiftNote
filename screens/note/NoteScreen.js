import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";

import NoteItem from "./components/NoteItem";

const { width } = Dimensions.get("window");

const NoteScreen = (props) => {
  const wWidth = (width - 15 * 2 - 7) / 2;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 15 }}>
            {dummyData
              .filter((_, i) => i % 2 !== 0)
              .map((item, index) => (
                <NoteItem
                  key={item.id}
                  dummyData={item}
                  width={wWidth}
                  aspectRatio={index % 2 !== 0 ? 120 / 165 : 1}
                  isSmall={index % 2 !== 0}
                />
              ))}
          </View>
          <View>
            {dummyData
              .filter((_, i) => i % 2 === 0)
              .map((item, index) => (
                <NoteItem
                  key={item.id}
                  dummyData={item}
                  width={wWidth}
                  aspectRatio={index % 2 === 0 ? 120 / 165 : 1}
                  isSmall={index % 2 === 0}
                />
              ))}
          </View>
        </View>
      </ScrollView>
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
});
