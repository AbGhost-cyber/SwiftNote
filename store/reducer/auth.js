import User from "../../model/User";
import { LOGIN, SIGN_UP } from "../actions/auth";

const initialState = {
  currentUser: User,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      const regUser = new User(
        action.userData.id,
        action.userData.email,
        action.userData.password,
        action.userData.username
      );

      return {
        ...state,
        currentUser: regUser,
      };
    case LOGIN:
      const logUser = new User(
        action.userData.id,
        action.userData.email,
        action.userData.password,
        action.userData.username
      );

      return {
        ...state,
        currentUser: logUser,
      };
  }
  return state;
};
