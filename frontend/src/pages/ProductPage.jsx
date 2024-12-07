import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { createOrder } from '../services/orderService'; // Import the order creation service

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [orderSuccess, setOrderSuccess] = useState(false); // State to track order success

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

  const handleOrderNow = async () => {
    try {
      const orderData = {
        orderItems: [
          {
            name: product.name,
            quantity,
            price: product.price,
            product: product._id,
          },
        ],
        shippingAddress: {
          address: '123 Main St',
          city: 'Springfield',
          postalCode: '12345',
          country: 'USA',
        },
        paymentMethod: 'PayPal',
        totalPrice: quantity * product.price,
      };

      await createOrder(orderData); // Call the backend to create an order
      setOrderSuccess(true);
    } catch (err) {
      console.error('Failed to create order:', err);
      setError('Failed to create order.');
    }
  };

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

            {/* Order Now Section */}
            <div className="mt-4">
              <label className="label">Quantity</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
              </div>
              <button
                className="button is-primary mt-3"
                onClick={handleOrderNow}
              >
                Order Now
              </button>
              {orderSuccess && (
                <p className="has-text-success mt-3">
                  Order placed successfully!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
