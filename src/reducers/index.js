import { combineReducers } from "redux";
import status from "../reducers/status";
import auth from "../reducers/auth";
import user from "../reducers/user";
import puzzle from "../reducers/puzzle";
import modals from "../reducers/modals";
import sharedGame from "../reducers/sharedGame";

import game from '../reducers/game'

// new store:
// puzzle: only information from parsed puzzle; should be able to render a puzzle without any other keys
// ESPECIALLY game cells
// auth: user / isSignedIn
// game: { status keys, puzzleId, guesses: [{cell: guess, username, revealed, checked}], host: {username, selectedCell, selectedDirection}, guest: {username, selectedCell, selectedDirection} }
// modals: what modal(s) to display
// savedGames: [{savedGameId, savedGameTitle...}]

export default combineReducers({
  // status,
  auth,
  user,
  puzzle,
  modals,
  game,
  sharedGame
});
