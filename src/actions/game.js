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
const gameUpdated = game => ({ type: gameTypes.GAME_UPDATED, payload: game });

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

export const getGame = gameId => {
  return dispatch => {
    dispatch(gameRequest());
    dispatch({
      type: gameTypes.CLEAR_GAME_STATE
    })

    gameAdaptor.get(gameId).then(
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

export const joinGame = gameId => {
  return dispatch => {
    dispatch(gameRequest());

    gameAdaptor.join(gameId).then(
      game => {
        dispatch(gameJoined(game));
        history.push(`/game/${gameId}`);
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
});

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

export const updateGame = (gameId, gameData) => {
  return dispatch => {
    // dispatch(gameRequest());

    gameAdaptor.update(gameId, gameData).then(
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

export const broadcastUpdateCell = (gameId, index, value) => {
  // dispatch another action -> post setCellValue
  // response is handled by ActionCable component...
  gameAdaptor.updateCellValue(gameId, {
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

export const broadcastUpdatePosition = (gameId, index, direction) => {
  // response is handled by ActionCable component...
  gameAdaptor.updatePosition(gameId, {
    position: {
      index,
      direction
    }
  });
  return {
    type: "BROADCAST_UPDATE_POSITION"
  };
};

export const broadcastCheckAnswer = (gameId, cells) => {
  gameAdaptor.checkAnswer(gameId, { cells });
  return {
    type: "BROADCAST_CHECK_ANSWER"
  };
};

export const broadcastRevealAnswer = (gameId, cells) => {
  gameAdaptor.revealAnswer(gameId, { cells });
  return {
    type: "BROADCAST_REVEAL_ANSWER"
  };
};

export const pause = () => ({
  type: gameTypes.GAME_PAUSED
});

export const syncGame = gameData => ({
  type: gameTypes.GAME_DATA_RECEIVED,
  payload: gameData
});

// SAVE GAME ON PAUSE!
export const broadcastPaused = (gameId, gameData) => {
  gameAdaptor.pause(gameId, gameData);
  return {
    type: "BROADCAST_PAUSED"
  };
};

export const unpause = () => ({
  type: gameTypes.GAME_UNPAUSED
});

export const broadcastUnpaused = gameId => {
  gameAdaptor.unpause(gameId);
  return {
    type: "BROADCAST_UNPAUSED"
  };
};

export const setActivePlayer = (player, active) => ({
  type: gameTypes.PLAYER_ACTIVE_UPDATED,
  payload: { player, active }
});

export const updateLobbyGames = gameData => ({
  type: gameTypes.LOBBY_UPDATED,
  payload: gameData
})

export const broadcastDeleteGame = gameId => {
  gameAdaptor.delete(gameId)
  return {
    type: "BROADCAST_DELETE_GAME"
  }
}

export const deleteGame = gameId => ({
  type: gameTypes.GAME_REMOVED,
  payload: gameId
})