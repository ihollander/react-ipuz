import React from "react";
import { connect } from "react-redux";
import { broadcastMessage } from "../../actions/messages";

import ChatboxInput from "./ChatboxInput";

const ChatboxContainer = ({ broadcastMessage, puzzleId, messages }) => {
  const sendText = text => {
    broadcastMessage(puzzleId, text)
  }
  return (
    <>
      <ChatboxInput sendMessage={sendText} />
      <ul>
        {messages.map(m => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ game: { puzzleId, messages } }) => ({ puzzleId, messages });
export default connect(
  mapStateToProps,
  { broadcastMessage }
)(ChatboxContainer);
