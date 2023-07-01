import React, { useState } from "react";
import Filter from "./Filter";
import "../Styles/BadgeForm.css";

const createbadge = {
  // badgeName: "",
  badgeId: "",
  badgeDetails: "",
  employeeUsername: "",
  employeeEmail: "",
};

const Submitscreen = ({ setopen, message }) => {
  return (
    <div className="success__container">
      <div className="success__screen">
        <img
          src="/applysuccess.png"
          alt="applied successfully"
          className="success__image"
        />
        <p className="success__message">{message}</p>
        <button
          onClick={() => {
            window.location.reload(true);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const BadgeForm = () => {
  const [badgedata, setBadgedata] = useState(createbadge);
  const [open, setopen] = useState(false);
  const [message, setMessage] = useState("");

  const handlechange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setBadgedata((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBadgedata(createbadge);

    if (open === false) {
      setopen(true);
    }

    try {
      console.log(badgedata);
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}addbadges`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            badgeName: badgedata.badgeName,
            badgeId: badgedata.badgeId,
            badgeDetails: badgedata.badgeDetails,
            employeeEmail: badgedata.employeeEmail,
            employeeUsername: badgedata.employeeUsername,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setBadgedata(createbadge);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add the badge");
      }
    } catch (error) {
      console.error("Failed to submit badge:", error);
      setMessage("Failed to add the badge");
    }
  };

  return (
    <div className="badge__form__container">
      <h2>Create a Badge</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="form__fields">
          <label htmlFor="badgeName">Badge Name:</label>
          <input
            autoComplete="off"
            type="text"
            id="badgeName"
            value={badgedata.badgeName}
            onChange={handlechange}
            required
          />
        </div> */}

        <div className="form__fields">
          <label htmlFor="badgeId">Badge ID:</label>
          <input
            autoComplete="off"
            type="text"
            id="badgeId"
            value={badgedata.badgeId}
            onChange={handlechange}
            required
          />
        </div>

        <div className="form__fields">
          <label htmlFor="badgeDetails">Badge Details:</label>
          <select onChange={handlechange} id="badgeDetails">
            <option value="Select" hidden>
              Select
            </option>
            <option value="ongoing">Ongoing</option>
            <option value="earned">Earned</option>
          </select>
        </div>

        <Filter badgedata={badgedata} setBadgedata={setBadgedata} />
        <button type="submit">Create Badge</button>
      </form>

      {open && <Submitscreen setopen={setopen} message={message} />}
    </div>
  );
};

export default BadgeForm;
