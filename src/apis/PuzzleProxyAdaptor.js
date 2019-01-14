class PuzzleProxyAdaptor {
  constructor() {
    this.baseUrl = 'http://localhost:4000/api/v1/puzzle_proxy'
  }

  getWsj(date) {
    return this.sendRequest(`${this.baseUrl}/wsj/${date}`)
  }

  getWaPo(date) {
    return this.sendRequest(`${this.baseUrl}/wapo/${date}`)
  }

  getPs(date) {
    return this.sendRequest(`${this.baseUrl}/ps/${date}`)
  }

  sendRequest(endpoint) {
    return fetch(endpoint).then(response => {
      if (response.ok) {
        return response.arrayBuffer();
      } else {
        throw response;
      }
    }) 
  }
}

const adaptor = new PuzzleProxyAdaptor()
export default adaptor