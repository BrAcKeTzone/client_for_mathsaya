import React from "react";
import Modal from "react-modal";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ModalShowExplanation = ({
  questions,
  selectedAnswers,
  totalscore,
  totalOver,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg overflow-y-auto w-full max-w-screen-sm mx-auto md:max-w-none md:w-auto"
    >
      <div className="modal-content px-6 pt-6 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300">
        <h1 className="flex flex-col items-center  font-bold mb-4">
          <span className="text-2xl">Pagsusi sa mga Pangutana:</span>
          <span className="text-sm">
            Tubag sa Estudyante kontra sa Tugma nga Tubag
          </span>
        </h1>
        <div className="container mx-auto grid grid-cols-2 gap-4">
          {/* Left column */}
          <div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-green-300 rounded-full"></div>
              <p className="text-green-500 font-semibold">Tugma nga tubag</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-red-200 rounded-full"></div>
              <p className="text-red-500 font-semibold">Sayup nga tubag</p>
            </div>
          </div>
          {/* Right column */}
          <div className="text-3xl font-semibold flex items-center justify-end">
            <span className="bg-white bg-opacity-50 rounded-full py-2 px-1">{`${totalscore}/${totalOver}`}</span>
          </div>
        </div>

        <div className="overflow-y-auto max-h-96">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {question.question_text}
              </h2>
              <div className="flex justify-center ml-2">
                {question.questionImage && (
                  <img
                    src={question.questionImage}
                    alt="Question Image"
                    className="w-64 h-64 mb-2"
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {question.answer_choices.split(",").map((choice, i) => (
                  <div
                    key={i}
                    className={`p-2 ${
                      selectedAnswers[question.questionId] === choice
                        ? choice === question.correct_answer
                          ? "bg-green-300" // Selected answer matches the correct answer
                          : "bg-red-200" // Selected answer doesn't match the correct answer
                        : choice === question.correct_answer
                        ? "bg-green-300" // Correct answer
                        : "bg-gray-200" // Other choices
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
