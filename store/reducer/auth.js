import User from "../../model/User";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGN_UP } from "../actions/auth";

const initialState = {
  currentUser: User,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      const user = new User(
        action.userData.id,
        action.userData.email,
        action.userData.username
      );

      return {
        ...state,
        currentUser: user,
      };
  }
  return state;
};
