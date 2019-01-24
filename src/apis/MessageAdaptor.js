import BaseApiAdaptor from "./BaseApiAdaptor";

class MessageAdaptor extends BaseApiAdaptor {

  create(gameId, data) {
    return fetch(`${this.baseUrl}/games/${gameId}/messages`, {
      method: "POST",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    }).then(this.handleResponse);
  }
}

const adaptor = new MessageAdaptor()
export default adaptor