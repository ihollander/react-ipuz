import { authTypes } from "../actionTypes/auth";
import { userTypes } from "../actionTypes/user";

const INITIAL_STATE = {
  savedPuzzles: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case userTypes.GAMES_FETCHED:
      return { ...state, savedPuzzles: action.payload };
    default:
      return state;
  }
};
