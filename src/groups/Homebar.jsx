import React, { useState } from "react";
import UploadFile from "../Components/Upload.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Homebar = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filename, setFilename] = useState([]);
  const [document, setDocument] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const setStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/setStatus/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        console.log("Marked the Task comepleted");
        alert("Task marked as done");
        // console.log(taskDetails.task.date.split('T')[0]);
      } else {
        throw new Error("Could Not Mark the Task Complete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="homebarcontainer">
      {openModal && (
        <UploadFile
          closeModal={() => setOpenModal(false)}
          Filename={filename}
          setFilename={setFilename}
          setDocument={setDocument}
        />
      )}
      <div className="leftgroup">
        <button>
          <img
            src="/assets/backarrow.svg"
            alt="back Home page"
            onClick={() => {
              navigate("/Task");
            }}
          />
        </button>
        <p>{title}</p>
      </div>

      <div className="rightgroup">
        <button onClick={() => setStatus()}>Completed</button>
        <button onClick={() => setOpenModal(true)}>
          <img src="/assets/upload.svg" alt="" />
          <p>Upload</p>
        </button>
      </div>
    </div>
  );
};

export default Homebar;
