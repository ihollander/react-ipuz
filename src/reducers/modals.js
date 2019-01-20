import { statusTypes } from "../actionTypes/status";
import { downloadTypes } from "../actionTypes/download";
import { modalTypes } from "../actionTypes/modal";
import { authTypes } from "../actionTypes/auth";
import { puzzleTypes } from "../actionTypes/puzzle";

import { modals } from "../constants/modal";

const INITIAL_STATE = {
  activeModal: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case puzzleTypes.PUZZLE_PARSED:
      return { ...state, activeModal: modals.PUZZLE_READY };
    case modalTypes.SHOW_LOGIN:
      return { ...state, activeModal: modals.LOGIN };
    case modalTypes.SHOW_SIGNUP:
      return { ...state, activeModal: modals.SIGNUP };
    case authTypes.LOGIN_SUCCESS:
      return { ...state, activeModal: "" };
    case downloadTypes.DOWNLOAD_FAILURE:
      return { ...state, activeModal: modals.DOWNLOAD_ERROR };
    case statusTypes.TOGGLE_PAUSED:
      const pauseModal =
        state.activeModal === modals.PAUSED ? "" : modals.PAUSED;
      return { ...state, activeModal: pauseModal };
    case statusTypes.MARK_COMPLETED:
      return { ...state, activeModal: modals.PUZZLE_COMPLETED };
    case statusTypes.MARK_SOLVED:
      return { ...state, activeModal: modals.PUZZLE_SOLVED };
    case modalTypes.DISMISS_MODALS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
