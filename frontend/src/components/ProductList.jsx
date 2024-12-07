import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter'; // Import the SearchFilter component

const ProductList = () => {
  const [products, setProducts] = useState([]); // Original product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        const productData = data.products || data; // Adjust for backend response format
        setProducts(productData);
        setFilteredProducts(productData); // Initially set filtered products to all products
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products.');
      } finally {
        setLoading(false); // Ensure loading state is updated in all cases
      }
    };

    loadProducts();
  }, []);

  // Handle search query
  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(products); // Reset to original product list if query is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive search
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="container has-text-centered mt-5">
        <h1 className="title">Loading products...</h1>
        <progress className="progress is-small is-primary" max="100"></progress>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container has-text-centered mt-5">
        <h1 className="title has-text-danger">{error}</h1>
        <button
          className="button is-primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Our Products</h1>
      {/* Include SearchFilter component */}
      <SearchFilter onSearch={handleSearch} />
      {filteredProducts.length === 0 ? (
        <div className="has-text-centered">
          <p>No products match your search criteria.</p>
        </div>
      ) : (
        <div className="columns is-multiline is-variable is-8">
          {filteredProducts.map((product) => (
            <div className="column is-one-third" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
