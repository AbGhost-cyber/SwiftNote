import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as noteActions from "../../store/actions/note";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { fontsMapper } from "../../constants";

const IconGroup = ({ onPinPress, onDeletePress, onEditPress }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <FontAwesome
        name="edit"
        color="white"
        size={26}
        style={{ marginRight: 10 }}
        onPress={onEditPress}
      />
      <MaterialCommunityIcons
        name="pin"
        color="white"
        size={26}
        style={{ marginRight: 10 }}
        onPress={onPinPress}
      />
      <MaterialCommunityIcons
        name="delete"
        color="white"
        size={26}
        onPress={onDeletePress}
      />
    </View>
  );
};
const PreviewNoteScreen = ({ route, navigation }) => {
  const [error, setError] = useState();
  const { noteId } = route.params;
  const dispatch = useDispatch();
  const previewedNote = useSelector((state) => state.notes.curPreviewedNote);

  useEffect(() => {
    if (noteId) {
      handleGetNote(noteId);
    }
  }, [dispatch]);
  const handleGetNote = useCallback(
    async (id) => {
      setError(null);
      try {
        await dispatch(noteActions.getNoteById(id));
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    },
    [dispatch]
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.subContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <FontAwesome
            name="arrow-left"
            color="white"
            size={26}
            onPress={() => navigation.goBack()}
          />
          <IconGroup />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.preTitle}>{previewedNote.title}</Text>
          <Text style={styles.preContent}>{previewedNote.content}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PreviewNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  subContainer: {
    margin: 15,
    marginTop: 40,
  },
  preTitle: {
    fontFamily: fontsMapper.pro_sans_bold,
    fontSize: 32,
    color: "white",
    textTransform: "capitalize",
  },
  preContent: {
    fontFamily: fontsMapper.pro_sans,
    fontSize: 22,
    color: "#ccc",
    marginTop: 20,
  },
});
