
import HelloWorld from "./components/Hello/Hello";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Community from "./pages/Community";
import UserGreeting from "./components/UserGreeting/UserGreeting";
import Login from "./pages/Login";
import ErrorPage from "./pages/errorPage/ErrorPage";
import SVGComponent from "./pages/errorPage/SVGComponent";

function App() {

  return (
    <>
      {/* <Header />
      <UserGreeting isLoggedIn={true} username={"white"}/> */}
      <ErrorPage/>
     
      {/* <HelloWorld />
      <Community /> */}
      {/* <Login/> */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
