import React from "react";
import { Text, SafeAreaView } from "react-native";

import CustomButton from "../../components/Button";
import InputText from "../../components/InputText";
import { colors, authStyle } from "../../constants";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={authStyle.container}>
      <Text style={authStyle.headerText}>Log in</Text>
      <InputText holder="Email" />
      <InputText holder="Password" />
      <CustomButton text="Create Account" />
      <Text style={authStyle.text}>
        Don't have an account?{"  "}
        <Text
          onPress={() => navigation.navigate("SignUp")}
          style={authStyle.footerText}
        >
          Sign up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
