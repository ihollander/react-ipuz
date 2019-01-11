import React from "react";
import {connect} from 'react-redux'
import { Segment, Header } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import * as moment from "moment";
import {downloadActions} from '../../actions/download'

import FileUploadController from "./FileUploadContainer";

class PuzzleSourceController extends React.Component {
  
  onWsjDatePicked = (e, { name, value }) => {
    const formattedDate = moment(value, "DD-MM-YYYY").format("YYMMDD");
    this.props.downloadWSJ(formattedDate)
  };

  render() {
    return (
      <Segment>
        <Header>Puzzle Sources</Header>
        <p>Upload:</p>
        <FileUploadController />
        <p>Wall Street Journal:</p>
        <DateInput
          maxDate={moment()}
          inline
          value=""
          onChange={this.onWsjDatePicked}
        />
      </Segment>
    );
  }
}

export default connect(null, {
  downloadWSJ: downloadActions.downloadWSJ
})(PuzzleSourceController);
