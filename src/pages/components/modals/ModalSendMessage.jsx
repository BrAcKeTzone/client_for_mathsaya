import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const ModalSendMessage = ({ isOpen, closeModal, server_url, userId }) => {
  const formik = useFormik({
    initialValues: {
      subject: "",
      content: "",
      attachment: null,
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Subject is required"),
      content: Yup.string().required("Content is required"),
      attachment: Yup.mixed(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("subject", values.subject);
        formData.append("content", values.content);
        formData.append("attachment", values.attachment);

        await axios.post(`${server_url}/user/send/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Report Sent");
        closeModal();
      } catch (error) {
        console.error("Error during sending email to admin:", error);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Send Message to Admin"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Report Bugs or Suggestion</h2>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={closeModal}
        >
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mx-2">
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-600"
            >
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              onChange={formik.handleChange}
              value={formik.values.subject}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.subject && formik.errors.subject && (
              <div className="text-red-500 text-sm">
                {formik.errors.subject}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600"
            >
              Content: (Explain the bug encountered)
            </label>
            <textarea
              id="content"
              name="content"
              onChange={formik.handleChange}
              value={formik.values.content}
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 text-sm">
                {formik.errors.content}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachment"
              className="block text-sm font-medium text-gray-600"
            >
              Attachment: (Screenshot of the bug encountered)
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={(event) =>
                formik.setFieldValue("attachment", event.currentTarget.files[0])
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.attachment && formik.errors.attachment && (
              <div className="text-red-500 text-sm">
                {formik.errors.attachment}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end w-full mb-2 pr-2">
          <button
            type="submit"
            className="bg-red-500 text-white p-2 mx-1 rounded-md hover:bg-red-400"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalSendMessage;
