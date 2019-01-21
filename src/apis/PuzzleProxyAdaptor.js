import BaseApiAdaptor from "./BaseApiAdaptor";

class PuzzleProxyAdaptor extends BaseApiAdaptor {
  // date format: https://www.nytimes.com/svc/crosswords/v2/puzzle/daily-2017-04-27.puz
  getToday() {
    return this.sendRequest(`${this.baseUrl}/puzzle_proxy/today`);
  }

  getNYT(date) {
    return fetch(
      `https://www.nytimes.com/svc/crosswords/v2/puzzle/daily-${date}.puz`,
      {
        method: "GET",
        headers: {
          Accept: "application/x-crossword"
        },
        credentials: "include"
      }
    ).then(response => {
      if (response.ok) {
        return response.arrayBuffer();
      } else {
        throw response;
      }
    });
  }

  getWsj(date) {
    return this.sendRequest(`${this.baseUrl}/puzzle_proxy/wsj/${date}`);
  }

  getWaPo(date) {
    return this.sendRequest(`${this.baseUrl}/puzzle_proxy/wapo/${date}`);
  }

  getPs(date) {
    return this.sendRequest(`${this.baseUrl}/puzzle_proxy/ps/${date}`);
  }

  sendRequest(endpoint) {
    return fetch(endpoint).then(response => {
      if (response.ok) {
        return response.arrayBuffer();
      } else {
        throw response;
      }
    });
  }
}

const adaptor = new PuzzleProxyAdaptor();
export default adaptor;
