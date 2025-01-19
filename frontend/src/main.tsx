// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import UserInfo from "./pages/UserInfo";
// import Error from "./pages/Error";
// import App from "./App";  
// import AuthLayout from "./components/layout/AuthLayout";
// import RootLayout from "./components/layout/RootLayout";
// import "./styles/global.scss";
// import { ROUTES } from "./router/pageRoutes"; 

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         element: <RootLayout />,
//         children: [
//           {
//             path: ROUTES.HOME,
//             element: <Home />,
//           },
//           {
//             path: ROUTES.USER_INFO,
//             element: <UserInfo />,
//           },
//         ],
//       },
//       {
//         element: <AuthLayout />,
//         children: [
//           {
//             path: ROUTES.LOGIN,
//             element: <Login />,
//           },
//           {
//             path: ROUTES.REGISTER,
//             element: <Register />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);