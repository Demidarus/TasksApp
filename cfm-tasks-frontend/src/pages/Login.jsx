import React, { useState } from "react";
import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/auth-context";
import { useAlert } from "../contexts/alert-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showAlert } = useAlert();

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, values);
      login(response.data.token, response.data.developer);
      navigate("/"); // Redirect to the Home page
    } catch (error) {
      console.log("error", error);
      showAlert("failure", "Wrong Credentials");
    }

    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched, getFieldProps, isValid, dirty }) => (
        <>
          <Form className="flex flex-col gap-4 w-[300px]">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  color={errors.email && touched.email ? "failure" : undefined}
                  value="Your email"
                />
              </div>
              <TextInput
                {...getFieldProps("email")}
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
                shadow
                color={errors.email && touched.email ? "failure" : undefined}
                helperText={
                  errors.email &&
                  touched.email && (
                    <React.Fragment>
                      <span className="font-medium">Oops!</span> {errors.email}
                    </React.Fragment>
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  color={
                    errors.password && touched.password ? "failure" : undefined
                  }
                  value="Your password"
                />
              </div>
              <TextInput
                {...getFieldProps("password")}
                id="password1"
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
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || !dirty || isLoading}
            >
              {isLoading ? (
                <Spinner
                  color="light"
                  size="sm"
                  className="animate-spin mx-auto"
                />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default Login;
