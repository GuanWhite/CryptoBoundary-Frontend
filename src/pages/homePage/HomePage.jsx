import React, { useState, createContext } from 'react';
import { Outlet, useLocation } from "react-router";
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import Waves from '../../components/Waves/Waves';
import './HomePage.less';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => { }, // 必须提供默认函数占位
});

const HomePage = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const location = useLocation();
  // console.log('location:', location);

  return (
    <div className="min-h-screen w-full flex bg-lightBackgroundColor dark:bg-darkBackgroundColor">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {/* 子传父，从header中拿到theme的值；父传子，传递给sideNav */}
        <SideNav theme={theme} />

        <div className="flex-1 flex flex-col">
          {/* 这里需要做条件渲染，现在是Outlet覆盖了Waves，条件渲染跟route的参数有关？ */}
          {
            location.pathname === "/" ?  // 这里需要根据路由来判断是否渲染Waves
              (
                <div className='relative flex flex-col justify-center items-center w-full h-full'>
                  <h1 className='text-black dark:text-white sm:text-5xl md:text-7xl text-4xl font-bold mb-[16px]'>Welcome.</h1>
                  <h2 className='text-black dark:text-white text-3xl'>Let's start our story!</h2>
                  <Waves lineColor={theme === "light" ? "black" : "white"} />
                </div>
              ) :
              (
                // 根据需要放Header
                <Outlet /> //这里放各个页面的具体内容，并可以通过SideNav来选择具体展示哪部分的内容
              )
          }
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default HomePage;