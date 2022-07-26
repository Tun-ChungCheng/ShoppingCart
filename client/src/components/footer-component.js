import { Link } from "react-router-dom";

const footerComponent = () => {
  return (
    <div>
      {/* <!-- Footer --> */}
      <footer className="text-center text-lg-start bg-light text-muted">
        {/* <!-- Section: Social media --> */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* <!-- Left --> */}
          <div className="me-5 d-none d-lg-block">
            <span></span>
          </div>
          {/* <!-- Left --> */}

          {/* <!-- Right --> */}
          <div></div>
          {/* <!-- Right --> */}
        </section>
        {/* <!-- Section: Social media --> */}

        {/* <!-- Section: Links  --> */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fa-solid fa-cart-shopping"></i>Shopping Cart
                </h6>
                <p>Buy or Sell, By Yourself.</p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Build with</h6>
                <p>
                  <a className="text-reset">Node.js</a>
                </p>
                <p>
                  <a className="text-reset">Express.js</a>
                </p>
                <p>
                  <a className="text-reset">MongoDB</a>
                </p>
                <p>
                  <a className="text-reset">React</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Pages</h6>
                <p>
                  <Link to="/home" className="text-reset">
                    Home
                  </Link>
                </p>
                <p>
                  <Link to="/cart" className="text-reset">
                    Cart
                  </Link>
                </p>
                <p>
                  <Link to="/addProduct" className="text-reset">
                    Add product
                  </Link>
                </p>
                <p>
                  <Link to="/profile" className="text-reset">
                    Profile
                  </Link>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Taichung, Taiwan
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i> dunz.zheng@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> (+886)906770035
                </p>
                <p>
                  <i className="fab fa-github me-3"></i>{" "}
                  github.com/Tun-ChungCheng
                </p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright <a className="text-reset fw-bold">Ian Cheng</a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </div>
  );
};

export default footerComponent;
