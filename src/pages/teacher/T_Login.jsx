import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUnlockAlt } from "react-icons/fa";
import { preventRightClick } from "../../components/preventRightClick";
import "../../assets/styles/loader.css";
import "../../assets/styles/AllFonts.css";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_Login() {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().required("E-mail address is required."),
    password: Yup.string().required("Password is required."),
  });

  useEffect(() => {
    const teacher = Cookies.get("tchr");
    if (teacher) {
      Navigate("/teach-dash");
    } else {
      setIsLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${server_url}/teachers/login`,
          values
        );
        if (response.data.user.teacherId) {
          Cookies.set(
            "tchr",
            JSON.stringify({ id: response.data.user.teacherId })
          );
          Navigate("/teach-dash");
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
    <>
      <div
        className="h-screen bg-gradient-to-br from-teal-200 via-blue-200 to-indigo-700 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <>
            <div className="rounded bg-blue-400 shadow-lg p-8 md:w-2/3 lg:w-1/3">
              <div className="rounded bg-blue-300 p-8">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-center text-3xl font-bold text-white">
                    UNLOCK YOUR CLASSROOM
                  </h1>
                  <FaUnlockAlt className="text-white text-8xl" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="my-4">
                    {loginError && (
                      <div className="text-red-600">{loginError}</div>
                    )}
                    <input
                      type="email"
                      {...formik.getFieldProps("email")}
                      className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                      placeholder="Email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-600">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="my-4">
                    {loginError && (
                      <div className="text-red-600">{loginError}</div>
                    )}
                    <input
                      type="password"
                      {...formik.getFieldProps("password")}
                      className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                      placeholder="Password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-600">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded w-full hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="please_wait"></span>
                    ) : (
                      "Sign-in"
                    )}
                  </button>
                </form>
                <div className="flex justify-center">
                  <p className="pb-1 text-white">
                    <Link to="/" className="text-cyan-700 hover:font-bold">
                      Forgot password?
                    </Link>
                  </p>
                </div>
                <p className="py-1 text-white">
                  Don't have an account?{" "}
                  <Link
                    to="/teach-signup"
                    className="text-cyan-700 hover:font-bold"
                  >
                    Click here...
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default T_Login;
