import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { ROUTES } from "../router/pageRoutes";
import Button from "../components/common/Button";
import FormikField from "../components/common/FormikField";
import { useCreateUser } from "../customHooks/useCreateUser";
import { registerValidationSchema } from "../validations/registerValidationSchema";
import { RegisterRequest } from "../components/user/types";
import { ErrorResponse } from "../types/error";

import styles from "../styles/Register.module.scss";
import registerHero from "../assets/register-hero.svg";

const registerInitialValues: RegisterRequest = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const Register = () => {
  const [error, setError] = useState("");
  const { mutateAsync: createUser } = useCreateUser();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: RegisterRequest) => {
    try {
      await createUser(formValues);
      navigate(ROUTES.LOGIN);
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
            src={registerHero}
            alt="Register illustration"
            className={styles.hero_image}
          />
        </div>
        <div className={styles.form_container}>
          <Formik
            initialValues={registerInitialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.register_form}>
              <h2 className={styles.form_title}>Sign Up</h2>
              <div className={styles.field_wrapper}>
                <FormikField
                  name="firstname"
                  type="text"
                  placeholder="Enter Firstname"
                  className={styles.form_input}
                />
              </div>
              <div className={styles.field_wrapper}>
                <FormikField
                  name="lastname"
                  type="text"
                  placeholder="Enter Lastname"
                  className={styles.form_input}
                />
              </div>
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
              <Button type="submit">Register</Button>
              <div className={styles.login_link_wrapper}>
                <Link to={ROUTES.LOGIN} className={styles.login_link}>
                  Already have an account? Log in
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
