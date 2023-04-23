import React, { useState, useEffect } from "react";
import { Label, TextInput, Button, Spinner } from "flowbite-react";
import { useAlert } from "../contexts/alert-context";
import { useAuth } from "../contexts/auth-context";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Formik, Form } from "formik";
import { updateDeveloperById } from "../utils/api";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
  role: Yup.string().required("Role is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  city: Yup.string().required("City is required"),
  company: Yup.string().required("Company is required"),
  isExtern: Yup.boolean(),
});

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeveloperLoaded, setIsDeveloperLoaded] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (auth.developer) {
      setIsDeveloperLoaded(true);
    }
  }, [auth.developer]);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const updatedDeveloper = await updateDeveloperById(
        auth.developer.id,
        auth.token,
        values
      );

      showAlert("success", "Update successful!");
      auth.updateDeveloper(updatedDeveloper);
      setIsLoading(false);
    } catch (error) {
      showAlert(
        "failure",
        "Updating the developer failed. Server responded with the following error: " +
          getErrorMessage(error.response.data)
      );
    }
  };

  const developer = auth.developer;

  return isDeveloperLoaded ? (
    <Formik
      initialValues={{
        name: developer.name,
        password: "",
        password_confirmation: "",
        role: developer.role,
        phone: developer.phone,
        email: developer.email,
        city: developer.city,
        company: developer.company,
        isExtern: developer.isExtern,
        agree: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched, getFieldProps, isValid, dirty }) => (
        <>
          <div className="w-full flex flex-col items-start">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center mb-4 p-2 text-xs font-semibold leading-4 text-blue-600 transition-colors duration-150 bg-transparent rounded-md
              hover:bg-blue-100 hover:text-blue-700"
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
            <h2 className="mb-4 text-xl font-semibold">
              Modify Your Information
            </h2>
            <Form className="flex flex-col gap-8 w-[400px]">
              <div>
                <Label
                  htmlFor="name"
                  color={errors.name && touched.name ? "failure" : undefined}
                  value="Name"
                />
                <TextInput
                  {...getFieldProps("name")}
                  id="name"
                  type="text"
                  required
                  shadow
                  color={errors.name && touched.name ? "failure" : undefined}
                  helperText={
                    errors.name &&
                    touched.name && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span> {errors.name}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  color={
                    errors.password && touched.password ? "failure" : undefined
                  }
                  value="Password"
                />
                <TextInput
                  {...getFieldProps("password")}
                  id="password"
                  type="password"
                  required
                  shadow
                  color={
                    errors.password && touched.password ? "failure" : undefined
                  }
                  helperText={
                    errors.password &&
                    touched.password && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span>{" "}
                        {errors.password}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="password_confirmation"
                  color={
                    errors.password_confirmation &&
                    touched.password_confirmation
                      ? "failure"
                      : undefined
                  }
                  value="Repeat Password"
                />
                <TextInput
                  {...getFieldProps("password_confirmation")}
                  id="password_confirmation"
                  type="password"
                  required
                  shadow
                  color={
                    errors.password_confirmation &&
                    touched.password_confirmation
                      ? "failure"
                      : undefined
                  }
                  helperText={
                    errors.password_confirmation &&
                    touched.password_confirmation && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span>{" "}
                        {errors.password_confirmation}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="role"
                  color={errors.role && touched.role ? "failure" : undefined}
                  value="Role"
                />
                <TextInput
                  {...getFieldProps("role")}
                  id="role"
                  type="text"
                  required
                  shadow
                  color={errors.role && touched.role ? "failure" : undefined}
                  helperText={
                    errors.role &&
                    touched.role && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span> {errors.role}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  color={errors.phone && touched.phone ? "failure" : undefined}
                  value="Phone"
                />
                <TextInput
                  {...getFieldProps("phone")}
                  id="phone"
                  type="text"
                  required
                  shadow
                  color={errors.phone && touched.phone ? "failure" : undefined}
                  helperText={
                    errors.phone &&
                    touched.phone && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span>{" "}
                        {errors.phone}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  color={errors.email && touched.email ? "failure" : undefined}
                  value="Email"
                />
                <TextInput
                  {...getFieldProps("email")}
                  id="email"
                  type="email"
                  required
                  shadow
                  color={errors.email && touched.email ? "failure" : undefined}
                  helperText={
                    errors.email &&
                    touched.email && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span>{" "}
                        {errors.email}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="city"
                  color={errors.city && touched.city ? "failure" : undefined}
                  value="City"
                />
                <TextInput
                  {...getFieldProps("city")}
                  id="city"
                  type="text"
                  required
                  shadow
                  color={errors.city && touched.city ? "failure" : undefined}
                  helperText={
                    errors.city &&
                    touched.city && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span> {errors.city}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="company"
                  color={
                    errors.company && touched.company ? "failure" : undefined
                  }
                  value="Company"
                />
                <TextInput
                  {...getFieldProps("company")}
                  id="company"
                  type="text"
                  required
                  shadow
                  color={
                    errors.company && touched.company ? "failure" : undefined
                  }
                  helperText={
                    errors.company &&
                    touched.company && (
                      <React.Fragment>
                        <span className="font-medium">Oops!</span>{" "}
                        {errors.company}
                      </React.Fragment>
                    )
                  }
                />
              </div>
              <Button type="submit" disabled={!isValid || !dirty || isLoading}>
                {isLoading ? (
                  <Spinner color="purple" aria-label="Purple spinner example" />
                ) : (
                  "Update Your Info"
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

export default Profile;
