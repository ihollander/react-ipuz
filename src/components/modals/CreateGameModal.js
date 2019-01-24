import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Icon, Dropdown } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import * as moment from "moment";

import { downloadNYT, downloadWSJ } from "../../actions/download";

import FileUploadContainer from "../containers/FileUploadContainer";

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
          <p>
            Start a new game! Pick a puzzle from one of the sources below, then click a date to begin.
            <br />
            <em>
              Note: to access New York Times crosswords, you must be signed in
              to your{" "}
              <a
                href="https://www.nytimes.com/crosswords"
                target="_blank"
                rel="noopener noreferrer"
              >
                NYT Crossword account
              </a>
              .
            </em>
          </p>
          <div>
            <label
              style={{
                display: "inline-block",
                width: "20%",
                fontWeight: "bold"
              }}
            >
              Puzzle Source:
            </label>
            <Dropdown
              style={{ width: "75%" }}
              name="source"
              value={this.state.source}
              onChange={this.onSourceChange}
              options={options}
              selection
            />
          </div>
          <DateInput
            maxDate={moment()}
            inline
            value=""
            onChange={this.onDatePicked}
          />
          <FileUploadContainer />
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
