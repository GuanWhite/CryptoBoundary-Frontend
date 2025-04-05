
import Hello from "./components/Hello/Hello";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Community from "./components/Community/Community";
import UserGreeting from "./components/UserGreeting/UserGreeting";
// import Login from "./pages/Login";
import ErrorPage from "./pages/notFoundPage/NotFoundPage";
import SVGComponent from "./pages/notFoundPage/SVGComponent";
import { createBrowserRouter } from "react-router";

function App() {

  return (
    <>
      <Header />
      <UserGreeting isLoggedIn={true} username={"white"} />
      {/* <ErrorPage/> */}

      <Hello />
      {/* <Community /> */}
      {/* <Login/> */}
      <Footer />
    </>
  );
}

export default App;
