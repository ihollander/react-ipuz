import { puzzleTypes } from "../actionTypes/puzzle";
import { gameTypes } from "../actionTypes/game";
import { authTypes } from "../actionTypes/auth";

const INITIAL_STATE = {
  meta: {
    copyright: "",
    author: "",
    title: "",
    notes: ""
  },
  dimensions: {
    width: null,
    height: null
  },
  cells: [],
  clues: {
    across: null,
    down: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case gameTypes.GAME_FETCHED:
      return action.payload.puzzle;
    case gameTypes.GAME_DATA_RECEIVED:
      return JSON.parse(action.payload.game.puzzle)
    case puzzleTypes.CELL_VALUE_CHANGED:
      const newCellValues = state.cells.map(cell =>
        cell.index === action.payload.index
          ? { ...cell, guess: action.payload.value }
          : cell
      );
      return {
        ...state,
        cells: newCellValues
      };
    case puzzleTypes.CHECK_ANSWER:
      const checkAnswerCells = state.cells.map(cell => {
        const payloadCell = action.payload.find(c => c.index === cell.index)
        if (payloadCell) {
          const confirmed = cell.guess === cell.solution;
          return { ...cell, confirmed, checked: true };
        } else {
          return cell;
        }
      });
      return { ...state, cells: checkAnswerCells };
    case puzzleTypes.REVEAL_ANSWER:
      const revealSquareCells = state.cells.map(cell => {
        const payloadCell = action.payload.find(c => c.index === cell.index)
        if (payloadCell) {
          return {
            ...cell,
            guess: cell.solution,
            revealed: true,
            confirmed: true
          };
        } else {
          return cell;
        }
      });
      return { ...state, cells: revealSquareCells };
    default:
      return state;
  }
};
