import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { ROUTES } from "../router/pageRoutes";
import Button from "../components/common/Button";
import { UserContext } from "../context/UserContext";
import FormikField from "../components/common/FormikField";
import { useLoginUser } from "../customHooks/useLoginUser";
import { loginValidationSchema } from "../validations/loginValidationSchema";
import { LoginRequest } from "../components/user/types";
import { ErrorResponse } from "../types/error";

import styles from "../styles/Login.module.scss";
import loginHero from "../assets/login-hero.svg";

const loginInitialValues: LoginRequest = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");
  const { mutateAsync: loginUser } = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: LoginRequest) => {
    try {
      const response = await loginUser(formValues);
      const { token, user } = response;

      if (token && user) {
        localStorage.setItem("token", token);
        login(response);
        navigate(ROUTES.HOME);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      console.error(errorMessage);
      setError(
        errorMessage?.response?.data.message ?? "An unexpected error occurred"
      );
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.content_wrapper}>
        <div className={styles.hero_section}>
          <img
            src={loginHero}
            alt="Login illustration"
            className={styles.hero_image}
          />
        </div>
        <div className={styles.form_container}>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.login_form}>
              <h2 className={styles.form_title}>Sign In</h2>
              <div className={styles.field_wrapper}>
                <FormikField
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className={styles.form_input}
                />
              </div>
              <div className={styles.field_wrapper}>
                <FormikField
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className={styles.form_input}
                />
              </div>
              {error && <p className={styles.error_message}>{error}</p>}
              <Button type="submit">Log in</Button>
              <div className={styles.signup_link_wrapper}>
                <Link to={ROUTES.REGISTER} className={styles.signup_link}>
                  Do not have an account? Create one
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
