import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

Modal.setAppElement("#root");

const ModalEditSection = ({
  isOpen,
  closeModal,
  server_url,
  fetchSections,
  teacherId,
  sectionId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [sectionData, setSectionData] = useState(null);

  const fetchSectionData = async () => {
    try {
      const response = await axios.get(
        `${server_url}/sections/view/${sectionId}`
      );
      setSectionData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching section data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && sectionId) {
      fetchSectionData();
    }
  }, [isOpen, sectionId, server_url, teacherId]);

  const handleClearForm = () => {
    formik.setValues({
      schoolYear: sectionData?.schoolYear || "",
      sectionName: sectionData?.sectionName || "",
    });
    setResetKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!isOpen) {
      setResetKey(0);
      setSectionData(null);
    }
  }, [isOpen]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      schoolYear: sectionData?.schoolYear || "",
      sectionName: sectionData?.sectionName || "",
    },
    validationSchema: Yup.object({
      schoolYear: Yup.string()
        .required("Required")
        .matches(/^\d{4}-\d{4}$/, "Must match the format 'YYYY-YYYY'"),
      sectionName: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("schoolYear", values.schoolYear);
        formData.append("sectionName", values.sectionName);
        formData.append("userId", teacherId);

        const response = await axios.put(
          `${server_url}/sections/edit/${sectionId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Section edited successfully:", response.data);
        closeModal();
        resetForm();
        fetchSections(teacherId);
      } catch (error) {
        console.error("Error editing section:", error);
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
      contentLabel="Edit Section Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Section</h2>
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

export default ModalEditSection;
