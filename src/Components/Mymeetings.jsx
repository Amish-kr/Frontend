import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import "./myMeetings.css";
import Footer from "./footer";
import Icon1 from "../images/icon1.jpg";
import Icon2 from "../images/icon2.jpg";
import Icon3 from "../images/icon3.jpg";
import DateIcon from "../images/date_icon.jpg";
import TimeIcon from "../images/time_icon.jpg";
import LinkArrow from "../images/link_arrow.jpg";
import AvatarImg from "../images/avatar_img.jpg";
import AvatarImg2 from "../images/avatar2.jpg";
import AvatarImg3 from "../images/avatar3.jpg";
import AvatarImg4 from "../images/avatar4.jpg";
import DateGreen from "../images/date_green.jpg";
import TimeGreen from "../images/time_green.jpg";
import ArrowGreen from "../images/arrow_green.jpg";
// import meets from "../My Meet.json";

export default function Mymeetings() {
  const [meets, SetMeets] = useState([]);
  const [S_size, SetS_Size] = useState(0);
  const [R_size, SetR_Size] = useState(0);
  const [C_size, SetC_Size] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMeets = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/getAllmeets`,
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
          const { meets } = await response.json();
          let scheduledMeetCount = 0;
          let rescheduledMeetCount = 0;
          let cancelledMeetCount = 0;

          meets.forEach((meet) => {
            if (meet.type === "Scheduled Meetings") {
              scheduledMeetCount++;
            } else if (meet.type === "Rescheduled Meetings") {
              rescheduledMeetCount++;
            } else if (meet.type === "Cancelled Meetings") {
              cancelledMeetCount++;
            }
          });

          SetS_Size(scheduledMeetCount);
          SetR_Size(rescheduledMeetCount);
          SetC_Size(cancelledMeetCount);
          SetMeets(meets);
        } else {
          throw new Error("Error fetching meets");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeets();
  }, []);

  const [meetType, setMeetType] = useState("All Meetings");
  const [meetfilterArray, setMeetfilterArray] = useState(
    meets.filter((meet) => meet.type)
  );
  const [allMeets, setAllMeets] = useState(true);
  const [scMeets, setScMeets] = useState(false);
  const [rescMeets, setRescMeets] = useState(false);
  const [cancMeets, setCancMeets] = useState(false);

  function Createmeet() {
    navigate("/create");
  }

  function showScheduled() {
    setAllMeets(false);
    setRescMeets(false);
    setCancMeets(false);
    setScMeets(true);
    setMeetType("Scheduled Meetings");
    setMeetfilterArray(
      meets.filter((meet) => meet.type === "Scheduled Meetings")
    );
  }

  function showAll() {
    setRescMeets(false);
    setCancMeets(false);
    setScMeets(false);
    setAllMeets(true);
    setMeetType("All Meetings");
    setMeetfilterArray(meets.filter((meet) => meet.type));
  }

  function showRescheduled() {
    setCancMeets(false);
    setScMeets(false);
    setAllMeets(false);
    setRescMeets(true);
    setMeetType("Rescheduled Meetings");
    setMeetfilterArray(
      meets.filter((meet) => meet.type === "Rescheduled Meetings")
    );
  }

  function showCancelled() {
    setRescMeets(false);
    setScMeets(false);
    setAllMeets(false);
    setCancMeets(true);
    setMeetType("Cancelled Meetings");
    setMeetfilterArray(
      meets.filter((meet) => meet.type === "Cancelled Meetings")
    );
  }

  const [meetCount, setMeetCount] = useState(1);
  const defaultMeetCount = 3;
  // const meetfilterArray = meets.filter((meet) => meet.type);
  const meetSlicedArray = meetfilterArray.slice(
    0,
    defaultMeetCount * meetCount
  );

  const handleViewMore = () => {
    setMeetCount(meetCount + 1);
  };

  return (
    <div className="outer">
      <div>
        <p className="heading">My Meetings</p>
      </div>
      <div className="outer2">
        <div className="meetType">
          <div>
            <img src={Icon1} alt="error" className="icon" />
          </div>
          <div className="meetType1">
            <div className="text1">Scheduled Meeting</div>
            <div className="outer3">
              <div className="text2">{S_size}</div>
              {/* <div className="text3">
                /
              </div>
              <div className="text4">
                This month
              </div> */}
            </div>
          </div>
        </div>
        <div className="meetType">
          <div>
            <img src={Icon2} alt="error" className="icon" />
          </div>
          <div className="meetType1">
            <div className="text1_2">Rescheduled Meeting</div>
            <div className="outer3">
              <div className="text2">{R_size}</div>
              {/* <div className="text3">
                /
              </div>
              <div className="text4">
                This month
              </div> */}
            </div>
          </div>
        </div>
        <div className="meetType">
          <div>
            <img src={Icon3} alt="error" className="icon" />
          </div>
          <div className="meetType1">
            <div className="text1_3">Cancelled Meeting</div>
            <div className="outer3">
              <div className="text2">{C_size}</div>
              {/* <div className="text3">
                /
              </div>
              <div className="text4">
                This month
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="outer4">
        <div className="outer5">
          <div onClick={showAll} className={allMeets ? "cond5_1" : "text5_1"}>
            All meetings
          </div>

          <div onClick={showScheduled} className={scMeets ? "cond5" : "text5"}>
            Scheduled meetings
          </div>
          <div
            onClick={showRescheduled}
            className={rescMeets ? "cond5" : "text5"}
          >
            Rescheduled meetings
          </div>
          <div
            onClick={showCancelled}
            className={cancMeets ? "cond5_4" : "text5_4"}
          >
            Cancelled meetings
          </div>
        </div>
        <div>
          <div className="create_meet">
            <span className="addSign">+</span>
            <span className="create" onClick={Createmeet}>
              create meet
            </span>
          </div>
        </div>
      </div>
      <div className="outer6">
        {meetSlicedArray.map((meet, i) => (
          <div
            className={classNames("meet1", {
              meet_green: meet.type === "Scheduled Meetings",
              meet_orange: meet.type === "Rescheduled Meetings",
              meet_red: meet.type === "Cancelled Meetings",
            })}
          >
            <div className="meetHeading">{meet.title}</div>
            <div className="meet2">
              <img
                src={meet.type === "Scheduled Meetings" ? DateGreen : DateIcon}
                alt="error"
                className="dateImg"
              />
              <div className="dateTime">{meet.date}</div>
              <img
                src={meet.type === "Scheduled Meetings" ? TimeGreen : TimeIcon}
                alt="error"
                className="timeImg"
              />
              <div className="dateTime">{meet.starttime}</div>
            </div>
            <div className="viewDetails">
              <Link to={`/details/${meet._id}`} className="remove_underline">
                view details
              </Link>
              <div>
                <img
                  src={
                    meet.type === "Scheduled Meetings" ? ArrowGreen : LinkArrow
                  }
                  alt="error"
                  className="linkArrowImg"
                />
              </div>
            </div>
            <div className="spanOuter">
              <span className="span1">Topic of meet :</span>
              <span className="span2">{meet.topic}</span>
            </div>
            <div className="outer7">
              <div className="avatarGroup">
                <div className="avatar">
                  <img src={AvatarImg} alt="error" className="avatar_img" />
                </div>
                <div className="avatar">
                  <img src={AvatarImg2} alt="error" className="avatar_img" />
                </div>
                <div className="avatar">
                  <img src={AvatarImg3} alt="error" className="avatar_img" />
                </div>
                <div className="avatar">
                  <img src={AvatarImg4} alt="error" className="avatar_img" />
                </div>
                <div className="avatar">
                  <img src={AvatarImg} alt="error" className="avatar_img" />
                </div>
                <div className="avatar">
                  <img src={AvatarImg2} alt="error" className="avatar_img" />
                </div>
              </div>
              <div className="joinInfo">{meet.members}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {meetSlicedArray.length !== meetfilterArray.length && (
          <div onClick={handleViewMore} className="outer8">
            View more
          </div>
        )}

        {/* <Footer /> */}
      </div>
    </div>
  );
}
