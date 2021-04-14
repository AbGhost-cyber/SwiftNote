export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
import { SWIFT_SERVER_URL } from "../../constants/index";

export const signUp = (email, password, username) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${SWIFT_SERVER_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      const responseData = await response.json();

      if (responseData.id != null && responseData.success) {
        dispatch({
          type: SIGN_UP,
          userData: {
            id: responseData.id,
            email,
            password,
            username,
          },
        });
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${SWIFT_SERVER_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();

      if (responseData.id != null && responseData.success) {
        dispatch({
          type: LOGIN,
          userData: {
            id: responseData.id,
            email,
            password,
            username: responseData.message,
          },
        });
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
