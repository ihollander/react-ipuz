import React from "react";
import { connect } from "react-redux";
import { gridActions } from "../../actions/grid";
import { statusActions } from "../../actions/status";
import GridBox from "../grid/GridBox";

class GridContainer extends React.Component {
  // check for puzzle completedness
  componentDidUpdate(prevProps) {
    const solvableCells = this.props.cells.filter(cell => cell.solution);
    const filledCells = solvableCells.filter(cell => cell.guess !== "");
    const solvedCells = solvableCells.filter(cell => cell.guess === cell.solution)
    if (filledCells.length === solvableCells.length) {
      if (solvedCells.length === solvableCells.length) {
        this.props.markSolved()
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

  render() {
    const { dimensions, cells } = this.props;
    if (dimensions && cells.length) {
      return (
        <GridBox
          dimensions={dimensions}
          cells={this.mappedCells}
          onCellClick={this.onCellClick}
        />
      );
    } else {
      return <div>Loading grid...</div>;
    }
  }
}

const mapStateToProps = state => {
  const {
    grid: { dimensions, cells, selectedCellIndex, selectedDirection },
    status: { completed, solved }
  } = state;
  return {
    completed,
    solved,
    dimensions,
    cells,
    selectedCellIndex,
    selectedDirection
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
)(GridContainer);
