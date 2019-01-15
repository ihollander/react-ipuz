import React from "react";
import { connect } from "react-redux";

import { statusTypes } from "../../actionTypes/status";

import PuzzleSolvedModal from "../modals/PuzzleSolvedModal";
import PuzzlePausedModal from "../modals/PuzzlePausedModal";

const PuzzleModalContainer = ({ modals, dismissModal }) => (
  <>
    <PuzzleSolvedModal
      modalOpen={modals.solvedModal}
      onModalClose={() => dismissModal()}
    />
    <PuzzlePausedModal
      modalOpen={modals.pausedModal}
      onModalClose={() => dismissModal()}
    />
  </>
);

const mapStateToProps = ({ modals }) => ({ modals });

const mapDispatchToProps = dispatch => ({
  dismissModal: () => dispatch({ type: statusTypes.DISMISS_ALL_MODALS })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PuzzleModalContainer);
