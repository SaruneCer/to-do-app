import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { Sidebar } from "./SideBar";
import styles from "../../styles/rootLayout.module.scss"; 

const RootLayout = () => {
  return (
    <div className={styles.rootLayout}> 
      <div className={styles.contentArea}> 
        <Topbar />
        <div className={styles.mainContainer}> 
          <Sidebar />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
