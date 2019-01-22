import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import {
  getHostSelectedCell,
  getGuestSelectedCell,
  getSelectedCellsForClue
} from "../../selectors";

import { revealAnswer, checkAnswer, setCellValue } from "../../actions/puzzle";
import { saveTimer, togglePaused, toggleRebus } from "../../actions/status";
import { savePuzzle } from "../../actions/user";

import RebusToggle from "./RebusToggle";
import PuzzleTimer from "./PuzzleTimer";
import RevealAnswer from "./RevealAnswer";
import CheckAnswer from "./CheckAnswer";

class PuzzleToolContainer extends React.Component {
  savePuzzle = timer => {
    const { isSignedIn, puzzle, puzzleId, savePuzzle } = this.props;

    if (isSignedIn) {
      savePuzzle(puzzle, puzzleId, timer);
    }
  };

  // event handlers
  onCheckChange = type => {
    const {
      auth,
      game: { host, guest },
      puzzle: { cells },
      hostSelectedCell,
      guestSelectedCell,
      selectedCellsForClue
    } = this.props;

    const selectedCell =
      auth.user.username === host.username
        ? hostSelectedCell
        : guestSelectedCell;
    let selectedCells;

    debugger;
    switch (type) {
      case "CHECK_SQUARE":
      case "REVEAL_SQUARE":
        selectedCells = [selectedCell];
        break;
      case "CHECK_WORD":
      case "REVEAL_WORD":
        selectedCells = selectedCellsForClue;
        break;
      case "CHECK_PUZZLE":
      case "REVEAL_PUZZLE":
        selectedCells = cells.filter(c => c.type !== "BLACK");
        break;
      default:
        break;
    }

    if (type.includes("CHECK")) {
      selectedCells = selectedCells.filter(c => c.guess !== "");
      this.props.checkAnswer(selectedCells);
    } else if (type.includes("REVEAL")) {
      this.props.revealAnswer(selectedCells);
    }
  };

  onRebusClick = () => {
    this.props.toggleRebus();
  };

  render() {
    return (
      <Menu secondary>
        <CheckAnswer onDropdownChange={this.onCheckChange} />
        <RevealAnswer onDropdownChange={this.onCheckChange} />
        <RebusToggle
          rebus={this.props.rebus}
          onRebusClick={this.onRebusClick}
        />
        <Menu.Menu position="right">
          <PuzzleTimer
            timer={this.props.timer}
            paused={this.props.paused}
            solved={this.props.solved}
            togglePaused={this.props.togglePaused}
            savePuzzle={this.savePuzzle}
            saveTimer={this.props.saveTimer}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  const {
    auth,
    game: { puzzleId, host, guest },
    puzzle
  } = state;

  return {
    puzzleId,
    puzzle,
    host,
    guest,
    auth,
    hostSelectedCell: getHostSelectedCell(state),
    guestSelectedCell: getGuestSelectedCell(state),
    selectedCellsForClue: getSelectedCellsForClue(state)
  };
};

export default connect(
  mapStateToProps,
  {
    saveTimer,
    togglePaused,
    toggleRebus,
    checkAnswer,
    revealAnswer,
    setCellValue,
    savePuzzle
  }
)(PuzzleToolContainer);
