import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CartComponent from "./components/cart-component";
import PostProductComponent from "./components/postProduct-component";
import FooterComponent from "./components/footer-component";
import AuthService from "./services/auth.service";
import CartService from "./services/cart.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [avatar, setAvatar] = useState("");
  let [cartItemQuantity, setCartItemQuantity] = useState(0);

  useEffect(() => {
    console.log(currentUser);
    let id = currentUser.user._id;
    AuthService.get(id)
      .then((user) => {
        let avatar = user.data.data.avatar;
        setAvatar(avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    CartService.get()
      .then((cart) => {
        let cartItemQuantity = cart.data.data.items.length;
        setCartItemQuantity(cartItemQuantity);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cartItemQuantity]);

  return (
    <div>
      <NavComponent
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        avatar={avatar}
        setAvatar={setAvatar}
        cartItemQuantity={cartItemQuantity}
        setCartItemQuantity={setCartItemQuantity}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomeComponent
              cartItemQuantity={cartItemQuantity}
              setCartItemQuantity={setCartItemQuantity}
            />
          }
        />
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
              cartItemQuantity={cartItemQuantity}
              setCartItemQuantity={setCartItemQuantity}
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
