import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { authActions } from "../../actions/auth";

import LoginModal from "../modals/LoginModal";
import SignUpModal from "../modals/SignUpModal";

class LoginContainer extends React.Component {
  state = {
    loginModalOpen: false,
    signUpModalOpen: false
  };

  onSignUpClick = () =>
    this.setState({ loginModalOpen: false, signUpModalOpen: true });

  onSignUpModalClose = () => this.setState({ signUpModalOpen: false });

  onSignUpSubmit = formData => {
    this.props.signUp(formData);
    this.setState({ signUpModalOpen: false });
  };
  onLoginClick = () =>
    this.setState({ loginModalOpen: true, signUpModalOpen: false });

  onLoginModalClose = () => this.setState({ loginModalOpen: false });

  onLoginSubmit = formData => {
    this.props.signIn(formData);
    this.setState({ loginModalOpen: false });
  };

  onLogoutClick = () => this.props.signOut();

  render() {
    if (this.props.isSignedIn) {
      return <Menu.Item onClick={this.onLogoutClick}>Logout</Menu.Item>;
    }

    return (
      <>
        <Menu.Item onClick={this.onSignUpClick}>Sign Up</Menu.Item>
        <Menu.Item onClick={this.onLoginClick}>Login</Menu.Item>
        <LoginModal
          modalOpen={this.state.loginModalOpen}
          onModalClose={this.onLoginModalClose}
          onModalToggle={this.onSignUpClick}
          onFormSubmit={this.onLoginSubmit}
        />
        <SignUpModal
          modalOpen={this.state.signUpModalOpen}
          onModalClose={this.onSignUpModalClose}
          onModalToggle={this.onLoginClick}
          onFormSubmit={this.onSignUpSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(
  mapStateToProps,
  {
    signIn: authActions.signIn,
    signUp: authActions.signUp,
    signOut: authActions.signOut
  }
)(LoginContainer);
