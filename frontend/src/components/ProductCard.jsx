import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%23999'%3EImage not available%3C/text%3E%3C/svg%3E";

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const getPlaceholderImage = (category) => {
    // Category-specific placeholders
    const placeholders = {
      CPU: "/images/placeholders/cpu-placeholder.png",
      GPU: "/images/placeholders/gpu-placeholder.png",
      RAM: "/images/placeholders/ram-placeholder.png",
      Storage: "/images/placeholders/storage-placeholder.png",
      Motherboard: "/images/placeholders/motherboard-placeholder.png",
      PSU: "/images/placeholders/psu-placeholder.png",
      Case: "/images/placeholders/case-placeholder.png",
      default: "/images/placeholders/default-placeholder.png",
    };

    return placeholders[category] || placeholders.default;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderSpecifications = () => {
    const specs = product.specifications;
    switch (product.category) {
      case "CPU":
        return (
          <>
            <p>
              {specs.cores} Cores, {specs.threads} Threads
            </p>
            <p>Base: {specs.baseSpeed}</p>
          </>
        );
      case "GPU":
        return (
          <>
            <p>
              {specs.memory} {specs.memoryType}
            </p>
            <p>Clock: {specs.coreClock}</p>
          </>
        );
      case "RAM":
        return (
          <>
            <p>
              {specs.capacity} {specs.type}
            </p>
            <p>
              {specs.speed} {specs.timing}
            </p>
          </>
        );
      case "Storage":
        return (
          <>
            <p>
              {specs.type} {specs.capacity}
            </p>
            <p>Read: {specs.readSpeed}</p>
          </>
        );
      case "Motherboard":
        return (
          <>
            <p>
              {specs.formFactor}, {specs.socket}
            </p>
            <p>{specs.chipset}</p>
          </>
        );
      case "PSU":
        return (
          <>
            <p>
              {specs.wattage}, {specs.efficiency}
            </p>
            <p>{specs.modular}</p>
          </>
        );
      case "Case":
        return (
          <>
            <p>
              {specs.type}, {specs.material}
            </p>
            <p>GPU: up to {specs.maxGPULength}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="column is-3-desktop is-4-tablet is-6-mobile">
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className="card product-card">
          <div className="card-image">
            <figure className="image is-square">
              <img
                src={imageError ? PLACEHOLDER_IMAGE : product.image}
                alt={product.name}
                style={{
                  objectFit: "contain",
                  padding: imageError ? "2rem" : "1rem",
                  background: imageError ? "#f5f5f5" : "#ffffff",
                  width: "100%",
                  height: "100%",
                  maxHeight: "300px",
                  minHeight: "300px",
                }}
                onError={() => setImageError(true)}
              />
            </figure>
            {product.stock <= 5 && product.stock > 0 && (
              <div className="tag is-warning stock-tag">
                Only {product.stock} left!
              </div>
            )}
            {product.stock === 0 && (
              <div className="tag is-danger stock-tag">Out of Stock</div>
            )}
          </div>

          <div className="card-content">
            <p className="title is-5 mb-2 product-title">{product.name}</p>
            <p className="subtitle is-6 mb-2 has-text-grey product-brand">
              {product.brand}
            </p>
            <div className="specifications mb-2">{renderSpecifications()}</div>
            <p className="has-text-primary has-text-weight-bold is-size-5">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>

      <style>
        {`
          .product-card {
            height: 100%;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }

          .product-card-link {
            color: inherit;
          }

          .product-card-link:hover {
            color: inherit;
          }

          .product-title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            min-height: 3em;
          }

          .product-brand {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .stock-tag {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 1;
          }

          .card-image {
            position: relative;
            background: #ffffff;
            padding: 1rem;
          }

          .image.is-square {
            padding-top: 100%;
            position: relative;
            overflow: hidden;
          }

          .image.is-square img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            transition: transform 0.3s ease;
          }

          .product-card:hover .card-image img {
            transform: translate(-50%, -50%) scale(1.05);
          }
        `}
      </style>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    specifications: PropTypes.object.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
