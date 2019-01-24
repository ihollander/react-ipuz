import React from "react";
import { Comment, Ref } from "semantic-ui-react";
import * as moment from "moment";

import emojiConverter from "../../services/emojiConverter";

class ChatItem extends React.Component {
  commentRef = React.createRef();

  componentDidMount() {
    const { newest } = this.props;
    const target = this.commentRef.current;
    if (newest && target) {
      target.parentNode.scrollTop =
        target.offsetTop - target.parentNode.offsetTop;
    }
  }

  renderDate() {
    return moment(this.props.message.created_at).format("M/D h:mma");
  }

  render() {
    const { message } = this.props;
    return (
      <Ref innerRef={this.commentRef}>
        <Comment>
          <div className="avatar">
            <div style={{ fontSize: "22px" }}>
              {message.user.avatar &&
                emojiConverter.replace_colons(message.user.avatar)}
            </div>
          </div>
          <Comment.Content>
            <Comment.Author as="span">{message.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{this.renderDate()}</div>
            </Comment.Metadata>
            <Comment.Text>{message.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Ref>
    );
  }
}

export default ChatItem;
