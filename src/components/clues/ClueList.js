import React from "react";
import { List, Header } from "semantic-ui-react";
import ClueItem from "./ClueItem";

const ClueList = ({ heading, clues, selectedClue, onClueClick }) => {
  return (
    <>
      <Header size="medium">{heading}</Header>
      <List relaxed celled verticalAlign="middle" className="clue-list">
        {clues.map(clue => (
          <ClueItem
            clue={clue}
            key={clue.label}
            selectedClue={selectedClue}
            onClueClick={onClueClick}
          />
        ))}
      </List>
    </>
  );
};

export default ClueList;
