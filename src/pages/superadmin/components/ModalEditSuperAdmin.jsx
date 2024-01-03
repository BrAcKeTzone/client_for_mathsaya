import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../../assets/styles/loader.css";

Modal.setAppElement("#root");

const server_url = import.meta.env.VITE_SERVER_LINK;

const genderOptions = ["Male", "Female", "Non-binary"];

const ModalEditSuperAdmin = ({
  isOpen,
  closeModal,
  fetchSuperAdmins,
  superAdminId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [superAdminData, setSuperAdminData] = useState(null);

  const fetchSuperAdminData = async () => {
    try {
      const response = await axios.get(
        `${server_url}/superadmin/view/${superAdminId}`
      );
      setSuperAdminData(response.data);
    } catch (error) {
      console.error("Error fetching Super Admin data:", error);
    }
  };

  useEffect(() => {
    if (isOpen && superAdminId) {
      fetchSuperAdminData();
    }
  }, [isOpen, superAdminId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: superAdminData?.firstname || "",
      lastname: superAdminData?.lastname || "",
      email: superAdminData?.email || "",
      currentPassword: "",
      newPassword: "",
      gender: superAdminData?.gender || "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.put(
          `${server_url}/superadmin/edit-superadmin/${superAdminId}`,
          values
        );
        console.log("Super Admin edited successfully:", response.data);
        closeModal();
        fetchSuperAdmins();
      } catch (error) {
        console.error("Error editing Super Admin:", error);
        if (error.response && error.response.status === 400) {
          alert("Email already exists. Please use a different email.");
        }
        if (error.response && error.response.status === 401) {
          alert("Password is incorrect.");
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
      contentLabel="Edit Super Admin Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      {console.log(superAdminData)}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Super Admin</h2>
        <button
          className="text-gray-500 hover:text-red-500"
          disabled={isSubmitting}
          onClick={closeModal}
        >
          Close
        </button>
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
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
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
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              {...formik.getFieldProps("currentPassword")}
              className="mt-1 p-2 w-full border rounded-md"
              disabled={isSubmitting}
            />
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <div className="text-red-500 text-sm">
                  {formik.errors.currentPassword}
                </div>
              )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              {...formik.getFieldProps("newPassword")}
              className="mt-1 p-2 w-full border rounded-md"
              disabled={isSubmitting}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500 text-sm">
                {formik.errors.newPassword}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end w-full mb-2 pr-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mx-1 rounded-md hover:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="please_wait"></span>
            ) : (
              "SAVE CHANGES"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditSuperAdmin;
