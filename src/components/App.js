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
import LoadingModal from "./modals/LoadingModal";

class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    fetch(process.env.REACT_APP_API_ROOT).then(() =>
      this.setState({ loading: false })
    );
  }

  render() {
    if (this.state.loading) {
      return <LoadingModal />;
    }

    return (
      <>
        <ModalContainer />
        <Router history={history}>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <AuthenticatedRoute path="/lobby" exact component={LobbyPage} />
              <AuthenticatedRoute path="/game/:id" exact component={GamePage} />
            </Switch>
          </ScrollToTop>
        </Router>
      </>
    );
  }
}

export default App;
