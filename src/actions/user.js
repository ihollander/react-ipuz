import { userTypes } from "../actionTypes/user";
import { puzzleTypes } from "../actionTypes/puzzle";
import history from "../history";
import puzzleAdaptor from "../apis/PuzzleAdaptor";
import PuzzleParser from "../helpers/PuzzleParser";

// helper, don't export
const parsePuzzleFromState = (puzzleFromState, timer) => {
  const parser = new PuzzleParser();
  parser.parseState(puzzleFromState);
  const ipuz = parser.convertToIpuz();
  const cells = puzzleFromState.grid.cells.map(cell => {
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

const createPuzzle = puzzleFromState => {
  const request = () => ({ type: userTypes.PUZZLE_REQUEST });
  const success = puzzle => ({ type: userTypes.PUZZLE_SAVED, payload: puzzle });
  const failure = error => ({ type: userTypes.PUZZLE_FAILURE, payload: error });

  return dispatch => {
    dispatch(request());
    const createPuzzleObj = parsePuzzleFromState(puzzleFromState);

    puzzleAdaptor.create(createPuzzleObj).then(
      puzzle => {
        // parse puzzle response
        const parsedResponse = parsePuzzleResponse(puzzle);
        dispatch(success(parsedResponse));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const savePuzzle = (puzzleFromState, id, timer) => {
  const request = () => ({ type: userTypes.PUZZLE_REQUEST });
  const success = puzzle => ({ type: userTypes.PUZZLE_SAVED, payload: puzzle });
  const failure = error => ({ type: userTypes.PUZZLE_FAILURE, payload: error });

  return dispatch => {
    dispatch(request());
    const createPuzzleObj = parsePuzzleFromState(puzzleFromState, timer);

    debugger
    puzzleAdaptor.update(createPuzzleObj, id).then(
      puzzle => {
        dispatch(success(puzzle));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const loadPuzzle = id => {
  const request = () => ({ type: userTypes.PUZZLE_REQUEST });
  const success = puzzle => ({
    type: userTypes.PUZZLE_FETCHED,
    payload: puzzle
  });
  const failure = error => ({ type: userTypes.PUZZLE_FAILURE, payload: error });

  return dispatch => {
    dispatch(request());

    puzzleAdaptor.get(id).then(
      puzzle => {
        const parsedResponse = parsePuzzleResponse(puzzle);
        
        dispatch({
          type: puzzleTypes.PUZZLE_PARSED,
          payload: parsedResponse
        });
        dispatch(success(parsedResponse));
        history.push("/puzzle");
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const getSavedPuzzles = () => {
  const request = () => ({ type: userTypes.PUZZLE_REQUEST });
  const success = puzzles => ({
    type: userTypes.PUZZLES_FETCHED,
    payload: puzzles
  });
  const failure = error => ({ type: userTypes.PUZZLE_FAILURE, payload: error });

  return dispatch => {
    dispatch(request());

    puzzleAdaptor.getAll().then(
      puzzles => {
        dispatch(success(puzzles));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

export const userActions = {
  createPuzzle,
  savePuzzle,
  loadPuzzle,
  getSavedPuzzles
};
