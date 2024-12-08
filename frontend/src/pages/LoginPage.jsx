import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // Extract the token from the response
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      setIsAuthenticated(true);
      setError(""); // Clear error on success
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      // Enhanced error handling
      if (error.response?.data?.message) {
        setError(error.response.data.message); // Server-side error message
      } else if (error.message === "Network Error") {
        setError("Network error. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <h1 className="title has-text-centered">Login</h1>
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control">
                <input
                  id="email"
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="control">
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && (
              <p
                className="has-text-danger has-text-centered"
                role="alert" // Add role for accessibility
              >
                {error}
              </p>
            )}
            <div className="field">
              <button
                className="button is-primary is-fullwidth"
                type="submit"
                disabled={!email || !password} // Disable button if inputs are empty
              >
                Login
              </button>
            </div>
          </form>
          <p className="has-text-centered">
            Don’t have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
