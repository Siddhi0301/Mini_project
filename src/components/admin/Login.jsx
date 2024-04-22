import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/googleLogo.png";
import eyeIcon from "../../assets/eyeIcon.svg";
import { UserAuth } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const { googleSignIn, signIn, user } = UserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (e) {
      if (e.code === "auth/wrong-password") {
        console.log("Wrong password entered");
        setError("Wrong password entered. Please try again.");
      } else {
        alert(e.message);
        setError(e.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      if (user != null) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, [user]);

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div>
      <div className="login">
        <h1>Sign in to your account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email Address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className="password-input">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
            />
            <img
              src={eyeIcon}
              alt="Show Password"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button>Sign In</button>
        </form>
        <div className="googleSignin">
          <p onClick={handleGoogleSignIn}>
            <button>
              <img src={googleLogo} alt="googleLogo" />
              Sign in with Google
            </button>
          </p>
        </div>
        <button onClick={handleForgotPassword}>Forgot Password?</button>
        <p>
          Do not have an account yet? <Link to="/signup">Sign up.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
