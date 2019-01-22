import React from "react";
import { Table } from "semantic-ui-react";
import GameItem from "./GameItem";

const GameList = ({ games, user, onJoinGameClick, onResumeGameClick, onDeleteGameClick }) => {
  const renderGames = () => {
    return games.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).map(game => {
      const isHost = user.user.username === game.host_id.username;
      const isGuest = game.guest_id && user.user.username === game.guest_id.username;
      const isFull = game.host_id && game.guest_id;
      return (
        <GameItem
          key={game.id}
          game={game}
          onDeleteGameClick={onDeleteGameClick}
          onResumeGameClick={onResumeGameClick}
          onJoinGameClick={onJoinGameClick}
          isHost={isHost}
          isGuest={isGuest}
          isFull={isFull}
          updatedAt={game.updated_at}
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
          <Table.HeaderCell>Guest Solver</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
          <Table.HeaderCell>Last Update</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {renderGames()}
      </Table.Body>
    </Table>
  );
};

export default GameList;
