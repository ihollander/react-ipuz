import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { gridActions } from "../../actions/grid";
import ClueList from "../clues/ClueList";

class ClueContainer extends React.Component {
  // Event Handlers
  handleClueClick(direction, label) {
    const {
      cells,
      selectedDirection,
      setSelectedCell,
      toggleDirection
    } = this.props;

    if (selectedDirection !== direction) {
      toggleDirection();
    }
    const clueCell = cells.find(cell => {
      if (direction === "ACROSS") {
        return cell.clues && cell.clues.across === label;
      } else {
        return cell.clues && cell.clues.down === label;
      }
    });
    setSelectedCell(clueCell.index);
  }

  onDownClueClick = label => {
    this.handleClueClick("DOWN", label);
  };

  onAcrossClueClick = label => {
    this.handleClueClick("ACROSS", label);
  };

  // Render helpers
  get selectedClue() {
    const { clues, cells, selectedCellIndex, selectedDirection } = this.props;
    const selectedCell = cells.find(c => c.index === selectedCellIndex);
    if (selectedDirection === "ACROSS") {
      return clues.across[selectedCell.clues.across];
    } else {
      return clues.down[selectedCell.clues.down];
    }
  }

  get mappedAcrossClues() {
    const { clues, cells, selectedCellIndex, selectedDirection } = this.props;
    const selectedCell = cells.find(c => c.index === selectedCellIndex);
    const mappedClues = { ...clues.across };
    // mark as answered
    Object.keys(mappedClues).forEach(id => {
      const cellsWithClue = cells.filter(
        cell => cell.clues && cell.clues.across === mappedClues[id].label
      );
      const answered = cellsWithClue.every(cell => cell.guess !== "");
      mappedClues[id] = { ...mappedClues[id], answered };
    });
    // mark as selected
    if (selectedDirection === "ACROSS") {
      mappedClues[selectedCell.clues.across] = {
        ...mappedClues[selectedCell.clues.across],
        selected: true
      };
    }
    return mappedClues;
  }

  get mappedDownClues() {
    const { clues, cells, selectedCellIndex, selectedDirection } = this.props;
    const selectedCell = cells.find(c => c.index === selectedCellIndex);
    const mappedClues = { ...clues.down };
    // mark as answered
    Object.keys(mappedClues).forEach(id => {
      const cellsWithClue = cells.filter(
        cell => cell.clues && cell.clues.down === mappedClues[id].label
      );
      const answered = cellsWithClue.every(cell => cell.guess !== "");
      mappedClues[id] = { ...mappedClues[id], answered };
    });
    // mark as selected
    if (selectedDirection === "DOWN") {
      mappedClues[selectedCell.clues.down] = {
        ...mappedClues[selectedCell.clues.down],
        selected: true
      };
    }
    return mappedClues;
  }

  render() {
    return (
      <>
        <Grid columns={2} style={{ maxHeight: "680px", marginBottom: "2rem" }}>
          <Grid.Column>
            <ClueList
              clues={this.mappedAcrossClues}
              selectedClue={this.selectedClue}
              onClueClick={this.onAcrossClueClick}
              heading="Across"
            />
          </Grid.Column>
          <Grid.Column>
            <ClueList
              clues={this.mappedDownClues}
              selectedClue={this.selectedClue}
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
    clues,
    grid: { cells, selectedCellIndex, selectedDirection }
  } = state;
  return { clues, cells, selectedCellIndex, selectedDirection };
};

export default connect(
  mapStateToProps,
  {
    toggleDirection: gridActions.toggleDirection,
    setSelectedCell: gridActions.setSelectedCell
  }
)(ClueContainer);
