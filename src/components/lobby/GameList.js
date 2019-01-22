import React from "react";
import { Table } from "semantic-ui-react";
import GameItem from "./GameItem";

const GameList = ({ games, user, onJoinGameClick, onResumeGameClick }) => {
  const renderGames = () => {
    return games.map(game => {
      const isHost = user.username === game.host_id.username;
      const isGuest = game.guest_id && user.username === game.guest_id.username;
      const isFull = game.host_id && game.guest_id;
      return (
        <GameItem
          key={game.id}
          game={game}
          onResumeGameClick={onResumeGameClick}
          onJoinGameClick={onJoinGameClick}
          isHost={isHost}
          isGuest={isGuest}
          isFull={isFull}
        />
      );
    });
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Puzzle</Table.HeaderCell>
          <Table.HeaderCell>Host</Table.HeaderCell>
          <Table.HeaderCell>Guest</Table.HeaderCell>
          <Table.HeaderCell>Play</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {renderGames()}
      </Table.Body>
    </Table>
  );
};

export default GameList;
