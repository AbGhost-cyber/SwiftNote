import { StyleSheet } from "react-native";

export const colors = {
  primary: "2E3342",
  accent: "#8D0696",
};

export const fontsMapper = {
  pro_sans: "product-sans",
  pro_sans_bold: "product-sans-bold",
};

export const SWIFT_SERVER_URL = "http://192.168.1.104:8082";

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
