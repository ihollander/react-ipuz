import "./App.css";

import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";

import ScrollToTop from "./layout/ScrollToTop";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import ModalContainer from "./modals/ModalContainer";

import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";

class App extends React.Component {

  render() {
    return (
      <>
        <ModalContainer />
        <Router history={history}>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <AuthenticatedRoute
                path="/lobby"
                exact
                component={LobbyPage}
              />
              <AuthenticatedRoute
                path="/game/:id"
                exact
                component={GamePage}
              />
            </Switch>
          </ScrollToTop>
        </Router>
      </>
    );
  }
}

export default App;
