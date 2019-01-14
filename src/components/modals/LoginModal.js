import React from "react";
import { Modal, Button, Header, Icon, Form } from "semantic-ui-react";

class LoginModal extends React.Component {
  state = { username: "", password: "" };

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
        <Header icon="user" content="Log in" />
        <Modal.Content>
          <p>
            Log in to save your progress and view stats for previously completed
            puzzles.
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
            <Button primary>
              <Icon name="user" /> Log in
            </Button>
            <p>
              Need an account?
              <Button onClick={this.props.onModalToggle}>Sign Up</Button>
            </p>
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
