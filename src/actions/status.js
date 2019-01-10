import { statusTypes } from "../actionTypes/status";

const togglePaused = () => {
  return {
    type: statusTypes.TOGGLE_PAUSED
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
  markCompleted,
  unmarkCompleted,
  markSolved,
  saveTimer,
  togglePaused
};
