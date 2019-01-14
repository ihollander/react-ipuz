import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

import LoginContainer from '../containers/LoginContainer'

const NavBar = () => {

  return (
    <Menu inverted className="fixed">
      <Container>
        <NavLink exact to="/" className="item">
          Current Puzzle
        </NavLink>
        <NavLink exact to="/puzzles" className="item">
          Puzzles
        </NavLink>
        <Menu.Menu position="right">
          <LoginContainer />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default NavBar;
