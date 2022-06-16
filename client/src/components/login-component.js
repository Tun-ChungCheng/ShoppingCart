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
      {/* <!-- Email input --> */}
      <div class="form-outline mb-4">
        <input
          onChange={handleChangeEmail}
          type="email"
          id="form2Example1"
          class="form-control"
        />
        <label class="form-label" for="form2Example1">
          Email address
        </label>
      </div>

      {/* <!-- Password input --> */}
      <div class="form-outline mb-4">
        <input
          onChange={handleChangePassword}
          type="password"
          id="form2Example2"
          class="form-control"
        />
        <label class="form-label" for="form2Example2">
          Password
        </label>
      </div>

      {/* <!-- 2 column grid layout for inline styling --> */}
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          {/* <!-- Checkbox --> */}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="form2Example34"
              checked
            />
            <label class="form-check-label" for="form2Example34">
              {" "}
              Remember me{" "}
            </label>
          </div>
        </div>

        <div class="col">
          {/* <!-- Simple link --> */}
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      {/* <!-- Submit button --> */}
      <button
        onClick={handleLogin}
        type="submit"
        class="btn btn-primary btn-block mb-4"
      >
        Sign in
      </button>

      {/* <!-- Register buttons --> */}
      <div class="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
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

    // <div style={{ padding: "3rem" }} className="col-md-12">
    //   <div>
    //     {message && (
    //       <div className="alert alert-danger" role="alert">
    //         {message}
    //       </div>
    //     )}
    //     <div className="form-group">
    //       <label htmlFor="username">Email</label>
    //       <input
    //         onChange={handleChangeEmail}
    //         type="text"
    //         className="form-control"
    //         name="email"
    //       />
    //     </div>
    //     <br />
    //     <div className="form-group">
    //       <label htmlFor="password">Password</label>
    //       <input
    //         onChange={handleChangePassword}
    //         type="password"
    //         className="form-control"
    //         name="password"
    //       />
    //     </div>
    //     <br />
    //     <div className="form-group">
    //       <button onClick={handleLogin} className="btn btn-primary btn-block">
    //         <span>Login</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginComponent;
