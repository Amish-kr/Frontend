import React, { useState, useRef } from "react";
import "./Forget.css";
import img4 from "../images/remove.png";
import img2 from "../images/kartexalogo.png";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const emailRef = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setEmailError("Please enter your email.");
      emailRef.current.focus();
      return;
    }

    if (email.trim() !== "") {
      // Reset part
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        console.log(data);
        // Handle the response
        if (data.success) {
          // mail sent, do something
          console.log(data.message);
        } else {
          // mail not sent, display error message
          console.log(data.message);
        }
      } catch (err) {
        console.log(err);
      }
      setEmail("");
      setEmailError("");
      setShowModal(true); // Show modal on successful login
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={img4} alt="loginpic" height="400" width="400" />
      </div>

      <div className="right-section">
        <img className="img" src={img2} alt="Logo" height="60" width="200" />
        <h2 className="right">Forget Password</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Enter your email address or phone number
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            ref={emailRef}
          />
          {emailError && <p className="validation-error">{emailError}</p>}

          <br />
          <br />
          <button type="submit">Continue</button>
          <br />
        </form>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Check your email</h3>
            <p>
              An email with instructions to reset your password has been sent to
              your email address.
            </p>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forget;
