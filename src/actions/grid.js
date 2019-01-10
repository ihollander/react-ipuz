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

const checkSquare = () => {
  return {
    type: gridTypes.CHECK_SQUARE
  }
}
const checkWord = () => {
  return {
    type: gridTypes.CHECK_WORD
  }
}
const checkPuzzle = () => {
  return {
    type: gridTypes.CHECK_PUZZLE
  }
}

const revealSquare = () => {
  return {
    type: gridTypes.REVEAL_SQUARE
  }
}
const revealWord = () => {
  return {
    type: gridTypes.REVEAL_WORD
  }
}
const revealPuzzle = () => {
  return {
    type: gridTypes.REVEAL_PUZZLE
  }
}

export const gridActions = {
  setSelectedCell,
  toggleDirection,
  setCellValue,
  checkSquare,
  checkWord,
  checkPuzzle,
  revealSquare,
  revealWord,
  revealPuzzle
};
