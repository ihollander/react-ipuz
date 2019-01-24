import React from "react";
import { connect } from "react-redux";

import { getUserSelectedCell, getUserSelectedDirection } from "../../selectors";

import { setCellValue } from "../../actions/puzzle";

import {
  updatePosition,
  broadcastUpdatePosition,
  broadcastUpdateCell
} from "../../actions/game";

class PuzzleKeyEventContainer extends React.Component {
  divRef = React.createRef();

  // Lifecycle methods
  componentDidMount() {
    this.divRef.current && this.divRef.current.focus();
  }

  componentDidUpdate() {
    // this.divRef.current && this.divRef.current.focus();
  }

  updatePosition(index, direction) {
    this.props.broadcastUpdatePosition(
      this.props.game.puzzleId,
      index,
      direction
    );
    this.props.updatePosition(this.props.auth.user.user, index, direction);
  }

  setCellValue(index, value) {
    const { username } = this.props.auth.user.user;
    this.props.broadcastUpdateCell(this.props.game.puzzleId, index, value);
    this.props.setCellValue(index, value, username);
  }

  getNextCellIndexFor(direction) {
    const {
      puzzle: { cells, dimensions },
      userSelectedCell
    } = this.props;

    let currentColumn = userSelectedCell.column;
    let currentRow = userSelectedCell.row;

    let newIndex;
    while (newIndex === undefined) {
      switch (direction) {
        case "RIGHT":
          currentColumn += 1;
          if (currentColumn + 1 > dimensions.width) {
            currentColumn = 0; // wrap to left
          }
          break;
        case "LEFT":
          currentColumn -= 1;
          if (currentColumn < 0) {
            currentColumn = dimensions.width - 1; // wrap to right
          }
          break;
        case "DOWN":
          currentRow += 1;
          if (currentRow + 1 > dimensions.height) {
            currentRow = 0; // wrap to top
          }
          break;
        case "UP":
          currentRow -= 1;
          if (currentRow < 0) {
            currentRow = dimensions.height - 1; // wrap to bottom
          }
          break;
        default:
          break;
      }

      // check movable cell
      let indexToCheck = currentRow * dimensions.width + currentColumn;
      let cellToCheck = cells.find(cell => cell.index === indexToCheck);
      if (cellToCheck.type !== "BLACK") {
        newIndex = indexToCheck;
      }
    }

    return newIndex;
  }

  handleArrowPress(keyCode) {
    const { userSelectedDirection, userSelectedCell } = this.props;
    let { index } = userSelectedCell;
    let direction = userSelectedDirection;
    switch (keyCode) {
      case 37: //left
        if (userSelectedDirection === "DOWN") {
          direction = "ACROSS";
        } else {
          index = this.getNextCellIndexFor("LEFT");
        }
        break;
      case 38: //up
        if (userSelectedDirection === "ACROSS") {
          direction = "DOWN";
        } else {
          index = this.getNextCellIndexFor("UP");
        }
        break;
      case 39: //right
        if (userSelectedDirection === "DOWN") {
          direction = "ACROSS";
        } else {
          index = this.getNextCellIndexFor("RIGHT");
        }
        break;
      case 40: //down
        if (userSelectedDirection === "ACROSS") {
          direction = "DOWN";
        } else {
          index = this.getNextCellIndexFor("DOWN");
        }
        break;
      default:
        break;
    }
    this.updatePosition(index, direction);
  }

  handleBackspace() {
    const { userSelectedCell, userSelectedDirection } = this.props;

    if (userSelectedCell.guess !== "") {
      this.setCellValue(userSelectedCell.index, "");
    } else {
      const newIndex =
        userSelectedDirection === "ACROSS"
          ? this.getNextCellIndexFor("LEFT")
          : this.getNextCellIndexFor("UP");
      this.setCellValue(newIndex, "");
      this.updatePosition(newIndex, userSelectedDirection);
    }
  }

  handleValueKeyPress(keyCode) {
    const {
      puzzle: { cells },
      userSelectedCell,
      userSelectedDirection
    } = this.props;

    const value = String.fromCharCode(keyCode).toUpperCase();

    // set value of selected cell
    this.setCellValue(userSelectedCell.index, value);

    // move cursor to next empty cell for current selected clue
    const sameClueEmptyCells = cells.filter(
      cell =>
        cell.clues &&
        cell.index !== userSelectedCell.index &&
        cell.guess === "" &&
        ((userSelectedDirection === "ACROSS" &&
          cell.clues.across === userSelectedCell.clues.across) ||
          (userSelectedDirection === "DOWN" &&
            cell.clues.down === userSelectedCell.clues.down))
    );
    if (sameClueEmptyCells.length) {
      const emptyCellsBelow = sameClueEmptyCells.filter(
        cell => cell.index > userSelectedCell.index
      );
      const nextIndex =
        emptyCellsBelow.length > 0
          ? emptyCellsBelow[0].index
          : sameClueEmptyCells[0].index;
      this.updatePosition(nextIndex, userSelectedDirection);
    }
  }

  onKeyDown = e => {
    const { keyCode } = e;
    const { rebus, paused } = this.props.game;
    if (!rebus && !paused && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (37 <= keyCode && keyCode <= 40) {
        // arrow keys
        e.preventDefault(); // prevent scrolling
        this.handleArrowPress(keyCode);
      } else if (keyCode === 8) {
        // backspace
        this.handleBackspace();
      } else if (48 <= keyCode && keyCode <= 90) {
        // alphanumeric keys
        this.handleValueKeyPress(keyCode);
      } else if (keyCode === 13) {
        // tab key
        // TODO: move to next clue
      }
    }
  };

  render() {
    return (
      <div
        ref={this.divRef}
        tabIndex="-1"
        onKeyDown={this.onKeyDown}
        style={{ outline: "none" }}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, puzzle, game } = state;

  return {
    auth,
    puzzle,
    game,
    userSelectedDirection: getUserSelectedDirection(state),
    userSelectedCell: getUserSelectedCell(state)
  };
};

export default connect(
  mapStateToProps,
  {
    setCellValue,
    broadcastUpdateCell,
    updatePosition,
    broadcastUpdatePosition
  }
)(PuzzleKeyEventContainer);
