import React from "react";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";

import { getGame, updatePosition } from "../../actions/game";

import DefaultLayout from "../layouts/DefaultLayout";
import PuzzleWrapper from "../grid/PuzzleWrapper";

class GamePage extends React.Component {
  componentDidMount() {
    const { getGame, match } = this.props;
    getGame(match.params.id);
  }

  onActionCableDataReceived = data => {
    console.log(data);
    switch (data.type) {
      case "UPDATE_POSITION":
        if (data.payload.user.username !== this.props.user.username) {
          this.props.updatePosition(
            data.payload.user,
            data.payload.position.index,
            data.payload.position.direction
          );
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
  { getGame, updatePosition }
)(GamePage);
