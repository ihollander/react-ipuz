import BaseApiAdaptor from "./BaseApiAdaptor";

class AuthAdaptor extends BaseApiAdaptor {
  signUp(data) {
    return fetch(`${this.baseUrl}/users/`, {
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

  update(data) {
    return fetch(`${this.baseUrl}/profile`, {
      method: "PATCH",
      headers: {
        ...this.defaultHeaders,
        ...this.authHeader
      },
      body: JSON.stringify(data)
    })
      .then(this.handleResponse)
      .then(user => {
        // TODO: fix me
        const currentUser = JSON.parse(localStorage.getItem("user"))
        currentUser.user.avatar = user.avatar
        localStorage.setItem("user", JSON.stringify(currentUser));
        return user;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

const adaptor = new AuthAdaptor();
export default adaptor;
