import React from "react";

class ChatboxInput extends React.Component {
  state = {
    text: ""
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  onFormSubmit = e => {
    e.preventDefault()
    this.props.sendMessage(this.state.text)
    this.setState({
      text: ""
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          type="text"
          name="text"
          value={this.state.text}
          onChange={this.onInputChange}
        />
      </form>
    );
  }
}

export default ChatboxInput;