import React from "react";
import { connect } from "react-redux";

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
  dismissModal: () => dispatch({ type: "DISMISS_ALL" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PuzzleModalContainer);
