
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UserGreeting from "./components/UserGreeting/UserGreeting";
import ErrorPage from "./pages/notFoundPage/NotFoundPage";
import SVGComponent from "./pages/notFoundPage/SVGComponent";
import { createBrowserRouter } from "react-router";
import StartButton from "./components/StartButton/StartButton";
import Counter from "./components/Counter/Counter";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import WelcomePage from "./pages/welcomePage/WelcomePage";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

function App() {
  const duration = 10; // 验证码倒计时的初始值

  const [time, setTime] = useState(duration);
  const [timeId, setTimeId] = useState(null);

  useEffect(() => {
    if (time < 1) {
      clearTimeout(timeId);
      setTime(duration);
    }
  }, [time]);
  
  const countDown = () => {
    setTime(time => time - 1);
    setTimeId(setTimeout(() => countDown(), 1000));
  };
  return (
    <>
      <WelcomePage />

      <Button onClick={countDown} disabled={time < duration && time > 0}>
        {time === duration || time === 0 ? "获取验证码" : `${time}秒后获取`}
      </Button>

      {/* <div className="wrapper">
        <div className="item"> */}
      {/* <Header /> */}
      {/* <StartButton buttonName="Login" navProps="/login" />
          <UserGreeting isLoggedIn={true} username={"white"} />
        </div>
        <div className="item"></div>
        <div className="item"> */}
      {/* <ColorPicker /> */}


      {/* </div>
        <div className="item"></div>
        <div className="item">
          <Footer />
        </div>
      </div> */}

      {/* <Counter /> */}
      {/* <ErrorPage/> */}
      {/* <Hello /> */}
      {/* <Community /> */}
      {/* <Login/> */}
    </>
  );
}

export default App;
