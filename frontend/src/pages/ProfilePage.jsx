import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect to login if not authenticated
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          config
        );
        setUserData({ name: data.name, email: data.email, password: "" }); // Don't load password for security
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        navigate("/login"); // Redirect if the token is invalid
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle form submission for profile updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
        config
      );

      alert("Profile updated successfully!");
      setUserData({ name: data.name, email: data.email, password: "" });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete("http://localhost:5000/api/users/profile", config);
      localStorage.removeItem("token");
      alert("Your account has been deleted.");
      navigate("/signup");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">My Profile</h1>
          <form onSubmit={handleSubmit} className="box">
            {/* Name Field */}
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="field">
              <label className="label">Password</label>
              <div
                className="control"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  className="input"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Enter new password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  disabled={!isEditing}
                  style={{ fontFamily: "monospace", flex: "1" }} // Input takes full width
                />
                {isEditing && (
                  <span
                    className="icon is-small"
                    style={{
                      cursor: "pointer",
                      marginLeft: "8px", // Add space between input and icon
                    }}
                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </span>
                )}
              </div>
              {!isEditing && (
                <p className="help">Password is hidden by default</p>
              )}
            </div>

            {/* Buttons */}
            <div className="buttons is-centered mt-4">
              {isEditing ? (
                <>
                  <button type="submit" className="button is-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="button is-light"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="button is-link"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
              <button
                type="button"
                className="button is-danger"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
