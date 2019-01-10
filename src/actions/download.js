import { downloadTypes } from "../actionTypes/download";
import { parseTypes } from "../actionTypes/parse";
import PuzParse from "../helpers/PuzParse";
import IPuzParse from "../helpers/IPuzParse";

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
        const xword = new PuzParse(buffer);
        const ipuz = xword.toIPuz();
        const ipuzObj = JSON.parse(ipuz);
        console.log(ipuzObj)
        const puz = IPuzParse(ipuzObj);
        console.log(puz)
        dispatch(success(puz));
      })
      .catch(console.error);
  };
};

export const downloadActions = {
  downloadPuzzle
};
