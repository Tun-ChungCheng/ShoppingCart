import React from "react";
import CartService from "../services/cart.service";
import { produce } from "immer";
const API_URL = "https://ian-cheng-shopping-cart-api.herokuapp.com/api/cart/"; //http://localhost:8080/

const CartComponent = (props) => {
  let { cartItemQuantity, setCartItemQuantity } = props;
  let { cartItems, setCartItems } = props;
  let { subTotal, setSubTotal } = props;

  const deleteFromCart = (target) => {
    const productId = cartItems[target]._id;
    CartService.delete(productId)
      .then(() => {
        setCartItems(
          (cartItems = cartItems.filter((item) => item._id !== productId))
        );
        setCartItemQuantity(cartItems.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const incrementQuantity = (target) => {
    const productId = cartItems[target].productId._id;
    CartService.post(productId, 1)
      .then(() => {
        setCartItems(
          produce(cartItems, (draft) => {
            draft[target].quantity++;
            draft[target].total += draft[target].price;
            setSubTotal((subTotal += draft[target].price));
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const decrementQuantity = (target) => {
    const productId = cartItems[target].productId._id;
    CartService.post(productId, -1)
      .then(() => {
        setCartItems(
          produce(cartItems, (draft) => {
            draft[target].quantity--;
            draft[target].total -= draft[target].price;
            setSubTotal((subTotal -= draft[target].price));
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          {cartItemQuantity > 1 && (
                            <h4 className="mb-0">
                              You have {cartItemQuantity} items in your cart
                            </h4>
                          )}
                          {cartItemQuantity === 1 && (
                            <h4 className="mb-0">
                              You have {cartItemQuantity} item in your cart
                            </h4>
                          )}
                          {cartItemQuantity === 0 && (
                            <h4 className="mb-0">
                              Your shopping cart is empty
                            </h4>
                          )}
                        </div>
                      </div>
                      {cartItems &&
                        cartItems.map((item, idx) => (
                          <div key={item._id} className="card mb-2">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={API_URL + item.image}
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{
                                        width: "10rem",
                                        height: "10rem",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h5>{item.name}</h5>
                                    {/* <p className="small mb-0">256GB, Navy Blue</p> */}
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  {item.quantity > 1 && (
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => decrementQuantity(idx)}
                                    >
                                      -
                                    </button>
                                  )}

                                  <div style={{ padding: "15px" }}>
                                    <h5 className="fw-normal mb-0">
                                      {item.quantity}
                                    </h5>
                                  </div>

                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => incrementQuantity(idx)}
                                  >
                                    +
                                  </button>

                                  <div style={{ width: "80px" }}>
                                    <h5 className="mb-0">${item.total}</h5>
                                  </div>
                                  <div style={{ color: "#cecece" }}>
                                    <i
                                      onClick={() => deleteFromCart(idx)}
                                      className="fas fa-trash-alt"
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {cartItemQuantity !== 0 && (
                      <div className="col-lg-3">
                        <div className="card bg-primary text-white rounded-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                              <p className="mb-0">Subtotal : ${subTotal}</p>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-center">
                              <form
                                action={
                                  API_URL + "api/order/linepay/createOrder"
                                }
                                method="post"
                              >
                                <button
                                  className="btn btn-info"
                                  type="submit"
                                  style={{ fontSize: "1rem" }}
                                >
                                  Checkout By LINE Pay
                                  <i
                                    className="fa-brands fa-line"
                                    style={{ fontSize: "2rem" }}
                                  ></i>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartComponent;
