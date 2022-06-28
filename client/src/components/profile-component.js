import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let { avatar, setAvatar } = props;
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const updatePofile = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("username", username);
    payload.append("avatar", avatar);
    payload.append("password", password);

    AuthService.post(payload)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && (
        <div className="form-group">
          <div style={{ textAlign: "center" }}>
            <img
              src={"http://localhost:8080/" + avatar}
              class="rounded-circle mb-3"
              style={{ width: "150px" }}
              alt="Avatar"
            />
            <h5 class="mb-2">
              <strong>{currentUser.user.username}</strong>
            </h5>
            <p class="text-muted">{currentUser.user.email}</p>
          </div>

          <form
            onSubmit={updatePofile}
            method="patch"
            enctype="multipart/form-data"
          >
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChangeUsername}
            />
            <br />

            <label>Avatar</label>
            <br />
            <input
              type="file"
              name="avatar"
              className="form-control"
              onChange={handleChangeAvatar}
            />
            <br />

            <label>Password</label>
            <input
              type="text"
              name="password"
              className="form-control"
              onChange={handleChangePassword}
            />
            <br />

            <button className="btn btn-primary">Submit</button>
          </form>

          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>

        // <div>
        //   <h1>In profile page.</h1>
        //   <header className="jumbotron">
        //     <h3>
        //       <strong></strong>
        //     </h3>
        //   </header>
        //   <p>
        //     <strong>Token: {currentUser.token}</strong>
        //   </p>
        //   <p>
        //     <strong>ID: {currentUser.user._id}</strong>
        //   </p>
        //   <p>
        //     <strong>email: {currentUser.user.email}</strong>
        //   </p>
        // </div>
      )}
    </div>
  );
};

export default ProfileComponent;
