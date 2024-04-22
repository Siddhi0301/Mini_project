import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const text1AnimationDuration = 1500; // Duration of text1 animation in milliseconds
    const text2AnimationDuration = 3000; // Duration of text2 animation in milliseconds
    const totalAnimationDuration = text1AnimationDuration + text2AnimationDuration;

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, totalAnimationDuration); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const onAnimationEnd = () => {
    setShowWelcome(false);
  };

  return (
    <>
      <nav>
        <div>
          <div
            className={`welcome-container ${showWelcome ? 'show' : 'hide'}`}
            onAnimationEnd={onAnimationEnd}
          >
            
          </div>
          <ul className={`navbar ${showWelcome ? 'hidden' : ''}`}>
            <li>
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/signup">Login</Link>
              )}
            </li>
            {user && (
              <li>
                <Link to="/home">Home</Link>
              </li>
            )}
          </ul>
          {/* Animation */}
          {showWelcome && (
            <div className="container">
              <span className="text1">Welcome To</span>
              <span className="text2">Article Summarizer Tool</span>
            </div>
          )}
          {/* End Animation */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
