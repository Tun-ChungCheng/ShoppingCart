import axios from "axios";
const API_URL = "http://localhost:8080/api/product";

class ProductService {
  post(payload) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    console.log("service");
    return axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: token,
      },
    });
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

export default new ProductService();
