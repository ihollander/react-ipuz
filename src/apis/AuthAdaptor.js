import BaseApiAdaptor from "./BaseApiAdaptor";

class AuthAdaptor extends BaseApiAdaptor {
  signUp(data) {
    return fetch(`${this.baseUrl}/users/`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse)
      .then(response => {
        if (response.jwt) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }
        return response.user;
      });
  }

  login(data) {
    return fetch(`${this.baseUrl}/login/`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse)
      .then(user => {
        if (user.jwt) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

const adaptor = new AuthAdaptor();
export default adaptor;
