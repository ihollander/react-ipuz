import React from "react";

const GridCellWhite = ({ display, cell, onCellClick }) => {
  const onClick = () => onCellClick(cell.index);

  const labelPosition = {
    x: display.x + 2,
    y: display.y + 2
  };

  const solutionPosition = {
    x: display.x + display.width / 2,
    y: display.y + 4 + display.height / 2
  };

  const checkmarkPoints = () => {
    const start = `${display.x + display.width - 9} ${display.y + display.height - 6}`;
    const bottom = `${display.x + display.width - 5} ${display.y + display.height - 3}`;
    const top = `${display.x + display.width - 1} ${display.y + display.height - 11}`;
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
        fill={
          cell.selected
            ? "red"
            : cell.clueSelected
            ? "pink"
            : "white"
        }
      />
      <text
        fill="black"
        x={labelPosition.x}
        y={labelPosition.y}
        fontSize="12"
        alignmentBaseline="hanging"
      >
        {cell.label}
      </text>
      <text
        fill={cell.checked ? "blue" : "black"}
        x={solutionPosition.x}
        y={solutionPosition.y}
        fontSize="22"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {cell.guess}
      </text>
      {cell.checked && !cell.confirmed && (
        <line
          x1={display.x}
          y1={display.y + display.height}
          x2={display.x + display.width}
          y2={display.y}
          stroke="orange"
          strokeWidth="2"
        />
      )}
      {cell.revealed && (
        <polyline points={checkmarkPoints()} fill="transparent" stroke="orange" strokeWidth="2" />
      )}
    </g>
  );
};

export default GridCellWhite;
