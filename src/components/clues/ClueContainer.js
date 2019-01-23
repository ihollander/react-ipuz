import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import { mappedCluesSelector, getSelectedClue } from "../../selectors";

import { updatePosition } from "../../actions/game";

import ClueList from "./ClueList";

class ClueContainer extends React.Component {
  // Event Handlers
  handleClueClick(direction, label) {
    const { cells, user } = this.props;

    // set selected cell index to first cell for given clue number
    const clueCell = cells.find(
      cell =>
        (direction === "ACROSS" && cell.clues && cell.clues.across === label) ||
        (direction === "DOWN" && cell.clues && cell.clues.down === label)
    );
    this.props.updatePosition(user.user, clueCell.index, direction);
  }

  onDownClueClick = label => this.handleClueClick("DOWN", label);

  onAcrossClueClick = label => this.handleClueClick("ACROSS", label);

  render() {
    return (
      <>
        <Grid columns={2} style={{ maxHeight: "680px", marginBottom: "2rem" }}>
          <Grid.Column>
            <ClueList
              userSelectedClue={this.props.userSelectedClue}
              clues={this.props.mappedClues.across}
              onClueClick={this.onAcrossClueClick}
              heading="Across"
            />
          </Grid.Column>
          <Grid.Column>
            <ClueList
              userSelectedClue={this.props.userSelectedClue}
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
    auth: { user },
    puzzle: { cells }
  } = state;

  return {
    user,
    cells,
    userSelectedClue: getSelectedClue(state),
    mappedClues: mappedCluesSelector(state)
  };
};

export default connect(
  mapStateToProps,
  {
    updatePosition
  }
)(ClueContainer);
