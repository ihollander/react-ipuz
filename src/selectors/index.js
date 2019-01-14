import { createSelector } from "reselect";

const getCells = state => state.grid.cells;
const getSelectedCellIndex = state => state.grid.selectedCellIndex;
const getClues = state => state.clues;
const getSelectedDirection = state => state.grid.selectedDirection;

export const getSelectedCell = createSelector(
  [getCells, getSelectedCellIndex],
  (cells, selectedCellIndex) => cells.find(c => c.index === selectedCellIndex)
);

export const getSelectedClue = createSelector(
  [getClues, getSelectedDirection, getSelectedCell],
  (clues, selectedDirection, selectedCell) => {
    if (clues && clues.across && clues.down) {
      if (selectedDirection === "ACROSS") {
        return clues.across[selectedCell.clues.across];
      } else {
        return clues.down[selectedCell.clues.down];
      }
    }
  }
);
