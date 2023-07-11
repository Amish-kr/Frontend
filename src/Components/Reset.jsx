import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Reset.css";
import img3 from "../images/forgot.png";
import img2 from "../images/kartexalogo.png";
import img5 from "../images/verified.png";

const Reset = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [Newpassword, setNewpassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [NewpasswordError, setNewpasswordError] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordReset, setPasswordReset] = useState(false);

  const NewpasswordRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);
  const { id, token } = useParams();
  const history = useNavigate();

  const handleNewpasswordChange = (e) => {
    setNewpassword(e.target.value);
    setNewpasswordError("");
    setPasswordReset(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
    setPasswordReset(false);
  };

  const userValid = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/reset-password/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      // Login successful, do something
      console.log("link is auth");
    } else {
      // Login failed, display error message
      history("*");

      console.log("link is tampered");
      alert("bad request");
      navigate("/forget");
    }
  };

  useEffect(() => {
    userValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (Newpassword.trim() === "") {
      setNewpasswordError("Please enter a new password.");
      NewpasswordRef.current.focus();
      hasError = true;
    } else {
      setNewpasswordError("");
    }

    if (ConfirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm the password.");
      ConfirmPasswordRef.current.focus();
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) {
      return;
    }

    if (Newpassword.trim() !== ConfirmPassword.trim()) {
      setConfirmPasswordError(
        "Entered password does not match with the new password."
      );
      return;
    }

    try {
      // Make a POST request to the  endpoint
      const response = fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Newpassword, ConfirmPassword }),
        }
      );
      if (response.status === 200) {
        alert("Password Changed");
        navigate("/login");
      } else {
        console.log("password not changed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    setPasswordReset(true);

    setNewpassword("");
    setConfirmPassword("");
    setNewpasswordError("");
    setConfirmPasswordError("");
  };

  const handleBackToLogin = () => {
    setPasswordReset(false);
    navigate("/"); // Use the navigate function to redirect to "/login"
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={img3} alt="reset" height="400" width="400" />
      </div>

      <div className="right-section">
        <img className="img" src={img2} alt="Logo" height="60" width="200" />
        <h2 className="right">Reset Password</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="Newpassword">New Password</label>
          <input
            type="password"
            id="Newpassword"
            placeholder="Password"
            value={Newpassword}
            onChange={handleNewpasswordChange}
            ref={NewpasswordRef}
          />
          {NewpasswordError && (
            <p className="validation-error">{NewpasswordError}</p>
          )}

          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            placeholder="Password"
            value={ConfirmPassword}
            onChange={handleConfirmPasswordChange}
            ref={ConfirmPasswordRef}
          />
          {ConfirmPasswordError && (
            <p className="validation-error">{ConfirmPasswordError}</p>
          )}

          <br />
          <br />
          <button type="submit">Create Password</button>
          <br />
        </form>

        {isPasswordReset && (
          <div className="form-popup">
            <div className="form-popup-content">
              <img src={img5} alt="reset" height="100" width="100" />
              <p className="popup"> password reset successfully.</p>
              <button onClick={handleBackToLogin}>Back to login page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reset;
