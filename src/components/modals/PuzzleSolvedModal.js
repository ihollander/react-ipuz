import React from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

const PuzzleSolvedModal = ({ modalOpen, onModalClose }) => {
  return (
    <Modal dimmer="blurring" open={modalOpen} onClose={onModalClose} size="small">
      <Header icon="clock" content="Congratulations" />
      <Modal.Content>You solved it!</Modal.Content>
      <Modal.Actions>
        <Button onClick={onModalClose} primary>
          <Icon name="remove" /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PuzzleSolvedModal;
