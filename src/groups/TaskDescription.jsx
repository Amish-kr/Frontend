import Description from "../Components/Description"
import DescriptionTask from "../Components/DescriptionTask"
function TaskDescription() {
  return (
    <div className='subcontainer'>
      <Description
        imgsrc={"assets/Task.png"}
        text={"Description Of the Task"}
      />
      <DescriptionTask
        text={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit nunc, aliquam, aliquam Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit nunc, aliquam, aliquamorem ipsum dolor sit amet, consectetur adipiscing elit. Sit nunc, aliquam, aliquam  "
        }
      />
    </div>
  )
}

export default TaskDescription
