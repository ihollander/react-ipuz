import { downloadTypes } from "../actionTypes/download";

import { puzzleActions } from "./puzzle";
import puzzleAdaptor from "../apis/PuzzleProxyAdaptor";

const downloadWSJ = date => {
  const request = () => puzzleActions.parsing();
  const success = buffer => puzzleActions.parseFile(buffer);
  const failure = () => ({ type: downloadTypes.DOWNLOAD_FAILURE });

  return dispatch => {
    dispatch(request());

    puzzleAdaptor
      .getWsj(date)
      .then(buffer => {
        dispatch(success(buffer));
      })
      .catch(error => {
        dispatch(failure());
      });
  };
};

const downloadWaPo = date => {
  const request = () => puzzleActions.parsing();
  const success = buffer => puzzleActions.parseFile(buffer);
  const failure = () => ({ type: downloadTypes.DOWNLOAD_FAILURE });

  return dispatch => {
    dispatch(request());

    puzzleAdaptor
      .getWaPo(date)
      .then(buffer => {
        dispatch(success(buffer));
      })
      .catch(error => {
        dispatch(failure());
      });
  };
};

const downloadPs = date => {
  const request = () => puzzleActions.parsing();
  const success = buffer => puzzleActions.parseFile(buffer);
  const failure = () => ({ type: downloadTypes.DOWNLOAD_FAILURE });

  return dispatch => {
    dispatch(request());

    puzzleAdaptor
      .getPs(date)
      .then(buffer => {
        dispatch(success(buffer));
      })
      .catch(error => {
        dispatch(failure());
      });
  };
};

export const downloadActions = {
  downloadWaPo,
  downloadWSJ,
  downloadPs
};
