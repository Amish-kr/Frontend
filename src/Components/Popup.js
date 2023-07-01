/*import React, { useState } from "react";
import "./Popup.css"; // Import the CSS file

function Popup() {
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <div className={`popup ${isVisible ? "" : "hidden"}`}>
      <div className="popup-image">
      <img className="calendar"src="https://p.kindpng.com/picc/s/623-6238920_june-calendar-blue-icon-hd-png-download.png" alt="Popup Image" />
      <span style={{ paddingLeft: '20px',display: 'block' }}>
        kfjjfdjjf Remember, when working with symbolic variables, it's best to avoid assigning 
        specific numeric values to them unless necessary. Symbolic variables 
        are primarily used for representing mathematical symbols and performing symbolic computations.
      
    </span>
      </div>

      <div className="popup-footer">
        <button className="popup-button" onClick={handleButtonClick}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;

*/
import React, { useState } from "react";
import "../Styles/Popup.css"; // Import the CSS file

function Popup() {
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <div className="main101">
      
    <div className={`popup101 ${isVisible ? "" : "hidden"}`}>
      <div className="popup-image101">
      <img className="calendar101"src="https://p.kindpng.com/picc/s/623-6238920_june-calendar-blue-icon-hd-png-download.png" alt="Popup Image" />
      <span style={{ paddingLeft: '20px',display: 'block' }}>
        kfjjfdjjf Remember, when working with symbolic variables, it's best to avoid assigning specific numeric values to them unless necessary. Symbolic variables 
        are primarily used for representing mathematical symbols and performing symbolic computations.
      
    </span>
      </div>

      <div className="popup-footer101">
        <button className="popup-button101" onClick={handleButtonClick}>
          OK
        </button>
      </div>
    </div>
    </div>
  );
}

export default Popup;

