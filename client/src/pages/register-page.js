import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const registerHandler = () => {
    AuthService.register(username, email, password)
      .then(() => {
        window.alert(
          "Registration succeeds. You are now redirected to the login page."
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link className="link-primary" to="/">
              {/* onClick={changeAuthMode} */}
              Login
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              onChange={handleChangeUsername}
              className="form-control mt-1"
              placeholder="e.g Ian Cheng"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              onChange={handleChangeEmail}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              onChange={handleChangePassword}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={registerHandler}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>

          <br />
          <div class="google-btn">
            <div class="google-icon-wrapper">
              <img
                class="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <a
              class="btn-text"
              href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?prompt=select_account&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=890240672665-0ekocfscjdvchcne1ttnmiloit77v1ra.apps.googleusercontent.com&flowName=GeneralOAuthFlow"
            >
              <b>Sign up with google</b>
            </a>
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

export default RegisterComponent;
