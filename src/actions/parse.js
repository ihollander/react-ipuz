import { parseTypes } from "../actionTypes/parse";
import history from "../history";

import PuzReader from "../helpers/puzFile/PuzReader";
import PuzzleParser from "../helpers/PuzzleParser";

const parsing = () => {
  return {
    type: parseTypes.PUZZLE_PARSING
  };
};

const parseFile = buffer => {
  const puzFile = new PuzReader(buffer);
  const parser = new PuzzleParser();
  parser.parsePuz(puzFile);
  const puzzle = parser.data;
  history.push("/");

  return {
    type: parseTypes.PUZZLE_PARSED,
    payload: puzzle
  };
};

const parseIpuz = json => {
  const parser = new PuzzleParser();
  parser.parseIpuz(json);
  const puzzle = parser.data;

  const iPuzTest = parser.convertToIpuz()
  console.log(iPuzTest)
  history.push("/");

  return {
    type: parseTypes.PUZZLE_PARSED,
    payload: puzzle
  };
};

export const parseActions = {
  parseFile,
  parseIpuz,
  parsing
};
