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
        fill={
          props.cell.selected
            ? "red"
            : props.cell.clueSelected
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
        {props.cell.label}
      </text>
      <text
        fill={props.cell.checked ? "blue" : "black"}
        x={solutionPosition.x}
        y={solutionPosition.y}
        fontSize="22"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {props.cell.guess}
      </text>
      {props.cell.checked && !props.cell.confirmed && (
        <line
          x1={props.display.x}
          y1={props.display.y + props.display.height}
          x2={props.display.x + props.display.width}
          y2={props.display.y}
          stroke="orange"
          strokeWidth="3"
        />
      )}
    </g>
  );
};

export default GridCellWhite;
