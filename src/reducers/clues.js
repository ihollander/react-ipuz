import { parseTypes } from "../actionTypes/parse";

const INITIAL_STATE = {
  across: null,
  down: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case parseTypes.PUZZLE_PARSED:
      return {
        ...state,
        across: action.payload.clues.across,
        down: action.payload.clues.down
      };
    default:
      return state;
  }
};
