import React, { useContext } from "react";
import TaskList from "../components/tasks/TaskList";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Home.module.scss";
import { FaClipboardList } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";

const HomePage: React.FC = () => {
  const { user, isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn || !user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className={styles.homePage}>
      <header>
        <h1>
          Welcome back, {user.firstname}{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
      </header>
      <div className={styles.contentContainer}>
        <section className={styles.myTasks}>
          <div className={styles.taskListHeader}>
            <div>
              <FaClipboardList /> To-Do
            </div>
            <div className={styles.addTask}>
              <span className={styles.addTaskPlusSpan}>+</span>{" "}
              <a className={styles.addTaskLink}>Add task</a>
            </div>
          </div>
          <TaskList userId={user._id} />
        </section>
        <section className={styles.completedTasks}>
          <div className={styles.taskListHeader}>
            <div>
              <FaClipboardCheck /> Completed Tasks
            </div>
          </div>
          <TaskList userId={user._id} filterStatus="completed" />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
