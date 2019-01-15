import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import { puzzleActions } from "../../actions/puzzle";
import { statusActions } from "../../actions/status";
import { userActions } from "../../actions/user";

import RebusToggle from "./RebusToggle";
import PuzzleTimer from "./PuzzleTimer";
import RevealAnswer from "./RevealAnswer";
import CheckAnswer from "./CheckAnswer";

class PuzzleToolContainer extends React.Component {
  
  savePuzzle = (timer) => {
    
    const {
      isSignedIn,
      puzzle,
      savePuzzle,
      createPuzzle
    } = this.props;

    if (isSignedIn) {
      puzzle.id
        ? savePuzzle(puzzle, puzzle.id, timer)
        : createPuzzle(puzzle);
    }
  };

  // event handlers
  onCheckChange = type => {
    const {
      puzzle: {
        grid: { cells }
      },
      selectedCellIndex,
      selectedDirection
    } = this.props;
    const selectedCells = [];

    switch (type) {
      case "CHECK_SQUARE":
      case "REVEAL_SQUARE":
        selectedCells.push(selectedCellIndex);
        break;
      case "CHECK_WORD":
      case "REVEAL_WORD":
        const selectedCell = cells.find(c => c.index === selectedCellIndex);
        cells.forEach(c => {
          const selectedClue =
            c.clues &&
            ((selectedDirection === "ACROSS" &&
              c.clues.across === selectedCell.clues.across) ||
              (selectedDirection === "DOWN" &&
                c.clues.down === selectedCell.clues.down));
          if (selectedClue) selectedCells.push(c.index);
        });
        break;
      case "CHECK_PUZZLE":
      case "REVEAL_PUZZLE":
        cells.forEach(c => {
          if (c.type !== "BLACK") selectedCells.push(c.index);
        });
        break;
      default:
        break;
    }

    if (type.includes("CHECK")) {
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

const mapStateToProps = ({
  auth: { isSignedIn },
  user: { currentPuzzleId },
  status: {
    timer,
    paused,
    solved,
    rebus,
    selectedDirection,
    selectedCellIndex
  },
  puzzle
}) => {
  return {
    timer,
    paused,
    solved,
    rebus,
    puzzle,
    selectedCellIndex,
    selectedDirection,
    isSignedIn,
    currentPuzzleId
  };
};

export default connect(
  mapStateToProps,
  {
    saveTimer: statusActions.saveTimer,
    togglePaused: statusActions.togglePaused,
    toggleRebus: statusActions.toggleRebus,
    checkAnswer: puzzleActions.checkAnswer,
    revealAnswer: puzzleActions.revealAnswer,
    setCellValue: puzzleActions.setCellValue,
    savePuzzle: userActions.savePuzzle,
    createPuzzle: userActions.createPuzzle
  }
)(PuzzleToolContainer);
