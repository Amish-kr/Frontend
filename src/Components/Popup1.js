import React, { useState } from "react";
import "../Styles/Popup1.css";
import { useNavigate } from "react-router-dom";
function Popup1(){
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [date, setDate] = useState("");
  const [work, setWork] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/submitdata`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ date, desc: work }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsVisible(false);
        navigate("/check");
      } else {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleWorkChange = (event) => {
    setWork(event.target.value);
  };

  return (
    <div className={`popup001 ${isVisible ? "" : "hidden"}`}>
      <b className="header02">Check Out</b><br></br><br></br>
      <div className="popup-content02">
        
        <b className="tidt02">Date</b><br></br>
        <input
          type="date"
          placeholder="Enter date"
          className="in1"
          value={date}
          onChange={handleDateChange}
        />
       <br></br>
       <b className="tidt03">Work or Task</b><br></br>
       <input 
          type="textarea02" 
          placeholder="Enter work or task" 
          class="in2"
          value={work}
          onChange={handleWorkChange}
          />
       <div className="popup-footer001">
        <button className="popup-button001" onClick={handleButtonClick}>
          Submit
        </button>
      </div>
      </div>
    </div>
  );
}
export default Popup1;