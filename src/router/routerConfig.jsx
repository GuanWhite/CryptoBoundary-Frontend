import App from "../App";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import HomePage from "../pages/homePage/HomePage";
// import ChatPage from "../pages/chatPage/ChatPage";
import ChatPage from "../pages/ChatGPT/ChatPage";
import ContactsPage from "../pages/contactsPage/ContactsPage";
import ChatsPage from "../pages/chatsPage/ChatsPage";
import CommunitysHomePage from "../pages/communitysHomePage/CommunitysHomePage";
import MyProfilePage from "../pages/myProfilePage/MyProfilePage";
import { createBrowserRouter, Navigate } from "react-router";

const PrivateRoute = ({ element }) => {
  let isAuth = false;
  // 路由守卫只验证状态不存储用户状态，如果要使用状态，在相应的页面中再次获取即可。
  // localStorage.getItem(process.env.CURRENT_USER_KEY)
  // 还可以添加token以及token是否在有效期内的验证
  if (localStorage.getItem("currentUser")) {
    isAuth = true;
  }
  // return isAuth ? element : <Navigate to="/login" replace />;  // 这里不能用函数式导航navigate("/login")
  return element;
};

const routes = [
  {
    path: "/",
    element: <PrivateRoute element={<HomePage />} />,
    children: [
      {
        path: 'profile',
        element: <PrivateRoute element={<MyProfilePage />} />,
      },
      {
        path: 'chat',
        element: <PrivateRoute element={<ChatPage />} />,
      },
      {
        path: 'contacts',
        element: <PrivateRoute element={<ContactsPage />} />,
      },
      {
        path: 'chats',
        element: <PrivateRoute element={<ChatsPage />} />,
      },
      {
        path: 'allcommunitys',
        element: <PrivateRoute element={<CommunitysHomePage />} />,
      },
      {
        path: 'mycommunitys',
        element: <PrivateRoute element={<CommunitysHomePage />} />,
      },
      {
        path: 'joinedcommunitys',
        element: <PrivateRoute element={<CommunitysHomePage />} />,
      },
      {
        path: 'setting',
        element: <PrivateRoute element={<div>System Settings</div>} />,
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