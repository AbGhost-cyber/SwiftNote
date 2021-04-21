import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import * as noteActions from "../../store/actions/note";
import { colors, fontsMapper } from "../../constants";
import CustomButton from "../../components/Button";
import { StatusBar } from "expo-status-bar";

const IconGroup = ({ onPinPress, onDeletePress, onEditPress }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={onEditPress} style={{ marginRight: 15 }}>
        <FontAwesome name="edit" color="white" size={26} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPinPress} style={{ marginRight: 15 }}>
        <MaterialCommunityIcons name="pin" color="white" size={26} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeletePress}>
        <MaterialCommunityIcons name="delete" color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
};
const PreviewNoteScreen = ({ route, navigation }) => {
  const [error, setError] = useState();
  const { noteId } = route.params;
  const dispatch = useDispatch();

  //helps reload the screen on navigation
  const isFocused = useIsFocused();

  const previewedNote = useSelector((state) => state.notes.curPreviewedNote);

  useEffect(() => {
    if (noteId) {
      handleGetNote(noteId);
    }
  }, [dispatch, isFocused]);
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
  const handleNoteDelete = useCallback(async () => {
    setError(null);
    try {
      await dispatch(noteActions.deleteNote(noteId));
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
  }, [previewedNote, noteId, dispatch]);

  const handleNotePin = useCallback(async () => {
    setError(null);
    try {
      await dispatch(noteActions.pinNote(noteId));
      navigation.goBack();
    } catch (error) {
      setError(error.message);
      alert(error.message)
    }
  }, [previewedNote, noteId, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.subContainer}>
        <StatusBar style="light" />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <FontAwesome name="arrow-left" color="white" size={26} />
          </TouchableOpacity>
          <IconGroup
            onEditPress={() =>
              navigation.navigate({
                name: "AddNoteModal",
                params: {
                  noteId: previewedNote.id,
                },
              })
            }
            onDeletePress={() => handleNoteDelete()}
            onPinPress={() => handleNotePin()}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.preTitle}>{previewedNote.title}</Text>
          <Text style={styles.preContent}>{previewedNote.content}</Text>
        </View>
        {error && error === "Network request failed" && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons
              name="cloud-off-outline"
              size={130}
              color={colors.accent}
            />
            <Text style={styles.errorText}>{error}</Text>
            <CustomButton
              text="Retry Connection"
              onPress={() => handleGetNote(noteId)}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 15,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  errorText: {
    fontFamily: fontsMapper.pro_sans,
    color: "white",
    fontSize: 17,
  },
});
