import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./FormPage.css";
import img1 from "../images/loginpic.png";
import img2 from "../images/kartexalogo.png";
import img5 from "../images/verified.png";

const FormPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isAccountCreated, setAccountCreated] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleAgreementChange = (e) => {
    setAgreementChecked(e.target.checked);
    setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (username.trim() === "") {
      setUsernameError("Please enter your username.");
      usernameRef.current.focus();
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (email.trim() === "") {
      setEmailError("Please enter your email.");
      emailRef.current.focus();
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Please enter your password.");
      passwordRef.current.focus();
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!agreementChecked) {
      setPasswordError("Please agree to the terms and conditions.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/signup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        alert("User not created");
        // Handle error case here
      }
    } catch (error) {
      console.log("Error occurred:", error);
      // Handle error case here
    }
    setAccountCreated(true);

    // Perform signup logic here
    // console.log("Account created successfully!");

    // Reset form
    setUsername("");
    setEmail("");
    setPassword("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setAgreementChecked(false);
  };

  const handleBackToLogin = () => {
    setAccountCreated(false);
    navigate("/"); // Use the navigate function to redirect to "/login"
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
        <h2 className="right">Signup</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            ref={usernameRef}
          />
          {usernameError && <p className="validation-error">{usernameError}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            ref={emailRef}
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

          <label htmlFor="agreement" className="agreement-label">
            <input
              type="checkbox"
              id="agreement"
              checked={agreementChecked}
              onChange={handleAgreementChange}
            />
            <span className="agreement-text">
              I agree below, you acknowledge that you have read and understood
              our policies, including our terms and conditions, privacy policy.
            </span>
          </label>
          <br />
          <button type="submit">Create Account</button>
          <br />
          <div className="Account">
            Already have an account?
            <Link to="/">Sign in</Link>
          </div>
        </form>
        {isAccountCreated && (
          <div className="form-popup">
            <div className="form-popup-content">
              <img src={img5} alt="reset" height="100" width="100" />
              <p className="popup">Account created Successfully.</p>
              <button onClick={handleBackToLogin}>Back to login page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPage;
