import { statusTypes } from "../actionTypes/status";

export const dismissAllModals = () => ({
  type: statusTypes.DISMISS_ALL_MODALS
});

export const toggleRebus = () => {
  return {
    type: statusTypes.TOGGLE_REBUS
  };
};

export const saveTimer = timer => {
  return {
    type: statusTypes.SAVE_TIMER,
    payload: timer
  };
};

export const markCompleted = () => {
  return {
    type: statusTypes.MARK_COMPLETED
  };
};

export const unmarkCompleted = () => {
  return {
    type: statusTypes.UNMARK_COMPLETED
  };
};

export const markSolved = () => {
  return {
    type: statusTypes.MARK_SOLVED
  };
};
