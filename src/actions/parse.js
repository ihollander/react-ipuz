import { parseTypes } from "../actionTypes/parse";
import history from '../history'
import IPuzParse from '../helpers/IPuzParse'

const parsing = () => {
  return {
    type: parseTypes.PUZZLE_PARSING
  }
}

const parseIpuz = ipuz => {
  const puzzleObj = IPuzParse(ipuz)

  history.push('/')
  return {
    type: parseTypes.PUZZLE_PARSED,
    payload: puzzleObj
  };
};

export const parseActions = {
  parseIpuz,
  parsing
};
