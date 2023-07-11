import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Toggles from "../Components/Toggles";
// import { userbadges } from "../constants/badgesdata";
import "../Styles/BadgePage.css";
import "../Components/footer";
const Badgepage = () => {
  const location = useLocation();
  const title = getTitle(location.pathname);

  // this array will give the ids of all the badges that the user has earned
  // [1,2,3,4,6,7,10,11,12,14,15]
  // const userbadgesids = new Set(userbadges.map(badge => badge.id));

  const [userbadgesids, setUserbadgesids] = useState(new Set());

  const getuserbadgesid = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/getuserbadegid`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        // Convert the array to a Set
        const userBadgesIdsSet = new Set(data);
        // Update the userbadgesids state
        setUserbadgesids(userBadgesIdsSet);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getuserbadgesid();
  }, []);

  // fetch user data from api and pass it to the outlet

  function getTitle(pathname) {
    switch (pathname) {
      case "/badges":
        return "Earn a badge";
      case "/badges/popular":
        return "Popular Badges";
      case "/badges/ongoing":
        return "Ongoing Badges";
      case "/badges/earned":
        return "Earned Badges";
      default:
        return "Not Found";
    }
  }

  // console.log(title);

  return (
    <div className="badgescontainer">
      <Header title={title} />
      <Toggles />
      {/* outlet is used to render the childrens in the routes. the childrens are defined in the routes in app component */}
      <Outlet context={{ userbadgesids }} />
    </div>
  );
};

export default Badgepage;
