import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../components/tasks/types";

const fetchTasks = async (userId: string): Promise<Task[]> => {
  const response = await axios.get(`http://localhost:8080/tasks/${userId}`);
  return response.data;
};

export const useGetTasks = (userId: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery<Task[], Error>({
    queryKey: ["tasks", userId],
    queryFn: () => fetchTasks(userId),
    enabled: !!userId,
  });

  return {
    tasks: data,
    loading: isLoading,
    error: isError ? error : null,
    refetchTasks: refetch,
  };
};
