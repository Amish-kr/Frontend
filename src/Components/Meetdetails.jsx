import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./meetDetails.css";
import Footer from './footer';
import Arrow2 from "../images/arrow2.jpg";
import MeetTopic from "../images/meetTopic.jpg";
import MeetDesc from "../images/meetDesc.jpg";
import MeetDate from "../images/meetDate.jpg";
import MeetHost from "../images/meetHost.jpg";
import MeetDept from "../images/meetDept.jpg";
import MeetMember from "../images/meetMember.jpg";
import AvatarImg from "../images/avatar_img.jpg";
import AvatarImg2 from "../images/avatar2.jpg";
import AvatarImg3 from "../images/avatar3.jpg";
import AvatarImg4 from "../images/avatar4.jpg";
import MeetDuration from "../images/meetDuration.jpg";
import CancelModal from '../CancelModal';
import ShareModal from '../ShareModal';




export default function Meetdetails() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [meet, setMeet] = useState(null);
    const { id } = useParams();
    const history = useNavigate();
    function returnback() {
        history("/mymeeting");
    }
    useEffect(() => {
        const fetchMeetDetail = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_ENDPOINT}/getmeetdetails/${id}`,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
    
            if (!response.ok) {
              throw new Error("Error fetching meet detail");
            }
    
            const meetData = await response.json();
    
            setMeet(meetData);
          } catch (error) {
            console.error(error);
            // Handle error state or display an error message to the user
          }
        };
    
        fetchMeetDetail();
    }, [id]);
    if (meet === null) {
        // Render a loading state or return null
        return <div>Loading...</div>;
    }
    return (
        <div className='meetdetails__container'>
            <div className="outerDetail">
                <div className="img1">
                    <img src={Arrow2} className="arrow1" alt="error" onClick={()=> {history("/mymeeting")}}/>
                </div>
                <div className="meetHead">Agenda - {meet.agenda}</div>
                <div onClick={() => setIsOpen3(true)} className="button1">
                    Share meet
                </div>
                <ShareModal open3={isOpen3} onClose3={() => setIsOpen3(false)} id={meet._id}>
                    Share meet link
                </ShareModal>
                <div onClick={() => setIsOpen(true)} className="button2">
                    Cancel request
                </div>
                <CancelModal open={isOpen} onClose={() => setIsOpen(false)} id={meet._id}>
                    Do you want to cancel meet request?
                </CancelModal>
            </div>
            <div className="outer1Detail">
                <div className="outer2Detail">
                    <img src={MeetTopic} alt="error" className="img2" />
                    <span className="img2Head">
                        Topic of the meet
                    </span>
                </div>
                <div>
                    <p className="para1">{meet.topic}</p>
                </div>
            </div>
            <div className="outer1Detail">
                <div className="outer2Detail">
                    <img src={MeetDesc} alt="error" className="img2" />
                    <span className="img3Head">
                        Description of the meet
                    </span>
                </div>
                <div>
                    <p className="para2">{meet.desc}</p>
                </div>
            </div>
            <div className="outer1Detail">
                <div className="outer2Detail">
                    <img src={MeetDate} alt="error" className="img2" />
                    <span className="img3Head img4Head">
                        Date of the meet
                    </span>
                </div>
                <div className="meetDateOuter">
                    <div className="dateHeadOuter">
                        <div className="meetDateTime">
                            {meet.date}
                        </div>
                        {/* <div className="meetCalender">
                            Add to calender
                        </div> */}
                    </div>
                    <div className="meetTime">
                        (GMT +5:30) India Standard Time(Asia/Kolkata)
                    </div>
                </div>
            </div>
            <div className="outer1Detail meetHostOuter">
                <div className="outer2Detail">
                    <img src={MeetHost} alt="error" className="img2" />
                    <span className="img3Head img4_2">
                        Host of the meet
                    </span>
                </div>
                <div className="hostDetailOuter">
                    <div className="hostDetailHead">
                        Host name
                    </div>
                    <div className="hostDetail">
                        {meet.host}
                    </div>
                </div>
                <div className="hostDetailOuter">
                    <div className="hostDetailHead2">
                        Host Email id
                    </div>
                    <div className="hostDetail">
                        {meet.hostEmail}
                    </div>
                </div>
            </div>
            <div className="outer1Detail meetHostOuter">
                <div className="outer2Detail">
                    <img src={MeetDept} alt="error" className="img2" />
                    <span className="img3Head img5Head">
                        Department
                    </span>
                </div>
                <div className="hostDetailOuter">
                    <div className="hostDetailHead">
                        Department of the meet
                    </div>
                    <div className="meetDept">
                        {meet.dept}
                    </div>
                </div>
            </div>
            <div className="outer1Detail meetHostOuter">
                <div className="outer2Detail">
                    <img src={MeetMember} alt="error" className="img2" />
                    <span className="img3Head img4Head">
                        Invited participants
                    </span>
                </div>
                <div className="memberOuter">
                    <div className="avatarGroup2">
                        <div className="avatar2">
                            <img src={AvatarImg} alt="error" className="avatar_img2" />
                        </div>
                        <div className="avatar2">
                            <img src={AvatarImg2} alt="error" className="avatar_img2" />
                        </div>
                        <div className="avatar2">
                            <img src={AvatarImg3} alt="error" className="avatar_img2" />
                        </div>
                        <div className="avatar2">
                            <img src={AvatarImg4} alt="error" className="avatar_img2" />
                        </div>
                        <div className="avatar2">
                            <img src={AvatarImg} alt="error" className="avatar_img2" />
                        </div>
                        <div className="avatar2">
                            <img src={AvatarImg2} alt="error" className="avatar_img2" />
                        </div>
                    </div>
                    <div className="joinInfo2">
                        {meet.members}
                    </div>
                    <div className="meetJoinBack"></div>
                </div>
            </div>
            <div className="outer1Detail meetHostOuter">
                <div className="outer2Detail">
                    <img src={MeetDuration} alt="error" className="img2" />
                    <span className="img3Head img6Head">
                        Duration of the meet
                    </span>
                </div>
                <div className="meetDurationOuter">
                    <div className="meetDurationHead">
                        {meet.duration}
                    </div>
                    <div className="meetDuration">
                        ({meet.starttime} - {meet.endtime})
                    </div>
                </div>
                <div className="meetBack">
                    <div className="meetJoinBack2"></div>
                </div>
            </div>
            {/* <Footer /> */}
        </div> 
        
    )
}
