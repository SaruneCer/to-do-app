import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ROUTES } from "../../router/pageRoutes";
import { MdDashboard } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { UserContext } from "../../context/UserContext";
import ConfirmationModal from "./confirmationModal";
import styles from "../../styles/Navigation.module.scss";

const Navigation = () => {
  const location = useLocation();
  const { logout } = useContext(UserContext);

  const [activeLink, setActiveLink] = useState<string>(location.pathname);
  const [isLogoutConfirmed, setIsLogoutConfirmed] = useState(false);

  const navigationLinks = [
    {
      href: ROUTES.HOME,
      label: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      href: ROUTES.USER_TASKS,
      label: "My Tasks",
      icon: <VscTasklist />,
    },
    {
      href: ROUTES.USER_INFO,
      label: "Settings",
      icon: <IoMdSettings />,
    },
  ];

  const handleLogoutClick = () => {
    setIsLogoutConfirmed(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutConfirmed(false);
  };

  const cancelLogout = () => {
    setIsLogoutConfirmed(false);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <nav className={styles.navigation}>
      {navigationLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className={`${styles.navigation_link} ${
            activeLink === link.href ? styles.active_link : ""
          }`}
          onClick={() => setActiveLink(link.href)}
        >
          <span className={styles.navigation_icon}>{link.icon}</span>
          <span className={styles.navigation_label}>{link.label}</span>
        </Link>
      ))}

      <div className={styles.logoutContainer}>
        <Link to="#" className={styles.logout} onClick={handleLogoutClick}>
          <MdLogout className={styles.logoutIcon} />
          Log Out
        </Link>
      </div>

      <ConfirmationModal
        isOpen={isLogoutConfirmed}
        message="Are you sure you want to log out?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </nav>
  );
};

export default Navigation;
