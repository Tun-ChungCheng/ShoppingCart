import React from "react";

const productComponent = (productData, product) => {
  return <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  {productData.map((product) => (
    <
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
   
};

export default productComponent;
