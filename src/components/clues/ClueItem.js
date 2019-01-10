import React from "react";
import { List } from "semantic-ui-react";

const ClueItem = ({ clue, selectedClue, onClueClick }) => {
  return (
    <List.Item
      onClick={() => onClueClick(clue.label)}
      style={{ backgroundColor: clue === selectedClue ? "pink" : "" }}
    >
      <List.Content>
        <span className="clue-number">{`${clue.label}`}</span>
        {clue.text}
      </List.Content>
    </List.Item>
  );
};

export default ClueItem;
