import { puzzleTypes } from "../actionTypes/puzzle";

import PuzReader from "../helpers/puzFile/PuzReader";
import PuzzleParser from "../helpers/PuzzleParser";


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

export const setCellValue = (index, value, username) => {
  return {
    type: puzzleTypes.CELL_VALUE_CHANGED,
    payload: { index, value, username }
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
