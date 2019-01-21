import { puzzleTypes } from "../actionTypes/puzzle";
import { userTypes } from "../actionTypes/user";
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
    case userTypes.GAME_FETCH_FAILURE:
      return state;
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case userTypes.GAME_FETCHED:
      return {
        ...state,
        cells: action.payload.cells
      };
    case puzzleTypes.PUZZLE_PARSED:
      return {
        ...state,
        loaded: true,
        meta: {
          ...state.meta,
          copyright: action.payload.meta.copyright,
          author: action.payload.meta.author,
          title: action.payload.meta.title,
          notes: action.payload.meta.notes
        },
        dimensions: {
          ...state.dimensions,
          width: action.payload.dimensions.width,
          height: action.payload.dimensions.height
        },
        cells: action.payload.cells,
        clues: {
          ...state.clues,
          across: action.payload.clues.across,
          down: action.payload.clues.down
        }
      };
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
        if (action.payload.includes(cell)) {
          const confirmed = cell.guess === cell.solution;
          return { ...cell, confirmed, checked: true };
        } else {
          return cell;
        }
      });
      return { ...state, cells: checkAnswerCells };
    case puzzleTypes.REVEAL_ANSWER:
      const revealSquareCells = state.cells.map(cell => {
        if (action.payload.includes(cell)) {
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
