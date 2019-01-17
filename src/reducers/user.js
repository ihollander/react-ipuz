import { userTypes } from "../actionTypes/user";
import { authTypes } from "../actionTypes/auth";

const INITIAL_STATE = {
  savedPuzzles: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case userTypes.PUZZLE_SAVED:
      return { ...state, currentPuzzleId: action.payload.id };
    case userTypes.PUZZLES_FETCHED:
      return { ...state, savedPuzzles: action.payload };
    default:
      return state;
  }
};
