import React from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../layout/NavBar";

const PuzzlePageLayout = ({ children }) => (
  <>
    <NavBar className="puzzle-wide" />
    <Container style={{ width: "90vw" }} className="main">
      {children}
    </Container>
  </>
);

export default PuzzlePageLayout;
