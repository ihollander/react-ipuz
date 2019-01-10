import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

const NavBar = () => {

  return (
    <Menu inverted className="fixed">
      <Container>
        <NavLink exact to="/puzzles" className="item">
          Puzzles
        </NavLink>
        <Menu.Menu position="right">
          <Menu.Item>Login/Logout</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default NavBar;
