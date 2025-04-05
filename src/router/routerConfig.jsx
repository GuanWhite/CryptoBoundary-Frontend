import App from "../App";
import Login from "../pages/loginPage/LoginPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default createBrowserRouter(routes);