import { createSelector } from "reselect";

const getUser = state => state.auth.user.user.username
const getHost = state => state.game.host
const getGuest = state => state.game.guest
const getCells = state => state.puzzle.cells;
const getClues = state => state.puzzle.clues;

const getHostSelectedCellIndex = state => state.game.host.selectedCellIndex;
const getGuestSelectedCellIndex = state => state.game.guest.selectedCellIndex;

const getHostSelectedDirection = state => state.game.host.selectedDirection;
const getGuestSelectedDirection = state => state.game.guest.selectedDirection;

// cell selectors
export const getUserSelectedDirection = createSelector(
  [getUser, getHost, getGuest, getHostSelectedDirection, getGuestSelectedDirection],
  (username, host, guest, hostSelectedDirection, guestSelectedDirection) => {
    if (username === host.username) {
      return hostSelectedDirection
    } else if (username === guest.username) {
      return guestSelectedDirection
    }
  }
)

export const getUserSelectedCell = createSelector(
  [getCells, getUser, getHost, getGuest, getHostSelectedCellIndex, getGuestSelectedCellIndex],
  (cells, username, host, guest, hostSelectedCellIndex, guestSelectedCellIndex) => {
    if (username === host.username) {
      return cells.find(c => c.index === hostSelectedCellIndex)
    } else if (username === guest.username) {
      return cells.find(c => c.index === guestSelectedCellIndex)
    }
  }
)

export const getHostSelectedCell = createSelector(
  [getCells, getHostSelectedCellIndex],
  (cells, selectedCellIndex) => cells.find(c => c.index === selectedCellIndex)
);

export const getGuestSelectedCell = createSelector(
  [getCells, getGuestSelectedCellIndex],
  (cells, selectedCellIndex) => cells.find(c => c.index === selectedCellIndex)
);


export const getSelectedCellsForClue = createSelector(
  [getCells, getUserSelectedCell, getUserSelectedDirection],
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


// clue selectors
export const getGuestSelectedClue = createSelector(
  [getClues, getGuestSelectedDirection, getGuestSelectedCell],
  (clues, selectedDirection, selectedCell) => {
    if (selectedCell && clues && clues.across && clues.down) {
      if (selectedDirection === "ACROSS") {
        return clues.across[selectedCell.clues.across];
      } else {
        return clues.down[selectedCell.clues.down];
      }
    }
  }
)

export const getHostSelectedClue = createSelector(
  [getClues, getHostSelectedDirection, getHostSelectedCell],
  (clues, selectedDirection, selectedCell) => {
    if (selectedCell && clues && clues.across && clues.down) {
      if (selectedDirection === "ACROSS") {
        return clues.across[selectedCell.clues.across];
      } else {
        return clues.down[selectedCell.clues.down];
      }
    }
  }
)

export const getSelectedClue = createSelector(
  [getClues, getUserSelectedDirection, getUserSelectedCell],
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
  [getClues, getHostSelectedClue, getGuestSelectedClue, getCells],
  (clues, hostSelectedClue, guestSelectedClue, cells) => {
    return Object.keys(clues).reduce((outerObj, direction) => {
      outerObj[direction] = Object.keys(clues[direction]).reduce(
        (innerObj, clueId) => {
          const cellsWithClue = cells.filter(
            cell =>
              cell.clues &&
              cell.clues[direction] === clues[direction][clueId].label
          );
          const answered = cellsWithClue.every(cell => cell.guess !== "");
          const hostSelected = clues[direction][clueId] === hostSelectedClue;
          const guestSelected = clues[direction][clueId] === guestSelectedClue;
          innerObj = {
            ...innerObj,
            [clueId]: { ...clues[direction][clueId], answered, hostSelected, guestSelected }
          };
          return innerObj;
        },
        {}
      );
      return outerObj;
    }, {});
  }
);
