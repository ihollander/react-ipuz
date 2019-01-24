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
          <PuzzleHeader meta={meta} />
        </Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column tablet={10} computer={6}>
              <Segment>
                <PuzzleToolContainer />
              </Segment>
              <Segment>
                <PuzzleKeyEventContainer>
                  <PuzzleContainer />
                </PuzzleKeyEventContainer>
              </Segment>
            </Grid.Column>
            <Grid.Column computer={6} only="computer">
              <Segment>
                <ClueContainer />
              </Segment>
            </Grid.Column>
            <Grid.Column tablet={6} computer={4}>
              <Segment>
                <ChatboxContainer />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = ({ puzzle, game }) => ({
  puzzle,
  game
});

export default connect(mapStateToProps)(PuzzleWrapper);
