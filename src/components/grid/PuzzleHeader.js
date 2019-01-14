import React from "react";
import { Header } from "semantic-ui-react";

const PuzzleHeader = ({ meta }) => {
  return (
    <>
      <Header size="large">{meta.title}</Header>
      <p>
        {meta.author}
        <br />
        <em>{meta.copyright}</em>
      </p>
    </>
  );
};

export default PuzzleHeader;
