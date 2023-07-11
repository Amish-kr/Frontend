import React, { useState } from 'react';

const ClickableRectangle = ({ clickable, imageSrc, text1, text2 }) => {
  const [showMenu, setShowMenu] = useState(false); // State to track the visibility of the menu

  const handleClick = () => {
    if (clickable) {
      console.log('Clickable rectangle clicked');
      setShowMenu(true); // Show the menu on click
    }
  };

  const handleMouseEnter = (event) => {
    if (clickable) {
      event.currentTarget.style.background =
        'linear-gradient(100.23deg, #80FFC5 -15.07%, #ABD0FF 249.35%)';
    }
  };

  const handleMouseLeave = (event) => {
    if (clickable) {
      event.currentTarget.style.background =
        'linear-gradient(100.23deg, #ABD0FF -15.07%, #80FFC5 249.35%)';
    }
  };

  return (
    <div
      style={{
        width: '100%', // Adjusted width to occupy 33.33% of the container with reduced spacing
        height: '200px',
        background: 'linear-gradient(100.23deg, #ABD0FF -15.07%, #80FFC5 249.35%)',
        borderRadius: '15px',
        cursor: clickable ? 'pointer' : 'auto',
        position: 'relative',
        transition: 'background-color 0.3s',
     }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {clickable && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {/* PNG Image */}
          <img
            src={imageSrc}
            alt="Rectangle"
            style={{
              marginBottom: '20px',
              marginRight: '170px',
              marginLeft: '-100px',
              marginTop: '10px',
            }}
          />

          {/* Text 1 */}
          <div
            style={{
              color: '#0478FF',
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '48px',
              lineHeight: '48px',
              marginBottom: '10px',
              marginRight: '40px',
              marginLeft: '-80px',
              marginTop: '-90px',
            }}
          >
            {text1}
          </div>

          {/* Text 2 */}
          <div
            style={{
              color: '#0E1A45',
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '45px',
            }}
          >
            {text2}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableRectangle;