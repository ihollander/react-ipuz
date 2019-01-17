import React from "react";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
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
  componentDidMount() {
    if (this.props.match.params.id) {
      // load shared game
      this.props.getSharedGame(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.id &&
      this.props.match.params.id !== prevProps.match.params.id
    ) {
      console.log("entered room", this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    // leave
  }

  onActionCableDataReceived = action => {
    switch (action.type) {
      case "UPDATE_CELL":
        if (this.props.user.user.username !== action.payload.user.username) {
          this.props.setCellValue(
            action.payload.cell.index,
            action.payload.cell.value
          );
        }
        break;
      case "UPDATE_POSITION":
        if (this.props.user.user.username !== action.payload.user.username) {
          this.props.updateSharedPosition(action.payload.position);
        }
        break;
      default:
        console.log(action);
        break;
    }
  };

  render() {
    const {
      puzzle: { meta }
    } = this.props;

    return (
      <>
        {this.props.sharedGameId && (
          <ActionCable
            channel={{
              channel: "SharedGamesChannel",
              id: this.props.sharedGameId
            }}
            onReceived={this.onActionCableDataReceived}
          />
        )}
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
  status: { loaded },
  puzzle,
  auth: { isSignedIn, user },
  user: { currentPuzzleId },
  sharedGame: { sharedGameId }
}) => ({
  loaded,
  puzzle,
  isSignedIn,
  user,
  currentPuzzleId,
  sharedGameId
});

export default connect(
  mapStateToProps,
  {
    createPuzzle: userActions.createPuzzle,
    loadPuzzle: userActions.loadPuzzle,
    getSharedGame: sharedGameActions.getSharedGame,
    setCellValue: puzzleActions.setCellValue,
    updateSharedPosition: sharedGameActions.updateSharedPosition
  }
)(renderWhenLoaded(CurrentPuzzlePage));
