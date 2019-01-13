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
    case gridTypes.CHECK_ANSWER:
      const checkAnswerCells = state.cells.map(cell => {
        if (action.payload.includes(cell.index)) {
          const checked = cell.guess !== "";
          const confirmed = checked && cell.guess === cell.solution;
          if (checked) {
            return { ...cell, checked, confirmed };
          } else {
            return cell;
          }
        } else {
          return cell;
        }
      });
      return { ...state, cells: checkAnswerCells };
    case gridTypes.REVEAL_ANSWER:
      const revealSquareCells = state.cells.map(cell => {
        if (action.payload.includes(cell.index)) {
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
