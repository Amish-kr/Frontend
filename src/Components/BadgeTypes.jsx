import React, { useEffect, useState } from "react";
import Badgesitems from "./Badgesitems";
// import { allbadges, popularbadges, userbadges } from "../constants/badgesdata";
import { useOutletContext, useParams } from "react-router-dom";
import "../Styles/BadgeTypes.css";

const BadgeTypes = () => {
  const { badgetype } = useParams();
  const { userbadgesids } = useOutletContext();
  const [badgeArray, setBadgeArray] = useState([]);

  useEffect(() => {
    const fetchBadgeArray = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/getbadges`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ badgetype }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setBadgeArray(data);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchBadgeArray();
  }, [badgetype]);

  useEffect(() => {
    if (noOfElements === 4) return;
    setNoOfElements(4);
  }, [badgetype]);

  // for pagination
  const [noOfElements, setNoOfElements] = useState(6);
  const slice = badgeArray.slice(0, noOfElements);

  return (
    <div className="Badgetypecontainer">
      {slice.map((badge) => {
        const print = userbadgesids.has(badge.id);
        return (
          <Badgesitems
            key={badge.id}
            badgeid={badge.id}
            earned={print}
            badgeimage={badge.img}
            badgetype={badgetype}
          />
        );
      })}
      {noOfElements < badgeArray.length && (
        <button
          onClick={() => setNoOfElements(noOfElements + 4)}
          className="badge_viewmore__btn"
        >
          View more
        </button>
      )}
    </div>
  );
};

export default BadgeTypes;
