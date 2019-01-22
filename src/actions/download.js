import { downloadTypes } from "../actionTypes/download";

import PuzReader from "../helpers/puzFile/PuzReader";
import PuzzleParser from "../helpers/PuzzleParser";

import puzzleAdaptor from "../apis/PuzzleProxyAdaptor";

import { createGame } from "./game";

// dispatch helpers
const downloadRequest = () => ({
  type: downloadTypes.DOWNLOAD_REQUEST
});

const downloadSuccess = gameObj => createGame(gameObj);

const downloadFailure = error => ({
  type: downloadTypes.DOWNLOAD_FAILURE,
  payload: error
});

// parse helpers
const parseBuffer = buffer => {
  const puzFile = new PuzReader(buffer);
  const parser = new PuzzleParser();
  parser.parsePuz(puzFile);
  const gameObj = {
    game: {
      title: parser.data.meta.title,
      puzzle: JSON.stringify(parser.data),
      timer: 0,
      solved: 0,
      active: true
    }
  };
  return gameObj;
};

// exported action creators
export const downloadToday = () => {
  return dispatch => {
    dispatch(downloadRequest());

    puzzleAdaptor
      .getToday()
      .then(buffer => {
        const gameObj = parseBuffer(buffer);
        dispatch(downloadSuccess(gameObj));
      })
      .catch(error => {
        dispatch(downloadFailure(error));
      });
  };
};

export const downloadNYT = date => {
  return dispatch => {
    dispatch(downloadRequest());

    puzzleAdaptor
      .getNYT(date)
      .then(buffer => {
        const gameObj = parseBuffer(buffer);
        dispatch(downloadSuccess(gameObj));
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
        const gameObj = parseBuffer(buffer);
        dispatch(downloadSuccess(gameObj));
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
        const gameObj = parseBuffer(buffer);
        dispatch(downloadSuccess(gameObj));
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
        const gameObj = parseBuffer(buffer);
        dispatch(downloadSuccess(gameObj));
      })
      .catch(error => {
        dispatch(downloadFailure(error));
      });
  };
};
