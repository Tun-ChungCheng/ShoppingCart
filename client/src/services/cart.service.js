import axios from "axios";
const API_URL = "http://localhost:8080/api/cart/";

function getToken() {
  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = "";
  }
  return token;
}

class CartService {
  post(productId, quantity) {
    return axios.post(
      API_URL,
      { productId, quantity },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
  }

  get() {
    return axios.get(API_URL, {
      headers: {
        Authorization: getToken(),
      },
    });
  }

  delete(id) {
    return axios.delete(API_URL + id, {
      headers: {
        Authorization: getToken(),
      },
    });
  }
}

export default new CartService();
