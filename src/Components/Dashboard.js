import React from "react";
import Notification from "./notification";
import News from "./news";
import Footer from "./footer";
import { He, RectanglesSection } from "./He";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <RectanglesSection />
      <div className="dashboard__notify_news_container">
        <Notification />
        <News />
      </div>

      {/* Rest of your application */}
    </div>
  );
};

export default Dashboard;
