import React from "react";
import { connect } from "react-redux";

import { userActions } from "../../actions/user";

class SavedPuzzlesPage extends React.Component {

  renderPuzzles() {
    return this.props.savedPuzzles.map(p => {
      return <div key={p.id}>{p.title}</div>;
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
    getSavedPuzzles: userActions.getSavedPuzzles
  }
)(SavedPuzzlesPage);
