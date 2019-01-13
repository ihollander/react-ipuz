import React from "react";
import { connect } from "react-redux";

import { parseActions } from "../../actions/parse";
import { gridActions } from "../../actions/grid";
import { getSelectedCell, getSelectedClue } from "../../selectors";

import PuzzleHeader from "../grid/PuzzleHeader";
import PuzzleAreaGrid from "../grid/PuzzleAreaGrid";

class PuzzleAreaContainer extends React.Component {
  divRef = React.createRef();

  // Lifecycle methods
  componentDidMount() {
    this.divRef.current && this.divRef.current.focus();
  }

  componentDidUpdate() {
    this.divRef.current && this.divRef.current.focus();
  }

  moveCursor(direction) {
    const { cells, dimensions, selectedCell } = this.props;
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
    const { selectedDirection, toggleDirection, setSelectedCell } = this.props;
    let newIndex;
    switch (keyCode) {
      case 37: //left
        if (selectedDirection === "DOWN") {
          toggleDirection();
        } else {
          newIndex = this.moveCursor("LEFT");
        }
        break;
      case 38: //up
        if (selectedDirection === "ACROSS") {
          toggleDirection();
        } else {
          newIndex = this.moveCursor("UP");
        }
        break;
      case 39: //right
        if (selectedDirection === "DOWN") {
          toggleDirection();
        } else {
          newIndex = this.moveCursor("RIGHT");
        }
        break;
      case 40: //down
        if (selectedDirection === "ACROSS") {
          toggleDirection();
        } else {
          newIndex = this.moveCursor("DOWN");
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
    const { selectedDirection, selectedCell } = this.props;

    if (selectedCell.guess !== "") {
      this.props.setCellValue(selectedCell.index, "");
    } else {
      const newIndex =
        selectedDirection === "ACROSS"
          ? this.moveCursor("LEFT")
          : this.moveCursor("UP");
      this.props.setCellValue(newIndex, "");
      this.props.setSelectedCell(newIndex);
    }
  }

  handleValueKeyPress(keyCode) {
    const {
      cells,
      selectedDirection,
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
    if (!this.props.rebus && !this.props.paused && !e.ctrlKey && !e.altKey && !e.metaKey) {
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
      }
    }
  };

  render() {
    const { dimensions, cells, meta, paused, completed, solved } = this.props;
    if (dimensions && cells.length) {
      return (
        <div
          ref={this.divRef}
          tabIndex="-1"
          onKeyDown={this.onKeyDown}
          style={{ outline: "none" }}
        >
          <PuzzleHeader meta={meta} />
          <PuzzleAreaGrid
            paused={paused}
            completed={completed}
            solved={solved}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  const {
    grid: { dimensions, cells, selectedDirection },
    meta,
    status: { paused, completed, solved, rebus }
  } = state;
  const selectedCell = getSelectedCell(state);
  const selectedClue = getSelectedClue(state);
  return {
    selectedCell,
    selectedClue,
    dimensions,
    cells,
    selectedDirection,
    meta,
    paused,
    completed,
    solved,
    rebus
  };
};

export default connect(
  mapStateToProps,
  {
    parseIpuz: parseActions.parseIpuz,
    toggleDirection: gridActions.toggleDirection,
    setSelectedCell: gridActions.setSelectedCell,
    setCellValue: gridActions.setCellValue
  }
)(PuzzleAreaContainer);
