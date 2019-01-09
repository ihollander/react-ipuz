import React from "react";
import { connect } from "react-redux";
import { parseActions } from "../actions/parse";
import { gridActions } from "../actions/grid";

import ClueContainer from "./containers/ClueContainer";
import GridContainer from "./containers/GridContainer";

// temp import until file loading/parsing feature is ready
import puzzleJSON from "../puzzleFiles/Jan0719.json";

class App extends React.Component {
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

  moveLeft() {
    const { cells, dimensions, setSelectedCell, selectedCellIndex } = this.props;
    const selectedCell = this.getSelectedCell(cells, selectedCellIndex);
    let currentColumn = selectedCell.column;
    let newIndex;

    while (newIndex === undefined) {
      currentColumn -= 1;
      if (currentColumn < 0) {
        currentColumn = dimensions.width - 1; // wrap to end
      }

      newIndex = this.checkMovableCell(selectedCell.row, currentColumn);
    }

    setSelectedCell(newIndex);
  }

  moveRight() {
    const { cells, dimensions, setSelectedCell, selectedCellIndex } = this.props;
    const selectedCell = this.getSelectedCell(cells, selectedCellIndex);
    let currentColumn = selectedCell.column;
    let newIndex;

    while (newIndex === undefined) {
      currentColumn += 1;
      if (currentColumn + 1 > dimensions.width) {
        currentColumn = 0; // wrap to start
      }
      newIndex = this.checkMovableCell(selectedCell.row, currentColumn);
    }

    setSelectedCell(newIndex);
  }

  moveUp() {
    const { cells, dimensions, setSelectedCell, selectedCellIndex } = this.props;
    const selectedCell = this.getSelectedCell(cells, selectedCellIndex);
    let currentRow = selectedCell.row;
    let newIndex;

    while (newIndex === undefined) {
      currentRow -= 1;
      if (currentRow < 0) {
        currentRow = dimensions.height - 1; // wrap to end
      }
      newIndex = this.checkMovableCell(currentRow, selectedCell.column);
    }

    setSelectedCell(newIndex);
  }

  moveDown() {
    const { cells, dimensions, setSelectedCell, selectedCellIndex } = this.props;
    const selectedCell = this.getSelectedCell(cells, selectedCellIndex);
    let currentRow = selectedCell.row;
    let newIndex;

    while (newIndex === undefined) {
      currentRow += 1;
      if (currentRow + 1 > dimensions.height) {
        currentRow = 0; // wrap to start
      }
      newIndex = this.checkMovableCell(currentRow, selectedCell.column)
    }

    setSelectedCell(newIndex);
  }

  moveNextAcross() {

  }

  moveNextDown() {

  }

  handleArrowPress(keyCode) {
    const {
      selectedDirection,
      toggleDirection
    } = this.props;
    switch (keyCode) {
      case 37: //left
        if (selectedDirection === "DOWN") {
          toggleDirection();
        } else {
          this.moveLeft();
        }
        break;
      case 38: //up
        if (selectedDirection === "ACROSS") {
          toggleDirection();
        } else {
          this.moveUp();
        }
        break;
      case 39: //right
        if (selectedDirection === "DOWN") {
          toggleDirection();
        } else {
          this.moveRight();
        }
        break;
      case 40: //down
        if (selectedDirection === "ACROSS") {
          toggleDirection();
        } else {
          this.moveDown();
        }
        break;
      default:
        break;
    }
  }

  onKeyDown = e => {
    const { keyCode } = e;

    // arrow keys
    if ([37, 38, 39, 40].indexOf(keyCode) > -1) {
      // prevent scrolling
      e.preventDefault();
      this.handleArrowPress(keyCode);
      // alphanumeric keys
    } else if (48 <= keyCode && keyCode <= 90) {
      const value = String.fromCharCode(keyCode).toUpperCase()
      this.props.setSelectedCellValue(value)
      // and move the cursor...
    }
  };

  render() {
    return (
      <div tabIndex="-1" onKeyDown={this.onKeyDown} className="wrapper">
        <GridContainer />
        <ClueContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dimensions,
    cells,
    selectedCellIndex,
    selectedDirection
  } = state.grid;
  return { dimensions, cells, selectedCellIndex, selectedDirection };
};

export default connect(
  mapStateToProps,
  {
    parseIpuz: parseActions.parseIpuz,
    toggleDirection: gridActions.toggleDirection,
    setSelectedCell: gridActions.setSelectedCell,
    setSelectedCellValue: gridActions.setSelectedCellValue
  }
)(App);
