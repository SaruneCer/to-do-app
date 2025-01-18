import Logo from "../../assets/logo.png";
import { ROUTES } from "../../router/pageRoutes";
import { Link } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import styles from "../../styles/Topbar.module.scss";

const Topbar = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.leftSideWrapper}>
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="Home Service Logo" />
        </Link>
      </div>

      <div className={styles.centerWrapper}>
        <SearchInput />
      </div>
    </header>
  );
};

export default Topbar;
