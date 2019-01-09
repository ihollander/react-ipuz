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
      const mappedCells = state.cells.map(cell =>
        cell.index === state.selectedCellIndex
          ? { ...cell, guess: action.payload }
          : cell
      );
      return { ...state, cells: mappedCells };
    default:
      return state;
  }
};
