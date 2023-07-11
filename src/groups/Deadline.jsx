import Description from "../Components/Description"
import Date from "../Components/Date"

const Deadline = ({deadline}) => {
    return (
        <div className="subcontainer">
            <Description imgsrc={"assets/date.png"} text={"Deadline of the task"} />
            <Date date={deadline}/>
        </div>

    )
}

export default Deadline