import * as Yup from "yup";
import { LoginRequest } from "../components/user/types";
import { errorMessage } from "./errorMessage";

export const loginValidationSchema: Yup.Schema<LoginRequest> =
  Yup.object().shape({
    email: Yup.string()
      .email(errorMessage.email)
      .required(errorMessage.required),
    password: Yup.string().required(errorMessage.required),
  });

export const loginInitialValues: LoginRequest = {
  email: "",
  password: "",
};
