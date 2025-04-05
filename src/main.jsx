import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.less';
// import App from './App.jsx';
import router from './router/routerConfig';
import { RouterProvider } from "react-router";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
);
