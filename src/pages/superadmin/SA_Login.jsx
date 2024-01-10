import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { RiAdminFill } from "react-icons/ri";
import { preventRightClick } from "../../components/preventRightClick";
import "../../assets/styles/loader.css";
import "../../assets/styles/BubbleGumSans.css";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_Login() {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().required("E-mail address is required."),
    password: Yup.string().required("Password is required."),
  });

  useEffect(() => {
    const superadmin = Cookies.get("spr");
    if (superadmin) {
      Navigate("/super-dash");
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
          `${server_url}/superadmin/login`,
          values
        );
        if (response.data.user.superAdminId) {
          Cookies.set(
            "spr",
            JSON.stringify({ id: response.data.user.superAdminId })
          );
          Navigate("/super-dash");
        } else {
          setLoginError("Account doesn't exist!");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Invalid Account!");
          setLoginError("Account doesn't exist!");
        } else {
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
        className="h-screen bg-green-500 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <>
            <div className="rounded bg-green-400 shadow-lg shadow-black p-8 md:w-2/3 lg:w-1/3">
              <div className="rounded bg-green-300 p-8">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-center text-3xl font-bold ">
                    SECURE ACCESS
                  </h2>
                  <RiAdminFill className="text-white text-10xl" />
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
                    className="bg-green-500 p-2 rounded w-full hover:text-white hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="please_wait"></span>
                    ) : (
                      "Sign-in"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SA_Login;
