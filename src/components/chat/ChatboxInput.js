import React from "react";
import { Form } from "semantic-ui-react";

class ChatboxInput extends React.Component {
  state = {
    text: ""
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  onFormSubmit = () => {
    this.props.sendMessage(this.state.text);
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <input
          placeholder="Say something..."
          style={{ width: "100%" }}
          autoComplete="off"
          type="text"
          name="text"
          value={this.state.text}
          onChange={this.onInputChange}
        />
      </Form>
    );
  }
}

export default ChatboxInput;
