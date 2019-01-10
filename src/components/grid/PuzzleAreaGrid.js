import React from "react";
import { Grid, Segment } from "semantic-ui-react";

import PuzzleContainer from "../containers/PuzzleContainer";
import ClueContainer from "../containers/ClueContainer";
import PuzzleTools from '../tools/PuzzleTools'

const PuzzleAreaGrid = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column tablet={16} computer={8}>
          <Segment>
            <PuzzleTools />
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
  );
};

export default PuzzleAreaGrid;
