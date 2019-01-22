import puzzleAdaptor from "../apis/PuzzleProxyAdaptor";
import PuzReader from "../helpers/puzFile/PuzReader";
import PuzzleParser from "../helpers/PuzzleParser";

const parseBuffer = buffer => {
  const puzFile = new PuzReader(buffer);
  const parser = new PuzzleParser();
  parser.parsePuz(puzFile);
  return parser.data;
};

export const downloadNYT = date => {
  return puzzleAdaptor.getNYT(date).then(buffer => parseBuffer(buffer));
};

export const downloadWSJ = date => {
  return puzzleAdaptor.getWsj(date).then(buffer => parseBuffer(buffer));
};

export const downloadWaPo = date => {
  return puzzleAdaptor.getWaPo(date).then(buffer => parseBuffer(buffer));
};

export const downloadPs = date => {
  return puzzleAdaptor.getPs(date).then(buffer => parseBuffer(buffer));
};
