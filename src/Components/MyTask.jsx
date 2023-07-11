import React, { useState } from "react"
import Task from "./Task"
import HeaderToggelButtons from "./HeaderToggelButtons"
import Footer from './footer';
const MyTask = () => {
  const [task, setTask] = useState("Project Based Task")
  const changeComponentHandler = (task = "Project Based Task") => {
    setTask(task)
  }
  return (
    <div className='flex-main-container'>
      <HeaderToggelButtons
        title={"My task"}
        components={["Project Based Task", "Non Project Based Task"]}
        changeComponentHandler={changeComponentHandler}
        activeComponent={task}
      />
      <Task taskType={task} /> 
    </div>
  )
}

export default MyTask
