import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEditTask } from "../../customHooks/useEditTask";
import { Task, UpdateTask } from "./types";
import Button from "../common/Button";
import styles from "../../styles/EditTaskModal.module.scss";

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
  refetchTasks: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  task,
  onClose,
  refetchTasks,
}) => {
  const { editTask, isSuccess, isError, error } = useEditTask();

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

  const formik = useFormik<UpdateTask>({
    initialValues: {
      title: task.title,
      comment: task.comment,
      priority: task.priority,
      status: task.status,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      priority: Yup.string().required("Priority is required"),
    }),
    onSubmit: async (values) => {
      try {
        await editTask({ id: task._id, updates: values });
        refetchTasks();
        onClose();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Task successfully updated");
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, isError, error]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2>Edit Task</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.fieldWrapper}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.inputField}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className={styles.errorMessage}>{formik.errors.title}</p>
            )}
          </div>

          <div className={styles.fieldWrapper}>
            <label>Priority</label>
            <div className={styles.priorityOptions}>
              {["extreme", "moderate", "low"].map((priority) => (
                <label key={priority}>
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formik.values.priority === priority}
                    onChange={formik.handleChange}
                  />
                  <span
                    style={{
                      color: getPriorityColor(priority),
                      marginLeft: "8px",
                    }}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {formik.touched.priority && formik.errors.priority && (
              <p className={styles.errorMessage}>{formik.errors.priority}</p>
            )}
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="comment">Task Description</label>
            <textarea
              id="comment"
              name="comment"
              className={styles.inputField}
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Start writing here..."
            />
          </div>

          <div className={styles.modalFooter}>
            <Button type="button" cancel onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" confirm disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Saving..." : "Done"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
