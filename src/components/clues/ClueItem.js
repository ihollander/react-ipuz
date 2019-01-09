import React from "react";

const ClueItem = ({ clue, selectedClue, onClueClick }) => {
  return (
    <li
      onClick={() => onClueClick(clue.label)}
      style={{ backgroundColor: clue === selectedClue ? "pink" : "" }}
    >{`${clue.label}. ${clue.text}`}</li>
  );
};

export default ClueItem;
