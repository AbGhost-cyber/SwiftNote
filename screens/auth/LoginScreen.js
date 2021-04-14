import React, { useCallback, useReducer, useState } from "react";
import { Text, SafeAreaView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import { authStyle, formReducer, FORM_INPUT_UPDATE } from "../../constants";
import * as authActions from "../../store/actions/auth";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors in the form", [
        { text: "okay" },
      ]);
      return;
    }
    dispatch(
      authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
    setShowIndicator(true);
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
        <Text style={authStyle.headerText}>Log in</Text>
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
        <CustomButton
          text="Login"
          onPress={() => {
            submitHandler();
          }}
          showProgIndicator={showIndicator}
        />
        <Text style={authStyle.text}>
          Don't have an account?{"  "}
          <Text
            onPress={() => navigation.navigate("SignUp")}
            style={authStyle.footerText}
          >
            Sign up
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
