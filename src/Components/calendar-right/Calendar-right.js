import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { parseISO } from "date-fns";

const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function isDuplicateEvent(existingEvent, newEvent) {
  // Check if the start property is a valid date object
  // if (!(existingEvent.start instanceof Date)) {
  //   return false;
  // }

  return (
    existingEvent.start === newEvent.start &&
    existingEvent.end === newEvent.end &&
    existingEvent.title === newEvent.title
  );
}

function Calendar_right() {
  const [events, setEvents] = useState([]);

  const userValid = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/getevents`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        const updatedEvents = [];

        // Add fetched events
        const birthdayArray = data[1].birthday;
        const nameArray = data[1].name;
        // console.log(birthdayArray);
        // console.log(nameArray);
        // console.log(new Date(birthdayArray[0]));
        // console.log(format(new Date(birthdayArray[0]), "MMM d, yyyy"));
        for (let j = 0; j < birthdayArray.length; j++) {
          const currentYear = new Date().getFullYear();
          const birthdayDate = new Date(birthdayArray[j]);
          birthdayDate.setFullYear(currentYear);
          const newEvent1 = {
            start: birthdayDate,
            end: birthdayDate,
            title: "Birthday of " + nameArray[j],
          };
          if (
            !updatedEvents.some((event) => isDuplicateEvent(event, newEvent1))
          ) {
            updatedEvents.push(newEvent1);
          }
          // console.log(newEvent1);
        }
        // console.log(data[0][0].start.date)
        for (let j = 0; j < data[0].length; j++) {
          const newEvent1 = {
            start: new Date(data[0][j].start.date),
            end: new Date(data[0][j].start.date),
            title: data[0][j].summary,
          };
          if (
            !updatedEvents.some((event) => isDuplicateEvent(event, newEvent1))
          ) {
            updatedEvents.push(newEvent1);
          }
        }
        // console.log(data[0]);
        setEvents(updatedEvents);
      } else {
        console.log("Error: Failed to fetch events.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <div className="Calendar_right" style={{ width: "150vh" }}>
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px", margin: "70px" }}
      />
    </div>
  );
}

export default Calendar_right;
