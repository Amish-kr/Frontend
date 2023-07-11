import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import ReactDom from 'react-dom';
import "./cancelModal.css";
import CrossModal1 from "./images/crossModal1.jpg";
import CancelModal2 from './CancelModal2';

export default function CancelModal({ open, children, onClose, id }) {
  const navigate = useNavigate();
  const [isOpen2, setIsOpen2] = useState(false);
    if (!open) return null;

    const handleCancelMeeting = async () => {
      try {
        // Make an HTTP request to the backend endpoint to cancel the meeting
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/cancelMeeting/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Accept: "application/json",
            },
            credentials: "include",
            // Pass any necessary data in the request body
            body: JSON.stringify({ meetingId: "<meeting-id>" }), // Replace "<meeting-id>" with the actual meeting ID
          }
        );
  
        if (response.ok) {
          setIsOpen2(true);
          navigate("/mymeeting");
        } else {
          console.error("Failed to cancel meeting");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
  
  return ReactDom.createPortal (
    <>
      <div className="modalOverlay1"></div>
      <div className="cancelOuter">
          <div>
            <img src={CrossModal1} onClick={onClose} alt="error" className="crossImg1" />
          </div>
          <div className="childModal1">
            {children}
          </div>
          <div className="modalOpt1Outer">
            <div onClick={handleCancelMeeting} className="yesModal1">
              Yes
            </div>
            <CancelModal2 open2={isOpen2}>
              Meeting link Canceled successfully
            </CancelModal2>
            <div onClick={onClose} className="noModal1">
              No
            </div>
          </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}
