import React from "react";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import { Button, Segment, Header } from "semantic-ui-react";

import { showCreateGameModal } from "../../actions/modal";
import { addGame, getGames, joinGame } from "../../actions/game";

import DefaultLayout from "../layouts/DefaultLayout";

class LobbyPage extends React.Component {
  componentDidMount() {
    this.props.getGames();
  }

  onJoinGameClick = gameId => {
    this.props.joinGame(gameId)
  }

  handleSocketResponse = data => {
    switch (data.type) {
      case "NEW_GAME":
        this.props.addGame(data.payload);
        break;
      default:
        console.log("socket response received:", data);
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
          <ul>
            {this.props.games.map(game => (
              <li key={game.id}>{game.title}<Button onClick={() => this.onJoinGameClick(game.id)}>Join</Button></li>
            ))}
          </ul>
        </Segment>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.lobby.games
  };
};

export default connect(
  mapStateToProps,
  {
    addGame,
    getGames,
    joinGame,
    showCreateGameModal
  }
)(LobbyPage);
