import React from "react";
import { Table, Button } from "semantic-ui-react";

const GameItem = ({
  game,
  isHost,
  isGuest,
  isFull,
  updatedAt,
  onJoinGameClick,
  onResumeGameClick,
  onDeleteGameClick
}) => {
  const renderResume = () => {
    if (isHost) {
      return (
        <>
          <Button onClick={() => onResumeGameClick(game.id)}>Resume</Button>
          <Button onClick={() => onDeleteGameClick(game.id)}>Delete</Button>
        </>
      );
    } else if (!isFull || (isGuest && game.host_active)) {
      return <Button onClick={() => onJoinGameClick(game.id)}>Join</Button>;
    } else {
      return null;
    }
  };

  return (
    <Table.Row>
      <Table.Cell>{game.title}</Table.Cell>
      <Table.Cell positive={game.host_active}>
        {game.host_id.username}
      </Table.Cell>
      <Table.Cell positive={game.guest_active}>
        {game.guest_id && game.guest_id.username}
      </Table.Cell>
      <Table.Cell>{renderResume()}</Table.Cell>
      <Table.Cell>{updatedAt}</Table.Cell>
    </Table.Row>
  );
};

export default GameItem;
