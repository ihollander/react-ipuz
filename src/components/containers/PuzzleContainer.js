import React from "react";
import { connect } from "react-redux";

import { gridActions } from "../../actions/grid";
import { statusActions } from "../../actions/status";

import ActiveClue from "../clues/ActiveClue";
import GridBox from "../grid/GridBox";

class PuzzleContainer extends React.Component {
  // check for puzzle completedness
  componentDidUpdate(prevProps) {
    const solvableCells = this.props.cells.filter(cell => cell.solution);
    const filledCells = solvableCells.filter(cell => cell.guess !== "");
    const solvedCells = solvableCells.filter(
      cell => cell.guess === cell.solution
    );
    if (filledCells.length === solvableCells.length) {
      if (solvedCells.length === solvableCells.length) {
        this.props.markSolved();
      } else {
        this.props.markCompleted();
      }
    } else if (
      prevProps.completed &&
      filledCells.length !== solvableCells.length
    ) {
      this.props.unmarkCompleted();
    }
  }

  // Event Handlers
  onCellClick = index => {
    if (index === this.props.selectedCellIndex) {
      this.props.toggleDirection();
    } else {
      this.props.setSelectedCell(index);
    }
  };

  // Render Helpers
  get mappedCells() {
    const { cells, selectedCellIndex, selectedDirection } = this.props;
    const selectedCell = cells.find(c => c.index === selectedCellIndex);
    const selectedClueIndex =
      selectedDirection === "ACROSS"
        ? selectedCell.clues.across
        : selectedCell.clues.down;

    return cells.map(cell => {
      if (cell.clues) {
        const selected = cell.index === selectedCellIndex;
        const clueSelected =
          (selectedDirection === "ACROSS" &&
            selectedClueIndex === cell.clues.across) ||
          (selectedDirection === "DOWN" &&
            selectedClueIndex === cell.clues.down);
        return { ...cell, selected, clueSelected };
      } else {
        return cell;
      }
    });
  }

  // Render helpers
  get selectedClue() {
    const { clues, cells, selectedCellIndex, selectedDirection } = this.props;
    const selectedCell = cells.find(c => c.index === selectedCellIndex);
    if (selectedDirection === "ACROSS") {
      return clues.across[selectedCell.clues.across];
    } else {
      return clues.down[selectedCell.clues.down];
    }
  }

  render() {
    const { dimensions, selectedDirection } = this.props;
    return (
      <>
          <ActiveClue clue={this.selectedClue} direction={selectedDirection} />
          <GridBox
            dimensions={dimensions}
            cells={this.mappedCells}
            onCellClick={this.onCellClick}
          />
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    clues,
    grid: { dimensions, cells, selectedCellIndex, selectedDirection },
    status: { completed, solved }
  } = state;
  return {
    clues,
    dimensions,
    cells,
    selectedCellIndex,
    selectedDirection,
    completed,
    solved
  };
};

export default connect(
  mapStateToProps,
  {
    setSelectedCell: gridActions.setSelectedCell,
    toggleDirection: gridActions.toggleDirection,
    markCompleted: statusActions.markCompleted,
    unmarkCompleted: statusActions.unmarkCompleted,
    markSolved: statusActions.markSolved
  }
)(PuzzleContainer);
