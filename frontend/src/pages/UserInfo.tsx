import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { UserContext } from "../context/UserContext";
import { useEditUser } from "../customHooks/useEditUser";
import FormikField from "../components/common/FormikField";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Button from "../components/common/Button";
import styles from "../styles/Userinfo.module.scss";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { user, login } = useContext(UserContext);
  const { mutate: editUser } = useEditUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
  });

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = () => {
    editUser(
      { id: user?._id || "", ...formData },
      {
        onSuccess: (updatedUser) => {
          login({
            user: updatedUser,
            token: localStorage.getItem("token") || "",
            status: "",
          });
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <div className={styles.contentContainer}>
      <header>
        <h2>Account Information</h2>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className={styles.goBackLink}
        >
          ← Go back
        </a>
      </header>

      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormData(values);
          setIsModalOpen(true);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="firstname">First Name</label>
              <FormikField
                name="firstname"
                placeholder="First Name"
                className={styles.input_field}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="lastname">Last Name</label>
              <FormikField
                name="lastname"
                placeholder="Last Name"
                className={styles.input_field}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="email">Email</label>
              <FormikField
                name="email"
                type="email"
                placeholder="Email"
                className={styles.input_field}
              />
            </div>
            <Button type="submit" small={true}>
              Update Info
            </Button>
          </Form>
        )}
      </Formik>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to update account information?"
        onConfirm={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserInfo;
