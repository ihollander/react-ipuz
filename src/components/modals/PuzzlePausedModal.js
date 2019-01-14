import React from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

const PuzzlePausedModal = ({ modalOpen, onModalClose }) => {
  return (
    <Modal dimmer="blurring" open={modalOpen} onClose={onModalClose} size="small">
      <Header icon="clock" content="Paused" />
      <Modal.Content>Puzzle paused</Modal.Content>
      <Modal.Actions>
        <Button onClick={onModalClose} primary>
          <Icon name="remove" /> Resume
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PuzzlePausedModal;
