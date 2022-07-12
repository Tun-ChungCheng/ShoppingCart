import React, { useState } from "react";
import ProductService from "../services/product.service";
import { useNavigate } from "react-router-dom";

const PostCourseComponent = (props) => {
  let { setRenderHelper } = props;
  let [name, setName] = useState("");
  let [image, setImage] = useState();
  let [price, setPrice] = useState(0);
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  const postProduct = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", name);
    payload.append("image", image);
    payload.append("price", price);
    payload.append("description", description);
    ProductService.post(payload)
      .then(() => {
        setRenderHelper(true);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Add Product</h3>

          <form
            onSubmit={postProduct}
            method="post"
            encType="multipart/form-data"
          >
            <div className="form-group mt-3">
              <label>New Product Name</label>
              <input
                type="text"
                name="name"
                className="form-control mt-1"
                onChange={handleChangeName}
              />
            </div>

            <div className="form-group mt-3">
              <label>New Product Image</label>
              <input
                type="file"
                name="image"
                className="form-control mt-1"
                onChange={handleChangeImage}
              />
            </div>

            <div className="form-group mt-3">
              <label>New Product Price</label>
              <input
                type="number"
                name="price"
                className="form-control mt-1"
                onChange={handleChangePrice}
              />
            </div>

            <div className="form-group mt-3">
              <label>New Product Description</label>
              <input
                type="text"
                name="description"
                className="form-control mt-1"
                placeholder="The number of characters is limited to 30."
                onChange={handleChangeDescription}
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>

          <br />
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // <div style={{ padding: "3rem" }}>
  //   {currentUser && (
  //     <div className="form-group">
  //       <form
  //         onSubmit={postProduct}
  //         method="post"
  //         encType="multipart/form-data"
  //       >
  //         <label>Product Name</label>
  //         <input
  //           type="text"
  //           name="name"
  //           className="form-control"
  //           onChange={handleChangeName}
  //         />
  //         <br />

  //         <label>Product Image</label>
  //         <br />
  //         <input
  //           type="file"
  //           name="image"
  //           className="form-control"
  //           onChange={handleChangeImage}
  //         />
  //         <br />

  //         <label>Product Price</label>
  //         <input
  //           type="number"
  //           name="price"
  //           className="form-control"
  //           onChange={handleChangePrice}
  //         />
  //         <br />

  //         <label>Product Description</label>
  //         <textarea
  //           rows="8"
  //           cols="50"
  //           name="description"
  //           className="form-control"
  //           onChange={handleChangeDescription}
  //         />
  //         <br />

  //         <button className="btn btn-primary">Submit</button>
  //         <br />
  //         <br />
  //       </form>
  //       {message && (
  //         <div className="alert alert-warning" role="alert">
  //           {message}
  //         </div>
  //       )}
  //     </div>
  //   )}
  // </div>
  // );
};

export default PostCourseComponent;
