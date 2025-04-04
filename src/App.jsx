
import HelloWorld from "./component/HelloWorld";
import Header from "./Header";
import Footer from "./Footer";
import Community from "./pages/Community";
import UserGreeting from "./UserGreeting";
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
