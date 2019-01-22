import React from "react";
import { connect } from "react-redux";
import { Segment, Header, Button } from "semantic-ui-react";

import history from "../../history";

import { showLoginModal, showSignUpModal } from "../../actions/modal";

class HomePage extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      history.push("/lobby");
    }
  }

  render() {
    return (
      <>
        <Segment>
          <Header as="h1">Welcome to Gridbuds!</Header>
          <p>Lorem ipsum thingus.</p>
          <Button onClick={this.props.showLoginModal}>Login</Button>
          <Button onClick={this.props.showSignUpModal}>Sign Up</Button>
        </Segment>
      </>
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
