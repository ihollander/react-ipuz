import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { showLoginModal, showSignUpModal } from "../../actions/modal";
import { signOut } from "../../actions/auth";

const LoginContainer = ({ isSignedIn, signOut, showSignUpModal, showLoginModal }) => {
  return isSignedIn ? (
    <Menu.Item onClick={signOut}>Logout</Menu.Item>
  ) : (
    <>
      <Menu.Item onClick={showSignUpModal}>Sign Up</Menu.Item>
      <Menu.Item onClick={showLoginModal}>Login</Menu.Item>
    </>
  );
};

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(
  mapStateToProps,
  {
    signOut,
    showLoginModal,
    showSignUpModal
  }
)(LoginContainer);
