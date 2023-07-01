import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Homebar from "./groups/Homebar";
import Invitegroup from "./groups/Invitegroup";
import TaskDate from "./groups/TaskDate";
import Deadline from "./groups/Deadline";
import TaskTopic from "./groups/TaskTopic";
import TaskTopic2 from "./groups/TaskTopic2";
import ReleatedDocument from "./groups/ReleatedDocument";
import "./Styles/Taskdetails.css"
import Department from "./groups/Department";


function Tdetails() {
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/TaskDetails/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const taskDetails = await response.json();
          setTaskData(taskDetails.task);
          // console.log(taskDetails.task.date.split('T')[0]);
        } else {
          throw new Error("Error fetching task details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  return (
    <>
    <div className="A">
      <Homebar title={taskData?.title} key ={id} />
      <div className="mc">
        <TaskTopic title={taskData?.title}/>
        <TaskTopic2 desc={taskData?.desc} />                           
        <TaskDate date={taskData?.date.split('T')[0]}/>
        <Deadline deadline={taskData?.deadline.split('T')[0]} />
        <Department/>
        <Invitegroup />
        <ReleatedDocument />
      </div>
    </div>
    </>
  );
}

export default Tdetails;
