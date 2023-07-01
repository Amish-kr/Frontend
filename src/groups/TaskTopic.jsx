import Description from "../Components/Description"
import DescriptionTask from "../Components/DescriptionTask"

const TaskTopic = ({title}) => {
    return (
        <div className="subcontainer">
            <Description imgsrc={"assets/Task.png"} text={"Task Topic"} />
            <DescriptionTask text={ title } />
        </div>

    )
}

export default TaskTopic