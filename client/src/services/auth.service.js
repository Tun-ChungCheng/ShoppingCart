import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  patch(payload) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    console.log("service");

    return axios.patch(API_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: token,
      },
    });
  }

  get(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new AuthService();
