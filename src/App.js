import React, { useContext } from "react";
import AuthContext, { AuthContextProvider } from "./context/AuthContext.js";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/login";
import FormPage from "./Components/FormPage";
import Reset from "./Components/Reset";
import Forget from "./Components/Forget";
import Meetdetails from "./Components/Meetdetails";
import Mymeetings from "./Components/Mymeetings";
import Profile from "./Components/Profile";
import MeetingInfo from "./Components/MeetingInfo";
import PolicyMaster from "./Components/PolicyMaster";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Dashboard from "./Components/Dashboard";
import MyTask from "./Components/MyTask";
import Tdetails from "./Tdetails";
import Badgepage from "./pages/Badgepage";
import Searchdata from "./Searchdata";
import BadgeTypes from "./Components/BadgeTypes";
import Ap from "./Ap";
import Popup1 from "./Components/Popup1";
import Popup from "./Components/Popup";
import AdminPage from "./Components/AdminPage";
import Cal from "./Cal";
import Learn from "./Learn";
import NotificationPage from "./NotificationPage";
import Dahead from "./Components/Dahead";
import Footer from "./Components/footer";

import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const location = useLocation();
  const shouldHideHeaderFooter =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/reset" ||
    location.pathname === "/forget";

  const shouldHideFooter =
    location.pathname === "/profile" || location.pathname === "/learning";

  const isResetRoute = location.pathname.startsWith("/reset/");

  const LoggedIn = useContext(AuthContext);
  const isLoggedIn = LoggedIn.isLoggedIn;

  // console.log(shouldHideHeaderFooter);

  return (
    <div
      className="rootlayout"
      style={{
        // conditional padding based on shouldHideHeaderFooter
        paddingTop: !isLoggedIn ? 0 : "6.7rem",
        paddingBottom: !isLoggedIn ? 0 : "6.2rem",
      }}
    >
      {!isLoggedIn && (
        <>
          <Routes>
            <Route path="/signup" element={<FormPage />} />
            <Route path="/reset/:id/:token" element={<Reset />} />
            <Route path="/forget" element={<Forget />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </>
      )}
      {isLoggedIn === true && (
        <>
          <Routes>
            <Route path="/mymeeting" element={<Mymeetings />} />
            <Route path="/details/:id" element={<Meetdetails />} />
            <Route path="/create" element={<MeetingInfo />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/home" element={<Home />} />
            <Route path="/leaveapply" element={<Apply />} />

            <Route path="/check" element={<Searchdata />} />
            <Route path="/Popup1" element={<Popup1 />} />
            <Route path="/Popup" element={<Popup />} />

            <Route path="/task" element={<MyTask />} />
            <Route path="/taskdetails/:id" element={<Tdetails />} />
            <Route path="/admin" element={<AdminPage />} />

            <Route path="/learning" element={<Learn />} />

            <Route path="/" element={<Dashboard />} />
            <Route path="/badges" element={<Badgepage />}>
              <Route path="/badges" element={<BadgeTypes />} />
              <Route path="/badges/:badgetype" element={<BadgeTypes />} />
            </Route>
            <Route path="/assignform" element={<Ap />} />
            <Route path="/policy" element={<PolicyMaster />} />
            <Route path="/notify" element={<NotificationPage />} />
            <Route path="/calendar" element={<Cal />} />
          </Routes>
          {isLoggedIn && <Dahead />}
          {isLoggedIn && <Footer />}
        </>
      )}
    </div>
  );
};

export default App;
