import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as moment from "moment";
import { gridTypes } from "../../actionTypes/grid";
import { gridActions } from "../../actions/grid";
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
    if (this.props.solved) {
      this.stopTimer()
    } else {
      if (this.props.paused && !prevProps.paused) {
        this.startTimer();
      } else if (!this.props.paused && prevProps.paused) {
        this.stopTimer();
      }
    }
  }

  componentWillUnmount() {
    console.log('timer unmount')
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
    switch (type) {
      case gridTypes.CHECK_WORD:
        this.props.checkWord();
        break;
      case gridTypes.CHECK_SQUARE:
        this.props.checkSquare();
        break;
      case gridTypes.CHECK_PUZZLE:
        this.props.checkPuzzle();
        break;
      case gridTypes.REVEAL_WORD:
        this.props.revealWord();
        break;
      case gridTypes.REVEAL_SQUARE:
        this.props.revealSquare();
        break;
      case gridTypes.REVEAL_PUZZLE:
        this.props.revealPuzzle();
        break;
      default:
        break;
    }
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
                this.onCheckChange(gridTypes.CHECK_SQUARE);
              }}
            >
              Square
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange(gridTypes.CHECK_WORD);
              }}
            >
              Word
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange(gridTypes.CHECK_PUZZLE);
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
                this.onCheckChange(gridTypes.REVEAL_SQUARE);
              }}
            >
              Square
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange(gridTypes.REVEAL_WORD);
              }}
            >
              Word
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onCheckChange(gridTypes.REVEAL_PUZZLE);
              }}
            >
              Puzzle
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item>
            <span style={{ color: "red", margin: "0 10px" }}>
              {this.displayTime}
            </span>
            {!this.props.solved && <Icon
              style={{ cursor: "pointer" }}
              onClick={this.onPauseButtonClick}
              name={this.props.paused ? "play" : "pause"}
            />}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  const { timer, paused, solved } = state.status;
  return { timer, paused, solved};
};

export default connect(
  mapStateToProps,
  {
    saveTimer: statusActions.saveTimer,
    togglePaused: statusActions.togglePaused,
    checkSquare: gridActions.checkSquare,
    checkWord: gridActions.checkWord,
    checkPuzzle: gridActions.checkPuzzle,
    revealSquare: gridActions.revealSquare,
    revealWord: gridActions.revealWord,
    revealPuzzle: gridActions.revealPuzzle
  }
)(PuzzleTools);
