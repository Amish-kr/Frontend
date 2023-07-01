import React from 'react';
import ReactDom from 'react-dom';
import "./cancelModal2.css";
import CancelImg from "./images/cancel_icon.jpg";
import { Link } from "react-router-dom";

export default function CancelModal2({ open2, children }) {
    if (!open2) return null;
  return ReactDom.createPortal (
    <div>
        <div className="cancelOuter2">
            <div>
                <img src={CancelImg} alt="error" className="cancelImg" />
            </div>
            <div className="childModal2">
                {children}
            </div>
            <Link to="/" className="homeRouter">
                Go to home page
            </Link>
        </div>
    </div>,
    document.getElementById("portal")
  )
}
