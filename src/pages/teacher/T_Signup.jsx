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

const genderOptions = ["Male", "Female", "Non-binary"];

function T_Signup() {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().required("E-mail address is required."),
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    schoolName: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      gender: "",
      schoolName: "",
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
        Navigate("/teach-verifyOTP", {
          state: {
            firstname: values.firstname,
            lastname: values.lastname,
            gender: values.gender,
            email: values.email,
            schoolName: values.schoolName,
          },
        });
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
        <div className="rounded bg-blue-400 shadow-lg shadow-black p-8 md:w-2/3 lg:w-1/2 max-h-full overflow-y-auto">
          <div className="rounded bg-blue-300 p-8">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-center text-3xl font-bold">
                START SHAPING MINDS TODAY
              </h2>
              <FaUserGraduate className="text-white text-9xl" />
            </div>
            <form onSubmit={formik.handleSubmit}>
              {loginError && <div className="text-red-600">{loginError}</div>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-2">
                <div className="mb-4">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    {...formik.getFieldProps("firstname")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                    disabled={isSubmitting}
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstname}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    {...formik.getFieldProps("lastname")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                    disabled={isSubmitting}
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lastname}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    {...formik.getFieldProps("gender")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                    disabled={isSubmitting}
                  >
                    <option value="" label="Select" />
                    {genderOptions.map((option) => (
                      <option key={option} value={option} label={option} />
                    ))}
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.gender}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    E-mail Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-600"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    {...formik.getFieldProps("otp")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                    disabled={true}
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.otp}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    {...formik.getFieldProps("password")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                    disabled={true}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                    disabled={true}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mx-2">
                <div className="mb-4">
                  <label
                    htmlFor="schoolName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    School Name
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    {...formik.getFieldProps("schoolName")}
                    className="w-full p-2 border-2 rounded hover:border-black hover:shadow-lg transition duration-300 ease-in-out transform"
                    disabled={isSubmitting}
                  />
                  {formik.touched.schoolName && formik.errors.schoolName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.schoolName}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mx-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded w-full hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="please_wait"></span>
                  ) : (
                    "SEND OTP"
                  )}
                </button>
              </div>
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
