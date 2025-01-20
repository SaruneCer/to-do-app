import React from "react";
import { useGetTasks } from "../../customHooks/useGetTasks";
import TaskItem from "./TaskItem";

interface TaskListProps {
  userId: string;
  filterStatus?: string;
}

const TaskList: React.FC<TaskListProps> = ({ userId, filterStatus }) => {
  const { tasks, loading, error, refetchTasks } = useGetTasks(userId);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  const filteredTasks = filterStatus
    ? tasks?.filter((task) => task.status === filterStatus)
    : tasks;

  return (
    <div>
      {filteredTasks?.map((task) => (
        <TaskItem key={task._id} task={task} refetchTasks={refetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
