import React from "react";
import { connect } from "react-redux";

import { modals } from "../../constants/modal";

import { modalActions } from "../../actions/modal";
import { statusActions } from "../../actions/status";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import PuzzlePausedModal from "./PuzzlePausedModal";
import PuzzleSolvedModal from "./PuzzleSolvedModal";
import DownloadErrorModal from './DownloadErrorModal'

const ModalContainer = ({ activeModal, dismissModal, togglePaused }) => {
  switch (activeModal) {
    case modals.LOGIN:
      return <LoginModal modalOpen onModalClose={dismissModal} />;
    case modals.SIGNUP:
      return <SignUpModal modalOpen onModalClose={dismissModal} />;
    case modals.PAUSED:
      return <PuzzlePausedModal modalOpen onModalClose={togglePaused} />;
    case modals.PUZZLE_SOLVED:
      return <PuzzleSolvedModal modalOpen onModalClose={dismissModal} />;
    case modals.DOWNLOAD_ERROR:
      return <DownloadErrorModal modalOpen onModalClose={dismissModal} />
    default:
      return null;
  }
};

const mapStateToProps = ({ modals: { activeModal } }) => ({ activeModal });

export default connect(
  mapStateToProps,
  {
    dismissModal: modalActions.dismiss,
    togglePaused: statusActions.togglePaused 
  }
)(ModalContainer);
