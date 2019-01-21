import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";
import { getSavedPuzzles } from "../actions/user";

import ScrollToTop from "./layout/ScrollToTop";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import CurrentPuzzlePage from "./pages/CurrentPuzzlePage";
import HomePage from "./pages/HomePage";
import SavedPuzzlesPage from "./pages/SavedPuzzlesPage";

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
              <Route path="/" exact component={HomePage} />
              <Route path="/puzzle" component={CurrentPuzzlePage} />
              <AuthenticatedRoute
                path="/shared/:id"
                exact
                component={SharedPuzzlePage}
              />
              <AuthenticatedRoute
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
    getSavedPuzzles
  }
)(App);
