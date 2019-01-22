import React from "react";
import { connect } from "react-redux";

import { modals } from "../../constants/modal";

import { dismissModals } from "../../actions/modal";
import { togglePaused } from "../../actions/status";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import PuzzlePausedModal from "./PuzzlePausedModal";
import PuzzleSolvedModal from "./PuzzleSolvedModal";
import DownloadErrorModal from "./DownloadErrorModal";
import PuzzleReadyModal from "./PuzzleReadyModal";
import CreateGameModal from './CreateGameModal'

const ModalContainer = ({ activeModal, dismissModals, togglePaused }) => {
  switch (activeModal) {
    case modals.LOGIN:
      return <LoginModal modalOpen onModalClose={dismissModals} />;
    case modals.SIGNUP:
      return <SignUpModal modalOpen onModalClose={dismissModals} />;
    case modals.PAUSED:
      return <PuzzlePausedModal modalOpen onModalClose={togglePaused} />;
    case modals.PUZZLE_SOLVED:
      return <PuzzleSolvedModal modalOpen onModalClose={dismissModals} />;
    case modals.DOWNLOAD_ERROR:
      return <DownloadErrorModal modalOpen onModalClose={dismissModals} />;
    case modals.PUZZLE_READY:
      return <PuzzleReadyModal modalOpen onModalClose={dismissModals} />;
    case modals.CREATE_GAME:
      return <CreateGameModal modalOpen onModalClose={dismissModals} />;
    default:
      return null;
  }
};

const mapStateToProps = ({ modals: { activeModal } }) => ({ activeModal });

export default connect(
  mapStateToProps,
  {
    dismissModals,
    togglePaused
  }
)(ModalContainer);
