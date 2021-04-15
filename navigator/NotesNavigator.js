import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SignUpScreen from "../screens/auth/SignUpScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import NoteScreen from "../screens/note/NoteScreen";
import EditNoteScreen from "../screens/note/EditNoteScreen";
import PreviewNoteScreen from "../screens/note/PreviewNoteScreen";

const NoteNavigator = createStackNavigator(
  {
    SignUp: SignUpScreen,
    Login: LoginScreen,
    NoteMainActivity: NoteScreen,
    EditNote: EditNoteScreen,
    PreviewNote: PreviewNoteScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(NoteNavigator);
