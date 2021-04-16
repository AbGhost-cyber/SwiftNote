import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";

import authReducer from "./store/reducer/auth";
import noteReducer from "./store/reducer/note";
import { NavigationContainer } from "@react-navigation/native";
import { StackNav, NoteTabBar } from "./navigator/NotesNavigator";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "product-sans-bold": require("./assets/fonts/Product-Sans-Bold.ttf"),
    "product-sans": require("./assets/fonts/Product-Sans-Regular.ttf"),
  });
};
const rootReducer = combineReducers({
  auth: authReducer,
  notes: noteReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <StackNav />
    </Provider>
  );
}

<NoteTabBar barColor="#F6F7EB" />;
