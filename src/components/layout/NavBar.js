import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

import LoginContainer from "../containers/LoginContainer";

const NavBar = () => {
  return (
    <Menu inverted className="fixed">
      <Container>
        <NavLink exact to="/lobby" className="item">
          Games
        </NavLink>
        <Menu.Menu position="right">
          <LoginContainer />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default NavBar;
