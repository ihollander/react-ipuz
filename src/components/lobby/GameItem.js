import React from "react";
import { Table, Button } from "semantic-ui-react";

const GameItem = ({
  game,
  isHost,
  isGuest,
  isFull,
  onJoinGameClick,
  onResumeGameClick
}) => {
  const renderGuestCell = () => {
    if (game.guest_id && game.guest_id.username) {
      return game.guest_id.username;
    } else if (!isHost && !isFull) {
      return <Button onClick={() => onJoinGameClick(game.id)}>Join</Button>;
    } else {
      return null;
    }
  };

  const renderResume = () => {
    if (isHost) {
      return <Button onClick={() => onResumeGameClick(game.id)}>Resume</Button>;
    } else if (isGuest && game.host_active) {
      return <Button onClick={() => onResumeGameClick(game.id)}>Join</Button>;
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
      <Table.Cell positive={game.guest_active}>{renderGuestCell()}</Table.Cell>
      <Table.Cell>{renderResume()}</Table.Cell>
    </Table.Row>
  );
};

export default GameItem;
