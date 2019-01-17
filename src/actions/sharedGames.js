import sharedGameAdaptor from "../apis/SharedGameAdaptor";
import { sharedGameTypes } from "../actionTypes/sharedGame";
import { puzzleTypes } from "../actionTypes/puzzle";
import history from "../history";
import PuzzleParser from "../helpers/PuzzleParser";

const parsePuzzleResponse = puzzle => {
  const parser = new PuzzleParser();
  parser.parseIpuz(puzzle.ipuz);
  const parsedPuzzle = parser.data;
  // map thru cells
  const guessedCells = JSON.parse(puzzle.cells);
  parsedPuzzle.grid.cells.forEach((cell, index) => {
    const guessedCell = guessedCells[index];
    if (guessedCell.guess) {
      cell.guess = guessedCell.guess;
      cell.revealed = guessedCell.revealed;
      cell.checked = guessedCell.checked;
    }
  });
  return { ...parsedPuzzle, id: puzzle.id };
};

const getSharedGame = id => {
  return dispatch => {
    dispatch({
      type: sharedGameTypes.GET_GAME_REQUEST
    });

    sharedGameAdaptor.get(id).then(
      response => {
        history.push(`/shared/${response.id}`);
        const parsedResponse = parsePuzzleResponse(response.puzzle);
        dispatch({
          type: sharedGameTypes.GET_GAME_SUCCESS,
          payload: response
        });
        dispatch({
          type: puzzleTypes.PUZZLE_PARSED,
          payload: parsedResponse
        });
      },
      error => {
        dispatch({
          type: sharedGameTypes.GET_GAME_ERROR,
          payload: error
        });
      }
    );
  };
};

const createSharedGame = puzzleId => {
  return dispatch => {
    dispatch({
      type: sharedGameTypes.CREATE_GAME_REQUEST
    });

    sharedGameAdaptor.create(puzzleId).then(
      response => {
        history.push(`/shared/${response.id}`);
        dispatch({
          type: sharedGameTypes.CREATE_GAME_SUCCESS,
          payload: response
        });
      },
      error => {
        dispatch({
          type: sharedGameTypes.CREATE_GAME_ERROR,
          payload: error
        });
      }
    );
  };
};

const broadcastUpdateCell = (sharedGameId, index, value) => {
  // dispatch another action -> post setCellValue
  // response is handled by ActionCable component...
  sharedGameAdaptor.updateCellValue(sharedGameId, {
    cell: {
      index,
      value
    }
  });
  return {
    type: "BROADCAST_UPDATE_CELL"
  };
};

const broadcastUpdatePosition = (sharedGameId, index) => {
  // dispatch another action -> post setCellValue
  // response is handled by ActionCable component...
  sharedGameAdaptor.updatePosition(sharedGameId, {
    position: {
      index
    }
  });
  return {
    type: "BROADCAST_UPDATE_POSITION"
  };
};

const updateSharedPosition = index => {
  return {
    type: sharedGameTypes.SHARED_GAME_POSITION_UPDATE,
    payload: index
  };
};

export const sharedGameActions = {
  createSharedGame,
  getSharedGame,
  broadcastUpdateCell,
  broadcastUpdatePosition,
  updateSharedPosition
};
