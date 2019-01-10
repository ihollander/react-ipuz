import React from "react";
import {
  Grid,
  Segment,
  Dimmer,
  Loader,
  Message,
  Button
} from "semantic-ui-react";

import PuzzleContainer from "../containers/PuzzleContainer";
import ClueContainer from "../containers/ClueContainer";
import PuzzleToolContainer from "../containers/PuzzleToolContainer";

class PuzzleAreaGrid extends React.Component {
  state = {
    dimmerDismissed: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.completed !== this.props.completed || prevProps.solved !== this.props.solved) {
      this.setState({ dimmerDismissed: false });
    }
  }

  handleDismiss = () => {
    this.setState({ dimmerDismissed: true });
  };

  render() {
    const { paused, completed, solved } = this.props;
    const puzzleDimmerActive =
      (paused || completed || solved) && !this.state.dimmerDismissed;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column tablet={16} computer={8}>
            <Segment>
              <PuzzleToolContainer />
            </Segment>
            <Dimmer.Dimmable blurring dimmed={puzzleDimmerActive} as={Segment}>
              <Dimmer active={puzzleDimmerActive}>
                {solved ? (
                  <Message
                    style={{ width: "250px" }}
                    onDismiss={this.handleDismiss}
                  >
                    <Message.Header>Solved</Message.Header>
                    <Message.Content>
                      Nice Work!
                      <Button primary onClick={this.handleDismiss}>
                        Back To Puzzle
                      </Button>
                    </Message.Content>
                  </Message>
                ) : completed ? (
                  <Message
                    style={{ width: "250px" }}
                    onDismiss={this.handleDismiss}
                  >
                    <Message.Header>Completed With Errors</Message.Header>
                    <Message.Content>
                      Something's not right...
                      <Button primary onClick={this.handleDismiss}>
                        Back To Puzzle
                      </Button>
                    </Message.Content>
                  </Message>
                ) : paused ? (
                  <Loader>Paused</Loader>
                ) : null}
              </Dimmer>
              <PuzzleContainer />
            </Dimmer.Dimmable>
          </Grid.Column>
          <Grid.Column computer={8} only="computer">
            <Dimmer.Dimmable blurring dimmed={paused} as={Segment}>
              <Dimmer active={paused}>
                <Loader>Paused</Loader>
              </Dimmer>
              <ClueContainer />
            </Dimmer.Dimmable>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default PuzzleAreaGrid;
