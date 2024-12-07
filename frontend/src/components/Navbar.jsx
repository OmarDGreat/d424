import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/api/users/profile`, config);
      setUsername(data.name);
    } catch (error) {
      console.error('Failed to fetch username:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsername();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsAuthenticated(false); // Update authentication state
    navigate('/'); // Redirect to the homepage
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <nav className="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
      <div className="container">
        {/* Brand Section */}
        <div className="navbar-brand">
          <a className="navbar-item is-size-4 has-text-weight-bold" href="/">
            Ecommerce
          </a>
          <a
            role="button"
            className={`navbar-burger ${isBurgerOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isBurgerOpen ? 'true' : 'false'}
            data-target="navbarMenu"
            onClick={toggleBurgerMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* Menu Section */}
        <div id="navbarMenu" className={`navbar-menu ${isBurgerOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            {!isAuthenticated ? (
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-light is-rounded" href="/login">
                    Log in
                  </a>
                  <a className="button is-primary is-rounded" href="/signup">
                    Sign up
                  </a>
                </div>
              </div>
            ) : (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link is-capitalized">
                  Welcome, {username || 'User'}
                </a>
                <div className="navbar-dropdown is-right">
                  <a className="navbar-item" href="/profile">
                    My Profile
                  </a>
                  <hr className="navbar-divider" />
                  <button className="navbar-item button is-danger is-fullwidth" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
