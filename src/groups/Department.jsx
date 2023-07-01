import Description from "../Components/Description"


const Department = () => {
  return (
    <div className="subcontainer">
        <Description imgsrc={"assets/department.png"} text={"Department"}/>
        <div className="departmentsubcontainer">
            <h2>Department of the task</h2>
            <p>UI/UX DESIGNER</p>
        </div>
    </div>
  )
}

export default Department