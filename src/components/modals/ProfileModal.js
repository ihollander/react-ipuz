import React from "react";
import { Modal, Button, Header, Icon, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { EmojiConvertor } from "emoji-js";

import { updateProfile } from "../../actions/auth";

const emojiConverter = new EmojiConvertor();

class ProfileModal extends React.Component {
  state = {
    form: {
      avatar: ""
    },
    pickerVisible: false
  };

  componentDidMount() {
    this.setState({
      form: {
        ...this.state.form,
        avatar: this.props.user.user.avatar
      }
    });
  }

  onShowEmojiPicker = e => {
    e.preventDefault();
    this.setState({
      pickerVisible: !this.state.pickerVisible
    });
  };

  onFormSubmit = e => {
    this.props.updateProfile(this.state.form);
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
        <Header icon="user" content="Update Profile" />
        <Modal.Content>
          <p>Update your avatar emoji.</p>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Emoji Avatar</label>
              <div style={{ fontSize: "34px" }}>{this.renderEmoji()}</div>
              <Button onClick={this.onShowEmojiPicker}>
                {this.state.pickerVisible ? "Save" : "Pick emoji"}
              </Button>
              {this.state.pickerVisible && (
                <EmojiPicker
                  style={{ width: "400px" }}
                  onEmojiClick={this.onEmojiPicked}
                />
              )}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.onFormSubmit}>
            <Icon name="user" /> Update Profile
          </Button>
          <Button onClick={this.props.onModalClose} color="red">
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {
    updateProfile
  }
)(ProfileModal);
