import { createSelector } from "reselect";

const getCells = state => state.puzzle.grid.cells;
const getSelectedCellIndex = state => state.status.selectedCellIndex;
const getClues = state => state.puzzle.clues;
const getSelectedDirection = state => state.status.selectedDirection;

export const getSelectedCell = createSelector(
  [getCells, getSelectedCellIndex],
  (cells, selectedCellIndex) => cells.find(c => c.index === selectedCellIndex)
);

export const getSelectedClue = createSelector(
  [getClues, getSelectedDirection, getSelectedCell],
  (clues, selectedDirection, selectedCell) => {
    if (selectedCell && clues && clues.across && clues.down) {
      if (selectedDirection === "ACROSS") {
        return clues.across[selectedCell.clues.across];
      } else {
        return clues.down[selectedCell.clues.down];
      }
    }
  }
);
