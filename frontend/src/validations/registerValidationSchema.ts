import * as Yup from "yup";
import { RegisterRequest } from "../components/user/types";
import { errorMessage } from "./errorMessage";

export const registerValidationSchema: Yup.Schema<RegisterRequest> =
  Yup.object().shape({
    firstname: Yup.string().required(errorMessage.required),
    lastname: Yup.string().required(errorMessage.required),
    email: Yup.string()
      .email(errorMessage.email)
      .required(errorMessage.required),
    password: Yup.string().required(errorMessage.required),
  });

export const registerInitialValues: RegisterRequest = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};
