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

  update(id, data) {
    return fetch(`${this.baseUrl}/games/${id}`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    }).then(this.handleResponse);
  }

  delete(id) {
    return fetch(`${this.baseUrl}/games/${id}`, {
      method: "DELETE",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      }
    })
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

  checkAnswer(id, data) {
    fetch(`${this.baseUrl}/games/${id}/check_answer`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    })
  }

  revealAnswer(id, data) {
    fetch(`${this.baseUrl}/games/${id}/reveal_answer`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    })
  }

  pause(id, data) {
    fetch(`${this.baseUrl}/games/${id}/pause`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    })
  }

  unpause(id) {
    fetch(`${this.baseUrl}/games/${id}/unpause`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      }
    })
  }

  markActive(id) {
    fetch(`${this.baseUrl}/games/${id}/mark_active`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      }
    })
  }

  markInactive(id) {
    fetch(`${this.baseUrl}/games/${id}/mark_inactive`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      }
    })
  }

  leaveGames() {
    fetch(`${this.baseUrl}/games/leave_all`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      }
    })
  }
}

const adaptor = new GameAdaptor()
export default adaptor