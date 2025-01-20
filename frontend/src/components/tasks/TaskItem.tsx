import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Task } from "./types";
import { useEditTask } from "../../customHooks/useEditTask";
import { useDeleteTask } from "../../customHooks/useDeleteTask";
import ConfirmationModal from "../common/ConfirmationModal";
import EditTaskModal from "./EditTaskModal";
import styles from "../../styles/TaskItem.module.scss";

interface TaskItemProps {
  task: Task;
  refetchTasks: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, refetchTasks }) => {
  const { editTask } = useEditTask();
  const { deleteTask } = useDeleteTask();

  const [isCompleted, setIsCompleted] = useState<boolean>(
    task.status === "completed"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleToggleCompletion = async () => {
    const updatedStatus = isCompleted ? "in progress" : "completed";

    const updatedTask = {
      status: updatedStatus as "in progress" | "completed",
    };

    try {
      await editTask({ id: task._id, updates: updatedTask });
      setIsCompleted(!isCompleted);
      refetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTask(task._id);
      refetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in progress":
        return "#0225FF";
      case "completed":
        return "#05A301";
      default:
        return "#000000";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "extreme":
        return "#F21E1E";
      case "moderate":
        return "#42ADE2";
      case "low":
        return "#05A301";
      default:
        return "#000000";
    }
  };

  return (
    <>
      <div className={styles.taskItem}>
        <div className={styles.circleSection}>
          <div
            onClick={handleToggleCompletion}
            className={styles.circleIcon}
            style={{ color: getPriorityColor(task.priority) }}
          >
            {isCompleted ? <FaRegCircleCheck /> : <FaRegCircle />}
          </div>
        </div>

        <div className={styles.itemDetailSection}>
          <div className={styles.taskItemTop}>
            <h3 className={styles.taskTitle}>{task.title}</h3>

            <div className={styles.iconButtonsWrapper}>
              <MdEdit className={styles.iconButton} onClick={handleEdit} />

              <MdDeleteOutline
                className={styles.iconButton}
                onClick={handleDelete}
              />
            </div>
          </div>

          <div className={styles.taskComment}>{task.comment}</div>

          <div className={styles.taskItemBottom}>
            <p className={styles.bottomItem}>
              <span>Priority: </span>
              <span
                style={{
                  color: getPriorityColor(task.priority),
                }}
              >
                {task.priority}
              </span>
            </p>
            <p className={styles.bottomItem}>
              <span>Status: </span>
              <span
                style={{
                  color: isCompleted
                    ? getStatusColor("completed")
                    : getStatusColor(task.status),
                }}
              >
                {isCompleted ? "completed" : task.status}
              </span>
            </p>
            <p className={styles.bottomItem}>
              <span>Created on: </span>
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={task}
        onClose={() => setIsEditModalOpen(false)}
        refetchTasks={refetchTasks}
      />
    </>
  );
};

export default TaskItem;
