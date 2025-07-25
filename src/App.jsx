
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


function App() {
  
  return (
    <>
      <WelcomePage />

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
