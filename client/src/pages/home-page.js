import ProductService from "../services/product.service";
import CartService from "../services/cart.service";

const HomeComponent = (props) => {
  let { productData } = props;
  let { currentUser } = props;
  let { setCartItemQuantity } = props;
  let { searchContent } = props;
  let { setRenderHelper } = props;

  const addToCart = (e) => {
    CartService.post(e.target.id, 1)
      .then((cart) => {
        let cartItemQuantity = cart.data.data.items.length;
        setCartItemQuantity(cartItemQuantity);
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {productData.map((product) => {
          return (
            product.name.includes(searchContent) && (
              <div>
                <div
                  key={product._id}
                  className="card text-center"
                  style={{
                    width: "25vh",
                    margin: "1rem",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={"http://localhost:8080/" + product.image}
                    alt="Card cap"
                    style={{
                      width: "25vh",
                      height: "28vh",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <strong className="card-title" style={{ fontSize: "15px" }}>
                      {product.name}
                    </strong>
                    <strong className="card-title" style={{ fontSize: "20px" }}>
                      ${product.price}
                    </strong>

                    {currentUser.user._id !== product.seller && (
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
                      <button
                        id={product._id}
                        onClick={deleteProduct}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete Product
                      </button>
                    )}
                    <div className="card-text" style={{ fontSize: "10px" }}>
                      {product.description}
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
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
    </div>
  );
};

export default HomeComponent;
