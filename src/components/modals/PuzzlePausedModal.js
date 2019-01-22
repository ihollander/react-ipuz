import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

import { unpause, broadcastUnpaused } from "../../actions/game";

const PuzzlePausedModal = ({
  modalOpen,
  onModalClose,
  unpause,
  broadcastUnpaused,
  puzzleId
}) => {
  const onPauseModalClose = () => {
    unpause();
    broadcastUnpaused(puzzleId);
    onModalClose();
  };
  return (
    <Modal
      dimmer="blurring"
      open={modalOpen}
      onClose={onPauseModalClose}
      size="small"
    >
      <Header icon="clock" content="Paused" />
      <Modal.Content>Puzzle paused</Modal.Content>
      <Modal.Actions>
        <Button onClick={onPauseModalClose} primary>
          <Icon name="remove" /> Resume
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = ({game: {puzzleId}}) => ({puzzleId})
export default connect(
  mapStateToProps,
  { unpause, broadcastUnpaused }
)(PuzzlePausedModal);
