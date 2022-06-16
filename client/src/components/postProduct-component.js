import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [name, setName] = useState("");
  let [image, setImage] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeImage = (e) => {
    setImage(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postProduct = () => {
    console.log(name, price, image);
    ProductService.post(name, price, image)
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
          <label for="exampleforTitle">Name</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeName}
          />
          <br />
          <label for="exampleforContent">Image</label>
          {/* <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeImage}
          /> */}
          <br />
          <label class="form-label" for="customFile">
            Default file input example
          </label>
          <input
            type="file"
            class="form-control"
            id="customFile"
            onChange={handleChangeImage}
          />
          <br />
          <label for="exampleforPrice">Price</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={postProduct}>
            Submit
          </button>
          <br />
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
