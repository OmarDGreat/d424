import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for routing
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/api/users/profile`, config);
      setUsername(data.name);
    } catch (error) {
      console.error("Failed to fetch username:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsername();
    }

    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsAuthenticated(false); // Update authentication state
    navigate("/"); // Redirect to the homepage
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <nav
      className={`navbar is-fixed-top ${isScrolled ? "has-shadow" : ""}`}
      role="navigation"
      aria-label="main navigation"
      style={{
        background: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        transition: "all 0.3s ease",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="container">
        {/* Brand Section */}
        <div className="navbar-brand">
          <Link
            className="navbar-item brand-text"
            to="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: isScrolled ? "#363636" : "#fff",
              transition: "color 0.3s ease",
            }}
          >
            <i className="fas fa-microchip mr-2"></i>
            TechHub
          </Link>

          <a
            role="button"
            className={`navbar-burger ${isBurgerOpen ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isBurgerOpen ? "true" : "false"}
            onClick={toggleBurgerMenu}
            style={{
              color: isScrolled ? "#363636" : "#fff",
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* Menu Section */}
        <div className={`navbar-menu ${isBurgerOpen ? "is-active" : ""}`}>
          <div className="navbar-end">
            <Link
              to="/products"
              className="navbar-item custom-navbar-item"
              style={{
                color: isScrolled ? "#363636" : "#fff",
                transition: "all 0.3s ease",
              }}
            >
              Products
            </Link>

            {!isAuthenticated ? (
              <div className="navbar-item">
                <div className="buttons">
                  <Link
                    to="/login"
                    className="button is-light is-outlined custom-button"
                    style={{
                      borderColor: isScrolled ? "#363636" : "#fff",
                      color: isScrolled ? "#363636" : "#fff",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="button is-primary custom-button"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            ) : (
              <div className="navbar-item has-dropdown is-hoverable">
                <a
                  className="navbar-link is-arrowless"
                  style={{
                    color: isScrolled ? "#363636" : "#fff",
                  }}
                >
                  <i className="fas fa-user-circle mr-2"></i>
                  {username || "User"}
                </a>

                <div className="navbar-dropdown is-right">
                  <Link className="navbar-item" to="/profile">
                    <i className="fas fa-id-card mr-2"></i>
                    Profile
                  </Link>
                  <Link className="navbar-item" to="/orders">
                    <i className="fas fa-shopping-bag mr-2"></i>
                    Orders
                  </Link>
                  <hr className="navbar-divider" />
                  <a
                    className="navbar-item has-text-danger"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          .custom-navbar-item:hover {
            background: ${
              isScrolled ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.05)"
            } !important;
            color: ${
              isScrolled ? "#4a4a4a" : "rgba(255, 255, 255, 0.9)"
            } !important;
          }

          .custom-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            opacity: 0.95;
          }

          .navbar-dropdown {
            border-top: 2px solid #dbdbdb;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(10, 10, 10, 0.05);
          }

          .navbar-dropdown .navbar-item:hover {
            background-color: #fafafa;
            color: #4a4a4a;
          }

          /* Apply the same hover effect to brand and username */
          .brand-text:hover,
          .navbar-link:hover {
            background: ${
              isScrolled ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.05)"
            } !important;
            color: ${
              isScrolled ? "#4a4a4a" : "rgba(255, 255, 255, 0.9)"
            } !important;
          }

          .navbar-link:not(.is-arrowless)::after {
            border-color: ${
              isScrolled ? "#4a4a4a" : "rgba(255, 255, 255, 0.9)"
            };
          }
        `}
      </style>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Navbar;
