import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
