import React from "react";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";

import { setCellValue, checkAnswer, revealAnswer } from "../../actions/puzzle";
import { getGame, updatePosition, pause, unpause, syncGame, updatePlayers } from "../../actions/game";

import DefaultLayout from "../layouts/DefaultLayout";
import PuzzleWrapper from "../grid/PuzzleWrapper";

class GamePage extends React.Component {
  componentDidMount() {
    const { getGame, match } = this.props;
    getGame(match.params.id);
  }

  onActionCableDataReceived = ({ payload, type }) => {
    console.log(type, payload);
    if (payload.user && payload.user.username !== this.props.user.username) {
      switch (type) {
        case "GAME_JOINED":
          // update players
          debugger
          const players = {
            host: payload.puzzle.host_id.username,
            guest: payload.puzzle.guest_id.username
          }
          this.props.updatePlayers(players)
          break;
        case "UPDATE_POSITION":
          this.props.updatePosition(
            payload.user,
            payload.position.index,
            payload.position.direction
          );
          break;
        case "UPDATE_CELL":
          this.props.setCellValue(payload.cell.index, payload.cell.value);
          break;
        case "CHECK_ANSWER":
          this.props.checkAnswer(payload.cells);
          break;
        case "REVEAL_ANSWER":
          this.props.revealAnswer(payload.cells);
          break;
        case "PAUSED":
          this.props.pause();
          this.props.syncGame(payload.puzzle)
          break;
        case "UNPAUSED":
          this.props.unpause();
          break;
        default:
          break;
      }
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
    updatePlayers
  }
)(GamePage);
