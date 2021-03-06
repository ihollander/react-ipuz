import React from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

const DownloadErrorModal = ({ modalOpen, onModalClose }) => {
  return (
    <Modal dimmer="blurring" open={modalOpen} onClose={onModalClose} size="small">
      <Header icon="clock" content="Error" />
      <Modal.Content>Error downloading puzzle, try another date.</Modal.Content>
      <Modal.Actions>
        <Button onClick={onModalClose} primary>
          <Icon name="remove" /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DownloadErrorModal;
