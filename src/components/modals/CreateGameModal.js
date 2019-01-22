import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Icon, Dropdown } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import * as moment from "moment";

import { downloadNYT, downloadWSJ } from "../../actions/download";

const options = [
  { key: 1, text: "New York Times", value: "NYT" },
  { key: 2, text: "Wall Street Journal", value: "WSJ" }
];

class CreateGameModal extends React.Component {
  state = {
    source: "NYT"
  };

  onDatePicked = (e, { value }) => {
    let formattedDate;
    switch (this.state.source) {
      case "NYT":
        formattedDate = moment(value, "DD-MM-YYYY").format("YYYY-MM-DD");
        this.props.downloadNYT(formattedDate);
        break;
      case "WSJ":
        formattedDate = moment(value, "DD-MM-YYYY").format("YYMMDD");
        this.props.downloadWSJ(formattedDate);
        break;
      default:
        break;
    }
  };

  onSourceChange = (e, { value }) => {
    this.setState({
      source: value
    });
  };

  render() {
    const { modalOpen, onModalClose } = this.props;
    return (
      <Modal open={modalOpen} onClose={onModalClose} size="small">
        <Header icon="clock" content="Host Game" />
        <Modal.Content>
          Start a new game! Pick a puzzle from one of the sources to begin.
          <Dropdown
            value={this.state.source}
            onChange={this.onSourceChange}
            options={options}
            selection
          />
          <DateInput
            maxDate={moment()}
            inline
            value=""
            onChange={this.onDatePicked}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onModalClose} color="red">
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(
  null,
  {
    downloadNYT,
    downloadWSJ
  }
)(CreateGameModal);
