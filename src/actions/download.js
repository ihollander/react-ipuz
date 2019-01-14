import { downloadTypes } from "../actionTypes/download";
import { parseActions } from "./parse";
import puzzleAdaptor from "../apis/PuzzleProxyAdaptor";

const downloadWSJ = date => {
  return dispatch => {
    dispatch({ type: downloadTypes.DOWNLOAD_REQUEST });

    puzzleAdaptor
      .getWsj(date)
      .then(buffer => {
        dispatch(parseActions.parseFile(buffer));
      })
      .catch(console.error);
  };
};

const downloadWaPo = date => {
  return dispatch => {
    dispatch({ type: downloadTypes.DOWNLOAD_REQUEST });

    puzzleAdaptor
      .getWaPo(date)
      .then(buffer => {
        dispatch(parseActions.parseFile(buffer));
      })
      .catch(console.error);
  };
};

const downloadPs = date => {
  return dispatch => {
    dispatch({ type: downloadTypes.DOWNLOAD_REQUEST });

    puzzleAdaptor
      .getPs(date)
      .then(buffer => {
        dispatch(parseActions.parseFile(buffer));
      })
      .catch(console.error);
  };
};

export const downloadActions = {
  downloadWaPo,
  downloadWSJ,
  downloadPs
};
