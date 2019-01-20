import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import { getMappedCells, getSelectedCell, getSelectedCellsForClue } from "../../selectors";

import { revealAnswer, checkAnswer, setCellValue } from "../../actions/puzzle";
import { saveTimer, togglePaused, toggleRebus } from "../../actions/status";
import { userActions } from "../../actions/user";
import { sharedGameActions } from "../../actions/sharedGames";

import RebusToggle from "./RebusToggle";
import PuzzleTimer from "./PuzzleTimer";
import RevealAnswer from "./RevealAnswer";
import CheckAnswer from "./CheckAnswer";

class PuzzleToolContainer extends React.Component {
  onCollaborateClick = () => {
    const { puzzle } = this.props;
    // create a new game (POST)
    // push game slug to history object at /puzzle/:slug
    this.props.createSharedGame(puzzle.id);
  };

  savePuzzle = timer => {
    const { isSignedIn, puzzle, savePuzzle, createPuzzle } = this.props;

    if (isSignedIn) {
      puzzle.id ? savePuzzle(puzzle, puzzle.id, timer) : createPuzzle(puzzle);
    }
  };

  // event handlers
  onCheckChange = type => {
    const {
      puzzle: {
        grid: { cells }
      },
      game: {
        host: {
          guesses
        }
      },
      selectedCell,
      selectedCellsForClue
    } = this.props;
    const selectedCells = [];

    debugger
    switch (type) {
      case "CHECK_SQUARE":
      case "REVEAL_SQUARE":
        selectedCells.push(selectedCell);
        break;
      case "CHECK_WORD":
      case "REVEAL_WORD":
        selectedCellsForClue.forEach(c => {
          selectedCells.push(c);
        });
        break;
      case "CHECK_PUZZLE":
      case "REVEAL_PUZZLE":
        cells.forEach(c => {
          if (c.type !== "BLACK") selectedCells.push(c);
        });
        break;
      default:
        break;
    }

    if (type.includes("CHECK")) {
      this.props.checkAnswer(selectedCells, guesses);
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
        <Menu.Item name="rebus" onClick={this.onCollaborateClick}>
          Collaborate
        </Menu.Item>
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
    auth: { isSignedIn },
    user: { currentPuzzleId },
    game,
    puzzle
  } = state;
  
  return {
    puzzle,
    game,
    isSignedIn,
    currentPuzzleId,
    selectedCell: getSelectedCell(state),
    selectedCellsForClue: getSelectedCellsForClue(state),
    mappedCells: getMappedCells(state)
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
    savePuzzle: userActions.savePuzzle,
    createPuzzle: userActions.createPuzzle,
    createSharedGame: sharedGameActions.createSharedGame
  }
)(PuzzleToolContainer);
