import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ProfileComponent = (props) => {
  let { currentUser } = props;
  let { setRenderHelper } = props;
  let { avatar, setAvatar } = props;
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   let id = currentUser.user._id;
  //   AuthService.get(id)
  //     .then((user) => {
  //       let { username, avatar } = user.data.data;
  //       setUsername(username);
  //       setAvatar(avatar);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       setMessage(error.response.data);
  //     });
  // }, []);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const updatePofileHandler = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("email", currentUser.user.email);
    payload.append("username", username);
    payload.append("avatar", avatar);
    payload.append("password", password);

    AuthService.patch(payload)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Profile</h3>
          <div className="text-center">
            <img
              src={"http://localhost:8080/" + currentUser.user.avatar}
              class="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="User"
            />
          </div>
          <h3 className="Auth-form-title">{currentUser.user.username}</h3>
          <form
            onSubmit={updatePofileHandler}
            method="patch"
            encType="multipart/form-data"
          >
            <div className="form-group mt-3">
              <label>New Full Name</label>

              <input
                type="text"
                name="username"
                className="form-control mt-1"
                placeholder={username}
                onChange={handleChangeUsername}
              />
            </div>
            <div className="form-group mt-3">
              <label>New Avatar</label>
              <input
                type="file"
                name="avatar"
                className="form-control mt-1"
                onChange={handleChangeAvatar}
              />
            </div>
            <div className="form-group mt-3">
              <label>New Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="New Password"
                onChange={handleChangePassword}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>

          <br />
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
