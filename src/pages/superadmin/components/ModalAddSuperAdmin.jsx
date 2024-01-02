import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../../assets/styles/loader.css";

Modal.setAppElement("#root"); // Set the root element for React Modal

const server_url = import.meta.env.VITE_SERVER_LINK;

const ModalAddSuperAdmin = ({ isOpen, closeModal, fetchSuperAdmins }) => {
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
      gender: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
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
      className="Modal max-w-md mx-auto mt-10 p-4 bg-white rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Super Admin</h2>
        <button
          className="text-gray-500"
          disabled={isSubmitting}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Form Fields */}
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
            <div className="text-red-500 text-sm">{formik.errors.lastname}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            E-mail Address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
            className="mt-1 p-2 w-full border rounded-md"
            disabled={isSubmitting}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-600"
          >
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            {...formik.getFieldProps("gender")}
            className="mt-1 p-2 w-full border rounded-md"
            disabled={isSubmitting}
          />
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-sm">{formik.errors.gender}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...formik.getFieldProps("password")}
            className="mt-1 p-2 w-full border rounded-md"
            disabled={isSubmitting}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
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
    </Modal>
  );
};

export default ModalAddSuperAdmin;
