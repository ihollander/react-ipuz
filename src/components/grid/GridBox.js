import React from "react";
import GridCellBlack from "./GridCellBlack";
import GridCellWhite from "./GridCellWhite";
import RebusInput from "./RebusInput";

class GridBox extends React.Component {
  gridBoxRef = React.createRef();

  // need a separate system for rebus display since it's not SVG based
  getRebusDisplayDimensions() {
    const { dimensions } = this.props;
    const puzzleWidth = this.gridBoxRef.current
      ? this.gridBoxRef.current.offsetWidth
      : 600;
    const puzzleHeight = (dimensions.height / dimensions.width) * puzzleWidth;
    return {
      width: puzzleWidth,
      height: puzzleHeight
    };
  }

  getRebusDisplay(row, column) {
    const { dimensions } = this.props;
    const displayDimensions = this.getRebusDisplayDimensions();
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

  getDisplayDimensions() {
    const { dimensions } = this.props;
    const puzzleWidth = 600;
    const puzzleHeight = (dimensions.height / dimensions.width) * puzzleWidth;
    return {
      width: puzzleWidth,
      height: puzzleHeight
    };
  }

  getCellDisplay(row, column) {
    const { dimensions } = this.props;
    const displayDimensions = this.getDisplayDimensions();
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
    const {
      cells,
      onCellClick,
      hostActive,
      hostSelectedCell,
      hostSelectedDirection,
      guestActive,
      guestSelectedCell,
      guestSelectedDirection
    } = this.props;
    const gridCells = cells.map(cell => {
      const display = this.getCellDisplay(cell.row, cell.column);
      const isHostSelected = cell.index === hostSelectedCell.index;
      const isHostSelectedClue =
        cell.clues &&
        ((hostSelectedDirection === "ACROSS" &&
          cell.clues.across === hostSelectedCell.clues.across) ||
          (hostSelectedDirection === "DOWN" &&
            cell.clues.down === hostSelectedCell.clues.down));

      const isGuestSelected =
        !!guestSelectedCell && cell.index === guestSelectedCell.index;
      const isGuestSelectedClue =
        !!guestSelectedCell &&
        cell.clues &&
        ((guestSelectedDirection === "ACROSS" &&
          cell.clues.across === guestSelectedCell.clues.across) ||
          (guestSelectedDirection === "DOWN" &&
            cell.clues.down === guestSelectedCell.clues.down));

      if (cell.type === "BLACK") {
        return <GridCellBlack key={cell.index} display={display} />;
      } else {
        return (
          <GridCellWhite
            key={cell.index}
            display={display}
            guess={cell.guess}
            index={cell.index}
            isChecked={cell.checked}
            isConfirmed={cell.confirmed}
            isRevealed={cell.revealed}
            isHostActive={hostActive}
            isHostSelected={isHostSelected}
            isHostSelectedClue={isHostSelectedClue}
            isGuestActive={guestActive}
            isGuestSelected={isGuestSelected}
            isGuestSelectedClue={isGuestSelectedClue}
            label={cell.label}
            style={cell.style}
            sharedSelected={false}
            onCellClick={onCellClick}
          />
        );
      }
    });
    return gridCells;
  }

  render() {
    const { rebus, selectedCell, onRebusSubmit } = this.props;
    const displayDimensions = this.getDisplayDimensions();

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
            display={this.getRebusDisplay(
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
