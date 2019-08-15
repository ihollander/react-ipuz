import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Icon, Form, Message } from "semantic-ui-react";

import { signIn } from "../../actions/auth";
import { showSignUpModal } from "../../actions/modal";

class LoginModal extends React.Component {
  state = { username: "", password: "" };

  onFormSubmit = () => {
    this.props.signIn(this.state);
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props.error);
    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.props.onModalClose}
        size="small"
      >
        <Header icon="user" content="Log in" />
        <Modal.Content>
          <Form
            error={this.props.error !== null ? true : false}
            onSubmit={this.onFormSubmit}
          >
            <Form.Field>
              <label>Username</label>
              <Form.Input
                autoComplete="off"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Form.Input
                autoComplete="off"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <input type="submit" style={{ display: "none" }} />
            <Message
              error
              header="Login Error"
              content={this.props.error && this.props.error.message}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.props.showSignUpModal()}>
            Need an account? Sign Up
          </Button>
          <Button primary onClick={this.onFormSubmit}>
            <Icon name="user" /> Log in
          </Button>
          <Button onClick={this.props.onModalClose} color="red">
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth: { error, loading } }) => ({ error, loading });

export default connect(
  mapStateToProps,
  {
    signIn,
    showSignUpModal
  }
)(LoginModal);
