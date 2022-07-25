import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/***** Page *****/
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";
import CartPage from "./pages/cart-page";
import AddProductPage from "./pages/addProduct-page";

/***** Component *****/
import NavComponent from "./components/nav-component";
import FooterComponent from "./components/footer-component";

/***** Service *****/
import AuthService from "./services/auth.service";
import CartService from "./services/cart.service";
import ProductService from "./services/product.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [avatar, setAvatar] = useState("");
  let [productData, setProductData] = useState([]);
  let [cartItemQuantity, setCartItemQuantity] = useState(0);
  let [cartItems, setCartItems] = useState([]);
  let [subTotal, setSubTotal] = useState(0);
  let [renderHelper, setRenderHelper] = useState(true);
  let [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    const id = currentUser.user._id;
    AuthService.get(id)
      .then((user) => {
        const avatar = user.data.data.avatar;
        setAvatar(avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  useEffect(() => {
    ProductService.get()
      .then((products) => {
        const productData = products.data.data;
        setProductData(productData);
      })
      .catch((err) => {
        console.log(err);
      });
    setRenderHelper(false);
  }, [renderHelper]);

  useEffect(() => {
    CartService.get()
      .then((cart) => {
        console.log(cart);
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
    setRenderHelper(false);
  }, [cartItemQuantity, subTotal]);

  return (
    <div>
      <NavComponent
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        cartItemQuantity={cartItemQuantity}
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      />
      <Routes>
        <Route
          path="/Home"
          element={
            <HomePage
              currentUser={currentUser}
              setCartItemQuantity={setCartItemQuantity}
              productData={productData}
              setRenderHelper={setRenderHelper}
              searchContent={searchContent}
            />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <LoginPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              renderHelper={renderHelper}
              setRenderHelper={setRenderHelper}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProfilePage currentUser={currentUser} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              currentUser={currentUser}
              avatar={avatar}
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
          path="/addproduct"
          element={
            <AddProductPage
              currentUser={currentUser}
              setRenderHelper={setRenderHelper}
            />
          }
        />
      </Routes>

      <FooterComponent />
    </div>
  );
}

export default App;
