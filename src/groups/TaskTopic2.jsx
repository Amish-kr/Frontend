import Description from "../Components/Description"
import DescriptionTask from "../Components/DescriptionTask"
function TaskTopic2({desc}) {
  return (
    <div className="subcontainer">
    <Description imgsrc={"assets/Task.png"} text={"Description Of the Task"} />
    <DescriptionTask text={desc}/>
</div>
  )
}

export default TaskTopic2