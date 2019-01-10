import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

class PuzzleTools extends React.Component {
  onCheckChange = type => {
    this.props.dispatch({ type });
  };
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
      </Menu>
    );
  }
}

export default connect()(PuzzleTools);
