import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [name, setName] = useState("");
  let [image, setImage] = useState([]);
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOnSubmit = () => {
    const formData = new FormData();
    formData.append("image", image);

    fetch("http://localhost:8080/api/product/", {
      method: "POST",
      body: formData,
    }).then((result) => {
      console.log(":))");
    });
  };

  const postProduct = () => {
    console.log(name, price, image);
    ProductService.post(name, price)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>{handleTakeToLogin}</div>}
      {currentUser.user.role === "customer" && <div>{handleTakeToLogin}</div>}
      {currentUser && currentUser.user.role === "seller" && (
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChangeName}
          />
          <br />

          <label>Image</label>
          <br />
          <form
            onSubmit={handleOnSubmit}
            method="post"
            enctype="multipart/form-data"
          >
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChangeImage}
            />
            <br />
            <button className="btn btn-primary">Upload</button>
          </form>
          <br />

          <label>Price</label>
          <input
            type="number"
            className="form-control"
            onChange={handleChangePrice}
          />
          <br />

          <button className="btn btn-primary" onClick={postProduct}>
            Submit
          </button>
          <br />

          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
