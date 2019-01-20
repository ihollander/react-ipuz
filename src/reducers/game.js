import { authTypes } from "../actionTypes/auth";
import { statusTypes } from "../actionTypes/status";
import { puzzleTypes } from "../actionTypes/puzzle";
// game: { status keys, puzzleId, guesses: [{cell: guess, username, revealed, checked}], host: {username, selectedCell, selectedDirection}, guest: {username, selectedCell, selectedDirection} }

const INITIAL_STATE = {
  loaded: false,
  solved: false, // add as key to game in backend
  completed: false, // add as key to game in backend
  timer: 0, // add as key to game in backend
  paused: true, // add as key to game in backend
  rebus: false, // add as key to game in backend
  puzzleId: null,
  host: {
    username: "",
    selectedCellIndex: null,
    selectedDirection: "ACROSS",
    guesses: {} // { cellIndex: { guess, username, revealed, checked} }
  },
  guest: {
    username: "",
    selectedCellIndex: null,
    selectedDirection: "ACROSS",
    guesses: {} // { cellIndex: { guess, username, revealed, checked} }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case puzzleTypes.PUZZLE_PARSING:
      return INITIAL_STATE;
    case puzzleTypes.PUZZLE_PARSED:
      const selectedCellIndex = action.payload.grid.cells.find(
        c => c.type !== "BLACK"
      ).index;
      // auto-start timer?
      return {
        ...state,
        loaded: true,
        paused: false,
        host: { ...state.host, selectedCellIndex }
      };
    case statusTypes.TOGGLE_DIRECTION:
      const selectedDirection =
        state.host.selectedDirection === "ACROSS" ? "DOWN" : "ACROSS";
      return { ...state, host: { ...state.host, selectedDirection } };
    case statusTypes.CELL_SELECTED:
      return {
        ...state,
        host: { ...state.host, selectedCellIndex: action.payload }
      };
    case puzzleTypes.CELL_VALUE_CHANGED:
      const guessesAtIndex = state.host.guesses[action.payload.index]
        ? {
            ...state.host.guesses[action.payload.index],
            guess: action.payload.value
          }
        : { guess: action.payload.value };
      return {
        ...state,
        host: {
          ...state.host,
          guesses: {
            ...state.host.guesses,
            [action.payload.index]: guessesAtIndex
          }
        }
      };
    case puzzleTypes.CHECK_ANSWER:
      const checkedValues = Object.keys(action.payload).reduce((obj, index) => {
        const { confirmed, checked } = action.payload[index];
        obj[index] = state.host.guesses[index]
          ? {
              ...state.host.guesses[index],
              confirmed,
              checked
            }
          : { confirmed, checked };
        return obj;
      }, {});

      return {
        ...state,
        host: {
          ...state.host,
          guesses: { ...state.host.guesses, ...checkedValues }
        }
      };
    case puzzleTypes.REVEAL_ANSWER:
      const revealedValues = Object.keys(action.payload).reduce(
        (obj, index) => {
          const { revealed, guess } = action.payload[index];
          obj[index] = state.host.guesses[index]
            ? {
                ...state.host.guesses[index],
                revealed,
                guess
              }
            : { revealed, guess };
          return obj;
        },
        {}
      );
      
      return {
        ...state,
        host: {
          ...state.host,
          guesses: { ...state.host.guesses, ...revealedValues }
        }
      };
    case statusTypes.TOGGLE_REBUS:
      return { ...state, rebus: !state.rebus };
    case statusTypes.TOGGLE_PAUSED:
      return { ...state, paused: !state.paused };
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
