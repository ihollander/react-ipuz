import { puzzleTypes } from "../actionTypes/puzzle";
import { statusTypes } from "../actionTypes/status";
import { authTypes } from "../actionTypes/auth";

const INITIAL_STATE = {
  loaded: false,
  solved: false,
  completed: false,
  timer: 0,
  paused: true,
  rebus: false,
  selectedCellIndex: null,
  selectedDirection: "ACROSS",
  selectedCell2Index: null,
  selectedCell2Direction: "DOWN"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case puzzleTypes.PUZZLE_PARSING:
      return INITIAL_STATE;
    case puzzleTypes.PUZZLE_PARSED:
      const selectedCellIndex = action.payload.grid.cells.find(
        cell => cell.type !== "BLACK"
      ).index;
      return { ...state, loaded: true, paused: false, selectedCellIndex };
    case statusTypes.TOGGLE_DIRECTION:
      const selectedDirection =
        state.selectedDirection === "ACROSS" ? "DOWN" : "ACROSS";
      return { ...state, selectedDirection };
    case statusTypes.CELL_SELECTED:
      return { ...state, selectedCellIndex: action.payload };
    case statusTypes.TOGGLE_REBUS:
      return { ...state, rebus: !state.rebus };
    case statusTypes.TOGGLE_PAUSED:
      return { ...state, paused: !state.paused };
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
