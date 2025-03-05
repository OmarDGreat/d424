import React from 'react';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  return (
    <div className="products-page">
      <section className="section">
        <Categories />
      </section>
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Our Products</h2>
          <ProductList />
        </div>
      </section>
    </div>
  );
};

export default ProductsPage; 