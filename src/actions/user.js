import { userTypes } from "../actionTypes/user";
import puzzleAdaptor from "../apis/PuzzleAdaptor";
import PuzzleParser from "../helpers/PuzzleParser";

// helper, don't export
const parsePuzzleFromState = puzzleFromState => {
  const parser = new PuzzleParser();
    parser.parseState(puzzleFromState);
    const ipuz = parser.convertToIpuz();
    const cells = puzzleFromState.grid.cells.map(cell => {
      if (cell.revealed || cell.confirmed || cell.guess !== "") {
        return {...cell.revealed, ...cell.confirmed, ...cell.guess}
      } else {
        return {}
      }
    })
    return {
      puzzle: {
        ipuz,
        title: puzzleFromState.meta.title,
        cells: JSON.stringify(cells),
        timer: 0
      }
    };
}

const createPuzzle = puzzleFromState => {
  const request = () => ({ type: userTypes.PUZZLE_REQUEST });
  const success = puzzle => ({ type: userTypes.PUZZLE_SAVED, payload: puzzle });
  const failure = error => ({ type: userTypes.PUZZLE_FAILURE, payload: error });

  return dispatch => {
    dispatch(request());
    const createPuzzleObj = parsePuzzleFromState(puzzleFromState)

    puzzleAdaptor.create(createPuzzleObj).then(
      puzzle => {
        dispatch(success(puzzle));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const savePuzzle = (puzzleFromState, id) => {
  const request = () => ({ type: userTypes.PUZZLE_REQUEST });
  const success = puzzle => ({ type: userTypes.PUZZLE_SAVED, payload: puzzle });
  const failure = error => ({ type: userTypes.PUZZLE_FAILURE, payload: error });

  return dispatch => {
    dispatch(request());
    const createPuzzleObj = parsePuzzleFromState(puzzleFromState)

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


export const userActions = {
  createPuzzle,
  savePuzzle
};
