import { puzzleTypes } from "../actionTypes/puzzle";
import history from "../history";

import PuzReader from "../helpers/puzFile/PuzReader";
import PuzzleParser from "../helpers/PuzzleParser";

const parsing = () => {
  return {
    type: puzzleTypes.PUZZLE_PARSING
  };
};

const parseFile = buffer => {
  const puzFile = new PuzReader(buffer);
  const parser = new PuzzleParser();
  parser.parsePuz(puzFile);
  const puzzle = parser.data;
  history.push("/");

  return {
    type: puzzleTypes.PUZZLE_PARSED,
    payload: puzzle
  };
};

const parseIpuz = json => {
  const parser = new PuzzleParser();
  parser.parseIpuz(json);
  const puzzle = parser.data;
  history.push("/");

  return {
    type: puzzleTypes.PUZZLE_PARSED,
    payload: puzzle
  };
};

const setCellValue = (index, value) => {
  return {
    type: puzzleTypes.CELL_VALUE_CHANGED,
    payload: { index, value }
  };
};

const checkAnswer = (cellIndexArray) => {
  return {
    type: puzzleTypes.CHECK_ANSWER,
    payload: cellIndexArray
  }
}

const revealAnswer = cellIndexArray => {
  return {
    type: puzzleTypes.REVEAL_ANSWER,
    payload: cellIndexArray
  }
}

export const puzzleActions = {
  parseFile,
  parseIpuz,
  parsing,
  setCellValue,
  checkAnswer,
  revealAnswer
};
