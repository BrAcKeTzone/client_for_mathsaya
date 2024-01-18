import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TbExposureMinus1, TbExposurePlus1 } from "react-icons/tb";
import { CiImageOn, CiImageOff } from "react-icons/ci";

import "../../../../assets/styles/loader.css";

Modal.setAppElement("#root");

const ModalAddQuestion = ({
  isOpen,
  closeModal,
  server_url,
  fetchQuestions,
  selectedExerciseId,
  teacherId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuestionImageField, setShowQuestionImageField] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleClearForm = () => {
    formik.setValues({
      question_text: "",
      answer_choices: [""],
      correct_answer: "",
      questionImage: null,
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
      question_text: "",
      answer_choices: [""],
      correct_answer: "",
      questionImage: null,
    },
    validationSchema: Yup.object({
      question_text: Yup.string().required("Required"),
      answer_choices: Yup.array()
        .of(Yup.string().required("Required"))
        .min(2, "Must be at least 2 choices")
        .required("Required"),
      correct_answer: Yup.string()
        .test(
          "match-answer",
          "Must match to any of the choices",
          function (value) {
            return this.parent.answer_choices.includes(value);
          }
        )
        .required("Required"),
      questionImage: Yup.mixed()
        .nullable()
        .test("fileFormat", "Unsupported File Format", (value) => {
          if (value === null) {
            return true;
          }
          return ["image/jpeg", "image/png"].includes(value.type);
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("question_text", values.question_text);
        formData.append("answer_choices", values.answer_choices);
        formData.append("questionImage", values.questionImage);
        formData.append("teacherId", teacherId);
        formData.append("exerciseId", selectedExerciseId);
        formData.append("correct_answer", values.correct_answer);

        const response = await axios.post(
          `${server_url}/questions/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Question added successfully:", response.data);
        closeModal();
        resetForm();
        fetchQuestions(selectedExerciseId);
      } catch (error) {
        console.error("Error adding unit:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleAddAnswerChoice = () => {
    const newChoices = [...formik.values.answer_choices];
    const lastChoice = newChoices[newChoices.length - 1];

    if (lastChoice.trim() !== "") {
      newChoices.push("");
      formik.setFieldValue("answer_choices", newChoices);
    }
  };

  const handleRemoveAnswerChoice = () => {
    if (formik.values.answer_choices.length > 1) {
      formik.values.answer_choices.pop();
      formik.setFieldValue("answer_choices", formik.values.answer_choices);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      key={resetKey}
      onRequestClose={isSubmitting ? null : closeModal}
      contentLabel="Add Question Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Question</h2>
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
                htmlFor="question_text"
                className="block text-sm font-medium text-gray-600"
              >
                Question Text
              </label>
              <input
                type="text"
                id="question_text"
                name="question_text"
                {...formik.getFieldProps("question_text")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
              {formik.touched.question_text && formik.errors.question_text && (
                <div className="text-red-500 text-sm">
                  {formik.errors.question_text}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="questionImage"
                className="block text-sm font-medium text-gray-600"
              >
                Question Image
              </label>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  type="button"
                  className="bg-green-300 text-white p-2 m-2 rounded text-2xl hover:bg-green-400"
                  onClick={() =>
                    setShowQuestionImageField(!showQuestionImageField)
                  }
                >
                  {showQuestionImageField ? <CiImageOff /> : <CiImageOn />}
                </button>
                {showQuestionImageField && (
                  <>
                    <input
                      type="file"
                      id="questionImage"
                      name="questionImage"
                      onChange={(e) =>
                        formik.setFieldValue("questionImage", e.target.files[0])
                      }
                      className="mt-1 p-2 w-full border rounded-md"
                      disabled={isSubmitting}
                    />
                    {formik.touched.questionImage &&
                      formik.errors.questionImage && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.questionImage}
                        </div>
                      )}
                  </>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="answer_choices"
                className="block text-sm font-medium text-gray-600"
              >
                Choices
              </label>

              {formik.values.answer_choices.map((choice, index) => (
                <div key={index} className=" mb-2">
                  <input
                    type="text"
                    id="answer_choices"
                    name="answer_choices"
                    {...formik.getFieldProps(`answer_choices[${index}]`)}
                    className="mt-1 p-2 w-full border rounded-md"
                    disabled={isSubmitting}
                  />
                  {formik.touched.answer_choices &&
                    formik.errors.answer_choices && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.answer_choices}
                      </div>
                    )}
                </div>
              ))}
              <div className="space-x-2 flex text-2xl mt-2 justify-end">
                <button
                  type="button"
                  className="bg-blue-300 text-white p-2 rounded text-2xl hover:bg-blue-400"
                  onClick={handleAddAnswerChoice}
                >
                  <TbExposurePlus1 />
                </button>
                <button
                  type="button"
                  className="bg-red-300 text-white p-2 rounded text-2xl hover:bg-red-400"
                  onClick={handleRemoveAnswerChoice}
                >
                  <TbExposureMinus1 />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="correct_answer"
                className="block text-sm font-medium text-gray-600"
              >
                Correct Answer
              </label>
              <input
                type="text"
                id="correct_answer"
                name="correct_answer"
                {...formik.getFieldProps("correct_answer")}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
                rows="3"
              />
              {formik.touched.correct_answer &&
                formik.errors.correct_answer && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.correct_answer}
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

export default ModalAddQuestion;
