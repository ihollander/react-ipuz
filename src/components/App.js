import React from "react";
import { connect } from "react-redux";
import { parseActions } from "../actions/parse";

import ClueContainer from "./containers/ClueContainer";
import GridContainer from "./containers/GridContainer";

// temp import until file loading/parsing feature is ready
import puzzleJSON from "../puzzleFiles/Jan0719.json";

class App extends React.Component {
  componentDidMount() {
    this.props.parseIpuz(puzzleJSON);
  }

  render() {
    return (
      <>
        <GridContainer />
        <ClueContainer />
      </>
    );
  }
}

export default connect(
  null,
  {
    parseIpuz: parseActions.parseIpuz
  }
)(App);
