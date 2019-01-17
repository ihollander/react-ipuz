import { sharedGameTypes } from "../actionTypes/sharedGame";

const INITIAL_STATE = {
  sharedGameId: null,
  selectedCellIndex: null,
  selectedDirection: "ACROSS"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case sharedGameTypes.CREATE_GAME_SUCCESS:
      // load cursor position
      return { ...state, sharedGameId: action.payload.id };
    case sharedGameTypes.GET_GAME_SUCCESS:
      // load cursor position
      return { ...state, sharedGameId: action.payload.id };
    case sharedGameTypes.SHARED_GAME_POSITION_UPDATE:
      return { ...state, selectedCellIndex: action.payload.index };
    default:
      return state;
  }
};
