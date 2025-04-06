import App from "../App";
import LoginPage from "../pages/loginPage/LoginPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  // {
  //   path: "/home",
  //   element: <HomePage />,
  // },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default createBrowserRouter(routes);