import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "../services/cart.service";
import { produce } from "immer";

const CartComponent = (props) => {
  let { avatar } = props;
  let { currentUser } = props;
  let { cartItemQuantity, setCartItemQuantity } = props;
  let { cartItems, setCartItems } = props;
  let { subTotal, setSubTotal } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  const deleteFromCartHandler = (e) => {
    const targetId = e.target.id;
    console.log(targetId);
    CartService.delete(targetId).catch((error) => {
      console.log(error);
    });
    CartService.get().then((cart) => {
      const cartItems = cart.data.data.items;
      const cartItemQuantity = cart.data.data.items.length;
      const subTotal = cart.data.data.subTotal;
      setCartItems(cartItems);
      setCartItemQuantity(cartItemQuantity);
      setSubTotal(subTotal);
    });
  };

  const addQuantityHandler = (target) => {
    setCartItems(
      produce(cartItems, (draft) => {
        draft[target].quantity++;
        subTotal += draft[target].price;
        setSubTotal(subTotal);
      })
    );
    const productId = cartItems[target].productId._id;
    CartService.post(productId, 1).catch((err) => {
      console.log(err);
    });
  };

  const substractQuantityHandler = (target) => {
    setCartItems(
      produce(cartItems, (draft) => {
        draft[target].quantity--;
        subTotal -= draft[target].price;
        setSubTotal(subTotal);
      })
    );
    const productId = cartItems[target].productId._id;
    CartService.post(productId, -1).catch((err) => {
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

                      {cartItemQuantity > 0 &&
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
                                      onClick={() =>
                                        substractQuantityHandler(idx)
                                      }
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
                                    onClick={() => addQuantityHandler(idx)}
                                  >
                                    +
                                  </button>

                                  <div style={{ width: "80px" }}>
                                    <h5 className="mb-0">
                                      ${item.price * item.quantity}
                                    </h5>
                                  </div>
                                  <div style={{ color: "#cecece" }}>
                                    <i
                                      id={item._id}
                                      onClick={deleteFromCartHandler}
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

                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                siez="17"
                                placeholder="Cardholder's Name"
                              />
                              <label className="form-label" htmlFor="typeName">
                                Cardholder's Name
                              </label>
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                siez="17"
                                placeholder="1234 5678 9012 3457"
                                minLength="19"
                                maxLength="19"
                              />
                              <label className="form-label" htmlFor="typeText">
                                Card Number
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    size="7"
                                    minLength="7"
                                    maxLength="7"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeExp"
                                  >
                                    Expiration
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="password"
                                    id="typeText"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    size="1"
                                    minLength="3"
                                    maxLength="3"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeText"
                                  >
                                    Cvv
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>

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

                          <button
                            type="button"
                            className="btn btn-info btn-block btn-lg"
                          >
                            <div className="d-flex justify-content-between">
                              <span>${subTotal + 20}</span>
                              <span>
                                Checkout{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </button>
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
