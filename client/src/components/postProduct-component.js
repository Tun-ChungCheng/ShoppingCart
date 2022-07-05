import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [name, setName] = useState("");
  let [image, setImage] = useState();
  let [price, setPrice] = useState(0);
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const postProductHandler = (e) => {
    e.preventDefault();
    console.log(name, price, image);
    const payload = new FormData();
    payload.append("name", name);
    payload.append("image", image);
    payload.append("price", price);
    payload.append("description", description);
    ProductService.post(payload)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && (
        <div className="form-group">
          <form
            onSubmit={postProductHandler}
            method="post"
            encType="multipart/form-data"
          >
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChangeName}
            />
            <br />

            <label>Product Image</label>
            <br />
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChangeImage}
            />
            <br />

            <label>Product Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={handleChangePrice}
            />
            <br />

            <label>Product Description</label>
            <textarea
              rows="8"
              cols="50"
              name="description"
              className="form-control"
              onChange={handleChangeDescription}
            />
            <br />

            <button className="btn btn-primary">Submit</button>
            <br />
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
