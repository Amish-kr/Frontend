import React from 'react';
import ApplyForm from '../Components/ApplyForm';
import banner from '../assets/Leaveform/banner.png';
import "../Styles/Apply.css"
import '../Components/footer';
import Footer from '../Components/footer';
const Apply = () => {
  return (
    <div className="apply-container">
      <img src={banner} alt="" className="banner-image" />
      <ApplyForm /><Footer/>
    </div>
  );
};

export default Apply;
