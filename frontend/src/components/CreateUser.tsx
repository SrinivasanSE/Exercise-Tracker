import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser, UserData } from "../axios/apis";
import { RouteComponentProps } from "react-router";
import Styles from "./styles.module.css";
interface MatchParams {
  id: string;
}

interface ComponentProps extends RouteComponentProps<MatchParams> {}

const UserSchema = Yup.object().shape({
  userName: Yup.string().required("username is required"),
});

const CreateUser: React.FC<ComponentProps> = (props: ComponentProps) => {
  const initialValues: UserData = {
    userName: "",
  };
  const handleSubmit = async (
    values: UserData,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    await createUser(values);
    setSubmitting(false);
    props.history.push("/");
  };
  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-12 offset-0 col-md-6 offset-md-3  text-center">
          <h1 className={`mt-5 ${Styles.border}`}>User Form</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 offset-0 col-md-6 offset-md-3 ">
          <Formik
            initialValues={initialValues}
            validationSchema={UserSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              handleSubmit(values, setSubmitting);
              setSubmitting(true);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="userName">Username</label>
                  <span className="text-danger">*</span>
                  <Field
                    type="text"
                    name="userName"
                    placeholder="Enter userName..."
                    className={`form-control ${
                      touched.userName && errors.userName
                        ? "is-invalid"
                        : touched.userName && !errors.userName
                        ? "is-valid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="userName"
                    className="invalid-feedback"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
