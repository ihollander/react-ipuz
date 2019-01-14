import { combineReducers } from "redux";
import cluesReducer from "../reducers/clues";
import gridReducer from "../reducers/grid";
import statusReducer from "../reducers/status";
import metaReducer from '../reducers/meta'
import authReducer from '../reducers/auth'

export default combineReducers({
  clues: cluesReducer,
  grid: gridReducer,
  status: statusReducer,
  meta: metaReducer,
  auth: authReducer
});
