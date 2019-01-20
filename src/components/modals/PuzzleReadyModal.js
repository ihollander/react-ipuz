import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

import history from "../../history";
import { dismissModals } from "../../actions/modal";

const PuzzleReadyModal = ({
  modalOpen,
  onModalClose,
  dismissModals,
  meta,
  isSignedIn
}) => {
  const onSolveClick = () => {
    history.push("/puzzle");
    dismissModals();
  };

  const modalText = isSignedIn
    ? "Solve solo or click 'Play With Friend' to get a link for collaborative play"
    : "Click Solve to start";

  return (
    <Modal open={modalOpen} onClose={onModalClose} size="small">
      <Header icon="chess board" content="Puzzle Ready" />
      <Modal.Content>
        <Header as="h3">Your puzzle "{meta.title}" is ready to play!</Header>
        <p>{modalText}</p>
        <Button onClick={onSolveClick}>Solve</Button>
        {isSignedIn && <Button>Play With Friend</Button>}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onModalClose} color="red">
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = ({ puzzle: { meta }, auth: { isSignedIn } }) => ({
  meta,
  isSignedIn
});

export default connect(
  mapStateToProps,
  {
    dismissModals
  }
)(PuzzleReadyModal);
