import React from "react";
import { connect } from "react-redux";

import { puzzleActions } from "../../actions/puzzle";
import { statusActions } from "../../actions/status";

import { getSelectedCell, getSelectedClue } from "../../selectors";

class PuzzleKeyEventContainer extends React.Component {
  divRef = React.createRef();

  // Lifecycle methods
  componentDidMount() {
    this.divRef.current && this.divRef.current.focus();
  }

  componentDidUpdate() {
    this.divRef.current && this.divRef.current.focus();
  }

  getNextCellIndexFor(direction) {
    const {
      puzzle: {
        grid: { cells, dimensions }
      },
      selectedCell
    } = this.props;
    let currentColumn = selectedCell.column;
    let currentRow = selectedCell.row;

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
    const {
      status: { selectedDirection },
      toggleDirection,
      setSelectedCell
    } = this.props;
    let newIndex;
    switch (keyCode) {
      case 37: //left
        if (selectedDirection === "DOWN") {
          toggleDirection();
        } else {
          newIndex = this.getNextCellIndexFor("LEFT");
        }
        break;
      case 38: //up
        if (selectedDirection === "ACROSS") {
          toggleDirection();
        } else {
          newIndex = this.getNextCellIndexFor("UP");
        }
        break;
      case 39: //right
        if (selectedDirection === "DOWN") {
          toggleDirection();
        } else {
          newIndex = this.getNextCellIndexFor("RIGHT");
        }
        break;
      case 40: //down
        if (selectedDirection === "ACROSS") {
          toggleDirection();
        } else {
          newIndex = this.getNextCellIndexFor("DOWN");
        }
        break;
      default:
        break;
    }
    if (newIndex !== undefined) {
      setSelectedCell(newIndex);
    }
  }

  handleBackspace() {
    const {
      status: { selectedDirection },
      selectedCell
    } = this.props;

    if (selectedCell.guess !== "") {
      this.props.setCellValue(selectedCell.index, "");
    } else {
      const newIndex =
        selectedDirection === "ACROSS"
          ? this.getNextCellIndexFor("LEFT")
          : this.getNextCellIndexFor("UP");
      this.props.setCellValue(newIndex, "");
      this.props.setSelectedCell(newIndex);
    }
  }

  handleValueKeyPress(keyCode) {
    const {
      puzzle: {
        grid: { cells }
      },
      status: { selectedDirection },
      setCellValue,
      setSelectedCell,
      selectedCell,
      selectedClue
    } = this.props;

    const value = String.fromCharCode(keyCode).toUpperCase();

    // set value of selected cell
    setCellValue(selectedCell.index, value);

    // move cursor to next empty cell for current selected clue
    const sameClueEmptyCells = cells.filter(
      cell =>
        cell.clues &&
        cell !== selectedCell &&
        cell.guess === "" &&
        ((selectedDirection === "ACROSS" &&
          cell.clues.across === selectedClue.label) ||
          (selectedDirection === "DOWN" &&
            cell.clues.down === selectedClue.label))
    );
    if (sameClueEmptyCells.length) {
      const emptyCellsBelow = sameClueEmptyCells.filter(
        cell => cell.index > selectedCell.index
      );
      const nextIndex =
        emptyCellsBelow.length > 0
          ? emptyCellsBelow[0].index
          : sameClueEmptyCells[0].index;
      setSelectedCell(nextIndex);
    }
  }

  onKeyDown = e => {
    const { keyCode } = e;
    const { rebus, paused } = this.props.status;
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
  const { puzzle, status } = state;
  const selectedCell = getSelectedCell(state);
  const selectedClue = getSelectedClue(state);
  return {
    selectedCell,
    selectedClue,
    puzzle,
    status
  };
};

export default connect(
  mapStateToProps,
  {
    toggleDirection: statusActions.toggleDirection,
    setSelectedCell: statusActions.setSelectedCell,
    setCellValue: puzzleActions.setCellValue
  }
)(PuzzleKeyEventContainer);
