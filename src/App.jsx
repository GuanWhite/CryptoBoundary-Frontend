
import HelloWorld from "./components/Hello";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Community from "./pages/Community";
import UserGreeting from "./components/UserGreeting";
import Login from "./pages/Login";


function App() {

  return (
    <>
      <Header />
      <UserGreeting isLoggedIn={true} username={"white"}/>
      {/* <HelloWorld />
      <Community /> */}
      {/* <Login/> */}
      <Footer />
    </>
  );
}

export default App;
