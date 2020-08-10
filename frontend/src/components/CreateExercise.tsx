import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { getUsers, createExercise, ExerciseData } from "../axios/apis";
import { RouteComponentProps } from "react-router";
import Styles from "./styles.module.css";

interface MatchParams {
  id: string;
}

interface ComponentProps extends RouteComponentProps<MatchParams> {}

const ExerciseSchema = Yup.object().shape({
  userName: Yup.string().required("username is required"),
  description: Yup.string()
    .min(3, "Description must be 3 characters at minimum")
    .required("Description is required"),
  duration: Yup.number().required("duration is required"),
  date: Yup.string().required("Date is required"),
});

const CreateExercise: React.FC<ComponentProps> = (props: ComponentProps) => {
  const [users, setUsers] = useState<any>([]);
  let initialValues: ExerciseData = {
    userName: users[0],
    description: "",
    duration: 0,
    date: new Date(),
  };
  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.map((user: any) => user.userName));
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSubmit = async (
    values: ExerciseData,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    await createExercise(values);
    setSubmitting(false);
    props.history.push("/");
  };
  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-12 offset-0 col-md-6 offset-md-3  text-center">
          <h1 className="mt-5">Exercise Form</h1>
          <div className={Styles.border}></div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-12 offset-0 col-md-6 offset-md-3 mb-5 "
          style={{
            backgroundColor: "#E8E8E8",
            padding: "3%",
            marginBottom: "5%",
          }}
        >
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={ExerciseSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              handleSubmit(values, setSubmitting);
              setSubmitting(true);
            }}
          >
            {({
              touched,
              errors,
              values,
              isSubmitting,
              setFieldValue,
              handleBlur,
            }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="username">username</label>
                  <span className="text-danger">*</span>
                  <Field
                    as="select"
                    name="userName"
                    placeholder="Select username"
                    className={`form-control ${
                      touched.userName && errors.userName
                        ? "is-invalid"
                        : touched.userName && !errors.userName
                        ? "is-valid"
                        : ""
                    }`}
                  >
                    {users.map((user: string, i: number) => (
                      <option key={i} value={user}>
                        {user}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="div"
                    name="userName"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Description</label>
                  <span className="text-danger">*</span>
                  <Field
                    type="text"
                    name="description"
                    placeholder="Enter description..."
                    className={`form-control ${
                      touched.description && errors.description
                        ? "is-invalid"
                        : touched.description && !errors.description
                        ? "is-valid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="description"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <span className="text-danger">*</span>
                  <Field
                    type="number"
                    name="duration"
                    min="0"
                    placeholder="Enter duration in minutes..."
                    onChange={(e: any) => {
                      console.log(e.currentTarget.value);
                      setFieldValue(
                        "duration",
                        Math.abs(e.currentTarget.value)
                      );
                    }}
                    className={`form-control ${
                      touched.duration && errors.duration
                        ? "is-invalid"
                        : touched.duration && !errors.duration
                        ? "is-valid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="duration"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <span className="text-danger">*</span>
                  <DatePicker
                    name="date"
                    selected={(values.date && new Date(values.date)) || null}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="Choose date..."
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    onChange={(val) => {
                      setFieldValue("date", val);
                    }}
                    onBlur={(val) => handleBlur(val)}
                    dateFormat="dd-MM-yyyy"
                    minDate={new Date()}
                    className={`form-control mb-3 ${
                      touched.date && errors.date
                        ? "is-invalid"
                        : touched.date && !errors.date
                        ? "is-valid"
                        : ""
                    }`}
                    wrapperClassName="d-block"
                  />
                  <ErrorMessage
                    component="div"
                    name="date"
                    className="invalid-feedback"
                  />
                </div>
                <div style={{ marginLeft: "40%" }}>
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateExercise;
