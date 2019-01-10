import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as moment from "moment";
import { statusActions } from "../../actions/status";

class PuzzleTools extends React.Component {
  state = {
    timer: 0
  };

  // Lifecycle methods
  componentDidMount() {
    if (!this.props.paused) {
      this.startTimer();
    }
  }

  componentWillUpdate(prevProps) {
    if (this.props.paused && !prevProps.paused) {
      this.startTimer();
    } else if (!this.props.paused && prevProps.paused) {
      this.stopTimer();
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
  }

  // event handlers
  onCheckChange = type => {
    this.props.dispatch({ type });
  };

  onPauseButtonClick = () => {
    this.props.togglePaused();
  };

  get displayTime() {
    const format = this.state.timer > 60 * 60 * 1000 ? "H:mm:ss" : "mm:ss";
    return moment.utc(this.state.timer).format(format);
  }

  render() {
    return (
      <Menu secondary>
        <Dropdown item text="Check">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange("CHECK_SQUARE");
              }}
            >
              Square
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange("CHECK_WORD");
              }}
            >
              Word
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange("CHECK_PUZZLE");
              }}
            >
              Puzzle
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Reveal">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange("REVEAL_SQUARE");
              }}
            >
              Square
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange("REVEAL_WORD");
              }}
            >
              Word
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange("REVEAL_PUZZLE");
              }}
            >
              Puzzle
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item>
            <span style={{color:"red", margin: "0 10px"}}>{this.displayTime}</span>
            <Icon style={{cursor: "pointer"}}
              onClick={this.onPauseButtonClick}
              name={this.props.paused ? "play" : "pause"}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  const { timer, paused } = state.status;
  return { timer, paused };
};

export default connect(
  mapStateToProps,
  {
    saveTimer: statusActions.saveTimer,
    togglePaused: statusActions.togglePaused
  }
)(PuzzleTools);
