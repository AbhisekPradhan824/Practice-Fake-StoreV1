import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categoryIcons = {
  electronics: "bi-laptop",
  jewelery: "bi-gem",
  "men's clothing": "bi-person-standing",
  "women's clothing": "bi-handbag",
};

const categoryColors = {
  electronics: "primary",
  jewelery: "warning",
  "men's clothing": "success",
  "women's clothing": "danger",
};

export function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">
          <i className="bi bi-grid me-2 text-danger"></i>Browse Categories
        </h2>
        <p className="text-muted">
          Choose a category to explore our collection
        </p>
      </div>
      <div className="row g-4 justify-content-center">
        {categories.map((category) => (
          <div key={category} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link to={`/products/${category}`} className="text-decoration-none">
              <div
                className="card border-0 bg-dark text-white text-center shadow h-100"
                style={{ borderRadius: "16px", transition: "transform 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="card-body py-5">
                  <i
                    className={`bi ${categoryIcons[category] || "bi-bag"} display-3 text-${categoryColors[category] || "secondary"}`}
                  ></i>
                  <h5 className="mt-3 fw-bold text-uppercase">{category}</h5>
                  <span
                    className={`badge bg-${categoryColors[category] || "secondary"} mt-2`}
                  >
                    Shop Now <i className="bi bi-arrow-right ms-1"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
