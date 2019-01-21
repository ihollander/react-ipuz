import { userTypes } from "../actionTypes/user";
import { puzzleTypes } from "../actionTypes/puzzle";
import history from "../history";
import puzzleAdaptor from "../apis/PuzzleAdaptor";
import PuzzleParser from "../helpers/PuzzleParser";

// helpers: move to separate file
const parsePuzzleFromState = (puzzleFromState, timer) => {
  const parser = new PuzzleParser();
  parser.parseState(puzzleFromState);
  const ipuz = parser.convertToIpuz();
  const cells = puzzleFromState.cells.map(cell => {
    if (cell.revealed || cell.checked || cell.guess !== "") {
      return {
        revealed: cell.revealed,
        checked: cell.checked,
        guess: cell.guess
      };
    } else {
      return {};
    }
  });
  return {
    puzzle: {
      ipuz,
      title: puzzleFromState.meta.title,
      cells: JSON.stringify(cells),
      timer: timer ? timer : 0
    }
  };
};

const parsePuzzleResponse = puzzle => {
  const parser = new PuzzleParser();
  parser.parseIpuz(puzzle.ipuz);
  const parsedPuzzle = parser.data;
  // map thru cells
  const guessedCells = JSON.parse(puzzle.cells);
  parsedPuzzle.cells.forEach((cell, index) => {
    const guessedCell = guessedCells[index];
    if (guessedCell.guess) {
      cell.guess = guessedCell.guess;
      cell.revealed = guessedCell.revealed;
      cell.checked = guessedCell.checked;
    }
  });
  return { ...parsedPuzzle, id: puzzle.id };
};

// dispatch helpers
const puzzleRequest = () => ({ type: userTypes.GAME_FETCH_REQUEST });
const puzzleSaved = puzzle => ({
  type: userTypes.GAME_SAVED,
  payload: puzzle
});
const puzzleFetched = puzzle => ({
  type: userTypes.GAME_FETCHED,
  payload: puzzle
});
const puzzlesFetched = puzzles => ({
  type: userTypes.GAMES_FETCHED,
  payload: puzzles
});
const puzzleFailure = error => ({
  type: userTypes.GAME_FETCH_FAILURE,
  payload: error
});

// exported action creators
export const newPuzzle = puzzleFromState => {
  return dispatch => {
    dispatch(puzzleRequest());
    const createPuzzleObj = parsePuzzleFromState(puzzleFromState);

    puzzleAdaptor.create(createPuzzleObj).then(
      puzzle => {
        const parsedResponse = parsePuzzleResponse(puzzle);
        dispatch(puzzleFetched(parsedResponse));
        history.push(`/puzzle/${puzzle.id}`);
      },
      error => {
        dispatch(puzzleFailure(error));
      }
    );
  };
};

export const savePuzzle = (puzzleFromState, id, timer) => {
  return dispatch => {
    dispatch(puzzleRequest());
    const createPuzzleObj = parsePuzzleFromState(puzzleFromState, timer);

    puzzleAdaptor.update(createPuzzleObj, id).then(
      puzzle => {
        dispatch(puzzleFetched(puzzle));
      },
      error => {
        dispatch(puzzleFailure(error));
      }
    );
  };
};

export const loadPuzzle = id => {
  return dispatch => {
    dispatch(puzzleRequest());

    puzzleAdaptor.get(id).then(
      puzzle => {
        dispatch({ type: puzzleTypes.PUZZLE_PARSING });
        const parsedResponse = parsePuzzleResponse(puzzle);
        dispatch({
          type: puzzleTypes.PUZZLE_PARSED,
          payload: parsedResponse
        });
        dispatch(puzzleFetched(parsedResponse));
        history.push("/puzzle");
      },
      error => {
        dispatch(puzzleFailure(error));
      }
    );
  };
};

export const getSavedPuzzles = () => {
  return dispatch => {
    dispatch(puzzleRequest());

    puzzleAdaptor.getAll().then(
      puzzles => {
        dispatch(puzzlesFetched(puzzles));
      },
      error => {
        dispatch(puzzleFailure(error));
      }
    );
  };
};
