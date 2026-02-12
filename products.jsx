import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/category/${params.category}`)
      .then((response) => setProducts(response.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.category]);

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
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase">
          <i className="bi bi-tags me-2 text-danger"></i>
          {params.category}
        </h2>
        <p className="text-muted">
          <i className="bi bi-box-seam me-1"></i>
          {products.length} products found
        </p>
      </div>

      {/* Product Grid */}
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link
              to={`/details/${product.id}`}
              className="text-decoration-none"
            >
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: "16px", transition: "transform 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  className="d-flex justify-content-center align-items-center p-4 bg-light"
                  style={{
                    height: "220px",
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body text-center">
                  <p
                    className="card-text text-dark fw-medium mb-2"
                    style={{
                      fontSize: "0.9rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.title}
                  </p>
                  <p className="fw-bold text-danger fs-5 mb-1">
                    <i className="bi bi-currency-dollar"></i>
                    {product.price.toFixed(2)}
                  </p>
                  <small className="text-warning">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${
                          i < Math.round(product.rating.rate)
                            ? "bi-star-fill"
                            : "bi-star"
                        }`}
                      ></i>
                    ))}
                    <span className="text-muted ms-1">
                      ({product.rating.count})
                    </span>
                  </small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="text-center mt-5">
        <Link to="/" className="btn btn-dark btn-lg rounded-pill px-4">
          <i className="bi bi-arrow-left me-2"></i>Back to Categories
        </Link>
      </div>
    </div>
  );
}
