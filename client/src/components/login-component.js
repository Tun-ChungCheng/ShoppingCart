import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      {/* Email input   */}
      <div className="form-group">
        <label htmlFor="username">Email</label>
        <input
          onChange={handleChangeEmail}
          type="text"
          className="form-control"
          name="email"
        />
      </div>

      <br />
      {/* <!-- Password input --> */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChangePassword}
          type="password"
          className="form-control"
          name="password"
        />
      </div>

      <br />
      {/* <!-- Login buttons --> */}
      <div className="form-group">
        <button onClick={handleLogin} className="btn btn-primary btn-block">
          <span>Login</span>
        </button>
      </div>

      <div class="text-center">
        <p>or sign up with:</p>
        <button type="button" class="btn btn-primary btn-floating mx-1">
          <i class="fab fa-facebook-f"></i>
        </button>

        <button type="button" class="btn btn-primary btn-floating mx-1">
          <i class="fab fa-google"></i>
        </button>

        <button type="button" class="btn btn-primary btn-floating mx-1">
          <i class="fab fa-twitter"></i>
        </button>

        <button type="button" class="btn btn-primary btn-floating mx-1">
          <i class="fab fa-github"></i>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
