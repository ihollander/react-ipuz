import React from "react";
import { BrowserRouter } from "react-router-dom";

import './App.css'

import AuthenticatedLayoutRoute from "./routes/AuthenticatedLayoutRoute";
import PuzzleAreaContainer from "./containers/PuzzleAreaContainer";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AuthenticatedLayoutRoute
          isAuthenticated={true}
          path="/"
          exact
          component={PuzzleAreaContainer}
        />
      </BrowserRouter>
    );
  }
}

export default App;
