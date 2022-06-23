import axios from "axios";
const API_URL = "http://localhost:8080/api/cart";

class CartService {
  post(id, quantity) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { id, quantity },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  get() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new CartService();
