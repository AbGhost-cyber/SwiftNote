import React, { useState, useReducer, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";

import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import { authStyle, formReducer, FORM_INPUT_UPDATE } from "../../constants";
import * as authActions from "../../store/actions/auth";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
      reEnteredPassword: "",
    },
    inputValidities: {
      username: false,
      email: false,
      password: false,
      reEnteredPassword: false,
    },
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors in the form", [
        { text: "okay" },
      ]);
      return;
    }
    dispatch(authActions.signUp("joe@gmail.com", "1234", "jb"));
  }, [formState, dispatch]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <SafeAreaView style={authStyle.container}>
      <KeyboardAwareScrollView>
        <Text style={authStyle.headerText}>Sign Up</Text>
        <InputText
          holder="Username"
          id="username"
          required
          onInputChange={inputChangeHandler}
          errorText="username is required"
          returnKeyType="next"
          required
          max={12}
        />
        <InputText
          email
          holder="Email"
          id="email"
          required
          onInputChange={inputChangeHandler}
          errorText="please input a valid email"
          returnKeyType="next"
          required
          max={12}
        />
        <InputText
          holder="Password"
          id="password"
          required
          onInputChange={inputChangeHandler}
          errorText="password is required"
          returnKeyType="next"
          minLength={4}
          required
          max={12}
        />
        <InputText
          holder="Re-Enter Password"
          id="reEnteredPassword"
          required
          onInputChange={inputChangeHandler}
          errorText="please re-enter password"
          returnKeyType="done"
          minLength={4}
          required
          max={12}
        />
        <CustomButton text="Create Account" onPress={() => submitHandler()} />
        <Text style={authStyle.text}>
          Already have an account?{"  "}
          <Text
            onPress={() => navigation.navigate("Login")}
            style={authStyle.footerText}
          >
            Log in
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
