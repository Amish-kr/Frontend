import React, { useState, useEffect } from "react";
import "../Styles/MyTask.css"
// import tasks from "../data/My task.json"
import TaskCard from "./TaskCard"

const Task = ({ taskType }) => {
  const [pageCount, setPageCount] = useState(1)
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/AllTasks`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const tasks = await response.json(); // Parse the response as an array
          setTaskData(tasks);
        } else {
          throw new Error("Error fetching tasks");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  if (!taskData || taskData.length === 0) {
    return <p>No tasks found</p>;
  }

  const pageSize = 3
  const filterArray = taskData.filter((task) => task.type === taskType)
  const taskSlicedArray = filterArray.slice(0, pageSize * pageCount)

  const handleViewMore = () => {
    setPageCount(pageCount + 1)
  }

  return (
    <>
      <div className='my-task-frame'>
        {taskSlicedArray.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
      <div className='my-task-frame-4'>
        {taskSlicedArray.length !== filterArray.length && (
          <button className='Frame1000003785' onClick={handleViewMore}>
            View More
          </button>
        )}
      </div>
    </>
  )
}

export default Task
