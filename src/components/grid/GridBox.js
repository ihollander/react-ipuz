import React from "react";
import GridCellBlack from "./GridCellBlack";
import GridCellWhite from "./GridCellWhite";

const GridBox = ({ dimensions, cells, onCellClick }) => {
  const puzzWidth = 600;
  const borderOffset = 4

  const renderCells = () => {
    const cellHeight = (puzzWidth - borderOffset)/ dimensions.height;
    const cellWidth = (puzzWidth - borderOffset) / dimensions.width;

    const gridCells = cells.map(cell => {
      const xOffset = (cellWidth * cell.column) + (borderOffset / 2);
      const yOffset = (cellHeight * cell.row) + (borderOffset / 2);

      const display = {
        x: xOffset,
        y: yOffset,
        width: cellWidth,
        height: cellHeight
      };

      if (cell.type === "BLACK") {
        return <GridCellBlack key={cell.index} display={display} />;
      } else {
        return (
          <GridCellWhite
            key={cell.index}
            display={display}
            cell={cell}
            onCellClick={onCellClick}
          />
        );
      }
    });

    return gridCells;
  };

  return (
    <svg
      viewBox={`0 0 ${puzzWidth} ${puzzWidth}`}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      style={{cursor: "pointer"}}
    >
      <g>{renderCells()}</g>
      <rect
        x="0"
        y="0"
        width={puzzWidth}
        height={puzzWidth}
        fill="none"
        stroke="black"
        strokeWidth="4"
      />
    </svg>
  );
};

export default GridBox;
