import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import history from "../../history";
import gridbuds from "../../assets/gridbuds.png";

import { showLoginModal, showSignUpModal } from "../../actions/modal";
import LoginLayout from "../layouts/LoginLayout";

class HomePage extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      history.push("/lobby");
    }
  }

  render() {
    return (
      <LoginLayout>
        <div
          style={{
            backgroundImage: `radial-gradient(rgba(0,0,0,0.01), rgba(0,0,0,0.3)), url(${gridbuds})`
          }}
          className="login-container"
        />
        <div className="login-button-container">
          <div className="login-buttons">
            <Button primary size="big" onClick={this.props.showLoginModal}>
              Login
              <Icon name="right arrow" />
            </Button>
            <Button color="red" size="big" onClick={this.props.showSignUpModal}>
              Sign Up
              <Icon name="user plus" className="right" />
            </Button>
          </div>
        </div>
      </LoginLayout>
    );
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(
  mapStateToProps,
  {
    showLoginModal,
    showSignUpModal
  }
)(HomePage);
