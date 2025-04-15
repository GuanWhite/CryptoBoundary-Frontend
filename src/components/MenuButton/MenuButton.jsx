import React from 'react';
import "./MenuButton.less";

const MenuButton = () => {
  const handleClick = () => {

  };
  return (
    <div className='menu-button-container' onClick={handleClick}>
      <div className="menu-icon">
        <span className='line line1'></span>
        <span className='line line2'></span>
        <span className='line line3'></span>
      </div>
    </div>
  );
};

export default MenuButton;