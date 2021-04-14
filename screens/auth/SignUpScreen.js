import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import { authStyle } from "../../constants";
import * as authActions from "../../store/actions/auth";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.currentUser);

  const signUpUser = () => {
    dispatch(authActions.signUp("joe@gmail.com", "1234", "jb"));
  };
  return (
    <SafeAreaView style={authStyle.container}>
      <Text style={authStyle.headerText}>Sign Up</Text>
      <InputText holder="Username" />
      <InputText holder="Email" />
      <InputText holder="Password" />
      <InputText holder="Re-Enter Password" />
      <CustomButton text="Create Account" onPress={() => signUpUser()} />
      <Text style={authStyle.text}>
        Already have an account?{"  "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={authStyle.footerText}
        >
          Log in
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignUpScreen;
