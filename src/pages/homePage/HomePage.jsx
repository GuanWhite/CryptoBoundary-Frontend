import React, { useState, createContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import MenuButton from '../../components/MenuButton/MenuButton';
import HistorySidebar from '../../components/HistorySidebar/HistorySidebar';
import './HomePage.less';

export const ThemeContext = createContext();
const HomePage = () => {
  const [theme, setTheme] = useState();

  return (
    <div className="min-h-screen w-full bg-lightBackgroundColor dark:bg-darkBackgroundColor">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {/* 子传父，从header中拿到theme的值；父传子，传递给sideNav */}
        <Header />
        <SideNav theme={theme} />
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
        {/* <div className="homePage-main">
        <h1>Welcome to the Home Page!</h1>
      </div> */}
      </ThemeContext.Provider>
    </div>
  );
};

export default HomePage;