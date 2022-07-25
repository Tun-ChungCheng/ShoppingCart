import React, { useState } from "react";
import ProductService from "../services/product.service";
import { useNavigate } from "react-router-dom";
import { FilePond } from "react-filepond";

const PostCourseComponent = (props) => {
  const { setRenderHelper } = props;
  const { currentUser } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const postProduct = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", name);
    payload.append("image", files[0].file);
    payload.append("price", price);
    payload.append("description", description);
    payload.append("seller", currentUser.user._id);
    ProductService.post(payload)
      .then(() => {
        setRenderHelper(true);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
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

            <br />
            <label>New Product Image</label>
            <FilePond
              files={files}
              allowReorder={true}
              allowMultiple={false}
              onupdatefiles={setFiles}
              allowFileEncode={true}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />

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
};

export default PostCourseComponent;
