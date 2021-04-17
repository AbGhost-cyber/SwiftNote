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
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

import NoteItem from "../../components/NoteItem";
import * as noteActions from "../../store/actions/note";
import { colors, fontsMapper } from "../../constants/index";
import AddEditNoteModal from "../../components/AddEditNoteModal";

const { width } = Dimensions.get("window");

const NoteScreen = ({ route, navigation }) => {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const wWidth = (width - 15 * 2 - 7) / 2;
  const notesIsEmpty = notes.length === 0;

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(noteActions.getAllNotes());
    };
    fetchNotes();
  }, [dispatch]);

  useEffect(() => {
    handleAddNoteClick();
  }, [route.params]);

  const handleAddNoteClick = useCallback(() => {
    if (route.params) {
      const { addNoteClicked } = route.params;
      if (addNoteClicked === true) {
        setShowAddNoteModal(true);
      }
    }
    //navigation.setParams({ addNoteClicked: null });
  }, [route.params]);

  //const { AddNoteClicked } = route.params;
  //if this screen has route props

  // const handleAddNote = useCallback(async () => {
  //   try {
  //     const date = new Date();
  //     let result = await SecureStore.getItemAsync("user_profile");
  //     if (result) {
  //       const user = JSON.parse(result);
  //       await dispatch(noteActions.getAllNotes());
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.headerText}>Notes</Text>
          <Ionicons
            name="log-out"
            size={27}
            color={colors.accent}
            style = {{marginVertical:10}}
          />
        </View>
        <View style={styles.pinnedParent}>
          <Text style={styles.emptySubText}>All notes</Text>
        </View>
        <ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              {notes
                .filter((_, i) => i % 2 !== 0)
                .map((item, index) => (
                  <NoteItem
                    key={item.id}
                    note={item}
                    width={wWidth}
                    aspectRatio={index % 2 !== 0 ? 120 / 165 : 1}
                    isSmall={index % 2 !== 0}
                    color={item.color}
                    onNotePress={() =>
                      navigation.navigate({
                        name: "PreviewNote",
                        params: {
                          noteId: item.id,
                        },
                      })
                    }
                  />
                ))}
            </View>
            <View>
              {notes
                .filter((_, i) => i % 2 === 0)
                .map((item, index) => (
                  <NoteItem
                    key={item.id}
                    note={item}
                    width={wWidth}
                    aspectRatio={index % 2 === 0 ? 120 / 165 : 1}
                    isSmall={index % 2 === 0}
                    color={item.color}
                    onNotePress={() =>
                      navigation.navigate({
                        name: "PreviewNote",
                        params: {
                          noteId: item.id,
                        },
                      })
                    }
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
      {notesIsEmpty && (
        <View style={styles.emptyNotes}>
          <Ionicons color={colors.accent} size={130} name="file-tray-stacked" />
          <Text style={styles.emptyNotesText}>No Note Added yet 🙂</Text>
          <Text style={styles.emptySubText}>
            click the + icon below your thumb to add one
          </Text>
        </View>
      )}
      <AddEditNoteModal
        showModal={showAddNoteModal}
        onSwipeComplete={() => setShowAddNoteModal(false)}
      />
    </SafeAreaView>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
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
  pinnedParent: {
    marginTop: 30,
    marginStart: 7,
  },
});
