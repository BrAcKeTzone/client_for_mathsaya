import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import ModalAddQuestion from "../Modals/ModalAddQuestion";

function Questions({ teacherId, selectedExerciseId, server_url }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQueryQuestions, setSearchQueryQuestions] = useState("");
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const openAddQuestionModal = () => {
    setIsAddQuestionModalOpen(true);
  };

  const closeAddQuestionModal = () => {
    setIsAddQuestionModalOpen(false);
  };

  const fetchQuestions = async (selectedExerciseId) => {
    try {
      console.log(selectedExerciseId);
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/questions/${selectedExerciseId}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${server_url}/questions/delete/${id}`, {});
      fetchQuestions(selectedExerciseId);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchQuestions(selectedExerciseId);
  }, [selectedExerciseId]);

  const filteredQuestions = questions.filter((question) => {
    const { question_text } = question;
    const searchValue = searchQueryQuestions.toLowerCase();
    return question_text.toString().toLowerCase().includes(searchValue);
  });

  const handleSearchChangeQuestions = (e) => {
    setSearchQueryQuestions(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-white text-6xl pt-4 pb-2">QUESTIONS</h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-4">
          <input
            type="text"
            placeholder="Search Questions"
            value={searchQueryQuestions}
            onChange={handleSearchChangeQuestions}
            className="p-2 border rounded"
          />
          <button
            className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={openAddQuestionModal}
          >
            ADD NEW
          </button>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          filteredQuestions.length > 0 &&
          filteredQuestions.map((question) => (
            <div
              key={question.questionId}
              className="flex flex-col bg-blue-500 rounded-t-none rounded-b mr-2 overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex flex-col h-full min-h-48">
                <div className="p-4 text-xl font-bold min-h-28">
                  {question.question_text}
                </div>
                <div className="text-base">
                  {question.questionImage ? (
                    <img
                      src={question.questionImage}
                      alt={question.questionImage}
                      className="w-full h-32 object-cover object-center"
                    />
                  ) : (
                    <div className="my-auto border border-black">
                      <p className="w-full h-32 object-cover object-center flex justify-center items-center">
                        No Image Attachment
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-base italic p-2 mt-2 bg-black">
                  <div className="grid grid-cols-2 gap-2">
                    {question.answer_choices.split(",").map((choice, index) => (
                      <div
                        key={index}
                        className={`border p-2 text-center ${
                          choice.trim() === question.correct_answer
                            ? "font-bold bg-blue-500"
                            : ""
                        }`}
                      >
                        <span className="text-white">{choice.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-2 border-t-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded mx-1"
                  onClick={() => {
                    console.log(
                      `Edit button clicked for question ${question.questionId}`
                    );
                  }}
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 p-2 rounded mx-1"
                  onClick={() => handleDeleteQuestion(question.questionId)}
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ModalAddQuestion
        teacherId={teacherId}
        selectedExerciseId={selectedExerciseId}
        server_url={server_url}
        isOpen={isAddQuestionModalOpen}
        closeModal={closeAddQuestionModal}
        fetchQuestions={fetchQuestions}
      />
    </>
  );
}

export default Questions;
