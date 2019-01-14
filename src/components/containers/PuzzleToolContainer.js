import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as moment from "moment";

import { puzzleActions } from "../../actions/puzzle";
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
      this.stopTimer();
    } else {
      if (this.props.paused && !prevProps.paused) {
        this.startTimer();
      } else if (!this.props.paused && prevProps.paused) {
        this.stopTimer();
      }
    }
  }

  componentWillUnmount() {
    console.log("timer unmount");
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
    const { cells, selectedCellIndex, selectedDirection } = this.props;
    const selectedCells = [];

    switch (type) {
      case "CHECK_SQUARE":
      case "REVEAL_SQUARE":
        selectedCells.push(selectedCellIndex);
        break;
      case "CHECK_WORD":
      case "REVEAL_WORD":
        const selectedCell = cells.find(c => c.index === selectedCellIndex);
        cells.forEach(c => {
          const selectedClue =
            c.clues &&
            ((selectedDirection === "ACROSS" &&
              c.clues.across === selectedCell.clues.across) ||
              (selectedDirection === "DOWN" &&
                c.clues.down === selectedCell.clues.down));
          if (selectedClue) selectedCells.push(c.index);
        });
        break;
      case "CHECK_PUZZLE":
      case "REVEAL_PUZZLE":
        cells.forEach(c => {
          if (c.type !== "BLACK") selectedCells.push(c.index);
        });
        break;
      default:
        break;
    }

    switch (type) {
      case "CHECK_SQUARE":
      case "CHECK_WORD":
      case "CHECK_PUZZLE":
        this.props.checkAnswer(selectedCells);
        break;
      case "REVEAL_WORD":
      case "REVEAL_SQUARE":
      case "REVEAL_PUZZLE":
        this.props.revealAnswer(selectedCells);
        break;
      default:
        break;
    }
  };

  onRebusClick = () => {
    this.props.toggleRebus();
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
        <Menu.Item
          name="rebus"
          active={this.props.rebus}
          onClick={this.onRebusClick}
        >
          Rebus
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <span style={{ color: "red", margin: "0 10px" }}>
              {this.displayTime}
            </span>
            {!this.props.solved && (
              <Icon
                style={{ cursor: "pointer" }}
                onClick={this.onPauseButtonClick}
                name={this.props.paused ? "play" : "pause"}
              />
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = ({
  status: {
    timer,
    paused,
    solved,
    rebus,
    selectedDirection,
    selectedCellIndex
  },
  puzzle: {
    grid: { cells }
  }
}) => {
  return {
    timer,
    paused,
    solved,
    rebus,
    cells,
    selectedCellIndex,
    selectedDirection
  };
};

export default connect(
  mapStateToProps,
  {
    saveTimer: statusActions.saveTimer,
    togglePaused: statusActions.togglePaused,
    toggleRebus: statusActions.toggleRebus,
    checkAnswer: puzzleActions.checkAnswer,
    revealAnswer: puzzleActions.revealAnswer,
    setCellValue: puzzleActions.setCellValue
  }
)(PuzzleTools);
