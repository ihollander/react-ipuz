import { statusTypes } from "../actionTypes/status";
import { downloadTypes } from "../actionTypes/download";

const INITIAL_STATE = {
  pausedModal: false,
  solvedModal: false,
  completedModal: false,
  downloadErrorModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case downloadTypes.DOWNLOAD_FAILURE:
      return { ...state, downloadErrorModal: true };
    case statusTypes.TOGGLE_PAUSED:
      return { ...state, pausedModal: !state.pausedModal };
    case statusTypes.MARK_COMPLETED:
      return { ...state, completedModal: true };
    case statusTypes.MARK_SOLVED:
      return { ...state, solvedModal: true };
    case statusTypes.DISMISS_ALL_MODALS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
