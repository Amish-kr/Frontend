import React, { useState } from "react";
import MyModal from "./Modal";

const CourseCard = ({ course }) => {
  // console.log(course);
  // console.log("here inside course card");
  const [showModal, setShowModal] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  // const closeModal=()=>setShowModal(false);
  const Enroll = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/enrollcourse/${course._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        setShowModal(true);
        setAlreadyEnrolled(false);
      } else {
        setShowModal(true);
        setAlreadyEnrolled(true);
      }
    } catch (error) {
      console.log("Error occurred during enrollment:", error);
    }
  };

  return (
    <div className="yy-9">
      <div>
        <div>
          <img className="yy-10" src={course.image} alt="image1" />
        </div>
        <div>
          <h3 className="yy-11">{course.title}</h3>
          <p className="yy-12">{course.description}</p>
          <div className="skillzzz">
            <span style={{ fontWeight: "700", fontSize: "11px" }}>
              Skill you learn :
            </span>
            <span style={{ marginLeft: "1px", fontSize: "12.5px" }}>
              {course.skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </span>
          </div>
          <button onClick={() => Enroll()} className="btnnn">
            Enroll now
          </button>
          {showModal && (
            <MyModal
              closeModal={() => setShowModal(false)}
              alreadyEnrolled={alreadyEnrolled}
              type="course"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
