import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import * as moment from "moment";

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
          <Button icon color="red" onClick={() => onDeleteGameClick(game.id)}>
            <Icon name="trash" />
          </Button>
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
      <Table.Cell style={{ fontWeight: "bold" }}>{game.title}</Table.Cell>
      <Table.Cell positive={game.host_active}>
        {game.host_id.username}
      </Table.Cell>
      <Table.Cell positive={game.guest_active}>
        {game.guest_id && game.guest_id.username}
      </Table.Cell>
      <Table.Cell>{renderResume()}</Table.Cell>
      <Table.Cell>{moment(updatedAt).format("M/D/YY @ h:mm a")}</Table.Cell>
    </Table.Row>
  );
};

export default GameItem;
