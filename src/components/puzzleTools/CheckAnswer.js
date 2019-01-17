import React from "react";
import DropdownMenu from '../shared/DropdownMenu'

const CheckAnswer = ({ onDropdownChange }) => {
  const options = [
    ["CHECK_SQUARE", "Square"],
    ["CHECK_WORD", "Word"],
    ["CHECK_PUZZLE", "Puzzle"]
  ];

  return (
    <DropdownMenu text="Check" options={options} onDropdownChange={onDropdownChange} />
  );
};

export default CheckAnswer;
