import React from "react";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import { Button, Segment, Header } from "semantic-ui-react";

import { showCreateGameModal } from "../../actions/modal";
import { addGame, getGames, joinGame, updateLobbyGames } from "../../actions/game";

import history from "../../history";

import GameList from "../lobby/GameList";
import DefaultLayout from "../layouts/DefaultLayout";

class LobbyPage extends React.Component {
  componentDidMount() {
    this.props.getGames();
  }

  onJoinGameClick = gameId => {
    this.props.joinGame(gameId);
  };

  onResumeGameClick = gameId => {
    history.push(`/game/${gameId}`);
  };

  handleSocketResponse = data => {
    console.log(data)
    switch (data.type) {
      case "NEW_GAME":
        this.props.addGame(data.payload);
        break;
      case "GAME_UPDATED":
        this.props.updateLobbyGames(data.payload)
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <DefaultLayout>
        <ActionCable
          channel={{ channel: "LobbyChannel" }}
          onReceived={this.handleSocketResponse}
        />
        <Segment>
          <Header as="h2">Lobby</Header>
          <Button onClick={this.props.showCreateGameModal}>Create Game</Button>
          <GameList
            games={this.props.games}
            user={this.props.user}
            onResumeGameClick={this.onResumeGameClick}
            onJoinGameClick={this.onJoinGameClick}
          />
        </Segment>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = ({ lobby: { games }, auth: { user } }) => ({
  games,
  user
});

export default connect(
  mapStateToProps,
  {
    addGame,
    getGames,
    joinGame,
    showCreateGameModal,
    updateLobbyGames
  }
)(LobbyPage);
