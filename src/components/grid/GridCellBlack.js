import React from "react";

const GridCellBlack = ({display}) => (
  <rect
    className="rect-svg"
    x={display.x}
    y={display.y}
    width={display.width}
    height={display.height}
    fill="black"
  />
);

export default GridCellBlack;
