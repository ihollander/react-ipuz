import BaseApiAdaptor from "./BaseApiAdaptor";

class GameAdaptor extends BaseApiAdaptor {

  create(data) {
    return fetch(`${this.baseUrl}/games`, {
      method: "POST",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    }).then(this.handleResponse);
  }

  get(id) {
    return fetch(`${this.baseUrl}/games/${id}`, {
      method: "GET",
      headers: this.authHeader
    }).then(this.handleResponse);
  }

  getAll() {
    return fetch(`${this.baseUrl}/games`, {
      method: "GET",
      headers: this.authHeader
    }).then(this.handleResponse);
  }

  update(data, id) {
    return fetch(`${this.baseUrl}/games/${id}`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    }).then(this.handleResponse);
  }

  join(id) {
    return fetch(`${this.baseUrl}/games/${id}/join`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      }
    }).then(this.handleResponse);
  }

  // websocket will handle response
  updateCellValue(id, data) {
    fetch(`${this.baseUrl}/games/${id}/update_cell`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    })
  }

  // websocket will handle response
  updatePosition(id, data) {
    fetch(`${this.baseUrl}/games/${id}/update_position`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    })
  }
}

const adaptor = new GameAdaptor()
export default adaptor