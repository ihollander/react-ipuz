import React from "react";

class RebusInput extends React.Component {
  state = {
    text: ""
  };

  inputRef = React.createRef();

  componentDidMount() {
    // this.inputRef.current.focus()
    this.setState(
      {
        text: this.props.cell.guess
      },
      () => {
        this.resizeInput();
        this.inputRef.current && this.inputRef.current.focus();
      }
    );
  }

  onInputChange = ({ target: { value } }) => {
    this.setState(
      {
        text: value.toUpperCase()
      },
      () => this.resizeInput()
    );
  };

  onInputKeyDown = (e) => {
    // listen for enter/tab key press
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault()
      this.props.onRebusSubmit(this.state.text);
    }
  };

  onInputBlur = () => {
    // send up the state via callback
    this.props.onRebusSubmit(this.state.text);
  };

  resizeInput() {
    if (this.inputRef.current) {
      this.inputRef.current.size = this.state.text.length || 1;
    }
  }

  render() {
    const { display } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          top: `${display.y}px`,
          left: `${display.x}px`,
          height: `${display.height}px`
        }}
      >
        <input
          ref={this.inputRef}
          style={{
            minWidth: `${display.width}px`,
            height: "100%",
            border: "2px solid red",
            fontSize: "22px",
            outline: "none"
          }}
          value={this.state.text}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          onKeyDown={this.onInputKeyDown}
        />
      </div>
    );
  }
}

export default RebusInput;
