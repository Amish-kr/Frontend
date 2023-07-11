import React, { useState, useEffect, useRef } from "react";
import ClickableRectangle from "./ClickableRectangle";
let screenWidth = window.innerWidth; // Declare screenWidth as a global variable

function LogoutButton() {
  const [currentScreenWidth, setCurrentScreenWidth] = useState(screenWidth);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    // Handle logout functionality
  };
}
const RectanglesSection = () => {
  const [user, setUser] = useState([]);
  const lastRectangleRef = useRef(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/userdetails`,
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
          const { user } = await response.json();
          // console.log(user);
          setUser(user);
        } else {
          throw new Error("Error fetching meets");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <>
      <div
        className="dashboard-rectangles-section"
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          padding: "0rem 6rem",
          paddingTop: "2rem",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "calc(30%)",
            minWidth: "300px",
            margin: "5px",
          }}
        >
          <ClickableRectangle
            clickable={true}
            imageSrc="images/Rectangle.svg"
            text1={user.leavecount}
            text2="Total Leaves"
            style={{ width: "90%" }}
          />
        </div>
        <div
          style={{
            width: "calc(30%)",
            minWidth: "300px",
            margin: "5px",
          }}
        >
          <ClickableRectangle
            clickable={true}
            imageSrc="images/Rectangle (2).png"
            text1={`${user.successratio}%`}
            text2="Success Ratio"
            style={{ width: "90%" }}
          />
        </div>
        <div
          style={{
            width: "calc(30%)",
            minWidth: "300px",
            margin: "5px",
          }}
        >
          <ClickableRectangle
            clickable={true}
            imageSrc="images/Rectangle (3).png"
            text1={user.coursecount}
            text2="Learning Tutorials"
            style={{ width: "90%" }}
          />
        </div>
      </div>
      <div
        className="dashboard-rectangles-section"
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          padding: "0rem 6rem",
          paddingTop: "2rem",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "calc(30%)",
            minWidth: "300px",
            margin: "5px",
          }}
        >
          <ClickableRectangle
            clickable={true}
            imageSrc="images/Rectangle (4).png"
            text1={user.taskcount}
            text2="Total Task"
            style={{ width: "90%" }}
          />
        </div>
        <div
          style={{
            width: "calc(30%)",
            minWidth: "300px",
            margin: "5px",
          }}
        >
          <ClickableRectangle
            clickable={true}
            imageSrc="images/Rectangle (5).png"
            text1={user.meetcount}
            text2="Total Meet"
            style={{ width: "90%" }}
          />
        </div>
        <div
          ref={lastRectangleRef}
          style={{
            width: "calc(30%)",
            minWidth: "300px",
            margin: "5px",
          }}
        >
          <ClickableRectangle
            clickable={true}
            imageSrc="images/Rectangle (1).png"
            text1={user.badgecount}
            text2="Total Badges"
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </>
  );
};

export { RectanglesSection };
