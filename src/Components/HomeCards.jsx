import React, { useEffect, useState } from "react";
import { pendingleaves } from "../constants/data.js";
import totalapplied from "../assets/Home/totalapplied.png";
import totalabsent from "../assets/Home/totalabsent.png";
import "../Styles/Homecard.css";

const HomeCards = () => {
  const [userdata, setUserdata] = useState(null);
  const order = [4, 2, 3, 5, 0, 1, 6];

  const getuser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/leave/record`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getuser();
        setUserdata(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid-container">
      {userdata ? (
        <>
          {order.map((item, idx) => {
            const leaveCount =
              userdata.leaves && userdata.leaves[item]
                ? userdata.leaves[item].count
                : 0;

            return (
              <div key={idx} className="card-container">
                <img
                  src={pendingleaves[idx].imgsrc}
                  alt=""
                  className="card-image"
                />
                <div className="card-content">
                  <h1 className="leave-cards">{leaveCount} day</h1>
                  <p className="card-text">{pendingleaves[idx].type}</p>
                </div>
              </div>
            );
          })}
          <div className="card-container">
            <div className="card-content">
              <img src={totalapplied} alt="" />
              <h1 className="card-title">{userdata.totalCount} days</h1>
              <p className="card-text">Total Applied Leave</p>
            </div>
          </div>
          <div className="card-container">
            <div className="card-content">
              <img src={totalabsent} alt="" />
              <h1 className="card-title">0 days</h1>
              <p className="card-text">Total Absent + Penalty</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomeCards;
