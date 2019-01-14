export default class BaseApiAdaptor {
  constructor() {
    this.baseUrl = "http://localhost:4000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }

  get authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.jwt) {
      return { Authorization: "Bearer " + user.jwt };
    } else {
      return {};
    }
  }

  handleResponse(response) {
    return response
      .json()
      .then(json => (response.ok ? json : Promise.reject(json)));
  }
}