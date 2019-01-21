import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

import history from "../../history";
import { dismissModals } from "../../actions/modal";
import { newPuzzle } from "../../actions/user";

const PuzzleReadyModal = ({
  modalOpen,
  onModalClose,
  puzzle,
  isSignedIn,
  newPuzzle,
  dismissModals
}) => {
  const onSolveClick = () => {
    dismissModals();
    // if user is signed in, create a game first and save it
    if (isSignedIn) {
      newPuzzle(puzzle);
    } else {
      // else anon puzzle page
      history.push("/puzzle");
    }
  };

  const onCollaborateClick = () => {
    // create a new puzzle
    // redirect to new puzzle page
  }

  const modalText = isSignedIn
    ? "Solve solo or click 'Play With Friend' to get a link for collaborative play"
    : "Click Solve to start";

  return (
    <Modal open={modalOpen} onClose={onModalClose} size="small">
      <Header icon="chess board" content="Puzzle Ready" />
      <Modal.Content>
        <Header as="h3">
          Your puzzle "{puzzle.meta.title}" is ready to play!
        </Header>
        <p>{modalText}</p>
        <Button onClick={onSolveClick}>Solve</Button>
        {isSignedIn && <Button onClick={onCollaborateClick}>Play With Friend</Button>}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onModalClose} color="red">
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = ({ puzzle, auth: { isSignedIn } }) => ({
  puzzle,
  isSignedIn
});

export default connect(
  mapStateToProps,
  {
    dismissModals,
    newPuzzle
  }
)(PuzzleReadyModal);
