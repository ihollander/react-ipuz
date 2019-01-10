import "./App.css";

import React from "react";
import {connect} from 'react-redux'
import { Router, Switch } from "react-router-dom";
import * as moment from 'moment'

import history from "../history";

import {downloadActions} from '../actions/download'

import ScrollToTop from "./layout/ScrollToTop";
import AuthenticatedLayoutRoute from "./routes/AuthenticatedLayoutRoute";
import PuzzleAreaContainer from "./containers/PuzzleAreaContainer";
import PuzzleSourceController from "./containers/PuzzleSourceController";

class App extends React.Component {

  componentDidMount() {
    // current day puzzzzz
    const formatDate = moment().format("YYMMDD")
    this.props.downloadPuzzle(`http://localhost:4000/api/v1/puzzle_proxy/wsj/${formatDate}`)
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

export default connect(null, {
  downloadPuzzle: downloadActions.downloadPuzzle
})(App);
