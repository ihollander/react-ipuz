import { authTypes } from "../actionTypes/auth";
import { statusTypes } from "../actionTypes/status";
import { gameTypes } from "../actionTypes/game";

const INITIAL_STATE = {
  loaded: false,
  puzzleId: null,
  solved: false, // add as key to game in backend
  timer: 0, // add as key to game in backend
  paused: true,
  rebus: false,
  host: {
    username: "",
    selectedCellIndex: null,
    selectedDirection: "ACROSS"
  },
  guest: {
    username: "",
    selectedCellIndex: null,
    selectedDirection: "ACROSS"
  }
};

const findUser = (state, username) => {
  if (state.host.username === username) {
    return "host";
  } else if (state.guest.username === username) {
    return "guest";
  } else {
    // throw error
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case gameTypes.GAME_FETCHED:
      const selectedCellIndex = action.payload.puzzle.cells.find(
        c => c.type !== "BLACK"
      ).index;
      return {
        ...state,
        loaded: true,
        paused: false,
        timer: action.payload.timer,
        puzzleId: action.payload.id,
        solved: action.payload.solved === 1,
        host: {
          ...state.host,
          username: action.payload.host_id.username,
          selectedCellIndex
        },
        guest: {
          ...state.guest,
          username: action.payload.guest_id
            ? action.payload.guest_id.username
            : null,
          selectedCellIndex
        }
      };
    case gameTypes.PLAYERS_UPDATED:
      return {
        ...state,
        host: { ...state.host, username: action.payload.players.host },
        guest: { ...state.guest, username: action.payload.players.guest }
      };
    case gameTypes.GAME_DATA_RECEIVED:
      return { ...state, timer: action.payload.game.timer };
    case gameTypes.GAME_JOINED:
      return {
        ...state,
        host: { ...state.host, username: action.payload.host_id.username },
        guest: { ...state.guest, username: action.payload.guest_id.username }
      };
    case gameTypes.POSITION_UPDATED:
      const updatePositionFor = findUser(state, action.payload.user.username);
      debugger;
      return updatePositionFor
        ? {
            ...state,
            [updatePositionFor]: {
              ...state[updatePositionFor],
              selectedDirection: action.payload.direction,
              selectedCellIndex: action.payload.index
            }
          }
        : state;
    case statusTypes.TOGGLE_REBUS:
      return { ...state, rebus: !state.rebus };
    case gameTypes.GAME_PAUSED:
      return { ...state, paused: true };
    case gameTypes.GAME_UNPAUSED:
      return { ...state, paused: false };
    case statusTypes.MARK_COMPLETED:
      return { ...state, completed: true };
    case statusTypes.UNMARK_COMPLETED:
      return { ...state, completed: false, solved: false };
    case statusTypes.MARK_SOLVED:
      return { ...state, solved: true, completed: true };
    case statusTypes.SAVE_TIMER:
      return { ...state, timer: action.payload };
    case statusTypes.RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
