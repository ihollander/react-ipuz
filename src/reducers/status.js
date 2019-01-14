import { parseTypes } from "../actionTypes/parse";
import { statusTypes } from "../actionTypes/status";

const INITIAL_STATE = {
  solved: false,
  completed: false,
  timer: 0,
  paused: true,
  rebus: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case statusTypes.TOGGLE_REBUS:
      return { ...state, rebus: !state.rebus };
    case statusTypes.TOGGLE_PAUSED:
      return { ...state, paused: !state.paused };
    case parseTypes.PUZZLE_PARSING:
      return INITIAL_STATE;
    case parseTypes.PUZZLE_PARSED:
      return { ...state, paused: false };
    case statusTypes.MARK_COMPLETED:
      return { ...state, completed: true };
    case statusTypes.UNMARK_COMPLETED:
      return { ...state, completed: false, solved: false };
    case statusTypes.MARK_SOLVED:
      return { ...state, solved: true, completed: true };
    case statusTypes.SAVE_TIMER:
      return { ...state, timer: action.payload };
    case statusTypes.RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
