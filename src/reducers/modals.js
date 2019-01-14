import { statusTypes } from "../actionTypes/status";

const INITIAL_STATE = {
  pausedModal: false,
  solvedModal: false,
  completedModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case statusTypes.TOGGLE_PAUSED:
      return { ...state, pausedModal: !state.pausedModal };
    case statusTypes.MARK_COMPLETED:
      return { ...state, completedModal: true };
    case statusTypes.MARK_SOLVED:
      return { ...state, solvedModal: true };
    case "DISMISS_ALL":
      return INITIAL_STATE;
    default:
      return state;
  }
};
