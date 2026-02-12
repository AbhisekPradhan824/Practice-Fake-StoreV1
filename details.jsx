import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Details() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    price: 0,
    image: "",
    category: "",
    description: "",
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${params.id}`)
      .then((response) => setProduct(response.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

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
      <div className="card border-0 shadow" style={{ borderRadius: "20px" }}>
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-md-5">
            <div
              className="d-flex justify-content-center align-items-center bg-light h-100 p-5"
              style={{ borderRadius: "20px 0 0 20px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="col-md-7">
            <div className="card-body p-4 p-md-5">
              {/* Category Badge */}
              <span className="badge bg-danger mb-3 text-uppercase">
                <i className="bi bi-tag me-1"></i>
                {product.category}
              </span>

              {/* Title */}
              <h3 className="fw-bold mb-3">{product.title}</h3>

              {/* Price */}
              <h2 className="text-danger fw-bold mb-3">
                <i className="bi bi-currency-dollar"></i>
                {product.price.toFixed(2)}
              </h2>

              {/* Rating */}
              <div className="mb-3 d-flex align-items-center gap-2">
                <span className="text-warning fs-5">
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
                </span>
                <span className="text-muted">
                  {product.rating.rate}
                  <i className="bi bi-dot"></i>
                  {product.rating.count} reviews
                </span>
              </div>

              {/* Divider */}
              <hr />

              {/* Description */}
              <h6 className="fw-bold">
                <i className="bi bi-card-text me-2"></i>Description
              </h6>
              <p className="text-muted" style={{ lineHeight: "1.8" }}>
                {product.description}
              </p>

              {/* Info Badges */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-truck me-1"></i>Free Shipping
                </span>
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-arrow-repeat me-1"></i>30-Day Returns
                </span>
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-shield-check me-1"></i>Secure Payment
                </span>
              </div>

              {/* Buttons */}
              <div className="d-flex gap-3 flex-wrap">
                <Link
                  to={`/products/${product.category}`}
                  className="btn btn-outline-dark rounded-pill px-4"
                >
                  <i className="bi bi-arrow-left me-2"></i>Back to{" "}
                  {product.category}
                </Link>
                <button className="btn btn-danger rounded-pill px-4">
                  <i className="bi bi-cart-plus me-2"></i>Add to Cart
                </button>
                <button className="btn btn-outline-danger rounded-pill px-3">
                  <i className="bi bi-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
