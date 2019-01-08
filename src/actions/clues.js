import { clueTypes } from "../actionTypes/clues";

const loadCluesFromIpuz = ipuz => {
  return {
    type: clueTypes.CLUES_LOADED,
    payload: ipuz.clues
  };
};

export const clueActions = {
  loadCluesFromIpuz
};
