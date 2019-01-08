import { combineReducers } from "redux";
import cluesReducer from "../reducers/clues";
import gridReducer from "../reducers/grid";

export default combineReducers({
  clues: cluesReducer,
  grid: gridReducer
});
