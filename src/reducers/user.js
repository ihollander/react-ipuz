import { userTypes } from "../actionTypes/user";

const INITIAL_STATE = {
  currentPuzzleId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.PUZZLE_SAVED:
      return { ...state, currentPuzzleId: action.payload.id };
    default:
      return state;
  }
};
