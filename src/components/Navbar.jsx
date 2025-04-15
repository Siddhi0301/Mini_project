import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">ArticleSummarizer</Link>
          </div>
          <ul className="navbar-menu">
            {user && (
              <li>
                <Link to="/home">Home</Link>
              </li>
            )}
            <li>
              {user ? (
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="login-link" to="/signup">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <header className="welcome-header">
        <h1>Welcome to Article Summarizer</h1>
        <p>Your tool to simplify content — summarize, understand, and save time!</p>
      </header>
    </>
  );
};

export default Navbar;
