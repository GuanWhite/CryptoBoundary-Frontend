import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import MenuButton from '../../components/MenuButton/MenuButton';
import HistorySidebar from '../../components/HistorySidebar/HistorySidebar';
import './HomePage.less';

const HomePage = () => {
  return (
    <div className="homePage-container">
      {/* <div className="homePage-header">
        <MenuButton />
        <select className="model-select">
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>
        <div className="user-control-box">
          test text
        </div>
      </div>
      <HistorySidebar /> */}
      <div className="homePage-main">
        <h1>Welcome to the Home Page!</h1>
      </div>
    </div>
  );
};

export default HomePage;