import './Calendar.css'
import CalendarLeft from '../calendar-left/Calendar-left.js';
import CalendarRight from '../calendar-right/Calendar-right.js';

function Calendar() {
    return(
        <div className="calendar_header">
            <CalendarLeft></CalendarLeft>
            <CalendarRight></CalendarRight>
        </div>
    );
}

export default Calendar;