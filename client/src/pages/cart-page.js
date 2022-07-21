import React from "react";
import CartService from "../services/cart.service";
import { produce } from "immer";

const CartComponent = (props) => {
  let { avatar } = props;
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
      .catch((error) => {
        console.log(error);
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
                    <div className="col-lg-7">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          {cartItemQuantity > 1 && (
                            <p className="mb-0">
                              You have {cartItemQuantity} items in your cart
                            </p>
                          )}
                          {cartItemQuantity === 1 && (
                            <p className="mb-0">
                              You have {cartItemQuantity} item in your cart
                            </p>
                          )}
                          {cartItemQuantity === 0 && (
                            <p className="mb-0">Your shopping cart is empty</p>
                          )}
                        </div>
                      </div>
                      {cartItems &&
                        cartItems.map((item, idx) => (
                          <div key={item._id} className="card mb-3">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={
                                        "http://localhost:8080/" + item.image
                                      }
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{
                                        width: "65px",
                                        height: "65px",
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

                    <div className="col-lg-5">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                            <img
                              src={"http://localhost:8080/" + avatar}
                              className="img-fluid rounded-3"
                              style={{ width: "100px" }}
                              alt="Avatar"
                            />
                          </div>

                          <p className="small mb-2">Card type</p>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-visa fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-amex fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-paypal fa-2x"></i>
                          </a>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${subTotal}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$20</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">${subTotal + 20}</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
