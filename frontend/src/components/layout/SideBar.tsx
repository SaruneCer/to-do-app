import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navigation from "../common/Navigation"; // Import Navigation
import styles from "../../styles/SideBar.module.scss";

export function Sidebar() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  const firstLetter = user?.firstname ? user.firstname[0].toUpperCase() : "";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.profilePicture}>{firstLetter}</div>
        <h3>
          {user?.firstname} {user?.lastname}
        </h3>
        <p>{user?.email}</p>
      </div>
      <Navigation /> {/* Use Navigation component */}
    </aside>
  );
}
