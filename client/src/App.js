import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";
import CartComponent from "./components/cart-component";
import PostProductComponent from "./components/postProduct-component";
import FooterComponent from "./components/footer-component";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [avatar, setAvatar] = useState("");

  useEffect(() => {
    let id = currentUser.user._id;
    AuthService.get(id)
      .then((user) => {
        setAvatar(user.data.data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavComponent
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        avatar={avatar}
        setAvatar={setAvatar}
      />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<RegisterComponent />} />
      </Routes>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/profile"
          element={
            <ProfileComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/cart"
          element={
            <CartComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/postProduct"
          element={
            <PostProductComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
