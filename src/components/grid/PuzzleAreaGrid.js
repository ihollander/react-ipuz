import React from "react";
import { Grid, Segment, Dimmer, Loader } from "semantic-ui-react";

import PuzzleContainer from "../containers/PuzzleContainer";
import ClueContainer from "../containers/ClueContainer";
import PuzzleToolContainer from "../containers/PuzzleToolContainer";

const PuzzleAreaGrid = ({ paused }) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column tablet={16} computer={8}>
          <Segment>
            <PuzzleToolContainer />
          </Segment>
          <Dimmer.Dimmable blurring dimmed={paused} as={Segment}>
            <Dimmer active={paused}>
              <Loader>Paused</Loader>
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
};

export default PuzzleAreaGrid;
