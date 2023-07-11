import React from "react"

const DateAndDeadlineOfTask = () => {
  return (
    <div className='date-deadline-of-task-container'>
      <div className='date-deadline-of-task-date'>
        <h1 className='title poppins-bold-bunting-26px'>
          Thu,Apr 20,2023 11:58 AM
        </h1>
        <button className='add-to-calender poppins-normal-white-6px'>
          Add to calender
        </button>
      </div>
      <div className='date-deadline-of-task-description poppins-normal-bunting-12px'>
        (GMT +5:30) india Standard Time(Asia/Kolkata)
      </div>
    </div>
  )
}

export default DateAndDeadlineOfTask
