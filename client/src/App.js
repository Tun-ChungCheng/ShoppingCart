import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

/***** Page *****/
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";
import CartPage from "./pages/cart-page";
import AddProductPage from "./pages/addProduct-page";
import NotFoundPage from "./pages/notFound-page";

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
  const navigate = useNavigate();

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
    } else {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      ProductService.get()
        .then((products) => {
          const productData = products.data.data;
          setProductData(productData);
        })
        .catch((error) => {
          console.log(error);
        });
      setRenderHelper(false);
    }
  }, [renderHelper]);

  useEffect(() => {
    CartService.get()
      .then((cart) => {
        console.log(cart, "das");
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
  }, [cartItemQuantity, renderHelper]);

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
            <HomePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              cartItemQuantity={cartItemQuantity}
              setCartItemQuantity={setCartItemQuantity}
              productData={productData}
              setProductData={setProductData}
              setRenderHelper={setRenderHelper}
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
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              avatar={avatar}
              setAvatar={setAvatar}
              productData={productData}
              setProductData={setProductData}
              setRenderHelper={setRenderHelper}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
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
              setRenderHelper={setRenderHelper}
            />
          }
        />
        <Route
          path="/addProduct"
          element={
            <AddProductPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setRenderHelper={setRenderHelper}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
