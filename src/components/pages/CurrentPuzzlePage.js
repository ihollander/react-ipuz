import React from "react";
import { connect } from "react-redux";
import { Segment, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import DefaultLayout from "../layouts/DefaultLayout";
import PuzzleKeyEventContainer from "../grid/PuzzleKeyEventContainer";
import PuzzleContainer from "../grid/PuzzleContainer";
import PuzzleToolContainer from "../puzzleTools/PuzzleToolContainer";
import ClueContainer from "../clues/ClueContainer";
import PuzzleHeader from "../grid/PuzzleHeader";

class CurrentPuzzlePage extends React.Component {
  render() {
    const { meta, loaded } = this.props;
    if (!loaded) return <Redirect to="/" />;

    return (
      <DefaultLayout>
        <PuzzleKeyEventContainer>
          <Segment>
            <PuzzleHeader meta={meta} />
          </Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column tablet={16} computer={8}>
                <Segment>
                  <PuzzleToolContainer />
                </Segment>
                <Segment>
                  <PuzzleContainer />
                </Segment>
              </Grid.Column>
              <Grid.Column computer={8} only="computer">
                <Segment>
                  <ClueContainer />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </PuzzleKeyEventContainer>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = ({ puzzle: { meta }, game: { loaded } }) => ({
  meta,
  loaded
});

export default connect(mapStateToProps)(CurrentPuzzlePage);
