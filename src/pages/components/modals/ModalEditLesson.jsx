import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

Modal.setAppElement("#root");

const ModalEditLesson = ({
  isOpen,
  closeModal,
  server_url,
  fetchLessons,
  selectedUnitId,
  teacherId,
  lessonId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [lessonData, setLessonData] = useState(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await axios.get(
          `${server_url}/lessons/view/${lessonId}`
        );
        setLessonData(response.data);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };

    if (isOpen && lessonId) {
      fetchLessonData();
    }
  }, [isOpen, lessonId, server_url, teacherId]);

  const handleClearForm = () => {
    formik.setValues({
      lessonNumber: lessonData?.lessonNumber || "",
      lessonName: lessonData?.lessonName || "",
      lessonDescription: lessonData?.lessonDescription || "",
      lessonThumbnail: null,
    });
    setResetKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!isOpen) {
      setResetKey(0);
      setLessonData(null);
    }
  }, [isOpen]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lessonNumber: lessonData?.lessonNumber || "",
      lessonName: lessonData?.lessonName || "",
      lessonDescription: lessonData?.lessonDescription || "",
      lessonThumbnail: null,
    },
    validationSchema: Yup.object({
      lessonNumber: Yup.number().required("Required").positive("Required"),
      lessonName: Yup.string().required("Required"),
      lessonDescription: Yup.string().required("Required"),
      lessonThumbnail: Yup.mixed()
        .nullable()
        .test("fileFormat", "Unsupported File Format", (value) => {
          if (value) {
            return ["image/jpeg", "image/png"].includes(value.type);
          }
          return true;
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("lessonNumber", values.lessonNumber);
        formData.append("lessonName", values.lessonName);
        if (values.lessonThumbnail) {
          formData.append("lessonThumbnail", values.lessonThumbnail);
        }
        formData.append("userId", teacherId);
        formData.append("yunitId", selectedUnitId);
        formData.append("lessonDescription", values.lessonDescription);

        const response = await axios.put(
          `${server_url}/lessons/edit/${lessonId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Lesson edited successfully:", response.data);
        closeModal();
        resetForm();
        fetchLessons(selectedUnitId);
      } catch (error) {
        console.error("Error editing lesson:", error);
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
      contentLabel="Edit Lesson Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Lesson</h2>
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
                htmlFor="lessonNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Lesson Number
              </label>
              <input
                type="number"
                id="lessonNumber"
                name="lessonNumber"
                {...formik.getFieldProps("lessonNumber")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.lessonNumber && formik.errors.lessonNumber && (
                <div className="text-red-500 text-sm">
                  {formik.errors.lessonNumber}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lessonName"
                className="block text-sm font-medium text-gray-600"
              >
                Lesson Name
              </label>
              <input
                type="text"
                id="lessonName"
                name="lessonName"
                {...formik.getFieldProps("lessonName")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.lessonName && formik.errors.lessonName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.lessonName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lessonDescription"
                className="block text-sm font-medium text-gray-600"
              >
                Lesson Description
              </label>
              <textarea
                id="lessonDescription"
                name="lessonDescription"
                {...formik.getFieldProps("lessonDescription")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
                rows="3"
              />
              {formik.touched.lessonDescription &&
                formik.errors.lessonDescription && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lessonDescription}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lessonThumbnail"
                className="block text-sm font-medium text-gray-600"
              >
                Lesson Thumbnail
              </label>
              <input
                type="file"
                id="lessonThumbnail"
                name="lessonThumbnail"
                onChange={(e) =>
                  formik.setFieldValue("lessonThumbnail", e.target.files[0])
                }
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.lessonThumbnail &&
                formik.errors.lessonThumbnail && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lessonThumbnail}
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

export default ModalEditLesson;
