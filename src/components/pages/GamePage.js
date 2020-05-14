import React from "react";
import ReactGA from 'react-ga'
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";

import { setCellValue, checkAnswer, revealAnswer } from "../../actions/puzzle";
import {
  getGame,
  updatePosition,
  pause,
  unpause,
  syncGame,
  updatePlayers,
  setActivePlayer
} from "../../actions/game";

import { addMessage } from "../../actions/messages";

import PuzzlePageLayout from "../layouts/PuzzlePageLayout";
import PuzzleWrapper from "../grid/PuzzleWrapper";

class GamePage extends React.Component {
  componentDidMount() {
    const { getGame, match, location } = this.props;
    getGame(match.params.id);
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(location.url)
    }
  }

  onActionCableDataReceived = ({ payload, type }) => {

    switch (type) {
      case "NEW_MESSAGE":
        this.props.addMessage(payload.message);
        break;
      case "USER_ENTERED_GAME":
        this.props.setActivePlayer(payload.user.username, true);
        break;
      case "USER_LEFT_GAME":
        this.props.setActivePlayer(payload.user.username, false);
        break;
      case "GAME_JOINED":
        // update players
        const players = {
          host: payload.puzzle.game.host_id.username,
          guest: payload.puzzle.game.guest_id.username
        };
        this.props.updatePlayers(players);
        break;
      case "UPDATE_POSITION":
        if (
          payload.user &&
          payload.user.username !== this.props.user.user.username
        ) {
          this.props.updatePosition(
            payload.user,
            payload.position.index,
            payload.position.direction
          );
        }
        break;
      case "UPDATE_CELL":
        if (
          payload.user &&
          payload.user.username !== this.props.user.user.username
        ) {
          this.props.setCellValue(
            payload.cell.index,
            payload.cell.value,
            payload.user.username
          );
        }
        break;
      case "CHECK_ANSWER":
        if (
          payload.user &&
          payload.user.username !== this.props.user.user.username
        ) {
          this.props.checkAnswer(payload.cells);
        }
        break;
      case "REVEAL_ANSWER":
        if (
          payload.user &&
          payload.user.username !== this.props.user.user.username
        ) {
          this.props.revealAnswer(payload.cells);
        }
        break;
      case "PAUSED":
        if (
          payload.user &&
          payload.user.username !== this.props.user.user.username
        ) {
          this.props.pause();
          this.props.syncGame(payload.puzzle);
        }
        break;
      case "UNPAUSED":
        if (
          payload.user &&
          payload.user.username !== this.props.user.user.username
        ) {
          this.props.unpause();
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { match } = this.props;

    return (
      <PuzzlePageLayout>
        <ActionCableConsumer
          channel={{
            channel: "GamesChannel",
            game_id: match.params.id
          }}
          onReceived={this.onActionCableDataReceived}
        />
        <PuzzleWrapper />
      </PuzzlePageLayout>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {
    getGame,
    updatePosition,
    setCellValue,
    checkAnswer,
    revealAnswer,
    pause,
    unpause,
    syncGame,
    setActivePlayer,
    updatePlayers,
    addMessage
  }
)(GamePage);
