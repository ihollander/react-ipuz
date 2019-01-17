import React from "react";
import { connect } from "react-redux";
import { Segment, Grid } from "semantic-ui-react";

import { puzzleActions } from "../../actions/puzzle";
import { userActions } from "../../actions/user";
import { sharedGameActions } from "../../actions/sharedGames";
import renderWhenLoaded from "../hocs/renderWhenLoaded";

import PuzzleKeyEventContainer from "../containers/PuzzleKeyEventContainer";
import PuzzleContainer from "../containers/PuzzleContainer";
import PuzzleToolContainer from "../puzzleTools/PuzzleToolContainer";
import ClueContainer from "../clues/ClueContainer";
import PuzzleHeader from "../grid/PuzzleHeader";

class CurrentPuzzlePage extends React.Component {

  render() {
    const {
      puzzle: { meta }
    } = this.props;

    return (
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
    );
  }
}

const mapStateToProps = ({
  status: { loaded },
  puzzle,
  auth: { isSignedIn },
  user: { currentPuzzleId }
}) => ({
  loaded,
  puzzle,
  isSignedIn,
  currentPuzzleId
});

export default connect(
  mapStateToProps,
  {
    createPuzzle: userActions.createPuzzle,
    loadPuzzle: userActions.loadPuzzle,
    getSharedGame: sharedGameActions.getSharedGame,
    setCellValue: puzzleActions.setCellValue
  }
)(renderWhenLoaded(CurrentPuzzlePage));
