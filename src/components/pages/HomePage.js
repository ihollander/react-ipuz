import React from "react";
import { connect } from "react-redux";
import { Segment, Header, Grid, Button } from "semantic-ui-react";

import {
  downloadPs,
  downloadToday,
  downloadWaPo,
  downloadWSJ,
  downloadNYT
} from "../../actions/download";

import DefaultLayout from "../layouts/DefaultLayout";
import PuzzleCalendar from "../shared/PuzzleCalendar";
import FileUploadController from "../containers/FileUploadContainer";

class HomePage extends React.Component {
  onTodayPicked = () => this.props.downloadToday()
  
  onNYTDatePicked = formattedDate => this.props.downloadNYT(formattedDate);

  onWsjDatePicked = formattedDate => this.props.downloadWSJ(formattedDate);

  onWaPoDatePicked = formattedDate => this.props.downloadWaPo(formattedDate);

  onPsDatePicked = formattedDate => this.props.downloadPs(formattedDate);

  render() {
    return (
      <DefaultLayout>
        <Segment>
          <Header as="h1">Welcome to [APP NAME HERE]</Header>
          <p>
            You can play puzzles from the sources provided below by selecting a
            date. You can also upload puzzles in the Across Lite .puz format
            using the File Upload tool.
          </p>
        </Segment>
        <Segment>
          <Header as="h2">Play Today's Puzzle</Header>
          <Button onClick={this.onTodayPicked}>Play Today's Puzzle</Button>
        </Segment>
        <Segment>
          <Header as="h2">Upload .puz File</Header>
          <FileUploadController />
        </Segment>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <PuzzleCalendar
                  header="New York Times"
                  dateFormat="YYYY-MM-DD"
                  onDateCalendarSubmit={this.onNYTDatePicked}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <PuzzleCalendar
                  header="Wall Street Journal"
                  dateFormat="YYMMDD"
                  onDateCalendarSubmit={this.onWsjDatePicked}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <PuzzleCalendar
                  header="Washington Post"
                  dateFormat="YYMMDD"
                  onDateCalendarSubmit={this.onWaPoDatePicked}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <PuzzleCalendar
                  header="Puzzle Society"
                  dateFormat="YYMMDD"
                  onDateCalendarSubmit={this.onPsDatePicked}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DefaultLayout>
    );
  }
}

export default connect(
  null,
  {
    downloadWSJ,
    downloadWaPo,
    downloadPs,
    downloadToday,
    downloadNYT
  }
)(HomePage);
