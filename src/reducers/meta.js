import { parseTypes } from "../actionTypes/parse";

const INITIAL_STATE = {
  copyright: "",
  author: "",
  title: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case parseTypes.PUZZLE_PARSED:
      const { copyright, author, title } = action.payload.meta;
      return {
        ...state,
        copyright,
        author,
        title
      };
    default:
      return state;
  }
};
