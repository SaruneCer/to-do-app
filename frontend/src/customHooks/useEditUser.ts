import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface EditUserInput {
  id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

const editUser = async ({ id, ...user }: EditUserInput): Promise<IUser> => {
  const response = await axios.put(`http://localhost:8080/users/${id}`, user);
  return response.data;
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation<IUser, Error, EditUserInput>({
    mutationFn: editUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
