import React, { useState, useReducer, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { colors, fontsMapper } from "../../constants";
import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import { Ionicons } from "@expo/vector-icons";
import ColorPalette from "../../components/ColorPalette";
import {
  formReducer,
  id,
  FORM_INPUT_UPDATE,
  authStyle,
} from "../../constants/index";
import * as noteActions from "../../store/actions/note";
import SnackBar from "../../components/Snackbar";
import * as SecureStore from "expo-secure-store";

const AddEditNoteModal = ({ navigation, route }) => {
  let editedNote, _noteId;
  const dispatch = useDispatch();

  if (route.params) {
    const { noteId } = route.params;
    _noteId = noteId;
    editedNote = useSelector((state) =>
      state.notes.notes.find((note) => note.id === noteId)
    );
  }
  const [color, setColor] = useState(editedNote ? editedNote.color : "");
  const [error, setError] = useState();
  const [sucess, setSucess] = useState();
  const [showIndicator, setShowIndicator] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedNote ? editedNote.title : "",
      content: editedNote ? editedNote.content : "",
    },
    inputValidities: {
      title: editedNote ? true : false,
      content: editedNote ? true : false,
    },
    formIsValid: editedNote ? true : false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setShowIndicator(true);
    const date = new Date();
    if (editedNote) {
      try {
        await dispatch(
          noteActions.updatetNote(
            formState.inputValues.title,
            formState.inputValues.content,
            date.valueOf(),
            editedNote.owner,
            color,
            _noteId
          )
        );
        setSucess(true);
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      } catch (error) {
        setError(error.message);
      }
      setShowIndicator(false);
    } else {
      try {
        let result = await SecureStore.getItemAsync("user_profile");
        if (result) {
          const user = JSON.parse(result);
          await dispatch(
            noteActions.insertNote(
              formState.inputValues.title,
              formState.inputValues.content,
              date.valueOf(),
              user.email,
              color,
              id
            )
          );
          setSucess(true);
          setTimeout(() => {
            navigation.goBack();
          }, 100);
        }
      } catch (error) {
        setError(error.message);
      }
      setShowIndicator(false);
    }
  }, [dispatch, _noteId, formState, color, editedNote]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState, editedNote]
  );

  const handleOnSubmitEdit = () => {
    if (contentRef) {
      contentRef.current.focus();
    }
  };

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
      <KeyboardAwareScrollView>
        <View style={{ marginHorizontal: 5 }}>
          <InputText
            autoFocus={true}
            innerRef={(ref) => {
              titleRef.current = ref;
            }}
            id="title"
            holder="Title"
            errorText="please enter a valid text"
            inputFocusColor="white"
            inputUnFocusColor="#333333"
            placeholderColor="#ccc"
            returnkeyType="next"
            required
            autoCorrect
            onInputChange={inputChangeHandler}
            initValue={editedNote ? editedNote.title : ""}
            initValid={!!editedNote}
            minLength={4}
            onSubmitEditing={() => handleOnSubmitEdit()}
          />
          <InputText
            innerRef={(ref) => {
              contentRef.current = ref;
            }}
            id="content"
            holder="Content"
            inputFocusColor="white"
            inputUnFocusColor="#333333"
            placeholderColor="#ccc"
            multilineEnabled
            height={150}
            returnkeyType="done"
            required
            onInputChange={inputChangeHandler}
            initValue={editedNote ? editedNote.content : ""}
            initValid={!!editedNote}
            minLength={4}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <ColorPalette
            onSelectColor={(color) => setColor(color)}
            noteColor={editedNote ? editedNote.color : ""}
          />
          <CustomButton
            bgColor={colors.accent}
            text={editedNote ? "Update" : "Create"}
            showProgIndicator={showIndicator}
            onPress={() => submitHandler()}
          />
        </View>
      </KeyboardAwareScrollView>
      {error && (
        <View style={authStyle.snackBarStyles}>
          <SnackBar
            message={error}
            style={{ width: Dimensions.get("window").width }}
            onDismiss={() => setError(null)}
          />
        </View>
      )}
      {sucess && (
        <View style={authStyle.snackBarStyles}>
          <SnackBar
            message={editedNote ? "Noted updated 😉" : "Note Created 😉"}
            style={{ width: Dimensions.get("window").width }}
            onDismiss={() => setSucess(false)}
          />
        </View>
      )}
    </View>
  );
};

export default AddEditNoteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
});
