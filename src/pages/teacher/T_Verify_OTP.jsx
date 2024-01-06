import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../assets/styles/loader.css";
import { FaUserGraduate } from "react-icons/fa6";
import { preventRightClick } from "../../components/preventRightClick";
import Navbar from "./components/Navbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

const genderOptions = ["Male", "Female", "Non-binary"];

function T_Verify_OTP() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClearForm = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: sessionStorage.getItem("signupEmail") || "", // Initial value from sessionStorage
      password: "",
      confirmPassword: "",
      gender: "",
      otp: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      gender: Yup.string().required("Required"),
      otp: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${server_url}/teachers/verify-otp`,
          values
        );
        console.log("OTP verification successful:", response.data);
        alert("Account created successfully");
      } catch (error) {
        console.error("Error verifying OTP:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      {" "}
      <Navbar />
      <div
        className="h-screen bg-blue-500 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        <div className="rounded bg-blue-400 shadow-lg shadow-black p-8 md:w-2/3 lg:w-1/3">
          <div className="rounded bg-blue-300 p-8">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-center text-3xl font-bold">VERIFY OTP</h2>
              <FaUserGraduate className="text-white text-9xl" />
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
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
                    disabled={true}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
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
                    <option value="" label="Select a gender" />
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
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
                    disabled={isSubmitting}
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.otp}
                    </div>
                  )}
                </div>
                <div className="flex justify-end items-center w-full">
                  <button
                    type="button"
                    className="bg-red-500 hover:text-white p-2 rounded w-full hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    disabled={isSubmitting}
                    onClick={handleClearForm}
                  >
                    CLEAR
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded w-full hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="please_wait"></span>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                </div>
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

export default T_Verify_OTP;
