import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./home";
import { Products } from "./products";
import { Details } from "./details";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export function ShopperIndex() {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
          <div className="container">
            <Link to="/" className="navbar-brand fw-bold fs-4">
              <i className="bi bi-cart4 me-2 text-danger"></i>
              Shopper<span className="text-danger">Index</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="bi bi-house-door me-1"></i> Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products/:category" element={<Products />} />
            <Route path="details/:id" element={<Details />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-secondary text-center py-4 mt-5">
          <div className="mb-3">
            <a href="#" className="text-secondary me-3 fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-secondary me-3 fs-5">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="text-secondary me-3 fs-5">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-secondary fs-5">
              <i className="bi bi-github"></i>
            </a>
          </div>
          <p className="mb-0">
            <i className="bi bi-c-circle me-1"></i>2024 ShopperIndex. All rights
            reserved.
          </p>
        </footer>
      </BrowserRouter>
    </div>
  );
}
