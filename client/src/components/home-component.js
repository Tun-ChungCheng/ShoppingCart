import CartService from "../services/cart.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductService from "../services/product.service";

const HomeComponent = (props) => {
  let { productData, setProductData } = props;
  let { currentUser, setCurrentUser } = props;
  let { cartItemQuantity, setCartItemQuantity } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  const addToCartHandler = (e) => {
    CartService.post(e.target.id, 1)
      .then((cart) => {
        let cartItemQuantity = cart.data.data.items.length;
        setCartItemQuantity(cartItemQuantity);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProductHandler = (e) => {
    const isExecuted = window.confirm("Are you sure to delete this product?");
    if (isExecuted) {
      ProductService.delete(e.target.id)
        .then((product) => {
          console.log(product);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {/* <!-- Carousel wrapper --> */}
      <div
        id="carouselBasicExample"
        className="carousel slide carousel-fade"
        data-mdb-ride="carousel"
      >
        {/* <!-- Indicators --> */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* <!-- Inner --> */}
        <div className="carousel-inner">
          {/* <!-- Single item --> */}
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/1200x300/?coupon"
              className="d-block w-100"
              alt="coupon"
              style={{ objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>1</h5>
              <p></p>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/1200x300/?money"
              className="d-block w-100"
              alt="money"
              style={{ objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>2</h5>
              <p></p>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/1200x300/?products"
              className="d-block w-100"
              alt="products"
              style={{ objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>3</h5>
              <p></p>
            </div>
          </div>
        </div>
        {/* <!-- Inner --> */}

        {/* <!-- Controls --> */}
        <button
          className="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <!-- Carousel wrapper --> */}

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
              class="card text-center"
              key={product._id}
              style={{
                width: "25vh",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                margin: "1rem",
              }}
            >
              <img
                class="card-img-top "
                src={"http://localhost:8080/" + product.image}
                alt="Card image cap"
                style={{ width: "25vh", height: "28vh", objectFit: "cover" }}
              />
              <div class="card-body">
                <strong class="card-title" style={{ fontSize: "1vh" }}>
                  {product.name}
                </strong>
                <strong class="card-title" style={{ fontSize: "1vh" }}>
                  ${product.price}
                </strong>

                {/* <p class="card-text">{product.description}</p> */}
                {currentUser && currentUser.user._id !== product.seller._id && (
                  <button
                    id={product._id}
                    onClick={addToCartHandler}
                    type="button"
                    className="btn btn-primary"
                  >
                    Add to cart
                  </button>
                )}
                {currentUser.user._id === product.seller._id && (
                  <button
                    id={product._id}
                    onClick={deleteProductHandler}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete Product
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
