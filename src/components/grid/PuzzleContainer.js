import React from "react";
import { connect } from "react-redux";

import { getSelectedCell, getSelectedClue } from "../../selectors";

import { setCellValue } from "../../actions/puzzle";
import {
  setSelectedCell,
  toggleDirection,
  markCompleted,
  unmarkCompleted,
  markSolved,
  toggleRebus
} from "../../actions/status";
import { sharedGameActions } from "../../actions/sharedGames";

import ActiveClue from "../clues/ActiveClue";
import GridBox from "./GridBox";

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
        this.props.broadcastUpdatePosition(
          this.props.sharedGame.sharedGameId,
          index
        );
      }
      this.props.setSelectedCell(index);
    }
  };

  onRebusSubmit = rebusText => {
    const { setCellValue, selectedCell, toggleRebus } = this.props;
    setCellValue(selectedCell.index, rebusText);
    toggleRebus();
  };

  render() {
    const {
      dimensions,
      selectedDirection,
      selectedClue,
      selectedCell,
      cells,
      rebus
    } = this.props;

    return (
      <>
        <ActiveClue clue={selectedClue} direction={selectedDirection} />
        <GridBox
          dimensions={dimensions}
          cells={cells}
          selectedCell={selectedCell}
          selectedDirection={selectedDirection}
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
    puzzle: { dimensions, cells },
    game: {
      completed,
      solved,
      rebus,
      host: { selectedDirection }
    },
    sharedGame
  } = state;

  return {
    dimensions,
    cells,
    completed,
    solved,
    rebus,
    selectedDirection,
    sharedGame,
    selectedCell: getSelectedCell(state),
    selectedClue: getSelectedClue(state)
  };
};

export default connect(
  mapStateToProps,
  {
    setCellValue,
    setSelectedCell,
    toggleDirection,
    markCompleted,
    unmarkCompleted,
    markSolved,
    toggleRebus,
    broadcastUpdatePosition: sharedGameActions.broadcastUpdatePosition
  }
)(PuzzleContainer);
