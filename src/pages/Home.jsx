import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import Logo from "../assets/images/logo.png";

const server_url = import.meta.env.VITE_SERVER_LINK;

const SignIn = () => {
  let usr = Cookies.get("SESSION_ID");

  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (usr) {
      Navigate("/dash");
    } else {
      setIsLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(`${server_url}/auth/login`, values);
        if (response.data.user.userId) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          Cookies.set(
            "SESSION_ID",
            JSON.stringify({ id: response.data.user.userId }),
            {
              expires: expirationDate,
            }
          );
          Navigate("/dash");
        } else {
          setLoginError("Your account doesn't exist!");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setLoginError("Your account doesn't exist!");
        } else {
          alert("Email or Password is incorrect!");
          console.error("Error:", error);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading ? (
        <div className="fullLoader"></div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} className="size-20 m-2" />
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Sign In
            </h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {loginError && <div className="text-red-600">{loginError}</div>}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Email"
                className={`w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                disabled={isSubmitting}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type={formik.values.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Password"
                  className={`w-full px-3 py-2 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:ring focus:border-blue-300`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  onClick={() =>
                    formik.setFieldValue(
                      "showPassword",
                      !formik.values.showPassword
                    )
                  }
                >
                  {formik.values.showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 12l2-2m0 0l6-6 6 6m-6-6L6 12m6 6l6-6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 15v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h9a2 2 0 012 2v1"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="please_wait"></span>
                ) : (
                  "Sign-in"
                )}{" "}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-blue-500 px-2 hover:text-white hover:bg-blue-500"
                onClick={() => Navigate("/reset")}
              >
                Forgot Password?
              </button>
              <button
                type="button"
                className="text-blue-500 px-2 hover:text-white hover:bg-blue-500"
                onClick={() => Navigate("/signup")}
              >
                Create Account?
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
