import { modalTypes } from "../actionTypes/modal";

export const showSignUpModal = () => ({
  type: modalTypes.SHOW_SIGNUP_MODAL
});

export const showLoginModal = () => ({
  type: modalTypes.SHOW_LOGIN_MODAL
});

export const showCreateGameModal = () => ({
  type: modalTypes.SHOW_CREATE_GAME_MODAL
});

export const dismissModals = () => ({
  type: modalTypes.DISMISS_MODALS
});