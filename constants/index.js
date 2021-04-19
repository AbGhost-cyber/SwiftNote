import { StyleSheet, findNodeHandle } from "react-native";
import TextInputState from "react-native";
import * as SecureStore from "expo-secure-store";

export const colors = {
  primary: "#2E3342",
  accent: "#8D0696",
};

export const fontsMapper = {
  pro_sans: "product-sans",
  pro_sans_bold: "product-sans-bold",
};

// http://172.20.10.4:8082
export const SWIFT_SERVER_URL = "http://192.168.1.105:8082";

export const authStyle = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    padding: 20,
    fontFamily: fontsMapper.pro_sans_bold,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: fontsMapper.pro_sans,
  },
  footerText: { color: colors.accent, fontFamily: fontsMapper.pro_sans_bold },
  snackBarStyles: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.accent,
  },
});

export const FORM_INPUT_UPDATE = "UPDATE";
export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
  }
  return state;
};

export function focusTextInput(node) {
  try {
    TextInputState.focusTextInput(findNodeHandle(node));
  } catch (e) {
    console.log("Couldn't focus text input: ", e.message);
  }
}

export const validatePasswords = (pw1, pw2) => {
  return pw1 === pw2;
};

export const id = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
export async function deleteItem(key) {
  await SecureStore.deleteItemAsync(key);
}
