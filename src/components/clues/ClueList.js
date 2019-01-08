import React from "react";
import ClueItem from "./ClueItem";

const ClueList = ({ heading, clues }) => {
  return (
    <>
      <h1>{heading}</h1>
      <ul>
        {clues.map(clue => (
          <ClueItem clue={clue} key={clue.label} />
        ))}
      </ul>
    </>
  );
};

export default ClueList;
