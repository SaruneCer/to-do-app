import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AuthLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
