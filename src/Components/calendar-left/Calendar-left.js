import './Calendar-left.css'
import Events from '../events/Events.js';
import React, { useEffect, useState } from 'react';

function Calendar_left(){
    return(
        <div className='calendar_left'>
            <div className='sidebar'>
                <UpcomingEvents></UpcomingEvents>
                <DontMissScheduleEvents></DontMissScheduleEvents>
            </div>
            <div className='sidebar'>
                <Events date="05/03/2023" time="10:00-11:00" content="Meeting with a client" subContent="Tell how to boost website traffic"></Events>
                <Events date="05/03/2023" time="" content="Holi" subContent="Holiday"></Events>
                <Events date="05/03/2023" time="10:00-11:00" content="Meeting with a client" subContent="Tell how to boost website traffic"></Events>
                <Events date="05/03/2023" time="" content="Ramazan" subContent="Holiday"></Events>
                <Events date="05/03/2023" time="" content="RamNavami" subContent="Holiday"></Events>
            </div>
        </div>
    );
}

function UpcomingEvents(){
    const [vwFontSize, setVwFontSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const pxFontSize = 24; // Example font size in pixels
      const vw = window.innerWidth;
      const vwFontSize = (pxFontSize / vw) * 100;
      setVwFontSize(vwFontSize);
    };

    // Call the handleResize function on initial component mount and window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const componentStyle = {
      fontSize: `${vwFontSize}vw`,
    };
   
    return(
        <div id='upcoming_events' style={componentStyle}>Upcoming Events</div>
    );
}

function DontMissScheduleEvents(){
    const [vwFontSize, setVwFontSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const pxFontSize = 13; // Example font size in pixels
      const vw = window.innerWidth;
      const vwFontSize = (pxFontSize / vw) * 100;
      setVwFontSize(vwFontSize);
    };

    // Call the handleResize function on initial component mount and window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const componentStyle = {
      fontSize: `${vwFontSize}vw`,
    };
   
    return(
        <div id='dont_miss_schedule_events' style={componentStyle}>Don't miss schedule events</div>
    );
}
export default Calendar_left;