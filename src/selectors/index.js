import { createSelector } from "reselect";

const getCells = state => state.puzzle.grid.cells;
const getClues = state => state.puzzle.clues;

const getSelectedCellIndex = state => state.game.host.selectedCellIndex;
const getSelectedDirection = state => state.game.host.selectedDirection;
const getGuesses = state => state.game.host.guesses;

// cell selectors
export const getSelectedCell = createSelector(
  [getCells, getSelectedCellIndex],
  (cells, selectedCellIndex) => cells.find(c => c.index === selectedCellIndex)
);

export const getSelectedCellsForClue = createSelector(
  [getCells, getSelectedCell, getSelectedDirection],
  (cells, selectedCell, selectedDirection) => {
    if (selectedDirection === "ACROSS") {
      return cells.filter(
        c => c.clues && c.clues.across === selectedCell.clues.across
      );
    } else {
      return cells.filter(
        c => c.clues && c.clues.down === selectedCell.clues.down
      );
    }
  }
);

export const getMappedCells = createSelector(
  [getCells, getGuesses, getSelectedCell, getSelectedCellsForClue],
  (cells, guesses, selectedCell, clueCells) => {
    return cells.map(cell => {
      const matchingGuesses = guesses[cell.index];
      const selected = cell === selectedCell;
      const clueSelected = clueCells.includes(cell);
      return { ...cell, ...matchingGuesses, selected, clueSelected };
    });
  }
);

// clue selectors
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

export const mappedCluesSelector = createSelector(
  [getClues, getSelectedClue, getMappedCells],
  (clues, selectedClue, cells) => {
    return Object.keys(clues).reduce((outerObj, direction) => {
      outerObj[direction] = Object.keys(clues[direction]).reduce(
        (innerObj, clueId) => {
          const cellsWithClue = cells.filter(
            cell =>
              cell.clues &&
              cell.clues[direction] === clues[direction][clueId].label
          );
          const answered = cellsWithClue.every(cell => cell.guess !== "");
          const selected = clues[direction][clueId] === selectedClue;
          innerObj = {
            ...innerObj,
            [clueId]: { ...clues[direction][clueId], answered, selected }
          };
          return innerObj;
        },
        {}
      );
      return outerObj;
    }, {});
  }
);
