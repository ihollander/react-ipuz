import BaseApiAdaptor from "./BaseApiAdaptor";

class SharedGameAdaptor extends BaseApiAdaptor {

  create(puzzleId) {
    return fetch(`${this.baseUrl}/puzzles/${puzzleId}/shared_games`, {
      method: "POST",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      }
    }).then(this.handleResponse);
  }

  get(id) {
    return fetch(`${this.baseUrl}/shared_games/${id}`, {
      method: "GET",
      headers: this.authHeader
    }).then(this.handleResponse);
  }

  // websocket will handle response
  updateCellValue(id, data) {
    fetch(`${this.baseUrl}/shared_games/${id}/update_cell`, {
      method: "POST",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    })
  }

  // websocket will handle response
  updatePosition(id, data) {
    fetch(`${this.baseUrl}/shared_games/${id}/update_position`, {
      method: "POST",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    })
  }

}

const adaptor = new SharedGameAdaptor()
export default adaptor