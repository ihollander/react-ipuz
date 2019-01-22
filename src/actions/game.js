import { gameTypes } from "../actionTypes/game";
import gameAdaptor from "../apis/GameAdaptor";

import history from "../history";

// dispatch helpers
const gameRequest = () => ({ type: gameTypes.GAME_REQUEST_INITIATED });
const gameFailure = error => ({
  type: gameTypes.GAME_REQUEST_FAILED,
  payload: error
});
const gameFetched = game => ({
  type: gameTypes.GAME_FETCHED,
  payload: game
});
const gameJoined = game => ({
  type: gameTypes.GAME_JOINED,
  payload: game
});
const gamesFetched = games => ({
  type: gameTypes.GAMES_FETCHED,
  payload: games
});
const gameCreated = game => ({ type: gameTypes.GAME_CREATED, payload: game });
const gameUpdated = game => ({ type: gameTypes.GAME_UPDATED, payload: game})

// exported action creators
export const getGames = () => {
  return dispatch => {
    dispatch(gameRequest());

    gameAdaptor.getAll().then(
      games => {
        dispatch(gamesFetched(games));
      },
      error => {
        dispatch(gameFailure(error));
      }
    );
  };
};

export const getGame = id => {
  return dispatch => {
    dispatch(gameRequest());

    gameAdaptor.get(id).then(
      game => {
        const parsedGame = {
          ...game,
          puzzle: JSON.parse(game.puzzle)
        };
        dispatch(gameFetched(parsedGame));
      },
      error => {
        dispatch(gameFailure(error));
      }
    );
  };
};

export const joinGame = id => {
  return dispatch => {
    dispatch(gameRequest());

    gameAdaptor.join(id).then(
      game => {
        dispatch(gameJoined(game));
        history.push(`/game/${id}`);
      },
      error => {
        dispatch(gameFailure(error));
      }
    );
  };
};

export const updatePlayers = players => ({
  type: gameTypes.PLAYERS_UPDATED,
  payload: players
})

export const createGame = gameData => {
  return dispatch => {
    dispatch(gameRequest());

    gameAdaptor.create(gameData).then(
      response => {
        dispatch(gameCreated(response));
        history.push(`/game/${response.game.id}`);
      },
      error => {
        dispatch(gameFailure(error));
      }
    );
  };
};

export const updateGame = (puzzleId, gameData) => {
  return dispatch => {
    // dispatch(gameRequest());

    gameAdaptor.update(puzzleId, gameData).then(
      response => {
        dispatch(gameUpdated(response));
      },
      error => {
        dispatch(gameFailure(error));
      }
    );
  };
};

export const addGame = game => {
  return { type: gameTypes.GAME_CREATED, payload: game };
};

export const broadcastUpdateCell = (sharedGameId, index, value) => {
  // dispatch another action -> post setCellValue
  // response is handled by ActionCable component...
  gameAdaptor.updateCellValue(sharedGameId, {
    cell: {
      index,
      value
    }
  });
  return {
    type: "BROADCAST_UPDATE_CELL"
  };
};

export const updatePosition = (user, index, direction) => ({
  type: gameTypes.POSITION_UPDATED,
  payload: {
    user,
    index,
    direction
  }
});

export const broadcastUpdatePosition = (sharedGameId, index, direction) => {
  // dispatch another action -> post setCellValue
  // response is handled by ActionCable component...
  gameAdaptor.updatePosition(sharedGameId, {
    position: {
      index,
      direction
    }
  });
  return {
    type: "BROADCAST_UPDATE_POSITION"
  };
};

export const broadcastCheckAnswer = (sharedGameId, cells) => {
  gameAdaptor.checkAnswer(sharedGameId, { cells });
  return {
    type: "BROADCAST_CHECK_ANSWER"
  };
};

export const broadcastRevealAnswer = (sharedGameId, cells) => {
  gameAdaptor.revealAnswer(sharedGameId, { cells });
  return {
    type: "BROADCAST_REVEAL_ANSWER"
  };
};

export const pause = () => ({
  type: gameTypes.GAME_PAUSED
})

export const syncGame = gameData => ({
  type: gameTypes.GAME_DATA_RECEIVED,
  payload: gameData
})

// SAVE GAME ON PAUSE!
export const broadcastPaused = (sharedGameId, gameData) => {
  gameAdaptor.pause(sharedGameId, gameData);
  return {
    type: "BROADCAST_PAUSED"
  };
};

export const unpause = () => ({
  type: gameTypes.GAME_UNPAUSED
})

export const broadcastUnpaused = sharedGameId => {
  debugger
  gameAdaptor.unpause(sharedGameId);
  return {
    type: "BROADCAST_UNPAUSED"
  };
};