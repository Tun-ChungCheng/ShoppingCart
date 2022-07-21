import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

function getToken() {
  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = "";
  }
  return token;
}

class AuthService {
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  login(email, password) {
    return axios.post(API_URL + "login", { email, password });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
    });
  }

  patch(payload) {
    return axios.patch(API_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: getToken(),
      },
    });
  }

  get(id) {
    return axios.get(API_URL + id, {
      headers: {
        Authorization: getToken(),
      },
    });
  }
}

export default new AuthService();
