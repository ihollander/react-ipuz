import React from "react";
import { Modal, Header } from "semantic-ui-react";

const LoadingModal = () => {
  return (
    <Modal dimmer="blurring" open={true} size="small">
      <Header icon="clock" content="Loading" />
      <Modal.Content>Application loading...</Modal.Content>
    </Modal>
  );
};

export default LoadingModal;
