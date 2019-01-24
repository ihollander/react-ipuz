import React from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Input,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import EmojiPicker from "emoji-picker-react";

import emojiConverter from "../../services/emojiConverter";

import { signUp } from "../../actions/auth";
import { showLoginModal } from "../../actions/modal";

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
          <Form
            onSubmit={this.onFormSubmit}
            error={this.props.error !== null ? true : false}
          >
            <Form.Field>
              <label>Username</label>
              <Input
                placeholder="Username"
                name="username"
                value={this.state.form.username}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Emoji Avatar</label>
              <div style={{ fontSize: "34px" }}>{this.renderEmoji()}</div>
              <Button onClick={this.onShowEmojiPicker}>
                {this.state.pickerVisible ? "Save" : "Pick Emoji"}
              </Button>
              {this.state.pickerVisible && (
                <EmojiPicker
                  style={{ width: "400px" }}
                  onEmojiClick={this.onEmojiPicked}
                />
              )}
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.form.password}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <Input
                placeholder="Confirm Password"
                type="password"
                name="password_confirmation"
                value={this.state.form.password_confirmation}
                onChange={this.onInputChange}
              />
            </Form.Field>
            <input type="submit" style={{ display: "none" }} />
            <Message
              error
              header="Error"
              content={this.props.error && this.props.error.message}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.props.showLoginModal()}>
            Have an Account? Log in
          </Button>
          <Button primary onClick={this.onFormSubmit}>
            <Icon name="user" /> Sign Up
          </Button>
          <Button onClick={this.props.onModalClose} color="red">
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth: { error } }) => ({ error });

export default connect(
  mapStateToProps,
  {
    signUp,
    showLoginModal
  }
)(SignUpModal);
