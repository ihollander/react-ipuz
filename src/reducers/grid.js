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
      console.log('CELL_SELECTED', action.payload)
      return { ...state, selectedCellIndex: action.payload };
    case gridTypes.CELL_VALUE_CHANGED:
      console.log('CELL_VALUE_CHANGED', action.payload)
      const newCellValues = state.cells.map(cell =>
        cell.index === action.payload.index
          ? { ...cell, guess: action.payload.value }
          : cell
      );
      return { ...state, cells: newCellValues };
    default:
      return state;
  }
};
