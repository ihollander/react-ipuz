import { gridTypes } from "../actionTypes/grid";

const setSelectedCell = index => {
  return {
    type: gridTypes.CELL_SELECTED,
    payload: index
  }
}

export const gridActions = {
  setSelectedCell
};
