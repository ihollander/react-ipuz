import React from "react";
import { connect } from "react-redux";
import { gridActions } from "../../actions/grid";
import GridBox from "../grid/GridBox";

class GridContainer extends React.Component {

  // Event Handlers
  onCellClick = index => {
    if (index === this.props.selectedCellIndex) {
      this.props.toggleDirection()
    } else {
      this.props.setSelectedCell(index)
    }
  };

  // Render Helpers
  get mappedCells() {
    const { cells, selectedCellIndex, selectedDirection } = this.props;
    const selectedCell = cells.find(c => c.index === selectedCellIndex);
    const selectedClueIndex =
      selectedDirection === "ACROSS"
        ? selectedCell.clues.across
        : selectedCell.clues.down;

    return cells.map(cell => {
      if (cell.clues) {
        const selected = cell.index === selectedCellIndex;
        const clueSelected =
          (selectedDirection === "ACROSS" &&
            selectedClueIndex === cell.clues.across) ||
          (selectedDirection === "DOWN" &&
            selectedClueIndex === cell.clues.down);
        return { ...cell, selected, clueSelected };
      } else {
        return cell;
      }
    });
  }
  
  render() {
    const { dimensions, cells } = this.props;
    if (dimensions && cells.length) {
      return (
        <GridBox
          dimensions={dimensions}
          cells={this.mappedCells}
          onCellClick={this.onCellClick}
        />
      );
    } else {
      return <div>Loading grid...</div>;
    }
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
    setSelectedCell: gridActions.setSelectedCell,
    toggleDirection: gridActions.toggleDirection
  }
)(GridContainer);
