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
    const sameClueCells = cells.filter(cell => {
      if (direction === "ACROSS") {
        return cell.clues && cell.clues.across === label;
      } else {
        return cell.clues && cell.clues.down === label;
      }
    });
    setSelectedCell(sameClueCells[0].index);
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
      return clues.across.find(c => c.label === selectedCell.clues.across);
    } else {
      return clues.down.find(c => c.label === selectedCell.clues.down);
    }
  }

  render() {
    const { clues } = this.props;

    return (
      <Grid columns={2} style={{maxHeight: "680px", marginBottom: "2rem"}}>
        <Grid.Column>
          <ClueList
            clues={clues.across}
            selectedClue={this.selectedClue}
            onClueClick={this.onAcrossClueClick}
            heading="Across"
          />
        </Grid.Column>
        <Grid.Column>
          <ClueList
            clues={clues.down}
            selectedClue={this.selectedClue}
            onClueClick={this.onDownClueClick}
            heading="Down"
          />
        </Grid.Column>
      </Grid>
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
