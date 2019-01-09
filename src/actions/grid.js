import { gridTypes } from "../actionTypes/grid";

const setSelectedCell = index => {
  return {
    type: gridTypes.CELL_SELECTED,
    payload: index
  }
}

const setSelectedCellValue = value => {
  return {
    type: gridTypes.CELL_VALUE_CHANGED,
    payload: value
  }
}

const toggleDirection = () => {
  return {
    type: gridTypes.TOGGLE_DIRECTION
  }
}

export const gridActions = {
  setSelectedCell,
  toggleDirection,
  setSelectedCellValue
};
