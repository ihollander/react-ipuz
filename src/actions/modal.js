import { modalTypes } from "../actionTypes/modal";

export const showSignUpModal = () => ({
  type: modalTypes.SHOW_SIGNUP
});

export const showLoginModal = () => ({
  type: modalTypes.SHOW_LOGIN
});

export const dismissModals = () => ({
  type: modalTypes.DISMISS_MODALS
});