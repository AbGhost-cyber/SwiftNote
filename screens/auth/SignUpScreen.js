import React, { useState, useReducer, useCallback, useEffect } from "react";
import { Text, View, SafeAreaView, Alert, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import SnackBar from "../../components/Snackbar";
import { NavigationActions, StackActions } from "react-navigation";
import * as SecureStore from "expo-secure-store";

import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import {
  authStyle,
  deleteItem,
  formReducer,
  FORM_INPUT_UPDATE,
  getValueFor,
  save,
  validatePasswords,
} from "../../constants";
import * as authActions from "../../store/actions/auth";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [error, setError] = useState();
  const [sucess, setSucess] = useState(false);

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

  useEffect(() => {
    const getAuthState = async () => {
      let result = await SecureStore.getItemAsync("isLoggedIn");
      if (result) {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: "NoteMainActivity" }),
            ],
          })
        );
      } else {
        console.log("no value for this key");
      }
    };
    getAuthState();
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors in the form", [
        { text: "okay" },
      ]);
      return;
    }
    if (
      !validatePasswords(
        formState.inputValues.password,
        formState.inputValues.reEnteredPassword
      )
    ) {
      Alert.alert("Password", "Password don't match", [{ text: "okay" }]);
      return;
    }
    setError(null);
    setShowIndicator(true);
    setBtnEnabled(false);

    try {
      await dispatch(
        authActions.signUp(
          formState.inputValues.email,
          formState.inputValues.password,
          formState.inputValues.username
        )
      );
      save("isLoggedIn", "true");
      setSucess(true);
      setTimeout(() => {
        //navigation.reset({});
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: "NoteMainActivity" }),
            ],
          })
        );
      }, 500);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    setShowIndicator(false);
    setBtnEnabled(true);
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
          email
          holder="Email"
          id="email"
          required
          onInputChange={inputChangeHandler}
          errorText="please input a valid email"
          returnKeyType="next"
          required
          max={40}
          minLength={8}
          initValue={""}
          initValid={true}
          autoFocus={true}
        />
        <InputText
          holder="Username"
          id="username"
          required
          onInputChange={inputChangeHandler}
          errorText="username is required"
          returnKeyType="next"
          required
          max={12}
          minLength={2}
          initValue={""}
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
          max={30}
          initValue={""}
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
          initValue={""}
        />
        <CustomButton
          text="Create Account"
          onPress={() => submitHandler()}
          showProgIndicator={showIndicator}
          enabled={btnEnabled}
        />
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
            message={"account created successfully "}
            style={{ width: Dimensions.get("window").width }}
            onDismiss={() => setSucess(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUpScreen;
