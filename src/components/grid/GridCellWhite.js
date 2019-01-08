import React from "react";

const GridCellWhite = props => {
  const onCellClick = () => props.onCellClick(props.cell.index);

  const labelPosition = {
    x: props.display.x + 2,
    y: props.display.y + 2
  };

  const solutionPosition = {
    x: props.display.x + props.display.width / 2,
    y: props.display.y + 4 + props.display.height / 2
  };

  return (
    <g onClick={onCellClick}>
      <rect
        className="rect-svg"
        x={props.display.x}
        y={props.display.y}
        width={props.display.width}
        height={props.display.height}
        stroke="black"
        fill={props.cell.selected ? "red" : (props.cell.clueSelected ? "pink" : "white")}
      />
      <text
        fill="black"
        x={labelPosition.x}
        y={labelPosition.y}
        fontSize="12"
        alignmentBaseline="hanging"
      >
        {props.cell.label}
      </text>
      <text
        fill="black"
        x={solutionPosition.x}
        y={solutionPosition.y}
        fontSize="22"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {props.cell.solution}
      </text>
    </g>
  );
};

export default GridCellWhite;
