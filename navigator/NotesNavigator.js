import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SignUpScreen from "../screens/auth/SignUpScreen";
import LoginScreen from "../screens/auth/LoginScreen";

const NoteNavigator = createStackNavigator({
  SignUp: SignUpScreen,
  Login: LoginScreen,
},{
    defaultNavigationOptions:{
        headerShown:false
    }
});

export default createAppContainer(NoteNavigator);
