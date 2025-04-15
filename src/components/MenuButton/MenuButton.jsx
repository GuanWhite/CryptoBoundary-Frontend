import React, { useState } from 'react';
import "./MenuButton.less";

const MenuButton = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className='menu-button-container' onClick={handleClick}>
      <div className={`menu-icon ${isActive ? 'active' : ''}`}>
        <span className='line line1'></span>
        <span className='line line2'></span>
        <span className='line line3'></span>
      </div>
    </div>
  );
};

export default MenuButton;