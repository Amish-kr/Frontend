import React, { useRef, useState, useEffect, useMemo } from "react";
import { flow } from "../constants/flow";
import "../Styles/Filter.css";

const usermap = new Map();
const emailmap = new Map();

const Filter = ({ badgedata, setBadgedata }) => {
  const emailinputref = useRef(null);
  const userinputref = useRef(null);
  const [useropen, setUseropen] = useState(false);
  const [emailopen, setEmailOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/getUserdetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const fetchedData = await response.json();
          setData(fetchedData);

          fetchedData.forEach((user) => {
            usermap.set(user.username, user.email);
            emailmap.set(user.email, user.username);
          });
        } else {
          console.error(
            "Error fetching data from the backend:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handlechange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setBadgedata((prev) => ({ ...prev, [key]: value }));
  };

  const handleuserclick = (name) => {
    setBadgedata((prev) => ({ ...prev, employeeUsername: name }));
    setUseropen(false);
  };

  const handleemailclick = (email) => {
    setBadgedata((prev) => ({ ...prev, employeeEmail: email }));
    setEmailOpen(false);
  };

  const users = useMemo(() => {
    return data.filter((user) => {
      return (
        user.username &&
        user.username
          .toLowerCase()
          .includes(badgedata.employeeUsername.toLowerCase())
      );
    });
  }, [badgedata.employeeUsername, data]);

  const emails = useMemo(() => {
    return data.filter((user) => {
      return (
        user.email &&
        user.email.toLowerCase().includes(badgedata.employeeEmail.toLowerCase())
      );
    });
  }, [badgedata.employeeEmail, data]);

  useEffect(() => {
    if (badgedata.employeeUsername) {
      const email = usermap.get(badgedata.employeeUsername);
      if (email) {
        setBadgedata((prev) => ({ ...prev, employeeEmail: email }));
      }
    }
  }, [badgedata.employeeUsername]);

  useEffect(() => {
    if (badgedata.employeeEmail) {
      const username = emailmap.get(badgedata.employeeEmail);
      if (username) {
        setBadgedata((prev) => ({ ...prev, employeeUsername: username }));
      }
    }
  }, [badgedata.employeeEmail]);

  useEffect(() => {
    const handleclick = (e) => {
      if (userinputref.current && !userinputref.current.contains(e.target)) {
        setUseropen(false);
      }
      if (emailinputref.current && !emailinputref.current.contains(e.target)) {
        setEmailOpen(false);
      }
    };
    document.addEventListener("mousedown", handleclick);
    return () => {
      document.removeEventListener("mousedown", handleclick);
    };
  }, []);

  return (
    <>
      <div className="form__fields filter__fields" ref={userinputref}>
        <label htmlFor="employeeUsername">Employee Username:</label>
        <input
          autoComplete="off"
          type="text"
          id="employeeUsername"
          value={badgedata.employeeUsername}
          onChange={handlechange}
          required
          onFocus={() => setUseropen(true)}
        />
        {useropen && (
          <div className="filter__options">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  className="filter__option"
                  key={user.id}
                  onClick={() => handleuserclick(user.username)}
                >
                  {user.username}
                </div>
              ))
            ) : (
              <div className="filter__option">No results found</div>
            )}
          </div>
        )}
      </div>

      <div className="form__fields filter__fields" ref={emailinputref}>
        <label htmlFor="employeeEmail">Employee Email:</label>
        <input
          autoComplete="off"
          type="email"
          id="employeeEmail"
          value={badgedata.employeeEmail}
          onChange={handlechange}
          required
          onFocus={() => setEmailOpen(true)}
        />
        {emailopen && (
          <div className="filter__options">
            {emails.length > 0 ? (
              emails.map((user, idx) => (
                <div
                  className="filter__option"
                  key={user.email}
                  onClick={() => handleemailclick(user.email)}
                >
                  {user.email}
                </div>
              ))
            ) : (
              <div className="filter__option">No results found</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
