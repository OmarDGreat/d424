import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading)
    return (
      <div className="container has-text-centered mt-5">
        <h1 className="title">Loading product details...</h1>
        <div className="loader"></div> {/* Optional spinner */}
      </div>
    );

  if (error)
    return (
      <div className="container has-text-centered mt-5">
        <h1 className="title has-text-danger">{error}</h1>
      </div>
    );

  return (
    <div className="container mt-5">
      {product && (
        <div className="columns is-centered">
          {/* Product Image */}
          <div className="column is-half">
            <figure className="image is-square">
              <img
                src={product.image || 'https://via.placeholder.com/500x500'}
                alt={product.name}
                style={{
                  borderRadius: '8px',
                  objectFit: 'contain',
                  width: '100%',
                }}
              />
            </figure>
          </div>

          {/* Product Details */}
          <div className="column is-half">
            <h1 className="title">{product.name}</h1>
            <p className="subtitle is-4 has-text-primary">
              Price: ${product.price.toFixed(2)}
            </p>
            <div className="box" style={{ fontSize: '1.1rem' }}>
              {product.description}
            </div>
            <p className="has-text-grey-light">
              Added on: {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
