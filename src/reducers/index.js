import { combineReducers } from "redux";
import status from "../reducers/status";
import auth from "../reducers/auth";
import user from "../reducers/user";
import puzzle from "../reducers/puzzle";
import modals from "../reducers/modals";

export default combineReducers({
  status,
  auth,
  user,
  puzzle,
  modals
});
