import React from "react";
import Form from "../Form";
import meeting from "../images/meeting1.png";
import footerhexa from "../images/footerhexa.png";
import "./meetingInfo.css";



const MeetingInfo = () => {
  return (

      <div
        style={{
          display: "flex",
          width: "100vw",
          margin: "2rem 0",
          alignItems: "center",
          justifyContent: "center",
        }}>

      <img
        src={meeting}
        alt="meeting"
        width={"40%"}
      // style={{ paddingTop: "10rem" }}
      />
      <div className="mymeeting__form_container">
        <Form />
      </div>
    </div>
      
      );
      {/* <div style={{ width: "250vw" }}>
        <img src={footerhexa}  alt ="hexa" width="160%" style={{ marginBottom: "-1rem",
        display: "none"}} 
        />
        
      </div> */}
};

export default MeetingInfo;
