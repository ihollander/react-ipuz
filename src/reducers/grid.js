import { parseTypes } from "../actionTypes/parse";
import { gridTypes } from "../actionTypes/grid";

const INITIAL_STATE = {
  cells: [],
  dimensions: null,
  selectedCellIndex: 0,
  selectedDirection: "ACROSS"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case parseTypes.PUZZLE_PARSED:
      return {
        ...state,
        cells: action.payload.grid.cells,
        dimensions: action.payload.grid.dimensions
      };
    case gridTypes.TOGGLE_DIRECTION:
      const selectedDirection =
        state.selectedDirection === "ACROSS" ? "DOWN" : "ACROSS";
      return { ...state, selectedDirection };
    case gridTypes.CELL_SELECTED:
      return { ...state, selectedCellIndex: action.payload };
    case gridTypes.CELL_VALUE_CHANGED:
      const newCellValues = state.cells.map(cell =>
        cell.index === action.payload.index
          ? { ...cell, guess: action.payload.value }
          : cell
      );
      return { ...state, cells: newCellValues };
    case gridTypes.CHECK_SQUARE:
      const checkSquareCells = state.cells.map(cell => {
        const checked =
          cell.guess !== "" && cell.index === state.selectedCellIndex;
        const confirmed = checked && cell.guess === cell.solution;
        if (checked) {
          return { ...cell, checked, confirmed };
        } else {
          return cell
        }
      });
      return { ...state, cells: checkSquareCells };
    case gridTypes.CHECK_WORD:
      const selectedCell = state.cells.find(
        cell => cell.index === state.selectedCellIndex
      );
      const checkWordCells = state.cells.map(cell => {
        const checked =
          cell.clues &&
          cell.guess !== "" &&
          ((state.selectedDirection === "ACROSS" &&
            cell.clues.across === selectedCell.clues.across) ||
            (state.selectedDirection === "DOWN" &&
              cell.clues.down === selectedCell.clues.across));
        const confirmed = checked && cell.guess === cell.solution;
        if (checked) {
          return { ...cell, checked, confirmed };
        } else {
          return cell
        }
      });
      return { ...state, cells: checkWordCells };
    case gridTypes.CHECK_PUZZLE:
      const checkPuzzleCells = state.cells.map(cell => {
        const checked =
          cell.type !== "BLACK" &&
          cell.guess !== "";
        const confirmed = checked && cell.guess === cell.solution;
        if (checked) {
          return { ...cell, checked, confirmed };
        } else {
          return cell
        }
      });
      return { ...state, cells: checkPuzzleCells };
    default:
      return state;
  }
};
