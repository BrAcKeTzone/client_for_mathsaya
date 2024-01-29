import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

Modal.setAppElement("#root");

const ModalEditExercise = ({
  isOpen,
  closeModal,
  server_url,
  fetchExercises,
  selectedLessonId,
  teacherId,
  exerciseId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(
          `${server_url}/exercises/view/${exerciseId}`
        );
        setExerciseData(response.data);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    if (isOpen && exerciseId) {
      fetchExerciseData();
    }
  }, [isOpen, exerciseId, server_url, teacherId]);

  const handleClearForm = () => {
    formik.setValues({
      exerciseNumber: exerciseData?.exerciseNumber || "",
      exerciseName: exerciseData?.exerciseName || "",
      exerciseDescription: exerciseData?.exerciseDescription || "",
    });
    setResetKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!isOpen) {
      setResetKey(0);
      setExerciseData(null);
    }
  }, [isOpen]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      exerciseNumber: exerciseData?.exerciseNumber || "",
      exerciseName: exerciseData?.exerciseName || "",
      exerciseDescription: exerciseData?.exerciseDescription || "",
    },
    validationSchema: Yup.object({
      exerciseNumber: Yup.number().required("Required").positive("Required"),
      exerciseName: Yup.string().required("Required"),
      exerciseDescription: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);

        const response = await axios.put(
          `${server_url}/exercises/edit/${exerciseId}`,
          values
        );

        console.log("Exercise edited successfully:", response.data);
        closeModal();
        resetForm();
        fetchExercises(selectedLessonId);
      } catch (error) {
        console.error("Error editing exercise:", error);
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
      contentLabel="Edit Exercise Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Exercise</h2>
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
                htmlFor="exerciseNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Exercise Number
              </label>
              <input
                type="number"
                id="exerciseNumber"
                name="exerciseNumber"
                {...formik.getFieldProps("exerciseNumber")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.exerciseNumber &&
                formik.errors.exerciseNumber && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.exerciseNumber}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="exerciseName"
                className="block text-sm font-medium text-gray-600"
              >
                Exercise Name
              </label>
              <input
                type="text"
                id="exerciseName"
                name="exerciseName"
                {...formik.getFieldProps("exerciseName")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.exerciseName && formik.errors.exerciseName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.exerciseName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="exerciseDescription"
                className="block text-sm font-medium text-gray-600"
              >
                Exercise Description
              </label>
              <textarea
                id="exerciseDescription"
                name="exerciseDescription"
                {...formik.getFieldProps("exerciseDescription")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
                rows="3"
              />
              {formik.touched.exerciseDescription &&
                formik.errors.exerciseDescription && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.exerciseDescription}
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

export default ModalEditExercise;
