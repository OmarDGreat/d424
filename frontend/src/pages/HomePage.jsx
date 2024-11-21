import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import 'bulma/css/bulma.min.css';

const HomePage = ({ isAuthenticated }) => {
  return (
    <div className="homepage">
      <Hero />
      <section className="section">
        <Categories />
      </section>
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Featured Products</h2>
          <ProductList />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
