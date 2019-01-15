import { userTypes } from "../actionTypes/user";
import { puzzleTypes } from "../actionTypes/puzzle";

const INITIAL_STATE = {
  currentPuzzleId: null,
  savedPuzzles: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case puzzleTypes.PUZZLE_PARSING:
      return { ...state, currentPuzzleId: null };
    case userTypes.PUZZLE_SAVED:
      return { ...state, currentPuzzleId: action.payload.id };
    case userTypes.PUZZLES_FETCHED:
      return { ...state, savedPuzzles: action.payload };
    default:
      return state;
  }
};
