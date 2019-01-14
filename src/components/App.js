import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Router, Switch } from "react-router-dom";

import history from "../history";

import ScrollToTop from "./layout/ScrollToTop";
import AuthenticatedLayoutRoute from "./routes/AuthenticatedLayoutRoute";
import CurrentPuzzlePage from "./pages/CurrentPuzzlePage";
import PuzzleSourcePage from "./pages/PuzzleSourcePage";
import SavedPuzzlesPage from "./pages/SavedPuzzlesPage";
import DefaultLayoutRoute from "./routes/DefaultLayoutRoute";

class App extends React.Component {
  componentDidMount() {
    // load a default puzzle?
  }

  render() {
    const { isSignedIn } = this.props;
    return (
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <DefaultLayoutRoute path="/" exact component={CurrentPuzzlePage} />
            <DefaultLayoutRoute
              path="/puzzles"
              exact
              component={PuzzleSourcePage}
            />
            <AuthenticatedLayoutRoute
              isAuthenticated={isSignedIn}
              path="/saved"
              exact
              component={SavedPuzzlesPage}
            />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(mapStateToProps)(App);
