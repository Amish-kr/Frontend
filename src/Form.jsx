import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateString } from "./generateRandomString";

const initialValues = {
  meetingWith: "",
  agenda: "",
  meetingDate: "",
  startTime: "",
  endTime: "",
  meetLink: "",
};

const Form = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSave, setIsSave] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = validate(formValues);
    setFormErrors(error);
    // console.log(error);
    if (!JSON.stringify(error)) setIsSave(true);
    if (Object.keys(formErrors).length === 0) {
      const isFormFilled = Object.values(formValues).every(
        (value) => value !== ""
      );
      if (isFormFilled) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_ENDPOINT}/postmeetdetail`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(formValues),
            }
          );

          if (response.ok) {
            setFormValues(initialValues); // Reset the form values to initial state
            navigate("/mymeeting");
          } else {
            console.error("Failed to save data");
          }
        } catch (error) {
          console.error("Error occurred:", error);
        }
      } else {
        console.error("Please fill all the form fields");
      }
    }
  };

  const generatelink = (e) => {
    const domain = "meet.jit.si"; // Replace with your Jitsi Meet domain
    const roomName = generateString(20); // Replace with your desired room name

    const string = `https://${domain}/${roomName}`;
    setFormValues({ ...formValues, meetLink: string });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSave) {
      // console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.meetingWith) {
      errors.meetingWith = "Field is required!";
    }
    if (!values.agenda) {
      errors.agenda = "Field is required!";
    }
    if (!values.meetingDate) {
      errors.meetingDate = "Field is required!";
    }
    if (!values.startTime) {
      errors.startTime = "Field is required!";
    }
    if (!values.endTime) {
      errors.endTime = "Field is required!";
    }
    if (!values.meetLink) {
      errors.meetLink = "Field is required!";
    }
    return errors;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="my-meeting-form"
        style={{
          display: "flex",
          padding: "1rem",
          flexDirection: "column",
        }}
      >
        <h2 className="meeting-information">Meeting Information</h2>
        <div className="form-items">
          <h4>Meeting With</h4>
          <div style={{ width: "100%" }}>
            <input
              className="text-box-wi input"
              type="text"
              name="meetingWith"
              placeholder="Enter Meeting Person"
              value={formValues.meetingWith}
              onChange={handleChange}
            ></input>
            <div className="errorset">{formErrors.meetingWith}</div>
          </div>
        </div>

        <div className="form-items agenda">
          <h4>Agenda</h4>
          <div style={{ width: "100%", marginRight: "1rem" }}>
            <input
              className="text-box-wi input"
              type="text"
              name="agenda"
              placeholder="Enter Agenda"
              value={formValues.agenda}
              onChange={handleChange}
            ></input>
            <div className="errorset">{formErrors.agenda}</div>
          </div>
        </div>

        <div className="form-items meet-link">
          <h4>Meeting Date</h4>
          <div style={{ width: "100%" }}>
            <input
              className="text-box-wi input"
              type="date"
              name="meetingDate"
              placeholder="Enter Meeting Date"
              value={formValues.meetingDate}
              onChange={handleChange}
            ></input>
            <div className="errorset">{formErrors.meetingDate}</div>
          </div>
        </div>

        <div className="form-items meet-time">
          <h4>Meeting Time</h4>
          <div className="start-end" style={{ width: "100%" }}>
            <input
              className="text-box-wi input"
              type="time"
              name="startTime"
              placeholder="Start Time"
              value={formValues.startTime}
              onChange={handleChange}
              // style={{ width: "100%" }}
            ></input>
            <div className="errorset">{formErrors.startTime}</div>
            <h4>To</h4>
            <input
              className="text-box-wi input"
              type="time"
              name="endTime"
              placeholder="End Time"
              value={formValues.endTime}
              onChange={handleChange}
            ></input>
            <div className="errorset">{formErrors.endTime}</div>
          </div>
        </div>
        <div className="form-items meet-link">
          <h4>Meet Link</h4>
          <div style={{ width: "100%" }}>
            <input
              className="text-box-wi input"
              type="link"
              name="meetLink"
              placeholder="Enter Meet link"
              value={formValues.meetLink}
              onChange={handleChange}
            ></input>
            <div className="errorset">{formErrors.meetLink}</div>
          </div>
        </div>
        <button
          className="generate-link-button"
          type="button"
          onClick={generatelink}
          style={{
            padding: "8px 113px",
            gap: "10px",
            width: "300px",
            height: "37px",
            background: "#0478FF",
            borderRadius: "10px",
            border: "none",
            marginTop: "2rem",
            marginLeft: "50%",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Generate Link
        </button>

        <button className="save-button" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default Form;
