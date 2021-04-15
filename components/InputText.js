import React, { useState, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import { colors, fontsMapper } from "../constants/index";
import TextInputError from "./TextInputError";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputText = (props) => {
  const {
    holder,
    onInputChange,
    id,
    initValid,
    initValue,
    required,
    minLength,
    min,
    max,
    email,
    returnKeyType,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initValue ? initValue : "",
    isValid: initValid,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < props.min) {
      isValid = false;
    }
    if (max != null && +text.length > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.holder}>{holder}</Text>
      <TextInput
        {...props}
        style={[
          styles.input,
          isFocused
            ? { borderColor: colors.accent }
            : { borderColor: colors.primary },
        ]}
        onChangeText={textChangeHandler}
        value={inputState.value}
        numberOfLines={2}
        placeholder={
          holder === "Re-Enter Password"
            ? `re-enter your password`
            : `input your ${holder.toLowerCase()}`
        }
        placeholderTextColor={colors.accent}
        onBlur={lostFocusHandler}
        returnKeyType={returnKeyType}
        onFocus={() => setIsFocused(true)}
      />
      <TextInputError
        showError={!inputState.isValid && inputState.touched}
        errorText={props.errorText}
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    color: "white",
    padding: 20,
    borderRadius: 12,
    fontFamily: fontsMapper.pro_sans,
  },
  holder: {
    color: "white",
    fontSize: 16,
    padding: 9,
    fontFamily: fontsMapper.pro_sans_bold,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  errorText: {
    fontFamily: fontsMapper.pro_sans,
    color: "red",
    fontSize: 16,
    paddingHorizontal: 8,
  },
});

// {!text && isTouched && (
//     <Text style={styles.errorText}>
//       {holder.toLowerCase().endsWith("password")
//         ? "password is required"
//         : `${holder.toLowerCase()} is required`}
//     </Text>
//   )}
