import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/***** Page *****/
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CartComponent from "./components/cart-component";
import PostProductComponent from "./components/postProduct-component";
import FooterComponent from "./components/footer-component";

/***** Service *****/
import AuthService from "./services/auth.service";
import CartService from "./services/cart.service";
import ProductService from "./services/product.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [avatar, setAvatar] = useState("");
  let [productData, setProductData] = useState([]);
  // let [productQuantity, setProductQuantity] = useState(0);
  let [cartItemQuantity, setCartItemQuantity] = useState(0);
  let [cartItems, setCartItems] = useState([]);
  let [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const id = currentUser.user._id;
      AuthService.get(id)
        .then((user) => {
          const avatar = user.data.data.avatar;
          setAvatar(avatar);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      ProductService.get()
        .then((products) => {
          let productData = products.data.data;
          setProductData(productData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    CartService.get()
      .then((cart) => {
        const cartItemQuantity = cart.data.data.items.length;
        const cartItems = cart.data.data.items;
        const subTotal = cart.data.data.subTotal;
        setCartItemQuantity(cartItemQuantity);
        setCartItems(cartItems);
        setSubTotal(subTotal);
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
        cartItemQuantity={cartItemQuantity}
        setCartItemQuantity={setCartItemQuantity}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Routes>
        <Route
          path="/Home"
          element={
            <HomeComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              cartItemQuantity={cartItemQuantity}
              setCartItemQuantity={setCartItemQuantity}
              productData={productData}
              setProductData={setProductData}
            />
          }
        />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfileComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              avatar={avatar}
              setAvatar={setAvatar}
              productData={productData}
              setProductData={setProductData}
            />
          }
        />
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
              cartItems={cartItems}
              setCartItems={setCartItems}
              subTotal={subTotal}
              setSubTotal={setSubTotal}
            />
          }
        />
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
