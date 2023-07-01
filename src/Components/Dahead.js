import React, { useState, useEffect } from "react";
import ParentMenu from "./ParentMenu";
import Menu from "./menu";
import "./Dahead.css";
import { useHistory } from "react-router-dom";
import profileImage from "../images/Ellipse 1111.png";
import axios from "axios";
import { useCookies } from "react-cookie";
let screenWidth = window.innerWidth; // Declare screenWidth as a global variable

const Dahead = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [currentScreenWidth, setCurrentScreenWidth] = useState(screenWidth);
  const [cookies] = useCookies(["recentLogin"]);
  // console.log(cookies.recentLogin);

  const [remainingTime, setRemainingTime] = useState(0);
  const [lastLoginTime, setLastLoginTime] = useState("");
  const [User, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

        const { user } = await response.json();
        setUser(user);
        // console.log(user.profile_image);
        // setRemainingTime(user.remainloggingtime);
        setLastLoginTime(user.lastLogin);
        calculateRemainingTime();
        // getLastLoginTime();
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTimeDifference = (recentLogin, currentTime) => {
    const currentTimeParts = currentTime.split(":");
    const recentLoginTimeParts = recentLogin.split(":");
    const currentTimeInSeconds =
      parseInt(currentTimeParts[0]) * 3600 +
      parseInt(currentTimeParts[1]) * 60 +
      parseInt(currentTimeParts[2]);
    let recentLoginTimeInSeconds =
      parseInt(recentLoginTimeParts[0]) * 3600 +
      parseInt(recentLoginTimeParts[1]) * 60 +
      parseInt(recentLoginTimeParts[2]);
    if (recentLoginTimeInSeconds < currentTimeInSeconds) {
      recentLoginTimeInSeconds += 24 * 3600; // Add 24 hours (next day)
    }
    return recentLoginTimeInSeconds - currentTimeInSeconds;
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  const calculateRemainingTime = () => {
    // const hours = 4; // 4 hours
    const options = { hour12: false };
    const currentTime = new Date().toLocaleTimeString([], options);
    const recentLogin = cookies.recentLogin;
    // const recentLoginTime = new Date(recentLogin).getTime();
    // console.log(recentLogin);
    // console.log(currentTime);
    const timeDifference = calculateTimeDifference(recentLogin, currentTime);
    const formattedTime = formatTime(timeDifference);
    setRemainingTime(formattedTime);
  };

  const handleLogout = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/logout`
    );

    window.location.href = "/";
  };
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    // Perform any additional logic or navigation here based on the selected menu item
  };
  const [isClicked, setIsClicked] = useState(false);
  const handleIconClick = () => {
    setIsClicked(!isClicked);
    window.location.href = "/notify";
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleFrameClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header
      style={{
        position: "absolute",
        width: "100%",
        // maxWidth: currentScreenWidth,
        height: "108px",
        left: "0",
        right: "0",
        top: "0",
        background: "#A1CAFF",
        opacity: "0.8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        // margin: '0 auto',
      }}
    >
      {/* Frame 1000002560 */}

      <div
        onClick={handleFrameClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "7px",
          gap: "10px",
          width: "41px",
          height: "35px",
          background: "#E3EDF7",
          boxShadow:
            "2px 2px 4px rgba(114, 142, 171, 0.1), -6px -6px 20px #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41)",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        {/* Rectangle 1 */}
        <div
          style={{
            width: "27px",
            height: "5px",
            background: "#0E1A45",
            borderRadius: "5px",
          }}
        ></div>
        {/* Rectangle 2 */}
        <div
          style={{
            width: "27px",
            height: "5px",
            background: "#0E1A45",
            borderRadius: "5px",
          }}
        ></div>
        {/* Rectangle 3 */}
        <div
          style={{
            width: "27px",
            height: "5px",
            background: "#0E1A45",
            borderRadius: "5px",
          }}
        ></div>
      </div>
      {/* Company logo */}
      <img
        className="header__company-logo"
        src="images\Frame 1000003850.png"
        alt="Company Logo"
      />

      {/* Remaining time */}
      <div
        className="header__remaining-time"
        style={{
          width: "133px",
          height: "24px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: screenWidth < 900 ? "12px" : "16px",
          lineHeight: "24px",
          color: "#0478FF",
        }}
      >
        Remaining Time: {remainingTime}
      </div>

      {/* Last login time */}
      <div
        className="header__last-login-time"
        style={{
          width: "100px",
          height: "24px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: screenWidth < 900 ? "12px" : "16px",
          lineHeight: "24px",
          color: "#0478FF",
        }}
      >
        Last Login: {lastLoginTime}
      </div>
      {/* Logout button */}
      <button
        onClick={handleLogout}
        style={{
          width: `${screenWidth >= 900 ? "105px" : "90px"}`,
          height: `${screenWidth >= 900 ? "40px" : "32px"}`,
          background: "#FFFFFF",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: `${screenWidth >= 900 ? "10px" : "5px"}`,
          fontSize: `${screenWidth >= 900 ? "inherit" : "12px"}`,
        }}
      >
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="#0478FF"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "5px" }}
        >
          <path d="M3.48384 5.4H8.21111V6.6H3.48384V8.4L0.529297 6L3.48384 3.6V5.4ZM2.89293 9.6H4.49311C5.17543 10.211 6.01688 10.6091 6.91651 10.7466C7.81613 10.884 8.73571 10.755 9.56489 10.3749C10.3941 9.99483 11.0976 9.3799 11.5912 8.60389C12.0847 7.82788 12.3472 6.92375 12.3472 6C12.3472 5.07625 12.0847 4.17213 11.5912 3.39611C11.0976 2.6201 10.3941 2.00516 9.56489 1.6251C8.73571 1.24504 7.81613 1.11599 6.91651 1.25344C6.01688 1.39089 5.17543 1.789 4.49311 2.4H2.89293C3.44287 1.65431 4.15649 1.04911 4.97711 0.632487C5.79773 0.215865 6.70273 -0.000698185 7.62021 1.69097e-06C10.8838 1.69097e-06 13.5293 2.6862 13.5293 6C13.5293 9.3138 10.8838 12 7.62021 12C6.70273 12.0007 5.79773 11.7841 4.97711 11.3675C4.15649 10.9509 3.44287 10.3457 2.89293 9.6Z" />
        </svg>
        Logout
      </button>
      {User.username}
      <div style={{ position: "relative" }}>
        {/* settings icon */}
        <svg
          onClick={handleIconClick}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill={isClicked ? "#0478FF" : "currentColor"}
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.3069 0C14.198 0 15.0641 0.340524 15.6851 0.932387C16.3049 1.52773 16.6471 2.34429 16.621 3.17243C16.6235 3.35891 16.6894 3.57434 16.8089 3.76314C17.0068 4.07586 17.3191 4.29593 17.69 4.38627C18.0609 4.47198 18.4491 4.42566 18.7789 4.24381C20.3719 3.39713 22.3992 3.90444 23.3089 5.37542L24.0842 6.62516C24.1041 6.65875 24.1215 6.69118 24.1365 6.72477C24.9603 8.17374 24.4103 9.99797 22.8795 10.8308C22.6568 10.9501 22.4763 11.1168 22.3519 11.3184C22.159 11.6299 22.1055 12.0006 22.2025 12.3411C22.3021 12.6886 22.5398 12.977 22.8746 13.1553C23.63 13.5596 24.1937 14.2406 24.419 15.0271C24.6442 15.8124 24.521 16.6648 24.0817 17.3679L23.2554 18.6489C22.3456 20.1037 20.3184 20.6075 18.7416 19.7597C18.5313 19.6473 18.2886 19.5859 18.0472 19.5801H18.0397C17.68 19.5801 17.3104 19.7226 17.0416 19.9716C16.7691 20.2253 16.6197 20.5635 16.6222 20.9225C16.6135 22.624 15.1263 24 13.3069 24H11.7476C9.91939 24 8.43222 22.6171 8.43222 20.9156C8.42973 20.7059 8.36502 20.4882 8.2443 20.2994C8.04892 19.982 7.73282 19.755 7.36818 19.6647C7.00603 19.5743 6.60904 19.6241 6.28298 19.8002C5.50144 20.2056 4.58176 20.304 3.74049 20.084C2.90045 19.8627 2.17491 19.3253 1.7493 18.613L0.97149 17.3656C0.0617656 15.8969 0.60312 14.0148 2.17865 13.1669C2.62542 12.9272 2.90294 12.4801 2.90294 12.0006C2.90294 11.5211 2.62542 11.0728 2.17865 10.8331C0.601875 9.9806 0.0617656 8.09382 0.970245 6.62516L1.81401 5.33604C2.71129 3.8836 4.73981 3.37165 6.32156 4.21717C6.53686 4.33647 6.77082 4.3967 7.00852 4.39902C7.78384 4.39902 8.43222 3.80368 8.44467 3.07167C8.43969 2.26437 8.78192 1.4895 9.40542 0.90459C10.0314 0.320834 10.8627 0 11.7476 0H13.3069ZM13.3069 1.73737H11.7476C11.3618 1.73737 11.0009 1.87752 10.7283 2.13001C10.457 2.38367 10.3089 2.72072 10.3114 3.07977C10.2853 4.77313 8.7981 6.13638 6.99732 6.13638C6.41988 6.13059 5.86359 5.98581 5.38073 5.7171C4.70248 5.35804 3.8164 5.57927 3.41941 6.22209L2.57688 7.51122C2.19109 8.13436 2.42755 8.95787 3.11451 9.32967C4.13374 9.87867 4.76968 10.9026 4.76968 12.0006C4.76968 13.0986 4.13375 14.1213 3.11202 14.6715C2.42879 15.0398 2.19234 15.8587 2.58809 16.4957L3.37336 17.7559C3.5675 18.0814 3.88485 18.3165 4.25197 18.4126C4.61785 18.5076 5.02107 18.4671 5.35708 18.2933C5.85114 18.0235 6.4261 17.8833 7.00354 17.8833C7.28853 17.8833 7.57352 17.9169 7.85229 17.9864C8.69357 18.1972 9.42408 18.7207 9.85717 19.4238C10.1384 19.8651 10.294 20.3805 10.299 20.9063C10.299 21.6592 10.9486 22.2626 11.7476 22.2626H13.3069C14.1021 22.2626 14.7518 21.6627 14.7555 20.9225C14.7505 20.1048 15.094 19.3276 15.7225 18.7427C16.3422 18.1659 17.2084 17.8196 18.0746 17.8428C18.642 17.8555 19.1884 17.998 19.67 18.2528C20.3632 18.6223 21.248 18.4022 21.6487 17.7652L22.4751 16.483C22.6593 16.1876 22.7128 15.817 22.6145 15.4753C22.5174 15.1336 22.2735 14.8371 21.9449 14.6622C21.1758 14.2499 20.627 13.5851 20.3993 12.7882C20.174 12.0064 20.2972 11.1527 20.7365 10.4497C21.0228 9.98639 21.4421 9.59606 21.9449 9.32735C22.6194 8.96019 22.8559 8.13899 22.4639 7.49964C22.4477 7.47416 22.4328 7.44752 22.4203 7.41972L21.691 6.24294C21.2941 5.60012 20.4105 5.37889 19.7173 5.74606C18.9681 6.15839 18.077 6.27653 17.2208 6.06689C16.3659 5.86072 15.649 5.35688 15.2023 4.64572C14.916 4.20095 14.7605 3.68322 14.7555 3.15622C14.7667 2.7601 14.6174 2.40452 14.3461 2.14391C14.076 1.88446 13.6964 1.73737 13.3069 1.73737ZM12.5327 8.07772C14.8562 8.07772 16.7466 9.83825 16.7466 12.0007C16.7466 14.1631 14.8562 15.9236 12.5327 15.9236C10.2092 15.9236 8.3188 14.1631 8.3188 12.0007C8.3188 9.83825 10.2092 8.07772 12.5327 8.07772Z"
          />
        </svg>
      </div>
      {/* {User.profile_image} */}
      <div
        style={{
          width: screenWidth < 900 ? "60px" : "40px",
          height: screenWidth < 900 ? "60px" : "40px",
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
          backgroundImage: `url(${User.profile_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          window.location.href = "/profile";
        }}
      ></div>

      {showMenu && (
        <ParentMenu
          handleMenuItemClick={handleMenuItemClick}
          style={{ position: "relative", zIndex: 2 }}
        />
      )}
    </header>
  );
};
export default Dahead;
