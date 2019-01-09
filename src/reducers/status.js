const INITIAL_STATE = {
  solved: false,
  completed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MARK_COMPLETED":
      return { ...state, completed: true };
    case "UNMARK_COMPLETED":
      return { ...state, completed: false, solved: false };
    case "MARK_SOLVED":
      return { ...state, solved: true, completed: true };
    default:
      return state;
  }
};
