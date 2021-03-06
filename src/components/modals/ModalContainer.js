import React from "react";
import { connect } from "react-redux";

import { modals } from "../../constants/modal";
import { dismissModals } from "../../actions/modal";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import PuzzlePausedModal from "./PuzzlePausedModal";
import PuzzleSolvedModal from "./PuzzleSolvedModal";
import DownloadErrorModal from "./DownloadErrorModal";
import CreateGameModal from "./CreateGameModal";
import ProfileModal from "./ProfileModal";

const ModalContainer = ({ activeModal, dismissModals }) => {
  switch (activeModal) {
    case modals.LOGIN:
      return <LoginModal modalOpen onModalClose={dismissModals} />;
    case modals.SIGNUP:
      return <SignUpModal modalOpen onModalClose={dismissModals} />;
    case modals.PAUSED:
      return <PuzzlePausedModal modalOpen onModalClose={dismissModals} />;
    case modals.PUZZLE_SOLVED:
      return <PuzzleSolvedModal modalOpen onModalClose={dismissModals} />;
    case modals.DOWNLOAD_ERROR:
      return <DownloadErrorModal modalOpen onModalClose={dismissModals} />;
    case modals.CREATE_GAME:
      return <CreateGameModal modalOpen onModalClose={dismissModals} />;
    case modals.PROFILE:
      return <ProfileModal modalOpen onModalClose={dismissModals} />;
    default:
      return null;
  }
};

const mapStateToProps = ({ modals: { activeModal } }) => ({ activeModal });

export default connect(
  mapStateToProps,
  {
    dismissModals
  }
)(ModalContainer);
