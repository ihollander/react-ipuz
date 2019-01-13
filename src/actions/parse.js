import { parseTypes } from "../actionTypes/parse";
import history from '../history'
import PuzParser from '../helpers/puzFile/PuzParser'
import PuzReader from "../helpers/puzFile/PuzReader";

const parsing = () => {
  return {
    type: parseTypes.PUZZLE_PARSING
  }
}

const parseFile = buffer => {
  // send data to puzparser
  const puzFile = new PuzReader(buffer)
  const parser = new PuzParser(puzFile)
  const puzzle = parser.parse()
  debugger
  history.push('/')

  return {
    type: parseTypes.PUZZLE_PARSED,
    payload: puzzle
  }
}

export const parseActions = {
  parseFile,
  parsing
};
