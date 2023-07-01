import Description from "../Components/Description"
import Participants from "../Components/Participants"


const Invitegroup = () => {
  return (
    <div className="subcontainer">
        <Description imgsrc={"assets/group.png"} text={"Invited participants"}/>
        <Participants/>
    </div>
  )
}

export default Invitegroup