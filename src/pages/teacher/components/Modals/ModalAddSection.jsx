import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../../../assets/styles/loader.css";

Modal.setAppElement("#root");

const ModalAddSection = ({
  isOpen,
  closeModal,
  server_url,
  fetchSections,
  teacherId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleClearForm = () => {
    formik.setValues({
      schoolYear: "",
      sectionName: "",
    });
    setResetKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!isOpen) {
      setResetKey(0);
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      schoolYear: "",
      sectionName: "",
    },
    validationSchema: Yup.object({
      schoolYear: Yup.string()
        .required("Required")
        .matches(/^\d{4}-\d{4}$/, "Must matched with the format 'YYYY-YYYY'"),
      sectionName: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("schoolYear", values.schoolYear);
        formData.append("sectionName", values.sectionName);
        formData.append("teacherId", teacherId);

        const response = await axios.post(
          `${server_url}/sections/add`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Section added successfully:", response.data);
        closeModal();
        resetForm();
        fetchSections(teacherId);
      } catch (error) {
        console.error("Error adding unit:", error);
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
      contentLabel="Add Section Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Section</h2>
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
          <div className="grid grid-cols-1 gap-4 mx-2">
            <div className="mb-4">
              <label
                htmlFor="schoolYear"
                className="block text-sm font-medium text-gray-600"
              >
                School Year
              </label>
              <input
                type="text"
                id="schoolYear"
                name="schoolYear"
                {...formik.getFieldProps("schoolYear")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.schoolYear && formik.errors.schoolYear && (
                <div className="text-red-500 text-sm">
                  {formik.errors.schoolYear}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="sectionName"
                className="block text-sm font-medium text-gray-600"
              >
                Section Name
              </label>
              <input
                type="text"
                id="sectionName"
                name="sectionName"
                {...formik.getFieldProps("sectionName")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.sectionName && formik.errors.sectionName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.sectionName}
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

export default ModalAddSection;
