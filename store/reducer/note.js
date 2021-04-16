import {
  DELETE_NOTE,
  GET_ALL_NOTES,
  GET_NOTE,
  UPSERT_NOTE,
} from "../actions/note";
import Note from "../../model/Note";

const initialState = {
  notes: [],
  curPreviewedNote: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case UPSERT_NOTE:
      const note = new Note(
        action.noteData.title,
        action.noteData.content,
        action.noteData.date,
        action.noteData.owner,
        action.noteData.id
      );
      return {
        ...state,
        notes: state.notes.concat(note),
      };
    case GET_NOTE:
      return {
        ...state,
        curPreviewedNote: action.currentNote,
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.id),
      };
  }

  return state;
};
