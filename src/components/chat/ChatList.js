import React from "react";
import { Comment, Header } from "semantic-ui-react";

import ChatItem from "./ChatItem";

const ChatList = ({ messages }) => {
  const renderMessages = () =>
    messages.map(m => <ChatItem key={m.id} message={m} newest={m === messages[messages.length -1]} />);

  return (
    <>
      <Header as="h3" dividing>
        Chat
      </Header>
      <Comment.Group
        style={{
          maxHeight: "560px",
          marginBottom: "2rem",
          overflowX: "auto"
        }}
      >
        {renderMessages()}
      </Comment.Group>
    </>
  );
};

export default ChatList;
