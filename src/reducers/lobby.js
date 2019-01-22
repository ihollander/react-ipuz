import { gameTypes } from "../actionTypes/game";

const INITIAL_STATE = {
  games: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case gameTypes.GAME_REQUEST_INITIATED:
      return { ...state, loading: true };
    case gameTypes.GAME_REQUEST_FAILED:
      console.error("Game request failed:", action.payload);
      return { ...state, loading: false };
    case gameTypes.GAMES_FETCHED:
      return { ...state, games: action.payload, loading: false };
    case gameTypes.GAME_CREATED:
      const newGame = state.games.find(g => g.id === action.payload.game.id);
      return newGame
        ? state
        : {
            ...state,
            loading: false,
            games: [...state.games, action.payload.game]
          };
    case gameTypes.LOBBY_UPDATED:
      const updatedGames = state.games.map(game =>
        game.id === action.payload.game.id ? action.payload.game : game
      );
      return { ...state, games: updatedGames };
    default:
      return state;
  }
};
