
import Hello from "./components/Hello/Hello";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Community from "./components/Community/Community";
import UserGreeting from "./components/UserGreeting/UserGreeting";
// import Login from "./pages/Login";
import ErrorPage from "./pages/notFoundPage/NotFoundPage";
import SVGComponent from "./pages/notFoundPage/SVGComponent";
import { createBrowserRouter } from "react-router";
import StartButton from "./components/StartButton/StartButton";
import Counter from "./components/Counter/Counter";
import ColorPicker from "./components/ColorPicker/ColorPicker";



function App() {

  return (
    <>
      <div className="wrapper">
        <div className="item">
          <Header />
          <StartButton buttonName="Login" navProps="/login" />
          <UserGreeting isLoggedIn={true} username={"white"} />
        </div>
        <div className="item">2</div>
        <div className="item">
          <ColorPicker />
        </div>
        <div className="item">4</div>
        <div className="item">
          <Footer />
        </div>
      </div>

      {/* <Counter /> */}
      {/* <ErrorPage/> */}
      {/* <Hello /> */}
      {/* <Community /> */}
      {/* <Login/> */}



    </>
  );
}

export default App;
