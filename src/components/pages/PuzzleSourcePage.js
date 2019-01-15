import React from "react";
import { connect } from "react-redux";
import { Segment, Header, Grid, Divider } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import * as moment from "moment";
import { downloadActions } from "../../actions/download";
import { statusActions } from "../../actions/status";

import DownloadErrorModal from "../modals/DownloadErrorModal";
import FileUploadController from "../containers/FileUploadContainer";

class PuzzleSourcePage extends React.Component {
  onWsjDatePicked = (e, { name, value }) => {
    const formattedDate = moment(value, "DD-MM-YYYY").format("YYMMDD");
    this.props.downloadWSJ(formattedDate);
  };
  onWaPoDatePicked = (e, { name, value }) => {
    const formattedDate = moment(value, "DD-MM-YYYY").format("YYMMDD");
    this.props.downloadWaPo(formattedDate);
  };
  onPsDatePicked = (e, { name, value }) => {
    const formattedDate = moment(value, "DD-MM-YYYY").format("YYMMDD");
    this.props.downloadPs(formattedDate);
  };

  render() {
    return (
      <>
        <DownloadErrorModal modalOpen={this.props.downloadErrorModal} onModalClose={() => this.props.dismissAllModals()} />
        <Segment>
          <Header as="h1">Puzzle Sources</Header>
          <p>
            You can play puzzles from the sources provided below by selecting a
            date. You can also upload puzzles in the Across Lite .puz format
            using the File Upload tool.
          </p>
          <Header as="h2">Upload .puz File</Header>
          <FileUploadController />
          <Divider />
          <Header as="h2">Get Recent Puzzles</Header>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">Wall Street Journal</Header>
                <DateInput
                  maxDate={moment()}
                  inline
                  value=""
                  disable="Saturday"
                  onChange={this.onWsjDatePicked}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">Washington Post/LA Times</Header>
                <DateInput
                  maxDate={moment()}
                  inline
                  value=""
                  onChange={this.onWaPoDatePicked}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">Puzzle Society</Header>
                <DateInput
                  maxDate={moment()}
                  inline
                  value=""
                  onChange={this.onPsDatePicked}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    );
  }
}

const mapStateToProps = ({ modals: { downloadErrorModal } }) => ({
  downloadErrorModal
});

export default connect(
  mapStateToProps,
  {
    downloadWSJ: downloadActions.downloadWSJ,
    downloadWaPo: downloadActions.downloadWaPo,
    downloadPs: downloadActions.downloadPs,
    dismissAllModals: statusActions.dismissAllModals
  }
)(PuzzleSourcePage);
