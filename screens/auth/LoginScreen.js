import React, { useCallback, useReducer, useState, useEffect } from "react";
import { Text, SafeAreaView, Alert, Dimensions, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationActions, StackActions } from "react-navigation";

import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import {
  authStyle,
  formReducer,
  FORM_INPUT_UPDATE,
  focusTextInput,
  getValueFor,
  save,
  colors,
  fontsMapper,
} from "../../constants";
import * as authActions from "../../store/actions/auth";
import SnackBar from "../../components/Snackbar";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [showIndicator, setShowIndicator] = useState(false);
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [error, setError] = useState();
  const [sucess, setSucess] = useState(false);

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

  //navigate to note screen if user is authenticated
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
    setError(null);
    setShowIndicator(true);
    setBtnEnabled(false);
    try {
      await dispatch(
        authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
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
          max={30}
          minLength={8}
          initValue={""}
          initValid={true}
          autoFocus={true}
          onSubmitEditing={() => {
            focusTextInput(formState.inputValues.password);
          }}
        />
        <InputText
          holder="Password"
          id="password"
          required
          onInputChange={inputChangeHandler}
          errorText="password is required"
          returnKeyType="done"
          minLength={4}
          required
          max={12}
          initValue={""}
        />
        <CustomButton
          text="Login"
          onPress={() => {
            submitHandler();
          }}
          showProgIndicator={showIndicator}
          enabled={btnEnabled}
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
            message={"welcome back " + currentUser.username + " 🤗"}
            style={{ width: Dimensions.get("window").width }}
            onDismiss={() => setSucess(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
