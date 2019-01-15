import React from "react";
import { connect } from "react-redux";

import { userActions } from "../../actions/user";

class SavedPuzzlesPage extends React.Component {

  onSavedPuzzleClick = (id) => {
    this.props.loadPuzzle(id)
  }

  renderPuzzles() {
    return this.props.savedPuzzles.map(p => {
      return <div onClick={() => this.onSavedPuzzleClick(p.id)} key={p.id}>{p.title}</div>;
    });
  }

  render() {
    return this.props.savedPuzzles.length ? (
      <div>{this.renderPuzzles()}</div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = ({ user: { savedPuzzles } }) => ({ savedPuzzles });

export default connect(
  mapStateToProps,
  {
    getSavedPuzzles: userActions.getSavedPuzzles,
    loadPuzzle: userActions.loadPuzzle
  }
)(SavedPuzzlesPage);
