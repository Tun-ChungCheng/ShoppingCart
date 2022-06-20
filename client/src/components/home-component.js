import React, { useEffect, useState } from "react";
import ProductService from "../services/product.service";

const HomeComponent = () => {
  let [productData, setProductData] = useState();
  useEffect(() => {
    ProductService.get()
      .then((data) => {
        setProductData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              className="card"
              style={{
                width: "18rem",
                margin: "1rem",
              }}
            >
              <div
                className="card-body"
                style={{ margin: "1rem", justifyItems: "center" }}
              >
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <img
                  src={"http://localhost:8080/" + product.image}
                  alt="product"
                  style={{
                    width: "10rem",
                    borderRadius: "10px",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ margin: "1rem" }}
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
