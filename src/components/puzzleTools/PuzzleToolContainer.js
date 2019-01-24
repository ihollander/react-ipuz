import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import { getSelectedCellsForClue, getUserSelectedCell } from "../../selectors";

import { revealAnswer, checkAnswer, setCellValue } from "../../actions/puzzle";
import { saveTimer, toggleRebus } from "../../actions/status";

import {
  updateGame,
  broadcastCheckAnswer,
  broadcastRevealAnswer,
  pause,
  broadcastPaused,
  unpause,
  broadcastUnpaused
} from "../../actions/game";

import RebusToggle from "./RebusToggle";
import PuzzleTimer from "./PuzzleTimer";
import RevealAnswer from "./RevealAnswer";
import CheckAnswer from "./CheckAnswer";

class PuzzleToolContainer extends React.Component {
  savePuzzle = timer => {
    const gameObj = {
      game: {
        puzzle: JSON.stringify(this.props.puzzle),
        timer: timer
      }
    };
    this.props.updateGame(this.props.puzzleId, gameObj);
  };

  // event handlers
  onCheckChange = type => {
    const {
      puzzleId,
      puzzle: { cells },
      userSelectedCell,
      selectedCellsForClue
    } = this.props;
    let selectedCells;

    switch (type) {
      case "CHECK_SQUARE":
      case "REVEAL_SQUARE":
        selectedCells = [userSelectedCell];
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
      this.props.broadcastCheckAnswer(puzzleId, selectedCells);
    } else if (type.includes("REVEAL")) {
      this.props.revealAnswer(selectedCells);
      this.props.broadcastRevealAnswer(puzzleId, selectedCells);
    }
  };

  onRebusClick = () => {
    this.props.toggleRebus();
  };

  onTogglePause = timer => {
    if (this.props.paused) {
      this.props.unpause();
      this.props.broadcastUnpaused(this.props.puzzleId);
    } else {
      this.props.pause();
      const gameObj = {
        game: {
          puzzle: JSON.stringify(this.props.puzzle),
          timer: timer
        }
      };
      this.props.broadcastPaused(this.props.puzzleId, gameObj);
    }
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
            togglePaused={this.onTogglePause}
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
    game: { puzzleId, timer, paused, solved },
    puzzle
  } = state;

  return {
    puzzleId,
    timer,
    paused,
    solved,
    puzzle,
    userSelectedCell: getUserSelectedCell(state),
    selectedCellsForClue: getSelectedCellsForClue(state)
  };
};

export default connect(
  mapStateToProps,
  {
    saveTimer,
    pause,
    broadcastPaused,
    unpause,
    broadcastUnpaused,
    toggleRebus,
    checkAnswer,
    broadcastCheckAnswer,
    revealAnswer,
    broadcastRevealAnswer,
    setCellValue,
    updateGame
  }
)(PuzzleToolContainer);
