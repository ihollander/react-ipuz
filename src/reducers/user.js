import { authTypes } from "../actionTypes/auth";

const INITIAL_STATE = {
  savedPuzzles: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
