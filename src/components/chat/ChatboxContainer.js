import React from "react";
import { connect } from "react-redux";

import { broadcastMessage } from "../../actions/messages";

import ChatboxInput from "./ChatboxInput";
import ChatList from './ChatList'

const ChatboxContainer = ({ broadcastMessage, puzzleId, messages }) => {
  
  const sendText = text => {
    broadcastMessage(puzzleId, text);
  };
  return (
    <>
      <ChatList messages={messages} />
      <ChatboxInput sendMessage={sendText} />
    </>
  );
};

const mapStateToProps = ({ game: { puzzleId, messages } }) => ({
  puzzleId,
  messages
});
export default connect(
  mapStateToProps,
  { broadcastMessage }
)(ChatboxContainer);
