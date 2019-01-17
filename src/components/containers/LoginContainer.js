import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { modalActions } from "../../actions/modal";
import { authActions } from "../../actions/auth";

const LoginContainer = ({ isSignedIn, signOut, showSignUp, showLogin }) => {
  return isSignedIn ? (
    <Menu.Item onClick={signOut}>Logout</Menu.Item>
  ) : (
    <>
      <Menu.Item onClick={showSignUp}>Sign Up</Menu.Item>
      <Menu.Item onClick={showLogin}>Login</Menu.Item>
    </>
  );
};

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(
  mapStateToProps,
  {
    signOut: authActions.signOut,
    showLogin: modalActions.showLogin,
    showSignUp: modalActions.showSignUp
  }
)(LoginContainer);
