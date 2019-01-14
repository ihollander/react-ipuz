import { puzzleTypes } from "../actionTypes/puzzle";

const INITIAL_STATE = {
  meta: {
    copyright: "",
    author: "",
    title: "",
    notes: ""
  },
  grid: {
    dimensions: {
      width: null,
      height: null
    },
    cells: []
  },
  clues: {
    across: null,
    down: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        grid: {
          ...state.grid,
          dimensions: {
            ...state.grid.dimensions,
            width: action.payload.grid.dimensions.width,
            height: action.payload.grid.dimensions.height
          },
          cells: action.payload.grid.cells
        },
        clues: {
          ...state.clues,
          across: action.payload.clues.across,
          down: action.payload.clues.down
        }
      };
    case puzzleTypes.CELL_VALUE_CHANGED:
      const newCellValues = state.grid.cells.map(cell =>
        cell.index === action.payload.index
          ? { ...cell, guess: action.payload.value }
          : cell
      );
      return {
        ...state,
        grid: {
          ...state.grid,
          cells: newCellValues
        }
      };
    case puzzleTypes.CHECK_ANSWER:
      const checkAnswerCells = state.grid.cells.map(cell => {
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
      return { ...state, grid: { ...state.grid, cells: checkAnswerCells } };
    case puzzleTypes.REVEAL_ANSWER:
      const revealSquareCells = state.grid.cells.map(cell => {
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
      return { ...state, grid: { ...state.grid, cells: revealSquareCells } };
    default:
      return state;
  }
};