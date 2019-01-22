import React from "react";

const GridCellWhite = ({
  display,
  guess,
  index,
  isChecked,
  isConfirmed,
  isRevealed,
  isHostSelected,
  isHostSelectedClue,
  isGuestSelected,
  isGuestSelectedClue,
  label,
  style,
  sharedSelected,
  onCellClick
}) => {
  const onClick = () => onCellClick(index);

  const labelPosition = {
    x: display.x + 2,
    y: display.y + 2
  };

  const centerPosition = {
    x: display.x + display.width / 2,
    y: display.y + display.height / 2
  };

  const solutionPosition = {
    x: centerPosition.x,
    y: centerPosition.y + 2
  };

  const calcFontSize = () => {
    if (guess.length) {
      return 22 * (1 - guess.length / 10);
    } else {
      return 22;
    }
  };

  const drawCheckmarkPoints = () => {
    const start = `${display.x + display.width - 9} ${display.y +
      display.height -
      6}`;
    const bottom = `${display.x + display.width - 5} ${display.y +
      display.height -
      3}`;
    const top = `${display.x + display.width - 1} ${display.y +
      display.height -
      11}`;
    return [start, bottom, top].join(", ");
  };

  return (
    <g onClick={onClick}>
      <rect
        className="rect-svg"
        x={display.x}
        y={display.y}
        width={display.width}
        height={display.height}
        stroke="black"
        fill={isHostSelected ? "red" : isHostSelectedClue ? "pink" : "white"}
        opacity="0.7"
      />
      {(isGuestSelected || isGuestSelectedClue) && (
        <rect
          className="rect-svg"
          x={display.x}
          y={display.y}
          width={display.width}
          height={display.height}
          stroke="black"
          fill={isGuestSelected ? "blue" : "lavender"}
          opacity="0.7"
        />
      )}
      <text
        fill="black"
        x={labelPosition.x}
        y={labelPosition.y}
        fontSize="12"
        alignmentBaseline="hanging"
      >
        {label}
      </text>
      <text
        fill={isChecked ? "blue" : "black"}
        x={solutionPosition.x}
        y={solutionPosition.y}
        fontSize={calcFontSize()}
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {guess}
      </text>
      {style && (
        <circle
          cx={centerPosition.x}
          cy={centerPosition.y}
          r={display.height / 2}
          stroke="gray"
          strokeWidth="1"
          fill="transparent"
        />
      )}
      {isChecked && !isConfirmed && (
        <line
          x1={display.x}
          y1={display.y + display.height}
          x2={display.x + display.width}
          y2={display.y}
          stroke="orange"
          strokeWidth="2"
        />
      )}
      {isRevealed && (
        <polyline
          points={drawCheckmarkPoints()}
          fill="transparent"
          stroke="orange"
          strokeWidth="2"
        />
      )}
    </g>
  );
};

export default GridCellWhite;
