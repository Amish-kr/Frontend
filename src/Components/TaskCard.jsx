import React from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate("/taskdetails/" + id);
  };
  return (
    <div className="parent-div">
      <div className="Rectangle19310_1">
        <div>
          <div>
            <p className="Perform_UX_Research_on_Edfling_Home_page">
              {task.title}
            </p>
            <p className="Assign_Date_Time">
              <span className="Assign_Date">Assign Date/Time : </span>
              <span>{task.date.split("T")[0]}</span>
            </p>
            <p className="Assign_Date_Time">
              <span className="Assign_Date">Deadline : </span>
              <span>{task.deadline.split("T")[0]}</span>
            </p>
          </div>

          <p className="Task_Description">
            <span className="Assign_Date">Task Description :</span>
            <span> {task.desc}</span>
          </p>
        </div>
        <button
          className="view-details-frame"
          onClick={() => {
            handleViewDetails(task._id);
          }}
        >
          <div className="view-details">View details </div>
          <svg
            width="26"
            height="16"
            viewBox="0 0 26 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7297 8.87908C25.1117 8.48016 25.0979 7.84714 24.699 7.4652L18.1983 1.24101C17.7993 0.85906 17.1663 0.872817 16.7844 1.27173C16.4024 1.67065 16.4162 2.30367 16.8151 2.68561L22.5935 8.21823L17.0609 13.9967C16.679 14.3956 16.6927 15.0286 17.0916 15.4105C17.4906 15.7925 18.1236 15.7787 18.5055 15.3798L24.7297 8.87908ZM1.02173 9.68726L24.0291 9.18726L23.9857 7.18774L0.978273 7.68774L1.02173 9.68726Z"
              fill="#0478FF"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
