import { combineReducers } from "redux";
import cluesReducer from "../reducers/clues";
import gridReducer from "../reducers/grid";
import statusReducer from "../reducers/status";

export default combineReducers({
  clues: cluesReducer,
  grid: gridReducer,
  status: statusReducer
});
