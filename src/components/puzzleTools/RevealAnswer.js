import React from "react";
import DropdownMenu from '../shared/DropdownMenu'

const RevealAnswer = ({ onDropdownChange }) => {
  const options = [
    ["REVEAL_SQUARE", "Square"],
    ["REVEAL_WORD", "Word"],
    ["REVEAL_PUZZLE", "Puzzle"]
  ];

  return (
    <DropdownMenu text="Reveal" options={options} onDropdownChange={onDropdownChange} />
  );
};

export default RevealAnswer;
