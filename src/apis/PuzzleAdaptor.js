import BaseApiAdaptor from "./BaseApiAdaptor";

class PuzzleAdaptor extends BaseApiAdaptor {

  create(data) {
    return fetch(`${this.baseUrl}/puzzles`, {
      method: "POST",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    }).then(this.handleResponse);
  }

  get(id) {
    return fetch(`${this.baseUrl}/puzzles/${id}`, {
      method: "GET",
      headers: this.authHeader
    }).then(this.handleResponse);
  }

  getAll() {
    return fetch(`${this.baseUrl}/puzzles`, {
      method: "GET",
      headers: this.authHeader
    }).then(this.handleResponse);
  }

  update(data, id) {
    return fetch(`${this.baseUrl}/puzzles/${id}`, {
      method: "PATCH",
      headers: {
        ...this.authHeader,
        ...this.defaultHeaders
      },
      body: JSON.stringify(data)
    }).then(this.handleResponse);
  }
}

const adaptor = new PuzzleAdaptor()
export default adaptor