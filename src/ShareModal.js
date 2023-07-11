import { React, useEffect, useState } from "react";
import ReactDom from "react-dom";
import "./shareModal.css";
import CrossModal2 from "./images/crossModal2.jpg";
import HeadImg from "./images/shareModalImg.jpg";
import LinkCopy from "./images/linkCopy.jpg";
import Search from "./images/modalSearch.jpg";
import Share1 from "./images/shareIcon1.jpg";
import Share2 from "./images/shareIcon2.jpg";
import Share3 from "./images/shareIcon3.jpg";
import ModalDesign from "./images/modalDesign.jpg";

export default function ShareModal({ open3, children, onClose3, id }) {
  const [meet, setMeet] = useState(null);
  const [emails, setEmails] = useState("");
  useEffect(() => {
    const fetchMeetDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/getmeetdetails/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMeet(data);
        } else {
          console.error("Failed to fetch meet details");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchMeetDetails();
  }, [id]);

  const handleEmailsChange = (event) => {
    setEmails(event.target.value);
  };

  const handleSendInvite = async () => {
    try {
      const emailList = emails.split(",").map((email) => email.trim());

      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/sendInvites/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            emails: emailList,
            link: meet.link,
            starttime: meet.starttime,
            agenda: meet.agenda,
            date: meet.date,
            duration: meet.duration,
          }), // Pass the emailList variable in the request body
        }
      );

      if (response.ok) {
        // Handle success
        alert("Invites sent successfully");
      } else {
        // Handle failure
        console.error("Failed to send invites");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  if (!open3) return null;
  return ReactDom.createPortal(
    <div>
      <div className="modalOverlay2"></div>
      <div className="crossImg2Outer">
        <img
          src={CrossModal2}
          alt="error"
          onClick={onClose3}
          className="crossImg2"
        />
      </div>
      <div className="shareModalOuter">
        <div className="modalHeadOuter">
          <div className="modalHead">Share meet link with group member</div>
          <div>
            <img src={HeadImg} alt="error" className="modalHeadImg" />
          </div>
        </div>
        <div className="shareModalText">
          You've created a new meeting! Invite your team to review
        </div>
        <div className="shareModalText shareModalText2">
          collaborate on this meeting
        </div>
        <div className="linkHead">Project link</div>
        <div className="linkOuter">
          <div className="projectLink">
            <p className="projectLinkP1">{meet.link}</p>
            <div className="projectEmbed">&lt;&gt; Embed</div>
          </div>
          <div className="linkCopy">
            <img src={LinkCopy} alt="error" className="linkCopyImg" />
          </div>
        </div>
        <div className="linkHead">Invite team members</div>
        <div className="linkOuter">
          <div className="searchOuter">
            <img src={Search} alt="error" className="searchImg" />
            <input
              type="text"
              placeholder="Input emails:"
              className="searchText"
              onChange={handleEmailsChange}
            ></input>
          </div>
          <div className="sendInvite" onClick={handleSendInvite}>
            Send invite
          </div>
        </div>
        <div className="linkHead">Share via</div>
        <div className="shareOuter">
          <div>
            <img src={Share1} alt="error" className="shareImg1" />
          </div>
          <div>
            <img src={Share2} alt="error" className="shareImg" />
          </div>
          <div>
            <img src={Share3} alt="error" className="shareImg" />
          </div>
          <div className="modalDesign">
            <img src={ModalDesign} alt="error" className="modalDesignImg" />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
