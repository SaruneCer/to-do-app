import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Task, UpdateTask } from "../components/tasks/types";

const updateTask = async (id: string, updates: UpdateTask): Promise<Task> => {
  const response = await axios.put(
    `http://localhost:8080/tasks/${id}`,
    updates
  );
  return response.data;
};

export const useEditTask = () => {
  const { mutateAsync, isError, error, isSuccess } = useMutation<
    Task,
    Error,
    { id: string; updates: UpdateTask }
  >({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
  });

  return {
    editTask: mutateAsync,
    isError,
    error,
    isSuccess,
  };
};
