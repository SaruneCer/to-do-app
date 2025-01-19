import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoginRequest, LoginResponse } from "../components/user/types";

const loginUser = async (user: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post("http://localhost:8080/auth/login", user);
  return response.data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["USERS"] }),
  });
};
