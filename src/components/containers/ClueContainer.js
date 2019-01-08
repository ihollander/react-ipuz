import React from "react";
import { connect } from "react-redux";
import ClueList from "../clues/ClueList";

class ClueContainer extends React.Component {
  render() {
    const { clues } = this.props;

    if (clues.across.length && clues.across.length) {
      return (
        <>
          <ClueList clues={clues.across} heading="Across" />
          <ClueList clues={clues.down} heading="Down" />
        </>
      );
    } else {
      return <div>Clues loading...</div>
    }
  }
}

const mapStateToProps = state => {
  const { clues } = state;
  return { clues };
};

export default connect(mapStateToProps)(ClueContainer);
