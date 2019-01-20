import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import {
  getSelectedCell,
  getSelectedClue,
  mappedCluesSelector
} from "../../selectors";

import { toggleDirection, setSelectedCell } from "../../actions/status";

import ClueList from "./ClueList";

class ClueContainer extends React.Component {
  
  // Event Handlers
  handleClueClick(direction, label) {
    const { cells, selectedDirection } = this.props;

    // toggle direction if new direction selected
    if (selectedDirection !== direction) {
      this.props.toggleDirection();
    }

    // set selected cell index to first cell for given clue number
    const clueCell = cells.find(
      cell =>
        (direction === "ACROSS" && cell.clues && cell.clues.across === label) ||
        (direction === "DOWN" && cell.clues && cell.clues.down === label)
    );
    this.props.setSelectedCell(clueCell.index);
  }

  onDownClueClick = label => this.handleClueClick("DOWN", label);

  onAcrossClueClick = label => this.handleClueClick("ACROSS", label);

  render() {
    return (
      <>
        <Grid columns={2} style={{ maxHeight: "680px", marginBottom: "2rem" }}>
          <Grid.Column>
            <ClueList
              clues={this.props.mappedClues.across}
              onClueClick={this.onAcrossClueClick}
              heading="Across"
            />
          </Grid.Column>
          <Grid.Column>
            <ClueList
              clues={this.props.mappedClues.down}
              onClueClick={this.onDownClueClick}
              heading="Down"
            />
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    puzzle: {
      grid: { cells }
    },
    game: {
      host: { selectedDirection }
    }
  } = state;

  return {
    cells: cells,
    selectedDirection: selectedDirection,
    selectedCell: getSelectedCell(state),
    selectedClue: getSelectedClue(state),
    mappedClues: mappedCluesSelector(state)
  };
};

export default connect(
  mapStateToProps,
  {
    toggleDirection,
    setSelectedCell
  }
)(ClueContainer);
