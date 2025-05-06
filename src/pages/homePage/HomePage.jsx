import React, { useState, createContext } from 'react';
import { Outlet } from "react-router";
import Navbar from '../../components/Navbar/Navbar';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import MenuButton from '../../components/MenuButton/MenuButton';
import HistorySidebar from '../../components/HistorySidebar/HistorySidebar';
import './HomePage.less';

export const ThemeContext = createContext({
  theme: '',
  setTheme: () => { }, // 必须提供默认函数占位
});

const HomePage = () => {
  const [theme, setTheme] = useState('');

  return (
    <div className="min-h-screen w-full flex bg-lightBackgroundColor dark:bg-darkBackgroundColor">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {/* 子传父，从header中拿到theme的值；父传子，传递给sideNav */}
        <SideNav theme={theme} />
        <div className="flex-1 flex flex-col bg-green-900">
          {/* 这里放各个页面的具体内容，并可以通过SideNav来选择具体展示哪部分的内容 */}
          <Outlet />
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default HomePage;