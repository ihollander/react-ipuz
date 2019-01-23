import messageAdaptor from "../apis/MessageAdaptor";
import { messageTypes } from "../actionTypes/message";

export const broadcastMessage = (gameId, text) => {
  return dispatch => {
    debugger
    messageAdaptor.create(gameId, { text }).then(
      message => {
        dispatch({
          type: messageTypes.MESSAGE_SENT,
          payload: message
        });
      },
      error => {
        console.error(error);
      }
    );
  };
};

export const addMessage = payload => ({
  type: messageTypes.MESSAGE_RECEIVED,
  payload
});
