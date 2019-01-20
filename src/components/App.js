import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Router, Switch } from "react-router-dom";

import history from "../history";
import { userActions } from "../actions/user";

import ScrollToTop from "./layout/ScrollToTop";
import AuthenticatedLayoutRoute from "./routes/AuthenticatedLayoutRoute";
import CurrentPuzzlePage from "./pages/CurrentPuzzlePage";
import HomePage from "./pages/HomePage";
import SavedPuzzlesPage from "./pages/SavedPuzzlesPage";
import DefaultLayoutRoute from "./routes/DefaultLayoutRoute";

import ModalContainer from "./modals/ModalContainer";
import SharedPuzzlePage from "./pages/SharedPuzzlePage";

class App extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.getSavedPuzzles();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSignedIn && !prevProps.isSignedIn) {
      this.props.getSavedPuzzles();
    }
  }

  render() {
    const { isSignedIn } = this.props;
    return (
      <>
        <ModalContainer />
        <Router history={history}>
          <ScrollToTop>
            <Switch>
              <DefaultLayoutRoute path="/" exact component={HomePage} />
              <DefaultLayoutRoute
                path="/puzzle"
                exact
                component={CurrentPuzzlePage}
              />
              <DefaultLayoutRoute
                path="/shared/:id"
                exact
                component={SharedPuzzlePage}
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
    getSavedPuzzles: userActions.getSavedPuzzles
  }
)(App);
