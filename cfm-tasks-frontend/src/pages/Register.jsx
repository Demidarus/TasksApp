import React, { useState } from "react";
import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/auth-context";
import { useAlert } from "../contexts/alert-context";
import { getErrorMessage } from "../utils/getErrorMessage";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

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
  agree: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showAlert } = useAlert();

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, values);
      login(response.data.token, response.data.developer); // Call the login method with the received token
      showAlert("success", "Registration successful!");
    } catch (error) {
      showAlert(
        "failure",
        "Registration failed. Server responded with the following error: " +
          getErrorMessage(error.response.data)
      );
    }

    setIsLoading(false);
  };
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        password_confirmation: "",
        role: "",
        phone: "",
        email: "",
        city: "",
        company: "",
        isExtern: false,
        agree: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched, getFieldProps, isValid, dirty }) => (
        <>
          <Form className="flex flex-col gap-8">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-4 w-[300px]">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="name"
                      color={
                        errors.name && touched.name ? "failure" : undefined
                      }
                      value="Your name"
                    />
                  </div>
                  <TextInput
                    {...getFieldProps("name")}
                    id="name"
                    placeholder="Name"
                    type="text"
                    required
                    shadow
                    color={errors.name && touched.name ? "failure" : undefined}
                    helperText={
                      errors.name &&
                      touched.name && (
                        <React.Fragment>
                          <span className="font-medium">Oops!</span>{" "}
                          {errors.name}
                        </React.Fragment>
                      )
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="password"
                      color={
                        errors.password && touched.password
                          ? "failure"
                          : undefined
                      }
                      value="Your password"
                    />
                  </div>
                  <TextInput
                    {...getFieldProps("password")}
                    id="password"
                    type="password"
                    required
                    shadow
                    color={
                      errors.password && touched.password
                        ? "failure"
                        : undefined
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
                  <div className="mb-2 block">
                    <Label
                      htmlFor="role"
                      color={
                        errors.role && touched.role ? "failure" : undefined
                      }
                      value="Your Role"
                    />
                  </div>
                  <TextInput
                    {...getFieldProps("role")}
                    id="role"
                    placeholder="Fullstack Developer"
                    type="role"
                    required
                    shadow
                    color={errors.role && touched.role ? "failure" : undefined}
                    helperText={
                      errors.role &&
                      touched.role && (
                        <React.Fragment>
                          <span className="font-medium">Oops!</span>{" "}
                          {errors.role}
                        </React.Fragment>
                      )
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="phone"
                      color={
                        errors.phone && touched.phone ? "failure" : undefined
                      }
                      value="Your phone"
                    />
                  </div>
                  <TextInput
                    {...getFieldProps("phone")}
                    id="phone"
                    placeholder="12345123"
                    type="text"
                    required
                    shadow
                    color={
                      errors.phone && touched.phone ? "failure" : undefined
                    }
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
              </div>
              <div className="flex flex-col gap-4 w-[300px]">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      color={
                        errors.email && touched.email ? "failure" : undefined
                      }
                      value="Your email"
                    />
                  </div>
                  <TextInput
                    {...getFieldProps("email")}
                    id="email"
                    placeholder="name@test.de"
                    type="email"
                    required
                    shadow
                    color={
                      errors.email && touched.email ? "failure" : undefined
                    }
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
                  <div className="mb-2 block">
                    <Label
                      htmlFor="repeat-password"
                      color={
                        errors.password_confirmation &&
                        touched.password_confirmation
                          ? "failure"
                          : undefined
                      }
                      value="Repeat password"
                    />
                  </div>
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
                  <div className="mb-2 block">
                    <Label
                      htmlFor="city"
                      color={
                        errors.city && touched.city ? "failure" : undefined
                      }
                      value="Your city"
                    />
                  </div>
                  <TextInput
                    {...getFieldProps("city")}
                    id="city"
                    placeholder="Darmstadt"
                    type="text"
                    required
                    shadow
                    color={errors.city && touched.city ? "failure" : undefined}
                    helperText={
                      errors.city &&
                      touched.city && (
                        <React.Fragment>
                          <span className="font-medium">Oops!</span>{" "}
                          {errors.city}
                        </React.Fragment>
                      )
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="company"
                      color={
                        errors.company && touched.company
                          ? "failure"
                          : undefined
                      }
                      value="Your company"
                    />
                  </div>
                  <TextInput
                    {...getFieldProps("company")}
                    id="company"
                    placeholder="Google"
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
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Field as={Checkbox} id="isExtern" name="isExtern" />
              <Label htmlFor="isExtern">Are you an extern?</Label>
            </div>

            <div className="flex items-center gap-2">
              <Field as={Checkbox} id="agree" name="agree" />
              <Label htmlFor="agree">
                I agree with the{" "}
                <a
                  href="/forms"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </Label>
              <ErrorMessage name="agree" />
            </div>
            <Button type="submit" disabled={!isValid || !dirty || isLoading}>
              {isLoading ? (
                <Spinner color="purple" aria-label="Purple spinner example" />
              ) : (
                "Register new account"
              )}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default Register;
