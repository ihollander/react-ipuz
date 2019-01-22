import React from "react";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";

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

import DefaultLayout from "../layouts/DefaultLayout";
import PuzzleWrapper from "../grid/PuzzleWrapper";

class GamePage extends React.Component {
  componentDidMount() {
    const { getGame, match } = this.props;
    getGame(match.params.id);
  }

  onActionCableDataReceived = ({ payload, type }) => {
    console.log(type, payload);

    switch (type) {
      case "HOST_ACTIVE":
        this.props.setActivePlayer("host", true);
        break;
      case "HOST_INACTIVE":
        this.props.setActivePlayer("host", false);
        break;
      case "GUEST_ACTIVE":
        this.props.setActivePlayer("guest", true);
        break;
      case "GUEST_INACTIVE":
        this.props.setActivePlayer("guest", false);
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
          payload.user.username !== this.props.user.username
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
          payload.user.username !== this.props.user.username
        ) {
          this.props.setCellValue(payload.cell.index, payload.cell.value);
        }
        break;
      case "CHECK_ANSWER":
        if (
          payload.user &&
          payload.user.username !== this.props.user.username
        ) {
          this.props.checkAnswer(payload.cells);
        }
        break;
      case "REVEAL_ANSWER":
        if (
          payload.user &&
          payload.user.username !== this.props.user.username
        ) {
          this.props.revealAnswer(payload.cells);
        }
        break;
      case "PAUSED":
        if (
          payload.user &&
          payload.user.username !== this.props.user.username
        ) {
          this.props.pause();
          this.props.syncGame(payload.puzzle);
        }
        break;
      case "UNPAUSED":
        if (
          payload.user &&
          payload.user.username !== this.props.user.username
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

    console.log("gameID", match.params.id);
    return (
      <DefaultLayout>
        <ActionCable
          channel={{
            channel: "GamesChannel",
            game_id: match.params.id
          }}
          onReceived={this.onActionCableDataReceived}
        />
        <PuzzleWrapper />
      </DefaultLayout>
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
    updatePlayers
  }
)(GamePage);
