import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
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
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration succeeds. You are now redirected to the login page."
        );
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <form>
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
          {/* <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
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
        <div className="form-group">
          <label htmlFor="password">role</label>
          <input
            onChange={handleChangeRole}
            type="text"
            className="form-control"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>*/}

          {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input
                  onChange={handleChangeUsername}
                  type="text"
                  id="form3Example1"
                  class="form-control"
                />
                <label class="form-label" for="form3Example1">
                  username
                </label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input type="text" id="form3Example2" class="form-control" />
                <label class="form-label" for="form3Example2">
                  Last name
                </label>
              </div>
            </div>
          </div>

          {/* <!-- Email input --> */}
          <div class="form-outline mb-4">
            <input
              onChange={handleChangeEmail}
              type="email"
              id="form3Example3"
              class="form-control"
            />
            <label class="form-label" for="form3Example3">
              Email address
            </label>
          </div>

          {/* <!-- Password input --> */}
          <div class="form-outline mb-4">
            <input
              onChange={handleChangePassword}
              type="password"
              id="form3Example4"
              class="form-control"
            />
            <label class="form-label" for="form3Example4">
              Password
            </label>
          </div>

          {/* <!-- Checkbox --> */}
          <div class="form-check d-flex justify-content-center mb-4">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              id="form2Example33"
              checked
            />
            <label class="form-check-label" for="form2Example33">
              Subscribe to our newsletter
            </label>
          </div>

          {/* <!-- Submit button --> */}
          <button
            onClick={handleRegister}
            type="submit"
            class="btn btn-primary btn-block mb-4"
          >
            Sign up
          </button>

          {/* <!-- Register buttons --> */}
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
      </form>
    </div>
  );
};

export default RegisterComponent;
