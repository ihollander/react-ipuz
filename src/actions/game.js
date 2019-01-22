import { gameTypes } from "../actionTypes/game";
import gameAdaptor from "../apis/GameAdaptor";

import history from '../history'

// dispatch helpers
const gameRequest = () => ({ type: gameTypes.GAME_REQUEST_INITIATED });
const gameFailure = error => ({
  type: gameTypes.GAME_REQUEST_FAILED,
  payload: error
});
const gameFetched = game => ({
  type: gameTypes.GAME_FETCHED,
  payload: game
})
const gameJoined = game => ({
  type: gameTypes.GAME_JOINED,
  payload: game
})
const gamesFetched = games => ({
  type: gameTypes.GAMES_FETCHED,
  payload: games
});
const gameCreated = game => ({ type: gameTypes.GAME_CREATED, payload: game });

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
        }
        dispatch(gameFetched(parsedGame));
      },
      error => {
        dispatch(gameFailure(error));
      }
    );
  }
}

export const joinGame = id => {
  return dispatch => {
    dispatch(gameRequest());

    gameAdaptor.join(id).then(
      game => {
        dispatch(gameJoined(game));
        history.push(`/game/${id}`)
      },
      error => {
        dispatch(gameFailure(error));
      }
    );
  }
}

export const createGame = gameData => {
  return dispatch => {
    dispatch(gameRequest());

    gameAdaptor.create(gameData).then(
      response => {
        debugger
        dispatch(gameCreated(response));
        history.push(`/game/${response.game.id}`)
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
})

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