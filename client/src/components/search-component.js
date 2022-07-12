import React from "react";

const searchComponent = ({ setSearchContent }) => {
  const inputHandler = (e) => {
    setSearchContent(e.target.value);
  };

  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-3"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={inputHandler}
      />
    </form>
  );
};

export default searchComponent;
