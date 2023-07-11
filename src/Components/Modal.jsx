import React, { useEffect } from 'react';
import "./Modal.css";

const MyModal = ({ closeModal, alreadyEnrolled, type }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <>
      <div className='dd-1'></div>
      <div className='dd-2'>
        <h2 className='dd-3'>{alreadyEnrolled ? "Already Enrolled!" : "Thank You!"}</h2>
        <p className='dd-4'>{alreadyEnrolled ? "You have already enrolled for this " + type : "You have successfully enrolled for this course. See you soon."}</p>
        <button className='dd-5' onClick={closeModal}>OK</button>
      </div>
    </>
  )
}

export default MyModal;
