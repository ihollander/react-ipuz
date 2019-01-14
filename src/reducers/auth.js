import { authTypes } from "../actionTypes/auth";

const user = JSON.parse(localStorage.getItem("user"));
const INITIAL_STATE = {
  loading: false,
  isSignedIn: !!user,
  user,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case authTypes.LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
