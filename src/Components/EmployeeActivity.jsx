import React, { useState, useEffect } from 'react';
import "../Styles/employeeActivity.css";
import Chart from "./Chart";
import Chance from "chance";


const EmployeeActivity = () => {
  const [userdata, setUserdata] = useState([]);
  // console.log("kha");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/workhour_employee`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
          console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          setUserdata(data);
          // console.log(data);
        } else {
          console.log("hfdjlv");
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, []);
  // fetch
  // console.log(userdata);
  return (
    <section className="employee_activity_section">
      <h1 className="employee_activity_heading">Most Performing Employees</h1>
      <section className="employee_activity_info">
        <aside className="employee_activity_chart">
          <Chart data={userdata} />
        </aside>
        <h1 className="employee_activity_list_heading">Employee List</h1>
        <aside className="employee_activity_list">
          <section className="employee_activity_list_item">
            {/* <span>SSN</span> */}
            <span>Name</span>
            <span>Email</span>
            <span>Average Time</span>
          </section>
          {userdata.length === 0 ? (
            <p>Loading...</p>
          ) : (
          userdata.map((user, idx) => (
            <section key={idx} className="employee_activity_list_item">
              {/* <span>{user.ssn}</span> */}
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.workhours}</span>
            </section>
          ))
          )}
        </aside>
      </section>
    </section>
  );
};

export default EmployeeActivity;