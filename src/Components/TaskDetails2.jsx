import React from "react"
import Homebar from "../groups/Homebar"
import Invitegroup from "../groups/Invitegroup"
import TaskDate from "../groups/TaskDate"
import Deadline from "../groups/Deadline"
import TaskTopic from "../groups/TaskTopic"
import TaskTopic2 from "../groups/TaskDescription"
import ReleatedDocument from "../groups/ReleatedDocument"
import "../styles/TaskDetails2.css"
import Department from "../groups/Department"

const TaskDetails = () => {
  return (
    <>
      <div className='task-details-ellips'>
        <svg
          width='200'
          height='200'
          viewBox='0 0 200 200'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='100'
            cy='100'
            r='100'
            fill='url(#paint0_linear_338_22028)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_338_22028'
              x1='-23'
              y1='-50'
              x2='223.5'
              y2='232'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#F0F0F0' />
              <stop offset='1' stop-color='#0478FF' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='task-details-ellips-2'>
        <svg
          width='463'
          height='602'
          viewBox='0 0 463 602'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M942.461 736.662C1003.71 622.425 1018.16 488.842 982.759 364.082C947.359 239.323 864.876 133.14 752.705 67.9235C640.535 2.70739 507.443 -16.4437 381.498 14.5088C255.552 45.4613 146.596 124.098 77.6067 233.836C8.61734 343.574 -15.0132 475.836 11.6982 602.731C38.4097 729.626 113.375 841.235 220.787 914.021C328.198 986.808 459.659 1015.08 587.447 992.886C715.236 970.688 829.364 899.752 905.763 795.035L811.254 726.122C752.709 806.366 665.253 860.725 567.329 877.735C469.405 894.745 368.667 873.077 286.358 817.301C204.049 761.524 146.603 675.999 126.134 578.76C105.665 481.521 123.773 380.169 176.64 296.077C229.506 211.985 312.999 151.725 409.511 128.007C506.022 104.288 608.01 118.963 693.966 168.938C779.922 218.913 843.129 300.281 870.256 395.884C897.383 491.487 886.311 593.851 839.375 681.391L942.461 736.662Z'
            fill='url(#paint0_linear_338_22014)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_338_22014'
              x1='785.5'
              y1='156'
              x2='31.5'
              y2='891'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#ED0E57' />
              <stop offset='0.0001' stop-color='#44F4A4' />
              <stop offset='1' stop-color='#0478FF' stop-opacity='0' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='task-details-ellips-3'>
        <svg
          width='200'
          height='200'
          viewBox='0 0 200 200'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='100'
            cy='100'
            r='100'
            fill='url(#paint0_linear_338_22027)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_338_22027'
              x1='26'
              y1='-119'
              x2='100'
              y2='200'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#F0F0F0' />
              <stop offset='1' stop-color='#0478FF' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className='task-details-frame'>
        <Homebar />
        <div className='task-details-main-container '>
          <TaskTopic />
          <TaskTopic2 />
          <TaskDate />
          <Deadline />
          <Department />
          <Invitegroup />
          <ReleatedDocument />
        </div>
      </div>
    </>
  )
}

export default TaskDetails
