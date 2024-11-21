import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card" style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', margin: '10px' }}>
      {/* Product Image */}
      <div className="card-image">
        <figure
          className="image"
          style={{
            width: '100%',
            height: '200px', // Fixed height for all images
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={product.image || 'https://via.placeholder.com/300x225'} // Placeholder image if no product image is available
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Ensures the image fits within the container without distortion
            }}
          />
        </figure>
      </div>

      {/* Product Details */}
      <div className="card-content" style={{ padding: '15px' }}>
        <p className="title is-6 has-text-centered">{product.name}</p>
        <p className="subtitle is-6 has-text-centered has-text-primary">
          ${product.price.toFixed(2)}
        </p>
        <p className="content is-size-7 has-text-grey-dark" style={{ textAlign: 'justify' }}>
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </p>
      </div>

      {/* Footer Section */}
      <div className="card-footer" style={{ borderTop: '1px solid #ddd' }}>
        <Link
          to={`/product/${product._id}`}
          className="card-footer-item button is-link is-light"
          style={{
            borderRadius: '0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0',
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
