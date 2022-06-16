import axios from "axios";
const API_URL = "http://localhost:8080/api/cart";

class CartService {
  post(name, price, image, seller) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { name, price, image, seller },
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
