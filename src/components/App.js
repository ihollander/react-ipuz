import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Router, Switch } from "react-router-dom";
import * as moment from "moment";

import history from "../history";

import { downloadActions } from "../actions/download";
import { parseActions } from "../actions/parse";

import ScrollToTop from "./layout/ScrollToTop";
import AuthenticatedLayoutRoute from "./routes/AuthenticatedLayoutRoute";
import PuzzleAreaContainer from "./containers/PuzzleAreaContainer";
import PuzzleSourceController from "./containers/PuzzleSourceController";

// test import
import ipuz from '../puzzleFiles/Jan0719.json'

class App extends React.Component {
  componentDidMount() {
    // current day puzzle
    // const formatDate = moment().format("YYMMDD");
    // this.props.downloadWSJ(`${formatDate}`);
    this.props.parseIpuz(ipuz);
  }

  render() {
    return (
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <AuthenticatedLayoutRoute
              isAuthenticated={true}
              path="/"
              exact
              component={PuzzleAreaContainer}
            />
            <AuthenticatedLayoutRoute
              isAuthenticated={true}
              path="/puzzles"
              exact
              component={PuzzleSourceController}
            />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default connect(
  null,
  {
    downloadWSJ: downloadActions.downloadWSJ,
    parseIpuz: parseActions.parseIpuz
  }
)(App);
