import React from "react";

const ActiveClue = ({ clue, direction }) => {
  return (
    <div className="clue-box">
      <span className="clue-label">
        {`${clue.label}${direction.substring(0, 1)}`}
      </span>
      <span className="clue-text">{clue.text}</span>
    </div>
  );
};

export default ActiveClue;
