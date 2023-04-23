import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Label, TextInput, Button, Spinner } from "flowbite-react";
import { fetchDevelopers, fetchTask, updateTask } from "../../utils/api";
import { useAlert } from "../../contexts/alert-context";
import { useAuth } from "../../contexts/auth-context";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  storyPoints: Yup.number()
    .required("Story Points are required")
    .min(0.5, "Story Points must be at least 0.5")
    .integer("Story Points must be an integer"),
  status: Yup.string().required("Status is required"),
  developerId: Yup.number().required("Assigned to is required"),
});

function TaskUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskLoaded, setIsTaskLoaded] = useState(false);
  const [isFetchingDevelopersLoading, setIsFetchingDevelopersLoading] =
    useState(true);
  const { id } = useParams();
  const [developers, setDevelopers] = useState([]);
  const [task, setTask] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const updatedTask = await updateTask(id, auth.token, values);
      console.log(updatedTask);

      showAlert("success", "Update successful!");

      setIsLoading(false);
    } catch (error) {
      showAlert(
        "failure",
        "Updating the task failed. Server responded with the following error: " +
          getErrorMessage(error.response.data)
      );
    }
  };

  useEffect(() => {
    async function getTask() {
      setIsLoading(true);
      try {
        const fetchedTask = await fetchTask(id, auth.token);
        console.log(fetchedTask);
        setTask(fetchedTask);
        setIsTaskLoaded(true);
        setIsLoading(false);
      } catch (error) {
        showAlert(
          "failure",
          "Fetching Task failed. Server responded with the following error: " +
            getErrorMessage(error.response.data)
        );
      }
    }
    getTask();
  }, []);

  useEffect(() => {
    async function getDevelopers() {
      if (!isTaskLoaded) return;
      setIsFetchingDevelopersLoading(true);
      try {
        const fetchedDevelopers = await fetchDevelopers(auth.token);
        setDevelopers(fetchedDevelopers);
        setIsFetchingDevelopersLoading(false);
      } catch (error) {
        showAlert(
          "failure",
          "Fetching Developers failed. Server responded with the following error: " +
            getErrorMessage(error.response.data)
        );
      }
    }
    getDevelopers();
  }, [isTaskLoaded]);

  const assignedDeveloper = developers.find(
    (developer) => developer.id === task.developerId
  );

  return !isFetchingDevelopersLoading ? (
    <Formik
      initialValues={{
        title: task.title,
        description: task.description,
        storyPoints: task.storyPoints,
        status: task.status,
        developerId: assignedDeveloper ? assignedDeveloper.id : "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched, getFieldProps, isValid, dirty }) => (
        <>
          <div className="w-full flex flex-col justify-start items-start">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center mb-4 p-2 text-xs font-semibold leading-4 text-blue-600 transition-colors duration-150 bg-transparent rounded-md hover:bg-blue-100 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <Form className="flex flex-col gap-8 w-[400px]">
              <div>
                <Label
                  htmlFor="title"
                  color={errors.title && touched.title ? "failure" : undefined}
                  value="Title"
                />
                <TextInput
                  {...getFieldProps("title")}
                  id="title"
                  type="text"
                  required
                  shadow
                  color={errors.title && touched.title ? "failure" : undefined}
                  helperText={
                    errors.title &&
                    touched.title && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span>{" "}
                        {errors.title}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="developerId"
                  color={
                    errors.developerId && touched.developerId
                      ? "failure"
                      : undefined
                  }
                  value="Assigned to"
                />
                <Field
                  as="select"
                  id="developerId"
                  name="developerId"
                  required
                  shadow
                  className={`${
                    errors.developerId && touched.developerId
                      ? "border-failure dark:border-failure"
                      : "border-primary dark:border-primary"
                  } block w-full rounded-md py-2 px-4 focus:outline-none focus:border-primary dark:focus:border-primary`}
                >
                  <option value="">Select a developer</option>
                  {developers.map((developer) => (
                    <option key={developer.id} value={developer.id}>
                      {developer.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="developerId"
                  render={(msg) => (
                    <div className="text-failure dark:text-failure mt-1 text-sm">
                      <span className="font-medium">Oops!</span> {msg}
                    </div>
                  )}
                />
              </div>

              <div>
                <Label
                  htmlFor="description"
                  color={
                    errors.description && touched.description
                      ? "failure"
                      : undefined
                  }
                  value="Description"
                />
                <Field
                  as="textarea"
                  {...getFieldProps("description")}
                  id="description"
                  placeholder="Enter task description"
                  required
                  shadow
                  className={`${
                    errors.description && touched.description
                      ? "border-failure dark:border-failure"
                      : "border-primary dark:border-primary"
                  } block w-full h-32 rounded-md py-2 px-4 focus:outline-none focus:border-primary dark:focus:border-primary`}
                />
                <ErrorMessage
                  name="description"
                  render={(msg) => (
                    <div className="text-failure dark:text-failure mt-1 text-sm">
                      <span className="font-medium">Oops!</span> {msg}
                    </div>
                  )}
                />
              </div>
              <div>
                <Label
                  htmlFor="storyPoints"
                  color={
                    errors.storyPoints && touched.storyPoints
                      ? "failure"
                      : undefined
                  }
                  value="Story Points"
                />
                <TextInput
                  {...getFieldProps("storyPoints")}
                  id="storyPoints"
                  type="number"
                  required
                  shadow
                  color={
                    errors.storyPoints && touched.storyPoints
                      ? "failure"
                      : undefined
                  }
                  helperText={
                    errors.storyPoints &&
                    touched.storyPoints && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span>{" "}
                        {errors.storyPoints}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="status"
                  color={
                    errors.status && touched.status ? "failure" : undefined
                  }
                  value="Status"
                />
                <Field
                  as="select"
                  id="status"
                  name="status"
                  required
                  shadow
                  className={`${
                    errors.status && touched.status
                      ? "border-failure dark:border-failure"
                      : "border-primary dark:border-primary"
                  } block w-full rounded-md py-2 px-4 focus:outline-none focus:border-primary dark:focus:border-primary`}
                >
                  <option value="">Select status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Field>
                <ErrorMessage
                  name="status"
                  render={(msg) => (
                    <div className="text-failure dark:text-failure mt-1 text-sm">
                      <span className="font-medium">Oops!</span> {msg}
                    </div>
                  )}
                />
              </div>
              <Button type="submit" disabled={!isValid || !dirty || isLoading}>
                {isLoading ? (
                  <Spinner color="purple" aria-label="Purple spinner example" />
                ) : (
                  "Update Task"
                )}
              </Button>
            </Form>
          </div>
        </>
      )}
    </Formik>
  ) : (
    <div className="flex justify-center items-center">
      <Spinner aria-label="Loading spinner" />
    </div>
  );
}

export default TaskUpdate;
