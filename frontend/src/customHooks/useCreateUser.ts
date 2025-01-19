import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface CreateUserInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const createUser = async (user: CreateUserInput): Promise<IUser> => {
  const response = await axios.post("http://localhost:8080/users", user);
  return response.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<IUser, Error, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
