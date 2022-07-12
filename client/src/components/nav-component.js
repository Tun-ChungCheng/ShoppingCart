import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let { cartItemQuantity } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div>
      {/* <!-- Navbar --> */}
      <nav className="navbar bg-light">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          {/* <!-- Collapsible wrapper --> */}
          <div className="" id="navbarSupportedContent">
            {/* <!-- Navbar brand --> */}
            <Link className="fa-solid fa-cart-shopping" to="/Home">
              S h o p p i n g C a r t
            </Link>
          </div>
          {/* <!-- Collapsible wrapper --> */}
          {/* <!-- Light elements --> */}
          {currentUser && (
            <form className="d-flex" role="search">
              <input
                className="form-control me-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
          {/* <!-- Right elements --> */}
          {!currentUser && (
            <div className="d-flex align-items-center">
              <Link type="button" className=" btn btn-link px-3 me-2" to="/">
                Login
              </Link>
              <Link
                type="button"
                className=" btn btn-primary me-3"
                to="/register"
              >
                Sign up for free
              </Link>
            </div>
          )}
          {/* <!-- Right elements --> */}
          {currentUser && (
            <div className="d-flex align-items-center">
              {/* <!-- Icon --> */}
              <Link className="text-reset me-3" to="/cart">
                <i className="fas fa-shopping-cart"></i>
                <span className="badge rounded-pill badge-notification bg-danger">
                  {cartItemQuantity}
                </span>
              </Link>
              {/* <!-- Notifications --> */}
              <div className="dropdown">
                <a
                  className="text-reset me-3 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">
                    3
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Some news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Avatar --> */}
              <div className="dropdown">
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={"http://localhost:8080/" + currentUser.user.avatar}
                    className="rounded-circle"
                    width="30"
                    height="30"
                    style={{ objectFit: "cover" }}
                    alt="User"
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/AddProduct">
                      Add New Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="dropdown-item"
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </div>
  );
};

export default NavComponent;
