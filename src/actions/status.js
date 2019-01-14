import { statusTypes } from "../actionTypes/status";

const setSelectedCell = index => {
  return {
    type: statusTypes.CELL_SELECTED,
    payload: index
  };
};

const toggleDirection = () => {
  return {
    type: statusTypes.TOGGLE_DIRECTION
  };
};

const togglePaused = () => {
  return {
    type: statusTypes.TOGGLE_PAUSED
  }
}

const toggleRebus = () => {
  return {
    type: statusTypes.TOGGLE_REBUS
  }
}

const saveTimer = timer => {
  return {
    type: statusTypes.SAVE_TIMER,
    payload: timer
  }
}

const markCompleted = () => {
  return {
    type: statusTypes.MARK_COMPLETED
  };
};

const unmarkCompleted = () => {
  return {
    type: statusTypes.UNMARK_COMPLETED
  };
};

const markSolved = () => {
  return {
    type: statusTypes.MARK_SOLVED
  };
};

export const statusActions = {
  setSelectedCell,
  toggleDirection,
  markCompleted,
  unmarkCompleted,
  markSolved,
  saveTimer,
  togglePaused,
  toggleRebus
};
