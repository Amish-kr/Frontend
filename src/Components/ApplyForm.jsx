import React, { useState } from "react";
import upload from "../assets/Leaveform/upload.png";
import Upload from "./Upload_leave";
import "../Styles/Applyform.css";
import success from "../assets/Leaveform/applysuccess.png";
import { Link } from "react-router-dom";
import { pendingleaves } from "../constants/data.js";

const Submitscreen = () => {
  return (
    <div className="submit-container">
      <div className="success-screen">
        <img
          src={success}
          alt="applied successfully"
          className="success-image"
        />
        <p className="success-message">Leave applied successfully</p>
        <Link to={"/home"} className="homebtn">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

const ApplyForm = () => {
  const [filename, setFilename] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [Submit, setSubmit] = useState(false);
  const [document, setDocument] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const [name, email, leave, startDate, endDate] = e.target.elements;
    if (
      name.value === "" ||
      email.value === "" ||
      leave.value === "" ||
      startDate.value === "" ||
      endDate.value === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    const data = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/leave/new`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          leave: leave.value,
          startDate: startDate.value,
          endDate: endDate.value,
          document,
        }),
      }
    );

    const res = await data.json();
    // console.log(res);

    // console.log(Submit)
    if (Submit === true) return;
    setSubmit(true);
  };

  const file = filename ? filename[0].name : "";
  return (
    <>
      <form className="form-container" onSubmit={handlesubmit}>
        <h1 className="form-title">Apply form</h1>

        <div className="form-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter email"
          />
        </div>
        <div className="form-input">
          <label htmlFor="leave">Leave Reason</label>
          <select name="leave" className="select">
            <option value="" hidden>
              Select Leave Reason
            </option>
            {pendingleaves.map((leave, index) => (
              <option key={index} value={leave.type}>
                {leave.type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-input">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="input"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <p className="form-text">To</p>
        <div className="form-input">
          <label htmlFor="endDate">End Date</label>
          <input type="date" className="input" />
        </div>
        <div className="form-input">
          <label htmlFor="upload">Upload Documents</label>
          <input type="text" className="inputfile" value={file} readOnly />
          <div className="upload-button" onClick={() => setOpenModal(true)}>
            <img src={upload} alt="" className="upload-icon" />
            <p>Upload</p>
          </div>
        </div>
        <div className="apply">
          <button type="submit" className="apply-button">
            Apply
          </button>
        </div>
      </form>
      {openModal && (
        <Upload
          closeModal={setOpenModal}
          setFilename={setFilename}
          setDocument={setDocument}
          Filename={filename}
        />
      )}
      {Submit && <Submitscreen />}
    </>
  );
};
export default ApplyForm;
