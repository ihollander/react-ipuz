import React from "react";
import GridCellBlack from "./GridCellBlack";
import GridCellWhite from "./GridCellWhite";

const GridBox = ({ dimensions, cells, onCellClick }) => {
  const puzzWidth = 600;

  const renderCells = () => {
    const cellHeight = puzzWidth / dimensions.height;
    const cellWidth = puzzWidth / dimensions.width;

    const gridCells = cells.map(cell => {
      const xOffset = cellWidth * cell.column;
      const yOffset = cellHeight * cell.row;

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
      width={puzzWidth}
      height={puzzWidth}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>{renderCells()}</g>
    </svg>
  );
};

export default GridBox;
