import axios from "axios";
const API_URL = "http://localhost:8080/api/order";

function getToken() {
  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = "";
  }
  return token;
}

class OrderService {
  post(cart) {
    return axios.post(
      API_URL,
      { cart },
      {
        headers: {
          Authenticate: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default new OrderService();
