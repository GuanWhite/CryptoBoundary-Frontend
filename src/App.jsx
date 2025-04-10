
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
      <Header />
      <StartButton buttonName="Login" navProps="/login" />
      <UserGreeting isLoggedIn={true} username={"white"} />
      <ColorPicker />
      <p className="oneline">sssssssssssaaaaaaaaaaaaaaaaaaaaddddddd</p>
      <textarea tpye="text" className="mutiyline"></textarea>
      {/* <Counter /> */}
      {/* <ErrorPage/> */}
      {/* <Hello /> */}
      {/* <Community /> */}
      {/* <Login/> */}
      <Footer />
    </>
  );
}

export default App;
