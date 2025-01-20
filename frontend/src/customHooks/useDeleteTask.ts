import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../components/tasks/types";

const deleteTask = async (id: string): Promise<{ message: string; deletedTask: Task }> => {
  const response = await axios.delete(`http://localhost:8080/tasks/${id}`);
  return response.data;
};

export const useDeleteTask = () => {
  const { mutateAsync, isError, error, isSuccess } = useMutation<
    { message: string; deletedTask: Task },
    Error,
    string
  >({
    mutationFn: (id) => deleteTask(id),
  });

  return {
    deleteTask: mutateAsync,
    isError,
    error,
    isSuccess,
  };
};
