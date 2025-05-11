import App from "../App";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import HomePage from "../pages/homePage/HomePage";
import ChatPage from "../pages/chatPage/ChatPage";
import ContactsPage from "../pages/contactsPage/ContactsPage";
import ChatsPage from "../pages/chatsPage/ChatsPage";
import CommunitysHomePage from "../pages/communitysHomePage/CommunitysHomePage";
import MyProfilePage from "../pages/myProfilePage/MyProfilePage";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: 'profile',
        element: <MyProfilePage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
      {
        path: 'chats',
        element: <ChatsPage />,
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
        element: <div>System Settings</div>,
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