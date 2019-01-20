import { downloadTypes } from "../actionTypes/download";

import { parseFile } from "./puzzle";

import puzzleAdaptor from "../apis/PuzzleProxyAdaptor";

// dispatch helpers
const downloadRequest = () => ({ 
  type: downloadTypes.DOWNLOAD_REQUEST 
});

const downloadSuccess = buffer => {
  return parseFile(buffer); // trigger puzzle parser
};

const downloadFailure = error => ({
  type: downloadTypes.DOWNLOAD_FAILURE,
  payload: error
});

// exported action creators
export const downloadToday = () => {
  return dispatch => {
    dispatch(downloadRequest());

    puzzleAdaptor
      .getToday()
      .then(buffer => {
        dispatch(downloadSuccess(buffer));
      })
      .catch(error => {
        dispatch(downloadFailure(error));
      });
  };
};

export const downloadWSJ = date => {
  return dispatch => {
    dispatch(downloadRequest());

    puzzleAdaptor
      .getWsj(date)
      .then(buffer => {
        dispatch(downloadSuccess(buffer));
      })
      .catch(error => {
        dispatch(downloadFailure(error));
      });
  };
};

export const downloadWaPo = date => {
  return dispatch => {
    dispatch(downloadRequest());

    puzzleAdaptor
      .getWaPo(date)
      .then(buffer => {
        dispatch(downloadSuccess(buffer));
      })
      .catch(error => {
        dispatch(downloadFailure(error));
      });
  };
};

export const downloadPs = date => {
  return dispatch => {
    dispatch(downloadRequest());

    puzzleAdaptor
      .getPs(date)
      .then(buffer => {
        dispatch(downloadSuccess(buffer));
      })
      .catch(error => {
        dispatch(downloadFailure(error));
      });
  };
};
