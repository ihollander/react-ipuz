import React from "react";
import { connect } from "react-redux";

import { getSelectedCell, getSelectedClue } from "../../selectors";
import { puzzleActions } from "../../actions/puzzle";
import { statusActions } from "../../actions/status";
import { sharedGameActions } from "../../actions/sharedGames";

import ActiveClue from "../clues/ActiveClue";
import GridBox from "../grid/GridBox";

class PuzzleContainer extends React.Component {
  // check for puzzle completedness
  componentDidUpdate(prevProps) {
    const solvableCells = this.props.cells.filter(c => c.solution);
    const filledCells = solvableCells.filter(c => c.guess !== "");
    const solvedCells = solvableCells.filter(c => c.guess === c.solution);

    if (!this.props.solved || !this.props.completed) {
      if (filledCells.length === solvableCells.length) {
        if (solvedCells.length === solvableCells.length) {
          this.props.markSolved();
        } else {
          this.props.markCompleted();
        }
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
    if (index === this.props.selectedCell.index) {
      this.props.toggleDirection();
    } else {
      if (this.props.sharedGame.sharedGameId) {
        this.props.broadcastUpdatePosition(this.props.sharedGame.sharedGameId, index);
      }
      this.props.setSelectedCell(index);
    }
  };

  onRebusSubmit = rebusText => {
    const { setCellValue, selectedCell, toggleRebus } = this.props;
    setCellValue(selectedCell.index, rebusText);
    toggleRebus();
  };

  // Render Helpers
  get mappedCells() {
    const { cells, selectedCell, selectedDirection, sharedGame } = this.props;
    const selectedClueIndex =
      selectedDirection === "ACROSS"
        ? selectedCell.clues.across
        : selectedCell.clues.down;

    return cells.map(cell => {
      if (cell.clues) {
        const selected = cell.index === selectedCell.index;
        const sharedSelected = sharedGame.selectedCellIndex !== null && sharedGame.selectedCellIndex === cell.index
        const clueSelected =
          (selectedDirection === "ACROSS" &&
            selectedClueIndex === cell.clues.across) ||
          (selectedDirection === "DOWN" &&
            selectedClueIndex === cell.clues.down);
        return { ...cell, selected, clueSelected, sharedSelected };
      } else {
        return cell;
      }
    });
  }

  render() {
    const {
      dimensions,
      selectedDirection,
      selectedClue,
      selectedCell,
      rebus
    } = this.props;
    return (
      <>
        <ActiveClue clue={selectedClue} direction={selectedDirection} />
        <GridBox
          dimensions={dimensions}
          cells={this.mappedCells}
          selectedCell={selectedCell}
          rebus={rebus}
          onCellClick={this.onCellClick}
          onRebusSubmit={this.onRebusSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    puzzle: {
      grid: { dimensions, cells }
    },
    status: { completed, solved, rebus, selectedDirection },
    sharedGame
  } = state;
  const selectedCell = getSelectedCell(state);
  const selectedClue = getSelectedClue(state);
  return {
    selectedCell,
    selectedClue,
    dimensions,
    cells,
    selectedDirection,
    completed,
    solved,
    rebus,
    sharedGame
  };
};

export default connect(
  mapStateToProps,
  {
    setCellValue: puzzleActions.setCellValue,
    setSelectedCell: statusActions.setSelectedCell,
    toggleDirection: statusActions.toggleDirection,
    markCompleted: statusActions.markCompleted,
    unmarkCompleted: statusActions.unmarkCompleted,
    markSolved: statusActions.markSolved,
    toggleRebus: statusActions.toggleRebus,
    broadcastUpdatePosition: sharedGameActions.broadcastUpdatePosition
  }
)(PuzzleContainer);
