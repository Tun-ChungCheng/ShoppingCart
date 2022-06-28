import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ProductService from "../services/product.service";
import CartService from "../services/cart.service";
// import NavComponent from "./nav-component";

const CartComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let { avatar, setAvatar } = props;
  let [id, setId] = useState("");
  let [items, setItems] = useState([]);
  let [subTotal, setSubTotal] = useState(0);
  let [itemQuantity, setItemQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  useEffect(() => {
    CartService.get()
      .then((cart) => {
        console.log(cart.data.data);
        setItemQuantity(cart.data.data.items.length);
        setItems(cart.data.data.items);
        setSubTotal(cart.data.data.subTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteFromCartHandler = (e) => {
    let id = e.target.id;
    CartService.delete(id)
      .then((data) => {
        setId(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section class="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card">
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-lg-7">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          {itemQuantity > 1 && (
                            <p class="mb-0">
                              You have {itemQuantity} items in your cart
                            </p>
                          )}
                          {itemQuantity === 1 && (
                            <p class="mb-0">
                              You have {itemQuantity} item in your cart
                            </p>
                          )}
                          {itemQuantity === 0 && (
                            <p class="mb-0">Your shopping cart is empty</p>
                          )}
                        </div>
                      </div>

                      {itemQuantity !== 0 &&
                        items.map((item) => (
                          <div key={item._id} class="card mb-3">
                            <div class="card-body">
                              <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={
                                        "http://localhost:8080/" + item.image
                                      }
                                      class="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{
                                        width: "65px",
                                        height: "65px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div class="ms-3">
                                    <h5>{item.name}</h5>
                                    {/* <p class="small mb-0">256GB, Navy Blue</p> */}
                                  </div>
                                </div>
                                <div class="d-flex flex-row align-items-center">
                                  <div style={{ width: "50px" }}>
                                    <h5 class="fw-normal mb-0">
                                      {item.quantity}
                                    </h5>
                                  </div>
                                  <div style={{ width: "80px" }}>
                                    <h5 class="mb-0">
                                      ${item.price * item.quantity}
                                    </h5>
                                  </div>
                                  <div style={{ color: "#cecece" }}>
                                    <i
                                      id={item._id}
                                      onClick={deleteFromCartHandler}
                                      class="fas fa-trash-alt"
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div class="col-lg-5">
                      <div class="card bg-primary text-white rounded-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="mb-0">Card details</h5>
                            <img
                              src={"http://localhost:8080/" + avatar}
                              class="img-fluid rounded-3"
                              style={{ width: "100px" }}
                              alt="Avatar"
                            />
                          </div>

                          <p class="small mb-2">Card type</p>
                          <a href="#!" type="submit" class="text-white">
                            <i class="fab fa-cc-mastercard fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" class="text-white">
                            <i class="fab fa-cc-visa fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" class="text-white">
                            <i class="fab fa-cc-amex fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" class="text-white">
                            <i class="fab fa-cc-paypal fa-2x"></i>
                          </a>

                          <form class="mt-4">
                            <div class="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                class="form-control form-control-lg"
                                siez="17"
                                placeholder="Cardholder's Name"
                              />
                              <label class="form-label" for="typeName">
                                Cardholder's Name
                              </label>
                            </div>

                            <div class="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                class="form-control form-control-lg"
                                siez="17"
                                placeholder="1234 5678 9012 3457"
                                minlength="19"
                                maxlength="19"
                              />
                              <label class="form-label" for="typeText">
                                Card Number
                              </label>
                            </div>

                            <div class="row mb-4">
                              <div class="col-md-6">
                                <div class="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    class="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    size="7"
                                    minlength="7"
                                    maxlength="7"
                                  />
                                  <label class="form-label" for="typeExp">
                                    Expiration
                                  </label>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-outline form-white">
                                  <input
                                    type="password"
                                    id="typeText"
                                    class="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    size="1"
                                    minlength="3"
                                    maxlength="3"
                                  />
                                  <label class="form-label" for="typeText">
                                    Cvv
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>

                          <hr class="my-4" />

                          <div class="d-flex justify-content-between">
                            <p class="mb-2">Subtotal</p>
                            <p class="mb-2">${subTotal}</p>
                          </div>

                          <div class="d-flex justify-content-between">
                            <p class="mb-2">Shipping</p>
                            <p class="mb-2">$20</p>
                          </div>

                          <div class="d-flex justify-content-between mb-4">
                            <p class="mb-2">Total(Incl. taxes)</p>
                            <p class="mb-2">${subTotal + 20}</p>
                          </div>

                          <button
                            type="button"
                            class="btn btn-info btn-block btn-lg"
                          >
                            <div class="d-flex justify-content-between">
                              <span>${subTotal + 20}</span>
                              <span>
                                Checkout{" "}
                                <i class="fas fa-long-arrow-alt-right ms-2"></i>
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
