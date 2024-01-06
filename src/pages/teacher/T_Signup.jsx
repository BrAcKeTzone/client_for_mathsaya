import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa6";
import { preventRightClick } from "../../components/preventRightClick";
import "../../assets/styles/loader.css";
import "../../assets/styles/BubbleGumSans.css";
import Navbar from "./components/Navbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_Signup() {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().required("E-mail address is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${server_url}/teachers/signup`,
          values
        );
        console.log("E-mail response:", response.data);
        alert("An OTP was sent to your e-mail!");
        sessionStorage.setItem("signupEmail", values.email);
        Navigate("/teach-verifyOTP");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  return (
    <>
      <Navbar />
      <div
        className="h-screen bg-blue-500 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        <div className="rounded bg-blue-400 shadow-lg shadow-black p-8 md:w-2/3 lg:w-1/3">
          <div className="rounded bg-blue-300 p-8">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-center text-3xl font-bold">
                START SHAPING MINDS TODAY
              </h2>
              <FaUserGraduate className="text-white text-9xl" />
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="my-4">
                {loginError && <div className="text-red-600">{loginError}</div>}
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded w-full hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="please_wait"></span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
            <p className="py-1">
              Already have an account?{" "}
              <Link to="/teach-login" className="text-blue-700 hover:font-bold">
                Click here...
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default T_Signup;
