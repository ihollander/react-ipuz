import React from "react";
import { connect } from "react-redux";

import {
  getUserSelectedCell,
  getHostSelectedCell,
  getSelectedClue,
  getGuestSelectedCell,
  getUserSelectedDirection
} from "../../selectors";

import { setCellValue } from "../../actions/puzzle";
import {
  markCompleted,
  unmarkCompleted,
  markSolved,
  toggleRebus
} from "../../actions/status";

import {
  updatePosition,
  broadcastUpdatePosition
} from "../../actions/game";

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
    let direction = this.props.userSelectedDirection;
    if (index === this.props.userSelectedCell.index) {
      direction = direction === "ACROSS" ? "DOWN" : "ACROSS";
    }
    this.props.broadcastUpdatePosition(this.props.puzzleId, index, direction);
    this.props.updatePosition(this.props.auth.user.user, index, direction);
  };

  onRebusSubmit = rebusText => {
    const { setCellValue, userSelectedCell, toggleRebus } = this.props;
    setCellValue(userSelectedCell.index, rebusText);
    toggleRebus();
  };

  render() {
    const {
      dimensions,
      selectedClue,
      userSelectedCell,
      hostSelectedCell,
      host,
      guestSelectedCell,
      guest,
      cells,
      rebus
    } = this.props;

    return (
      <>
        <ActiveClue clue={selectedClue} direction={host.selectedDirection} />
        <GridBox
          dimensions={dimensions}
          cells={cells}
          selectedCell={userSelectedCell}
          hostActive={host.active}
          hostSelectedCell={hostSelectedCell}
          hostSelectedDirection={host.selectedDirection}
          guestActive={guest.active}
          guestSelectedCell={guestSelectedCell}
          guestSelectedDirection={guest.selectedDirection}
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
    auth,
    puzzle: { dimensions, cells },
    game: { completed, solved, rebus, host, guest, puzzleId }
  } = state;

  return {
    auth,
    dimensions,
    cells,
    completed,
    solved,
    rebus,
    puzzleId,
    host,
    userSelectedDirection: getUserSelectedDirection(state),
    userSelectedCell: getUserSelectedCell(state),
    hostSelectedCell: getHostSelectedCell(state),
    guestSelectedCell: getGuestSelectedCell(state),
    guest,
    selectedClue: getSelectedClue(state)
  };
};

export default connect(
  mapStateToProps,
  {
    setCellValue,
    markCompleted,
    unmarkCompleted,
    markSolved,
    toggleRebus,
    updatePosition,
    broadcastUpdatePosition
  }
)(PuzzleContainer);
