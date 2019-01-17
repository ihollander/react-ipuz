import BaseApiAdaptor from './BaseApiAdaptor'

class PuzzleProxyAdaptor extends BaseApiAdaptor {

  getWsj(date) {
    return this.sendRequest(`${this.baseUrl}/puzzle_proxy/wsj/${date}`)
  }

  getWaPo(date) {
    return this.sendRequest(`${this.baseUrl}/puzzle_proxy/wapo/${date}`)
  }

  getPs(date) {
    return this.sendRequest(`${this.baseUrl}/puzzle_proxy/ps/${date}`)
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