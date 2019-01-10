import { parseTypes } from "../actionTypes/parse";
import { gridTypes } from "../actionTypes/grid";

const INITIAL_STATE = {
  cells: [],
  dimensions: null,
  selectedCellIndex: null,
  selectedDirection: "ACROSS"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case parseTypes.PUZZLE_PARSED:
      const selectedCellIndex = action.payload.grid.cells.find(
        cell => cell.type !== "BLACK"
      ).index;
      return {
        ...state,
        cells: action.payload.grid.cells,
        dimensions: action.payload.grid.dimensions,
        selectedCellIndex
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
          return cell;
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
              cell.clues.down === selectedCell.clues.down));
        const confirmed = checked && cell.guess === cell.solution;
        if (checked) {
          return { ...cell, checked, confirmed };
        } else {
          return cell;
        }
      });
      return { ...state, cells: checkWordCells };
    case gridTypes.CHECK_PUZZLE:
      const checkPuzzleCells = state.cells.map(cell => {
        const checked = cell.type !== "BLACK" && cell.guess !== "";
        const confirmed = checked && cell.guess === cell.solution;
        if (checked) {
          return { ...cell, checked, confirmed };
        } else {
          return cell;
        }
      });
      return { ...state, cells: checkPuzzleCells };
    case gridTypes.REVEAL_SQUARE:
      const revealSquareCells = state.cells.map(cell => {
        if (cell.index === state.selectedCellIndex) {
          return { ...cell, guess: cell.solution, revealed: true };
        } else {
          return cell;
        }
      });
      return { ...state, cells: revealSquareCells };
    case gridTypes.REVEAL_WORD:
      const getSelectedCell = state.cells.find(
        cell => cell.index === state.selectedCellIndex
      );
      const revealWordCells = state.cells.map(cell => {
        const revealed =
          cell.clues &&
          ((state.selectedDirection === "ACROSS" &&
            cell.clues.across === getSelectedCell.clues.across) ||
            (state.selectedDirection === "DOWN" &&
              cell.clues.down === getSelectedCell.clues.down));
        if (revealed) {
          return { ...cell, guess: cell.solution, revealed };
        } else {
          return cell;
        }
      });
      return { ...state, cells: revealWordCells };
    case gridTypes.REVEAL_PUZZLE:
      const revealPuzzleCells = state.cells.map(cell => {
        const revealed = cell.type !== "BLACK";
        if (revealed) {
          return { ...cell, guess: cell.solution, revealed };
        } else {
          return cell;
        }
      });
      return { ...state, cells: revealPuzzleCells };
    default:
      return state;
  }
};
