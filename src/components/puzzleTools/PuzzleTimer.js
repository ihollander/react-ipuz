import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import * as moment from "moment";

class PuzzleTimer extends React.Component {
  state = {
    timer: 0
  };

  // Lifecycle methods
  componentDidMount() {
    if (this.props.timer) {
      this.setState({
        timer: this.props.timer
      });
    }
    if (!this.props.paused) {
      this.startTimer();
    }
  }

  componentWillUpdate(prevProps) {
    if (this.props.solved) {
      this.stopTimer();
    } else {
      if (this.props.timer !== prevProps.timer) {
        this.setState({
          timer: prevProps.timer
        });
      } else if (this.props.paused && !prevProps.paused) {
        this.startTimer();
      } else if (!this.props.paused && prevProps.paused) {
        this.stopTimer();
      }
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer + 1000
      }));
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.props.saveTimer(this.state.timer);
    this.props.savePuzzle(this.state.timer);
  }

  get displayTime() {
    const format = this.state.timer > 60 * 60 * 1000 ? "H:mm:ss" : "mm:ss";
    return moment.utc(this.state.timer).format(format);
  }

  render() {
    return (
      <Menu.Item>
        <span style={{ color: "red", margin: "0 10px" }}>
          {this.displayTime}
        </span>
        {!this.props.solved && (
          <Icon
            style={{ cursor: "pointer" }}
            onClick={() => this.props.togglePaused(this.state.timer)}
            name={this.props.paused ? "play" : "pause"}
          />
        )}
      </Menu.Item>
    );
  }
}

export default PuzzleTimer;
