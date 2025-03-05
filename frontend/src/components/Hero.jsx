import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="hero is-large is-bold"
      style={{
        backgroundImage:
          'url("https://www.computersciencedegreehub.com/wp-content/uploads/2020/04/What-is-E-Commerce.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <div className="hero-body">
        <div className="container has-text-centered">
          {/* Hero Title */}
          <h1
            className="title has-text-weight-bold is-size-1"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          >
            Your One-Stop Computer Hardware Shop
          </h1>
          {/* Hero Subtitle */}
          <h2
            className="subtitle is-size-4"
            style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)" }}
          >
            Top-notch components at unbeatable prices
          </h2>
          {/* Call to Action */}
          <div className="buttons is-centered mt-5">
            <Link
              to="/products"
              className="button is-link is-large has-text-weight-semibold"
            >
              Shop Now
            </Link>
            <Link
              to="/categories"
              className="button is-light is-large has-text-weight-semibold"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
