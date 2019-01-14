import React from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../layout/NavBar";

const DefaultLayout = ({ children }) => (
  <>
    <NavBar />
    <Container className="main">{children}</Container>
  </>
);

export default DefaultLayout;
