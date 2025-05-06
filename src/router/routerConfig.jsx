import App from "../App";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import HomePage from "../pages/homePage/HomePage";
import ChatPage from "../pages/chatPage/ChatPage";
import CommunitysHomePage from "../pages/communitysHomePage/CommunitysHomePage";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: 'profile',
        element: <div>My Profile</div>,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'allcommunitys',
        element: <CommunitysHomePage />,
      },
      {
        path: 'mycommunitys',
        element: <CommunitysHomePage />,
      },
      {
        path: 'joinedcommunitys',
        element: <CommunitysHomePage />,
      },
      {
        path: 'setting',
        element: <div>Setting</div>,
      },
    ],
  },
  {
    path: "/welcome",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default createBrowserRouter(routes);