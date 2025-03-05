import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundColor: "#2c3e50", padding: "3rem 1.5rem" }}
    >
      <div className="container">
        <div className="columns">
          <div className="column is-4">
            <h3 className="title is-4 has-text-white mb-4">
              <i className="fas fa-microchip mr-2"></i>
              TechHub
            </h3>
            <p className="has-text-grey-lighter">
              Your trusted source for premium computer hardware and components.
              Building dreams, one PC at a time.
            </p>
            <div className="mt-4">
              <a
                href="#"
                className="icon is-medium mr-3"
                style={{ color: "#3498db" }}
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="#"
                className="icon is-medium mr-3"
                style={{ color: "#3498db" }}
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="#"
                className="icon is-medium mr-3"
                style={{ color: "#3498db" }}
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="#"
                className="icon is-medium"
                style={{ color: "#3498db" }}
              >
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>

          <div className="column is-2 is-offset-1">
            <h4 className="title is-5 has-text-white mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/" className="has-text-grey-lighter hover-effect">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="has-text-grey-lighter hover-effect"
                >
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="has-text-grey-lighter hover-effect"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="has-text-grey-lighter hover-effect"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="column is-2">
            <h4 className="title is-5 has-text-white mb-4">Support</h4>
            <ul>
              <li className="mb-2">
                <Link to="/faq" className="has-text-grey-lighter hover-effect">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/shipping"
                  className="has-text-grey-lighter hover-effect"
                >
                  Shipping Info
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/returns"
                  className="has-text-grey-lighter hover-effect"
                >
                  Returns
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy"
                  className="has-text-grey-lighter hover-effect"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="column is-3">
            <h4 className="title is-5 has-text-white mb-4">Newsletter</h4>
            <p className="has-text-grey-lighter mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    border: "none",
                  }}
                />
              </div>
              <div className="control">
                <button className="button is-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <hr
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            margin: "2rem 0",
          }}
        />

        <div className="content has-text-centered has-text-grey-lighter">
          <p>© {new Date().getFullYear()} TechHub. All rights reserved.</p>
        </div>
      </div>

      <style>
        {`
          .hover-effect {
            transition: color 0.3s ease;
          }
          .hover-effect:hover {
            color: #3498db !important;
          }
          .footer .icon {
            transition: transform 0.3s ease;
          }
          .footer .icon:hover {
            transform: translateY(-3px);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
