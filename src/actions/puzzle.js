import { puzzleTypes } from "../actionTypes/puzzle";

import PuzReader from "../helpers/puzFile/PuzReader";
import PuzzleParser from "../helpers/PuzzleParser";

// helper, don't export
// const parsePuzzleFromState = puzzleFromState => {
//   const parser = new PuzzleParser();
//   parser.parseState(puzzleFromState);
//   const ipuz = parser.convertToIpuz();
//   const cells = puzzleFromState.grid.cells.map(cell => {
//     if (cell.revealed || cell.checked || cell.guess !== "") {
//       return {
//         revealed: cell.revealed,
//         checked: cell.checked,
//         guess: cell.guess
//       };
//     } else {
//       return {};
//     }
//   });
//   return {
//     puzzle: {
//       ipuz,
//       title: puzzleFromState.meta.title,
//       cells: JSON.stringify(cells),
//       timer: 0
//     }
//   };
// };

// exported action creators
export const parsing = () => {
  return {
    type: puzzleTypes.PUZZLE_PARSING
  };
};

export const parseFile = buffer => {
  const puzFile = new PuzReader(buffer);
  const parser = new PuzzleParser();
  parser.parsePuz(puzFile);
  const puzzle = parser.data;

  return {
    type: puzzleTypes.PUZZLE_PARSED,
    payload: puzzle
  };

  // return (dispatch, getState) => {
  //   dispatch({
  //     type: puzzleTypes.PUZZLE_PARSED,
  //     payload: puzzle
  //   });

  //   // check if user is signed in
  //   // if user is signed in, find/create puzzle
  //   const isSignedIn = getState().auth.isSignedIn;

  //   if (isSignedIn) {
  //     const parsedPuzzle = parsePuzzleFromState(puzzle);
  //     puzzleAdaptor.create(parsedPuzzle).then(
  //       puzzleResponse => {
  //         // parse puzzle response
  //         const guessedCells = JSON.parse(puzzleResponse.cells);
  //         const mappedCells = puzzle.grid.cells.map((cell, index) => {
  //           const guessedCell = guessedCells[index];
  //           if (guessedCell.guess) {
  //             return {
  //               ...cell,
  //               guess: guessedCell.guess,
  //               revealed: guessedCell.revealed,
  //               confirmed: guessedCell.confirmed
  //             };
  //           } else {
  //             return cell;
  //           }
  //         });
  //         puzzle.grid.cells = mappedCells;
  //         puzzle.id = puzzleResponse.id;

  //         dispatch({
  //           type: statusTypes.SAVE_TIMER,
  //           payload: puzzleResponse.timer
  //         });

  //         dispatch({
  //           type: userTypes.PUZZLE_FETCHED,
  //           payload: puzzle
  //         });
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     );
  //   }

  //   history.push("/puzzle");
  // };
};

export const parseIpuz = json => {
  const parser = new PuzzleParser();
  parser.parseIpuz(json);
  const puzzle = parser.data;
  // history.push("/puzzle");

  return {
    type: puzzleTypes.PUZZLE_PARSED,
    payload: puzzle
  };
};

export const setCellValue = (index, value) => {
  return {
    type: puzzleTypes.CELL_VALUE_CHANGED,
    payload: { index, value }
  };
};

export const checkAnswer = cells => {
  return {
    type: puzzleTypes.CHECK_ANSWER,
    payload: cells
  };
};

export const revealAnswer = cells => {
  return {
    type: puzzleTypes.REVEAL_ANSWER,
    payload: cells
  };
};
