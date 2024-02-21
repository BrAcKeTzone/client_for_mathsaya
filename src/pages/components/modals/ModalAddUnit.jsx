import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

Modal.setAppElement("#root");

const ModalAddUnit = ({
  isOpen,
  closeModal,
  server_url,
  fetchUnits,
  teacherId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleClearForm = () => {
    formik.setValues({
      yunitNumber: "",
      yunitName: "",
      yunitThumbnail: null,
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
      yunitNumber: "",
      yunitName: "",
      yunitThumbnail: null,
    },
    validationSchema: Yup.object({
      yunitNumber: Yup.number().required("Required").positive("Required"),
      yunitName: Yup.string().required("Required"),
      yunitThumbnail: Yup.mixed()
        .required("Required")
        .test("fileFormat", "Unsupported File Format", (value) => {
          if (value) {
            return ["image/jpeg", "image/png", "image/gif"].includes(
              value.type
            );
          }
          return false;
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("yunitNumber", values.yunitNumber);
        formData.append("yunitName", values.yunitName);
        formData.append("yunitThumbnail", values.yunitThumbnail);
        formData.append("userId", teacherId);

        const response = await axios.post(`${server_url}/units/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Unit added successfully:", response.data);
        closeModal();
        resetForm();
        fetchUnits(teacherId);
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
      contentLabel="Add Unit Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Unit</h2>
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
                htmlFor="yunitNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Unit Number
              </label>
              <input
                type="number"
                id="yunitNumber"
                name="yunitNumber"
                {...formik.getFieldProps("yunitNumber")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.yunitNumber && formik.errors.yunitNumber && (
                <div className="text-red-500 text-sm">
                  {formik.errors.yunitNumber}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="yunitName"
                className="block text-sm font-medium text-gray-600"
              >
                Unit Name
              </label>
              <input
                type="text"
                id="yunitName"
                name="yunitName"
                {...formik.getFieldProps("yunitName")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.yunitName && formik.errors.yunitName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.yunitName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="yunitThumbnail"
                className="block text-sm font-medium text-gray-600"
              >
                Unit Thumbnail
              </label>
              <input
                type="file"
                id="yunitThumbnail"
                name="yunitThumbnail"
                onChange={(e) =>
                  formik.setFieldValue("yunitThumbnail", e.target.files[0])
                }
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.yunitThumbnail &&
                formik.errors.yunitThumbnail && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.yunitThumbnail}
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

export default ModalAddUnit;
