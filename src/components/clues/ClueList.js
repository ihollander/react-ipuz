import React from "react";
import ClueItem from "./ClueItem";

const ClueList = ({ heading, clues, selectedClue, onClueClick }) => {
  return (
    <div style={{ maxWidth: "220px" }}>
      <h1>{heading}</h1>
      <ul style={{ listStyle: "none" }}>
        {clues.map(clue => (
          <ClueItem clue={clue} key={clue.label} selectedClue={selectedClue} onClueClick={onClueClick} />
        ))}
      </ul>
    </div>
  );
};

export default ClueList;
