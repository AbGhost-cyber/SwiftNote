import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import AnimatedLottieView from "lottie-react-native";

import SearchBar from "../components/SearchBar";
import { colors, fontsMapper } from "../constants";
import SearchNoteItem from "../components/SearchNoteItem";

const { width } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const matchesNotFound = matches.length === 0;
  const queryIsEmpty = query.length === 0;
  const allNotes = useSelector((state) => state.notes.notes);

  const queryAllNotes = useCallback(() => {
    const searchReg = RegExp(`.*${query.toLowerCase().split("").join(".*")}.*`);
    const matches = allNotes.filter(
      (note) =>
        note.title.toLowerCase().match(searchReg) ||
        note.content.toLowerCase().match(searchReg)
    );
    setMatches(matches);
  }, [query, matches]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <SearchBar
        item={query}
        onItemChange={(text) => {
          setQuery(text);
        }}
        onItemSubmit={() => queryAllNotes()}
      />
      {!queryIsEmpty && !matchesNotFound && (
        <FlatList
          data={matches}
          renderItem={(item) => (
            <SearchNoteItem
              title={item.item.title}
              content={item.item.content}
              onPress={() =>
                navigation.navigate({
                  name: "PreviewNote",
                  params: {
                    noteId: item.item.id,
                  },
                })
              }
            />
          )}
        />
      )}
      {matchesNotFound && !queryIsEmpty && (
        <View style={styles.emptySearch}>
          <AnimatedLottieView
            source={require("../assets/json/not_found.json")}
            loop={true}
            speed={2}
            autoPlay
            style={styles.lottie}
          />
          <Text style={{ ...styles.emptySearchText, marginTop: 10 }}>
            this note is unavailable 🙁
          </Text>
        </View>
      )}
      {queryIsEmpty && (
        <View style={styles.emptySearch}>
          <AnimatedLottieView
            source={require("../assets/json/search.json")}
            loop={true}
            speed={2}
            autoPlay
            style={styles.lottie}
          />
          <Text style={styles.emptySearchText}>
            Easily search for your notes 🕵🏾
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  emptySearch: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptySearchText: {
    fontFamily: fontsMapper.pro_sans_bold,
    color: "white",
  },
  lottie: {
    height: width / 3,
  },
});
