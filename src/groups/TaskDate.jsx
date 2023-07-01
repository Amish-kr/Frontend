import Description from "../Components/Description"
import Date from "../Components/Date"

const TaskDate = ({date}) => {
    // console.log(date);
    return (
        <div className="subcontainer">
            <Description imgsrc={"assets/date.png"} text={"Date of the task"} />
            <Date date={date}/>
        </div>

    )
}

export default TaskDate