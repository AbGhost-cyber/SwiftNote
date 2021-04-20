export const INSERT_NOTE = "INSERT_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const GET_ALL_NOTES = "GET_ALL_NOTES";
export const GET_NOTE = "GET_NOTE";
export const PIN_NOTE = "PIN_NOTE";
export const GET_ALL_PINNED_NOTES = "GET_ALL_PINNED_NOTES";

import { SWIFT_SERVER_URL } from "../../constants/index";

import * as SecureStore from "expo-secure-store";
import { encode } from "base-64";

export const getAllNotes = () => {
  return async (dispatch) => {
    try {
      let user_profile = await SecureStore.getItemAsync("user_profile");
      if (user_profile) {
        const user = JSON.parse(user_profile);
        const response = await fetch(
          `${SWIFT_SERVER_URL}/user/${user.uid}/note`,
          {
            method: "GET",
            headers: new Headers({
              Authorization:
                "Basic " + encode(user.email + ":" + user.password),
              "Content-Type": "application/json",
            }),
          }
        );
        const resData = await response.json();

        if (response.ok) {
          dispatch({
            type: GET_ALL_NOTES,
            notes: resData,
          });
        }
      } else {
        throw new Error("sign up or sign in to access this feature 🔒");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const getAllPinnedNotes = () => {
  return async (dispatch) => {
    try {
      let user_profile = await SecureStore.getItemAsync("user_profile");
      if (user_profile) {
        const user = JSON.parse(user_profile);
        const response = await fetch(
          `${SWIFT_SERVER_URL}/user/${user.uid}/note/pin`,
          {
            method: "GET",
            headers: new Headers({
              Authorization:
                "Basic " + encode(user.email + ":" + user.password),
              "Content-Type": "application/json",
            }),
          }
        );
        const resData = await response.json();

        if (response.ok) {
          dispatch({
            type: GET_ALL_PINNED_NOTES,
            pinnedNotes: resData,
          });
        }
      } else {
        throw new Error("sign up or sign in to access this feature 🔒");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getNoteById = (id) => {
  return async (dispatch) => {
    try {
      let user_profile = await SecureStore.getItemAsync("user_profile");
      if (user_profile) {
        const user = JSON.parse(user_profile);
        const response = await fetch(
          `${SWIFT_SERVER_URL}/user/${user.uid}/note/${id}`,
          {
            method: "GET",
            headers: new Headers({
              Authorization:
                "Basic " + encode(user.email + ":" + user.password),
              "Content-Type": "application/json",
            }),
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          dispatch({ type: GET_NOTE, noteId: id, currentNote: responseData });
        } else {
          throw new Error("an unknown error occurred 😔");
        }
      } else {
        throw new Error("sign up or sign in to access this feature 🔒");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const insertNote = (title, content, date, owner, color, id) => {
  return async (dispatch) => {
    try {
      let user_profile = await SecureStore.getItemAsync("user_profile");
      if (user_profile) {
        //convert json to object
        const user = JSON.parse(user_profile);

        const response = await fetch(
          `${SWIFT_SERVER_URL}/user/${user.uid}/note`,
          {
            method: "POST",
            headers: new Headers({
              Authorization:
                "Basic " + encode(user.email + ":" + user.password),
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({ id, title, content, date, owner, color }),
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong 😔");
        }

        dispatch({
          type: INSERT_NOTE,
          noteData: {
            id,
            title,
            content,
            date,
            owner,
            color,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

/*no much difference between the above code and this, 
due to the fact that in the server side, i can observe what changes 
was made and determine if it's to update or to insert
 but for redux action type sake we need to create two methods for
  inserting and updating
*/
export const updatetNote = (title, content, date, owner, color, id) => {
  return async (dispatch) => {
    try {
      let user_profile = await SecureStore.getItemAsync("user_profile");
      if (user_profile) {
        const user = JSON.parse(user_profile);
        const response = await fetch(
          `${SWIFT_SERVER_URL}/user/${user.uid}/note`,
          {
            method: "POST",
            headers: new Headers({
              Authorization:
                "Basic " + encode(user.email + ":" + user.password),
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({ id, title, content, date, owner, color }),
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong 😔");
        }

        dispatch({
          type: UPDATE_NOTE,
          noteData: {
            id,
            title,
            content,
            date,
            owner,
            color,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const pinNote = (id) => {
  return async (dispatch) => {
    try {
      let user_profile = await SecureStore.getItemAsync("user_profile");
      if (user_profile) {
        const user = JSON.parse(user_profile);
        const response = await fetch(
          `${SWIFT_SERVER_URL}/user/${user.uid}/note/pin/${id}`,
          {
            method: "POST",
            headers: new Headers({
              Authorization:
                "Basic " + encode(user.email + ":" + user.password),
              "Content-Type": "application/json",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong 😔");
        }

        dispatch({ type: PIN_NOTE, id });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      let user_profile = await SecureStore.getItemAsync("user_profile");
      if (user_profile) {
        const user = JSON.parse(user_profile);
        const response = await fetch(
          `${SWIFT_SERVER_URL}/user/${user.uid}/note/${id}`,
          {
            method: "DELETE",
            headers: new Headers({
              Authorization:
                "Basic " + encode(user.email + ":" + user.password),
            }),
          }
        );
        const responseData = await response.json();

        if (response.ok && responseData.success) {
          dispatch({ type: DELETE_NOTE, id });
        } else {
          throw new Error("Something went wrong 😔");
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
