import React from 'react';
import HomeCards from '../Components/HomeCards';
import plus from '../assets/Home/plus.png';
import { Link } from 'react-router-dom';
import "../Styles/Home.css";
import Footer from '../Components/footer';
const Home = () => {
  return (
    <div className="home-container">
      <div className="header-container">
        <h1 className="header-title">Leaves</h1>
        <Link to="/leaveapply" className="home-apply-button">
          <img src={plus} alt="applyleave" className="plus-icon" />
          <p>Apply leave</p>
        </Link>
      </div>
      <HomeCards/>
      <Footer/>
      </div>
      
  );
};

export default Home;
