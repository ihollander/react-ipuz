import React from "react";
import { Segment, Header } from "semantic-ui-react";

const PuzzleHeader = ({ meta }) => {
  return (
    <Segment>
      <Header size="large">{meta.title}</Header>
      <p>
        {meta.author}
        <br />
        <em>{meta.copyright}</em>
      </p>
    </Segment>
  );
};

export default PuzzleHeader;
