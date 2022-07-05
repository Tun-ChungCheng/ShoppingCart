import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

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
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  const googleLoginHandler = () => {
    AuthService.googleLogin()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
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

          <div className="d-grid gap-2 mt-3">
            {/*button type can't be "SUBMIT" */}
            <button
              type="button"
              onClick={loginHandler}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>

          <p className="forgot-password text-right mt-2">
            Or login with Google
          </p>

          <a
            href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?prompt=select_account&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=890240672665-0ekocfscjdvchcne1ttnmiloit77v1ra.apps.googleusercontent.com&flowName=GeneralOAuthFlow"
            type="button"
            className="btn btn-primary"
          >
            googleLogin
          </a>

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
