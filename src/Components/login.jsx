import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import img1 from "../images/loginpic.png";
import img2 from "../images/kartexalogo.png";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cookies, setCookie] = useCookies(["jwt"]);

  const EmailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation example (you can customize it further)
    if (email.trim() === "") {
      setEmailError("Please enter your username.");
    }

    if (password.trim() === "") {
      setPasswordError("Please enter your password.");
    }

    if (email.trim() !== "" && password.trim() !== "") {
      try {
        // Make a POST request to the login endpoint using Axios
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/login`,
          { email, password },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("loggedin");
          window.location.href = "/";
        } else if (response.status === 400) {
          console.log("invalid credentials");
        } else {
          alert(response.message);
          console.log("not logged in");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }

      // Reset form
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <h1 className="welcome">Welcome to Kartexa</h1>
        <h3>
          <span className="hi">Hi </span>
          <span className="kartexian">"Kartexian"</span>
        </h3>
        <img src={img1} alt="loginpic" height="300" width="400" />
      </div>

      <div className="right-section">
        <img className="img" src={img2} alt="Logo" height="60" width="200" />
        <h2 className="right">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            ref={EmailRef}
          />
          {emailError && <p className="validation-error">{emailError}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            ref={passwordRef}
          />
          {passwordError && <p className="validation-error">{passwordError}</p>}

          <div className="hey">
            <Link className="forget" to="/forget">
              Forget Password?
            </Link>{" "}
          </div>
          <br />
          <button type="submit">Login</button>
          <br />
          <div className="Account">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
