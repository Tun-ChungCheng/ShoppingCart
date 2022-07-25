import axios from "axios";
const API_URL =
  "https://ian-cheng-shopping-cart-api.herokuapp.com/api/product/";

function getToken() {
  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = "";
  }
  return token;
}

class ProductService {
  post(payload) {
    return axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: getToken(),
      },
    });
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

export default new ProductService();
