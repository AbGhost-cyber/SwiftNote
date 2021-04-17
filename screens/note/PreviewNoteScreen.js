import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as noteActions from "../../store/actions/note";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { fontsMapper } from "../../constants";
import AddEditNoteModal from "../../components/AddEditNoteModal";
import { TouchableOpacity } from "react-native-gesture-handler";

const IconGroup = ({ onPinPress, onDeletePress, onEditPress }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={onEditPress} style={{ marginRight: 10 }}>
        <FontAwesome name="edit" color="white" size={26} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPinPress} style={{ marginRight: 10 }}>
        <MaterialCommunityIcons
          name="pin"
          color="white"
          size={26}
          onPress={onPinPress}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeletePress}>
        <MaterialCommunityIcons name="delete" color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
};
const PreviewNoteScreen = ({ route, navigation }) => {
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
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
  const handleNoteDelete = () => {};
  const handleNotePin = () => {};

  const navigateToEditNoteScreen = useCallback(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.subContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <FontAwesome name="arrow-left" color="white" size={26} />
          </TouchableOpacity>
          <IconGroup
            onEditPress={() => setShowModal(true)}
            onDeletePress={() => console.log("deleted")}
            onPinPress={() => console.log("pinned")}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.preTitle}>{previewedNote.title}</Text>
          <Text style={styles.preContent}>{previewedNote.content}</Text>
        </View>
        <AddEditNoteModal
          showModal={showModal}
          onSwipeComplete={() => setShowModal(false)}
        />
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
