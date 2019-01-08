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
    case gridTypes.CELL_SELECTED:
      // cell index in payload
      // optionally toggle selected direction
      let selectedDirection = state.selectedDirection
      if (action.payload === state.selectedCellIndex) {
        selectedDirection = state.selectedDirection === "ACROSS" ? "DOWN" : "ACROSS"
      }
    return {...state, selectedCellIndex: action.payload, selectedDirection}
      // let selectedClue,
      //     selectedDirection = state.selectedDirection
      // const cell = action.payload
      
      // if (state.selectedDirection === "ACROSS") {
      //   // find clue from across
      //   selectedClue = state.across.find(clue => clue.label === cell.clues.across).label
      // } else {
      //   selectedClue = state.down.find(clue => clue.label === cell.clues.down).label
      // }
    
      // // set the cell selected based on index value from payload
      // const selectedCells = state.cells.map(cell =>
      //   cell === action.payload
      //     ? { ...cell, selected: true }
      //     : { ...cell, selected: false }
      // );
    default:
      return state;
  }
};
