import React from "react";
import GridCellBlack from "./GridCellBlack";
import GridCellWhite from "./GridCellWhite";
import RebusInput from "./RebusInput";

class GridBox extends React.Component {
  gridBoxRef = React.createRef()

  // need a separate system for rebus display since it's not SVG based
  calcRebusDisplayDimensions() {
    const { dimensions } = this.props;
    const puzzleWidth = this.gridBoxRef.current ? this.gridBoxRef.current.offsetWidth : 600;
    const puzzleHeight = (dimensions.height / dimensions.width) * puzzleWidth;
    return {
      width: puzzleWidth,
      height: puzzleHeight
    };
  }

  calcRebusDisplay(row, column) {
    const { dimensions } = this.props;
    const displayDimensions = this.calcRebusDisplayDimensions();
    const borderOffset = 4;
    const cellHeight =
      (displayDimensions.width - borderOffset) / dimensions.width;
    const cellWidth =
      (displayDimensions.width - borderOffset) / dimensions.width;
    const xOffset = cellWidth * column + borderOffset / 2;
    const yOffset = cellHeight * row + borderOffset / 2;
    debugger
    return {
      x: xOffset,
      y: yOffset,
      width: cellWidth,
      height: cellWidth
    };
  }

  calcDisplayDimensions() {
    const { dimensions } = this.props;
    const puzzleWidth = 600;
    const puzzleHeight = (dimensions.height / dimensions.width) * puzzleWidth;
    return {
      width: puzzleWidth,
      height: puzzleHeight
    };
  }

  calcCellDisplay(row, column) {
    const { dimensions } = this.props;
    const displayDimensions = this.calcDisplayDimensions();
    const borderOffset = 4;
    const cellHeight =
      (displayDimensions.width - borderOffset) / dimensions.width;
    const cellWidth =
      (displayDimensions.width - borderOffset) / dimensions.width;
    const xOffset = cellWidth * column + borderOffset / 2;
    const yOffset = cellHeight * row + borderOffset / 2;
    return {
      x: xOffset,
      y: yOffset,
      width: cellWidth,
      height: cellWidth
    };
  }

  renderCells() {
    const { cells, onCellClick } = this.props;
    const gridCells = cells.map(cell => {
      const display = this.calcCellDisplay(cell.row, cell.column);

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
  }

  render() {
    const { rebus, selectedCell, onRebusSubmit } = this.props;
    const displayDimensions = this.calcDisplayDimensions();

    return (
      <div ref={this.gridBoxRef} className="grid-box">
        <svg
          viewBox={`0 0 ${displayDimensions.width} ${displayDimensions.height}`}
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
        >
          <g>{this.renderCells()}</g>
          <rect
            x="0"
            y="0"
            width={displayDimensions.width}
            height={displayDimensions.height}
            fill="none"
            stroke="black"
            strokeWidth="4"
          />
        </svg>
        {rebus && (
          <RebusInput
            cell={selectedCell}
            display={this.calcRebusDisplay(
              selectedCell.row,
              selectedCell.column
            )}
            onRebusSubmit={onRebusSubmit}
          />
        )}
      </div>
    );
  }
}

export default GridBox;
