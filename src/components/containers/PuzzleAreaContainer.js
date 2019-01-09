import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import { parseActions } from "../../actions/parse";
import { gridActions } from "../../actions/grid";

import ClueContainer from "./ClueContainer";
import GridContainer from "./GridContainer";

// temp import until file loading/parsing feature is ready
import puzzleJSON from "../../puzzleFiles/Jan0719.json";

class PuzzleAreaContainer extends React.Component {
  componentDidMount() {
    this.props.parseIpuz(puzzleJSON);
  }

  // move to helper function
  getSelectedCell(cells, index) {
    return cells.find(cell => cell.index === index);
  }

  // move to helper function
  getCellIndex(row, column, width) {
    return row * width + column;
  }

  checkMovableCell(row, column) {
    const {
      cells,
      dimensions: { width }
    } = this.props;
    let indexToCheck = this.getCellIndex(row, column, width);
    let cellToCheck = this.getSelectedCell(cells, indexToCheck);
    if (cellToCheck.type !== "BLACK") {
      return indexToCheck;
    }
  }

  moveCursor(direction) {
    const { cells, dimensions, selectedCellIndex } = this.props;
    const selectedCell = this.getSelectedCell(cells, selectedCellIndex);
    let currentColumn = selectedCell.column;
    let currentRow = selectedCell.row;

    let newIndex;
    while (newIndex === undefined) {
      switch (direction) {
        case "RIGHT":
          currentColumn += 1;
          if (currentColumn + 1 > dimensions.width) {
            currentColumn = 0; // wrap to start
          }
          break;
        case "LEFT":
          currentColumn -= 1;
          if (currentColumn < 0) {
            currentColumn = dimensions.width - 1; // wrap to end
          }
          break;
        case "DOWN":
          currentRow += 1;
          if (currentRow + 1 > dimensions.height) {
            currentRow = 0; // wrap to start
          }
          break;
        case "UP":
          currentRow -= 1;
          if (currentRow < 0) {
            currentRow = dimensions.height - 1; // wrap to end
          }
          break;
        default:
          break;
      }
      newIndex = this.checkMovableCell(currentRow, currentColumn);
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
    const { cells, selectedDirection, selectedCellIndex } = this.props;
    const selectedCell = this.getSelectedCell(cells, selectedCellIndex);

    if (selectedCell.guess !== "") {
      this.props.setCellValue(selectedCellIndex, "");
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
      clues,
      cells,
      selectedDirection,
      selectedCellIndex,
      setCellValue,
      setSelectedCell
    } = this.props;

    const selectedCell = this.getSelectedCell(cells, selectedCellIndex);
    const value = String.fromCharCode(keyCode).toUpperCase();

    // set value of selected cell
    setCellValue(selectedCellIndex, value);

    // move cursor to next empty cell for current selected clue
    const selectedClue =
      selectedDirection === "ACROSS"
        ? clues.across.find(clue => clue.label === selectedCell.clues.across)
        : clues.down.find(clue => clue.label === selectedCell.clues.down);

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
        cell => cell.index > selectedCellIndex
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
  };

  render() {
    return (
      <div tabIndex="-1" onKeyDown={this.onKeyDown} style={{ display: "flex" }}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <GridContainer />
            </Grid.Column>
            <Grid.Column>
              <ClueContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    grid: { dimensions, cells, selectedCellIndex, selectedDirection },
    clues
  } = state;
  return { dimensions, cells, selectedCellIndex, selectedDirection, clues };
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
