import { modalTypes } from "../actionTypes/modal";

const showSignUp = () => ({
  type: modalTypes.SHOW_SIGNUP
});

const showLogin = () => ({
  type: modalTypes.SHOW_LOGIN
});

const dismiss = () => ({
  type: modalTypes.DISMISS_MODALS
});

export const modalActions = {
  showSignUp,
  showLogin,
  dismiss
};
