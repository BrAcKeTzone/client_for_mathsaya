// ModalEditStudent.jsx
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

Modal.setAppElement("#root");

const genderOptions = ["Male", "Female"];

const ModalEditStudent = ({
  isOpen,
  closeModal,
  server_url,
  fetchStudents,
  selectedSectionId,
  teacherId,
  studentId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `${server_url}/students/view/${studentId}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (isOpen && studentId) {
      fetchStudentData();
    }
  }, [isOpen, studentId, server_url, teacherId]);

  const handleClearForm = () => {
    formik.setValues({
      firstname: studentData?.firstname || "",
      lastname: studentData?.lastname || "",
      username: studentData?.username || "",
      gender: studentData?.gender || "",
    });
    setResetKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!isOpen) {
      setResetKey(0);
      setStudentData(null);
    }
  }, [isOpen]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: studentData?.firstname || "",
      lastname: studentData?.lastname || "",
      username: studentData?.username || "",
      gender: studentData?.gender || "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("username", values.username);
        formData.append("gender", values.gender);
        formData.append("userId", teacherId);
        formData.append("sectionId", selectedSectionId);

        const response = await axios.put(
          `${server_url}/students/edit/${studentId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Student edited successfully:", response.data);
        closeModal();
        resetForm();
        fetchStudents(selectedSectionId);
      } catch (error) {
        console.error("Error editing student:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      key={resetKey}
      onRequestClose={isSubmitting ? null : closeModal}
      contentLabel="Edit Student Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Student</h2>
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
          <div className="grid grid-cols-1 gap-4 mx-2">
            <div className="mb-2">
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
            <div className="mb-2">
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
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                {...formik.getFieldProps("username")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className="mb-2">
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

          <div className="flex justify-end w-full mb-2 pr-2">
            <button
              type="button"
              className="bg-red-500 text-white p-2 mx-1 rounded-md hover:bg-red-400"
              disabled={isSubmitting}
              onClick={handleClearForm}
            >
              RESET
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

export default ModalEditStudent;
