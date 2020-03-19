import React from "react";
import { List, Header } from "semantic-ui-react";
import ClueItem from "./ClueItem";

const ClueList = ({ heading, clues, userSelectedClue, onClueClick }) => {

  return (
    <>
      <Header size="medium">{heading}</Header>
      <List relaxed celled verticalAlign="middle" className="clue-list">
        {Object.keys(clues).map(clueId => (
          <ClueItem
            selected={
              userSelectedClue.text === clues[clueId].text &&
              userSelectedClue.label === clues[clueId].label
            }
            clue={clues[clueId]}
            key={clueId}
            onClueClick={onClueClick}
          />
        ))}
      </List>
    </>
  );
};

export default ClueList;
