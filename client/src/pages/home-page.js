import ProductService from "../services/product.service";
import CartService from "../services/cart.service";
import { useEffect } from "react";

const HomeComponent = (props) => {
  let { productData } = props;
  let { currentUser } = props;
  let { setCartItemQuantity } = props;
  let { setRenderHelper } = props;

  useEffect(() => {
    setRenderHelper(true);
  }, []);

  const addToCart = (e) => {
    CartService.post(e.target.id, 1)
      .then((cart) => {
        let cartItemQuantity = cart.data.data.items.length;
        setCartItemQuantity(cartItemQuantity);
        console.log(cart.data.data.items, currentUser.user._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (e) => {
    const isExecuted = window.confirm("Are you sure to delete this product?");
    if (isExecuted) {
      ProductService.delete(e.target.id)
        .then((product) => {
          console.log(product);
        })
        .catch((error) => {
          console.log(error);
        });
      setRenderHelper(true);
    }
  };

  return (
    <div>
      {productData && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {productData.map((product) => (
            <div
              key={product._id}
              class="card text-center"
              style={{
                width: "25vh",
                margin: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                class="card-img-top"
                src={"http://localhost:8080/" + product.image}
                alt="Card image cap"
                style={{
                  width: "25vh",
                  height: "28vh",
                  objectFit: "cover",
                }}
              />
              <div class="card-body">
                <strong class="card-title" style={{ fontSize: "15px" }}>
                  {product.name}
                </strong>
                <strong class="card-title" style={{ fontSize: "20px" }}>
                  ${product.price}
                </strong>

                {currentUser && currentUser.user._id !== product.seller && (
                  <button
                    id={product._id}
                    onClick={addToCart}
                    type="button"
                    className="btn btn-primary"
                  >
                    Add to cart
                  </button>
                )}
                {currentUser.user._id === product.seller && (
                  <div className="d-grid gap-1  justify-content-md">
                    <button
                      id={product._id}
                      onClick={deleteProduct}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      id={product._id}
                      onClick={deleteProduct}
                      type="button"
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </div>
                )}
                <div class="card-text" style={{ fontSize: "10px" }}>
                  {product.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {productData.length === 0 && (
        <div className="Auth-form-container">
          <div className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">No Product For Sale!!</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
