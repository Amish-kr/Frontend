import React, { useState } from "react";
import MyModal from "./Modal";

const EbookCard = ({ ebook }) => {
  const [showModal, setShowModal] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  // console.log(ebook._id);
  const Enroll = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/enrollebook/${ebook._id}`,
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
          <img className="yy-10" src={ebook.image} alt="image1" />
        </div>
        <div>
          <h3 className="yy-11">{ebook.title}</h3>
          <p className="yy-12">{ebook.description}</p>
          <div className="yy-3">
            <span style={{ fontWeight: "700", fontSize: "11px" }}>
              Skill you learn:
            </span>
            <span style={{ marginLeft: "1px", fontSize: "12.5px" }}>
              {ebook.skills.map((skill, index) => (
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
              type="ebook"
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default EbookCard;
