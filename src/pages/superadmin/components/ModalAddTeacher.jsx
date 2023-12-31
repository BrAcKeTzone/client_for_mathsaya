import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../../assets/styles/loader.css";

Modal.setAppElement("#root");

const server_url = import.meta.env.VITE_SERVER_LINK;

const genderOptions = ["Male", "Female", "Non-binary"];

const ModalAddTeacher = ({ isOpen, closeModal, fetchSuperAdmins }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClearForm = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
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
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${server_url}/superadmin/add-superadmin`,
          values
        );
        console.log("Super Admin added successfully:", response.data);
        closeModal();
        resetForm();
        fetchSuperAdmins();
      } catch (error) {
        console.error("Error adding Super Admin:", error);
        if (error.response && error.response.status === 400) {
          alert("Email already exists. Please use a different email.");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isSubmitting ? null : closeModal}
      contentLabel="Add Super Admin Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Teacher</h2>
        <button
          className="text-gray-500 hover:text-red-500"
          disabled={isSubmitting}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <form onSubmit={formik.handleSubmit}>
          {/* Form Fields */}
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
                className="mt-1 p-2 w-full border rounded-md"
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
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="text-red-500 text-sm">
                  {formik.errors.lastname}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mx-2">
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
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mx-2">
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
                className="mt-1 p-2 w-full border rounded-md"
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
                className="mt-1 p-2 w-full border rounded-md"
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
                className="mt-1 p-2 w-full border rounded-md"
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

          <div className="flex justify-end w-full mb-2 pr-2">
            <button
              type="button"
              className="bg-red-500 text-white p-2 mx-1 rounded-md hover:bg-red-400"
              disabled={isSubmitting}
              onClick={handleClearForm}
            >
              CLEAR
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mx-1 rounded-md hover:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="please_wait"></span> : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalAddTeacher;
