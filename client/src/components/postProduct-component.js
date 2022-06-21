import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [name, setName] = useState("");
  let [image, setImage] = useState();
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", name);
    payload.append("price", price);
    payload.append("image", image);
    for (var key of payload.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    ProductService.post(payload)
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
          <form
            onSubmit={handleOnSubmit}
            method="post"
            enctype="multipart/form-data"
          >
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChangeName}
            />
            <br />

            <label>Image</label>
            <br />

            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChangeImage}
            />

            <br />
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={handleChangePrice}
            />
            <br />

            <button className="btn btn-primary">Submit</button>
            <br />
          </form>
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
