import { combineReducers } from "redux";
import auth from "../reducers/auth";
import puzzle from "../reducers/puzzle";
import modals from "../reducers/modals";
import game from '../reducers/game'
import lobby from '../reducers/lobby'

export default combineReducers({
  auth,
  puzzle,
  modals,
  game,
  lobby
});
