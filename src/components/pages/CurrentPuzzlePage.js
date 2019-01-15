import React from "react";
import { connect } from "react-redux";

import { Segment, Grid } from "semantic-ui-react";

import { userActions } from "../../actions/user";

import renderWhenLoaded from "../hocs/renderWhenLoaded";

import PuzzleModalContainer from "../containers/PuzzleModalContainer";
import PuzzleKeyEventContainer from "../containers/PuzzleKeyEventContainer";
import PuzzleContainer from "../containers/PuzzleContainer";
import PuzzleToolContainer from "../puzzleTools/PuzzleToolContainer";
import ClueContainer from "../containers/ClueContainer";
import PuzzleHeader from "../grid/PuzzleHeader";

class CurrentPuzzlePage extends React.Component {
  // Lifecycle methods
  componentWillUnmount() {
    const {
      isSignedIn,
      currentPuzzleId,
      puzzle,
      savePuzzle,
      createPuzzle
    } = this.props;

    if (isSignedIn) {
      currentPuzzleId
        ? savePuzzle(puzzle, currentPuzzleId)
        : createPuzzle(puzzle);
    }
  }

  render() {
    const {
      puzzle: { meta }
    } = this.props;

    return (
      <>
        <PuzzleModalContainer />
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
      </>
    );
  }
}

const mapStateToProps = ({
  auth: { isSignedIn },
  user: { currentPuzzleId },
  status: { loaded },
  puzzle
}) => ({
  loaded,
  isSignedIn,
  currentPuzzleId,
  puzzle
});

export default connect(
  mapStateToProps,
  {
    savePuzzle: userActions.savePuzzle,
    createPuzzle: userActions.createPuzzle
  }
)(renderWhenLoaded(CurrentPuzzlePage));
