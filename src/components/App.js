import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Router, Switch } from "react-router-dom";
import * as moment from "moment";

import history from "../history";
import { downloadActions } from "../actions/download";
import { userActions } from "../actions/user";

import ScrollToTop from "./layout/ScrollToTop";
import AuthenticatedLayoutRoute from "./routes/AuthenticatedLayoutRoute";
import CurrentPuzzlePage from "./pages/CurrentPuzzlePage";
import PuzzleSourcePage from "./pages/PuzzleSourcePage";
import SavedPuzzlesPage from "./pages/SavedPuzzlesPage";
import DefaultLayoutRoute from "./routes/DefaultLayoutRoute";

import ModalContainer from "./modals/ModalContainer";

class App extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.getSavedPuzzles();
    }

    const formattedDate = moment().format("YYMMDD");
    this.props.downloadWSJ(formattedDate);
  }
  render() {
    const { isSignedIn } = this.props;
    return (
      <>
        <ModalContainer />
        <Router history={history}>
          <ScrollToTop>
            <Switch>
              <DefaultLayoutRoute
                path="/"
                exact
                component={CurrentPuzzlePage}
              />
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
      </>
    );
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(
  mapStateToProps,
  {
    downloadWSJ: downloadActions.downloadWSJ,
    getSavedPuzzles: userActions.getSavedPuzzles
  }
)(App);
