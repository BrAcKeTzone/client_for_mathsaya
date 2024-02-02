import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const genderOptions = ["Male", "Female", "Non-binary"];

const ModalEditSuperTeacher = ({
  isOpen,
  closeModal,
  server_url,
  fetchTeacherEntries,
  teacherId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(
          `${server_url}/user/teacher/${teacherId}`
        );
        setTeacherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching teacher data", error);
      }
    };

    if (isOpen && teacherId) {
      fetchTeacherData();
    }
  }, [isOpen, teacherId, server_url]);

  const handleClearForm = () => {
    formik.setValues({
      firstname: teacherData?.firstname || "",
      lastname: teacherData?.lastname || "",
      gender: teacherData?.gender || "",
      schoolName: teacherData?.schoolName || "",
    });
    setResetKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!isOpen) {
      setResetKey(0);
      setTeacherData(null);
    }
  }, [isOpen]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: teacherData?.firstname || "",
      lastname: teacherData?.lastname || "",
      gender: teacherData?.gender || "",
      schoolName: teacherData?.schoolName || "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      gender: Yup.string().required("Gender is required"),
      schoolName: Yup.string().required("School Name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        const updatedData = {
          firstname: values.firstname,
          lastname: values.lastname,
          gender: values.gender,
          schoolName: values.schoolName,
        };

        const response = await axios.put(
          `${server_url}/user/bypass/teacher/edit/${teacherId}`,
          updatedData
        );

        console.log("Teacher edited successfully:", response.data);
        closeModal();
        resetForm();
        fetchTeacherEntries();
      } catch (error) {
        console.error("Error during editing teacher information:", error);
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
      contentLabel="Edit Teacher Information"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Teacher</h2>
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
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.schoolName && formik.errors.schoolName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.schoolName}
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

export default ModalEditSuperTeacher;
