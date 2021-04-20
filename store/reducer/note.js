import {
  DELETE_NOTE,
  GET_ALL_NOTES,
  GET_ALL_PINNED_NOTES,
  GET_NOTE,
  INSERT_NOTE,
  PIN_NOTE,
  UPDATE_NOTE,
} from "../actions/note";
import Note from "../../model/Note";

const initialState = {
  notes: [],
  pinnedNotes: [],
  curPreviewedNote: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTES:
      return {
        ...state,
        notes: action.notes,
      };

    case GET_ALL_PINNED_NOTES:
      return {
        ...state,
        pinnedNotes: action.pinnedNotes,
      };

    case INSERT_NOTE:
      const note = new Note(
        action.noteData.title,
        action.noteData.content,
        action.noteData.date,
        action.noteData.owner,
        action.noteData.isPinned,
        action.noteData.id
      );
      return {
        ...state,
        notes: state.notes.concat(note),
      };

    case UPDATE_NOTE:
      const noteIndex = state.notes.findIndex(
        (note) => note.id === action.noteData.id
      );
      const updatedNote = new Note(
        action.noteData.title,
        action.noteData.content,
        action.noteData.date,
        action.noteData.owner,
        action.noteData.isPinned,
        action.noteData.id
      );
      const updatedNotes = [...state.notes];
      updatedNotes[noteIndex] = updatedNote;
      return {
        ...state,
        notes: updatedNotes,
      };

    case GET_NOTE:
      return {
        ...state,
        curPreviewedNote: action.currentNote,
      };

    case PIN_NOTE:
      //check if  note exist already in the pinned note
      const noteExist = state.pinnedNotes.find((note) => note.id === action.id);
      //copy of our state pinned notes
      const _pinnedNotes = state.pinnedNotes.slice();
      if (noteExist) {
        //get it's index
        const noteIndex = _pinnedNotes.findIndex(
          (note) => note.id === action.id
        );
        //remove the array
        _pinnedNotes.splice(noteIndex, 1);
      } else {
        //insert note into pinned
        const pinnedNote = state.notes.find((note) => note.id === action.id);
        _pinnedNotes.push(pinnedNote);
      }

      return {
        ...state,
        pinnedNotes: _pinnedNotes,
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.id),
      };
  }

  return state;
};
