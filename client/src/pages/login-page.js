import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let { renderHelper, setRenderHelper } = props;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [renderHelper]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    AuthService.login(email, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setCurrentUser(AuthService.getCurrentUser());
        setRenderHelper(true);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data);
      });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              onChange={handleChangeEmail}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              onChange={handleChangePassword}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>

          <br />
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              onClick={loginHandler}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>

          <br />
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
