import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { EmojiConvertor } from "emoji-js";

import {
  showLoginModal,
  showSignUpModal,
  showProfileModal
} from "../../actions/modal";
import { signOut } from "../../actions/auth";

const emojiConvertor = new EmojiConvertor();

const LoginContainer = ({
  isSignedIn,
  user,
  signOut,
  showProfileModal,
  showSignUpModal,
  showLoginModal
}) => {
  return isSignedIn ? (
    <>
      <Menu.Item>
        <span style={{ margin: "5px" }}>{`Logged in as ${
          user.user.username
        }`}</span>
        <span style={{ fontSize: "24px" }}>
          {user.user.avatar && emojiConvertor.replace_colons(user.user.avatar)}
        </span>
      </Menu.Item>
      <Menu.Item onClick={showProfileModal}>Update Profile</Menu.Item>
      <Menu.Item onClick={signOut}>Logout</Menu.Item>
    </>
  ) : (
    <>
      <Menu.Item onClick={showSignUpModal}>Sign Up</Menu.Item>
      <Menu.Item onClick={showLoginModal}>Login</Menu.Item>
    </>
  );
};

const mapStateToProps = ({ auth: { isSignedIn, user } }) => ({
  isSignedIn,
  user
});

export default connect(
  mapStateToProps,
  {
    signOut,
    showLoginModal,
    showSignUpModal,
    showProfileModal
  }
)(LoginContainer);
