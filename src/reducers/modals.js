import { statusTypes } from "../actionTypes/status";
import { downloadTypes } from "../actionTypes/download";
import { modalTypes } from "../actionTypes/modal";
import { authTypes } from "../actionTypes/auth";
import { puzzleTypes } from "../actionTypes/puzzle";

import { modals } from "../constants/modal";
import { gameTypes } from "../actionTypes/game";

const INITIAL_STATE = {
  activeModal: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case puzzleTypes.PUZZLE_PARSED:
      return { ...state, activeModal: modals.PUZZLE_READY };
    case modalTypes.SHOW_LOGIN_MODAL:
      return { ...state, activeModal: modals.LOGIN };
    case modalTypes.SHOW_SIGNUP_MODAL:
      return { ...state, activeModal: modals.SIGNUP };
    case modalTypes.SHOW_PROFILE_MODAL:
      return { ...state, activeModal: modals.PROFILE };
    case modalTypes.SHOW_CREATE_GAME_MODAL:
      return { ...state, activeModal: modals.CREATE_GAME };
    case downloadTypes.DOWNLOAD_FAILURE:
      return { ...state, activeModal: modals.DOWNLOAD_ERROR };
    case gameTypes.GAME_PAUSED:
      return { ...state, activeModal: modals.PAUSED };
    case statusTypes.MARK_COMPLETED:
      return { ...state, activeModal: modals.PUZZLE_COMPLETED };
    case statusTypes.MARK_SOLVED:
      return { ...state, activeModal: modals.PUZZLE_SOLVED };
    case gameTypes.GAME_CREATED:
    case authTypes.LOGIN_SUCCESS:
    case gameTypes.GAME_UNPAUSED:
    case authTypes.PROFILE_UPDATE_SUCCESS:
    case modalTypes.DISMISS_MODALS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
