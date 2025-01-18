import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserInfo from "./pages/UserInfo";
import Error from "./pages/Error";
import App from "./App.jsx";
import AuthLayout from "./components/layout/AuthLayout";
import RootLayout from "./components/layout/RootLayout";
import "./styles/global.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <RootLayout />, 
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/user-info",
            element: <UserInfo />,
          },
        ],
      },
      {
        element: <AuthLayout />, 
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
