import React, { useEffect, useState } from "react";
import ProductService from "../services/product.service";
import CartService from "../services/cart.service";

const HomeComponent = () => {
  let [productData, setProductData] = useState([]);

  useEffect(() => {
    ProductService.get()
      .then((products) => {
        console.log(products.data.data);
        setProductData(products.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCartHandler = (e) => {
    CartService.post(e.target.id, 1)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* <!-- Carousel wrapper --> */}
      <div
        id="carouselBasicExample"
        class="carousel slide carousel-fade"
        data-mdb-ride="carousel"
      >
        {/* <!-- Indicators --> */}
        <div class="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="0"
            class="active"
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
        <div class="carousel-inner">
          {/* <!-- Single item --> */}
          <div class="carousel-item active">
            <img
              src="https://source.unsplash.com/random/1200x300/?coupon"
              class="d-block w-100"
              alt="coupon"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>1</h5>
              <p></p>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/random/1200x300/?money"
              class="d-block w-100"
              alt="money"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>2</h5>
              <p></p>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/random/1200x300/?products"
              class="d-block w-100"
              alt="products"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>3</h5>
              <p></p>
            </div>
          </div>
        </div>
        {/* <!-- Inner --> */}

        {/* <!-- Controls --> */}
        <button
          class="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
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
              key={product._id}
              className="card"
              style={{
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                maxWidth: "300px",
                margin: "1rem",
                textAlign: "center",
              }}
            >
              <div
                className="card-body"
                style={{ margin: "1rem", justifyItems: "center" }}
              >
                <img
                  src={"http://localhost:8080/" + product.image}
                  alt="product"
                  style={{
                    //width: "15rem",
                    height: "15rem",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <h5 className="card-title">{product.name}</h5>

                <p
                  className="card-text"
                  style={{ color: "grey", fontSize: "18px" }}
                >
                  ${product.price}
                </p>

                <h6
                  className="card-text"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    webkitLineClamp: "6",
                    webkitBoxOrient: "vertical",
                    textAlign: "left",
                  }}
                >
                  {product.description}
                </h6>

                <button
                  id={product._id}
                  onClick={addToCartHandler}
                  type="button"
                  className="btn btn-primary"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
