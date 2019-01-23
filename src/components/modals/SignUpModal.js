import React from "react";
import { Modal, Button, Header, Icon, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { EmojiConvertor } from "emoji-js";

import { signUp } from "../../actions/auth";
import { showLoginModal } from "../../actions/modal";

const emojiConverter = new EmojiConvertor();

class SignUpModal extends React.Component {
  state = {
    form: {
      username: "",
      password: "",
      password_confirmation: "",
      avatar: ""
    },
    pickerVisible: false
  };

  onShowEmojiPicker = e => {
    e.preventDefault();
    this.setState({
      pickerVisible: !this.state.pickerVisible
    });
  };

  onFormSubmit = e => {
    this.props.signUp(this.state.form);
  };

  onInputChange = e => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  onEmojiPicked = (code, emoji) => {
    this.setState({
      form: { ...this.state.form, avatar: `:${emoji.name}:` }
    });
  };

  renderEmoji() {
    const { avatar } = this.state.form;
    return avatar === "" ? "" : emojiConverter.replace_colons(avatar);
  }

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
            <Button onClick={() => this.props.showLoginModal()}>Log in</Button>
          </p>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                name="username"
                value={this.state.form.username}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Emoji Avatar</label>
              <div style={{fontSize: "34px"}}>{this.renderEmoji()}</div>
              <Button onClick={this.onShowEmojiPicker}>
                {this.state.pickerVisible ? "Save" : "Pick emoji"}
              </Button>
              {this.state.pickerVisible && (
                <EmojiPicker style={{width: "400px"}} onEmojiClick={this.onEmojiPicked} />
              )}
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.form.password}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                placeholder="Confirm Password"
                type="password"
                name="password_confirmation"
                value={this.state.form.password_confirmation}
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

export default connect(
  null,
  {
    signUp,
    showLoginModal
  }
)(SignUpModal);
