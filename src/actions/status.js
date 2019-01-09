import { statusTypes } from "../actionTypes/status";

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
  markSolved
};
