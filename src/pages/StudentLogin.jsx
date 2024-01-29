import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import Logo from "../assets/images/logo.png";

const server_url = import.meta.env.VITE_SERVER_LINK;

const StudentLogin = () => {
  let usr = Cookies.get("STUDENT_SESSION");

  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (usr) {
      Navigate("/game");
    } else {
      setIsLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${server_url}/sprofile/login`,
          values
        );

        if (response.data.profile.profileId) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          Cookies.set(
            "STUDENT_SESSION",
            JSON.stringify({ id: response.data.profile.studentId }),
            {
              expires: expirationDate,
            }
          );
          Navigate("/game");
        } else {
          setLoginError("Your account doesn't exist!");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setLoginError("Your account doesn't exist!");
        } else {
          alert("Username is incorrect!");
          console.error("Error:", error);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const switchToHome = () => {
    alert("Switching to Teacher Mode!");
    Navigate("/");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isLoading ? "bg-gray-100" : "bg-blue-500"
      } relative`}
    >
      {isLoading ? (
        <div className="fullLoader"></div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} className="size-20 m-2 animated-logo" />
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Student Sign In
            </h2>
          </div>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              switchToHome();
            }}
          >
            Switch to Teacher
          </button>
          <form onSubmit={formik.handleSubmit}>
            {loginError && <div className="text-red-600">{loginError}</div>}
            <div className="mb-4">
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                placeholder="Lastname"
                className={`w-full px-3 py-2 border ${
                  formik.touched.lastname && formik.errors.lastname
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                disabled={isSubmitting}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.lastname}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                placeholder="firstname"
                className={`w-full px-3 py-2 border ${
                  formik.touched.firstname && formik.errors.firstname
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                disabled={isSubmitting}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.firstname}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="Username"
                className={`w-full px-3 py-2 border ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                disabled={isSubmitting}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="please_wait"></span> : "Play"}{" "}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
