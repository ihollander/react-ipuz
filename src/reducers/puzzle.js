import { parseTypes } from "../actionTypes/parse";

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
    case parseTypes.PUZZLE_PARSED:
      return {
        ...state,
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
    default:
      return state;
  }
};
