import React from "react";
import { connect } from "react-redux";
import { Segment, Grid } from "semantic-ui-react";

import PuzzleKeyEventContainer from "../grid/PuzzleKeyEventContainer";
import PuzzleContainer from "../grid/PuzzleContainer";
import PuzzleToolContainer from "../puzzleTools/PuzzleToolContainer";
import ClueContainer from "../clues/ClueContainer";
import PuzzleHeader from "../grid/PuzzleHeader";
import ChatboxContainer from "../chat/ChatboxContainer";

class PuzzleWrapper extends React.Component {
  render() {
    const {
      game: { loaded },
      puzzle: { meta }
    } = this.props;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Segment>
          <ChatboxContainer />
        </Segment>
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

const mapStateToProps = ({ puzzle, game }) => ({
  puzzle,
  game
});

export default connect(mapStateToProps)(PuzzleWrapper);
