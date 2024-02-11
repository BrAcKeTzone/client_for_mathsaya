import React from "react";
import Modal from "react-modal";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ModalShowExplanation = ({ questions, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg overflow-y-auto w-full max-w-screen-sm mx-auto md:max-w-none md:w-auto"
    >
      <div className="modal-content px-6 pt-6 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300">
        <h1 className="text-xl font-bold mb-4">Answer Explanations</h1>
        <div className="overflow-y-auto max-h-96">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {question.question_text}
              </h2>
              {question.questionImage && (
                <img
                  src={question.questionImage}
                  alt="Question Image"
                  className="w-64 h-64 mb-2"
                />
              )}
              <div className="grid grid-cols-2 gap-4">
                {question.answer_choices.map((choice, i) => (
                  <div
                    key={i}
                    className={`p-2 ${
                      choice === question.correct_answer
                        ? "bg-green-200"
                        : "bg-gray-200"
                    }`}
                  >
                    {choice}
                  </div>
                ))}
              </div>
              <p className="mt-2">{question.answer_explanation}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center p-1">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 "
          >
            <IoMdCloseCircleOutline className="text-4xl" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShowExplanation;
