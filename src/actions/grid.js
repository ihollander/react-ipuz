import { gridTypes } from "../actionTypes/grid";

const setSelectedCell = index => {
  return {
    type: gridTypes.CELL_SELECTED,
    payload: index
  };
};

const setCellValue = (index, value) => {
  return {
    type: gridTypes.CELL_VALUE_CHANGED,
    payload: { index, value }
  };
};

const toggleDirection = () => {
  return {
    type: gridTypes.TOGGLE_DIRECTION
  };
};

const checkAnswer = (cellIndexArray) => {
  return {
    type: gridTypes.CHECK_ANSWER,
    payload: cellIndexArray
  }
}

const revealAnswer = cellIndexArray => {
  return {
    type: gridTypes.REVEAL_ANSWER,
    payload: cellIndexArray
  }
}

export const gridActions = {
  setSelectedCell,
  toggleDirection,
  setCellValue,
  checkAnswer,
  revealAnswer
};
