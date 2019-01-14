import React from "react";
import { Modal, Button, Header, Icon, Form } from "semantic-ui-react";

class LoginModal extends React.Component {
  state = { username: "", password: "", password_confirmation: "" };

  onFormSubmit = e => {
    this.props.onFormSubmit(this.state);
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.props.onModalClose}
        size="small"
      >
        <Header icon="user" content="Sign Up" />
        <Modal.Content>
          <p>
            Sign up for an account to save your progress and view stats for
            previously completed puzzles.
          </p>
          <p>
            Have an account?
            <Button onClick={this.props.onModalToggle}>Log in</Button>
          </p>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                placeholder="Confirm Password"
                type="password"
                name="password_confirmation"
                value={this.state.password_confirmation}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Button primary>
              <Icon name="user" /> Sign Up
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.onModalClose} color="red">
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default LoginModal;
