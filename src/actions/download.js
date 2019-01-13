import { downloadTypes } from "../actionTypes/download";
import { parseTypes } from "../actionTypes/parse";
import PuzReader from "../helpers/puzFile/PuzReader";
import PuzParser from "../helpers/puzFile/PuzParser";
import IPuzParse from "../helpers/ipuzFile/IPuzParser";
import history from '../history'

const downloadWSJ = date => {
  const request = () => ({ type: downloadTypes.PUZZLE_DOWNLOADING });
  const success = puz => ({ type: parseTypes.PUZZLE_PARSED, payload: puz });

  return dispatch => {
    dispatch(request);

    fetch(`http://localhost:4000/api/v1/puzzle_proxy/wsj/${date}`)
      .then(response => {
        if (response.ok) {
          return response.arrayBuffer();
        } else {
          throw response;
        }
      })
      .then(buffer => {
        const puzFile = new PuzReader(buffer)
        const parser = new PuzParser(puzFile)
        const ipuz = parser.toIPuz()
        const ipuzObj = JSON.parse(ipuz)
        const puz = IPuzParse(ipuzObj);
        dispatch(success(puz));
        history.push("/")
      })
      .catch(console.error);
  };
}

const downloadPuzzle = url => {
  const request = () => ({ type: downloadTypes.PUZZLE_DOWNLOADING });
  const success = puz => ({ type: parseTypes.PUZZLE_PARSED, payload: puz });

  return dispatch => {
    dispatch(request);

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.arrayBuffer();
        } else {
          throw response;
        }
      })
      .then(buffer => {
        const puzFile = new PuzReader(buffer)
        const parser = new PuzParser(puzFile)
        const ipuz = parser.toIPuz()
        const ipuzObj = JSON.parse(ipuz)
        const puz = IPuzParse(ipuzObj);
        dispatch(success(puz));
        history.push("/")
      })
      .catch(console.error);
  };
};

export const downloadActions = {
  downloadPuzzle,
  downloadWSJ
};
