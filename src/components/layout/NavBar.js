import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

import renderWithAuth from "../hocs/renderWithAuth";

import LoginContainer from "../containers/LoginContainer";

const SavedPuzzles = () => (
  <NavLink exact to="/saved" className="item">
    Saved Puzzles
  </NavLink>
);

const SavedPuzzlesWithAuth = renderWithAuth(SavedPuzzles);

const NavBar = () => {
  return (
    <Menu inverted className="fixed">
      <Container>
        <NavLink exact to="/" className="item">
          Current Puzzle
        </NavLink>
        <NavLink exact to="/puzzles" className="item">
          Puzzle Sources
        </NavLink>
        <SavedPuzzlesWithAuth />
        <Menu.Menu position="right">
          <LoginContainer />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default NavBar;
