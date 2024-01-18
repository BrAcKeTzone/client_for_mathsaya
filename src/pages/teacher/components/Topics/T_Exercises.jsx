import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "../../../../assets/styles/hideVerticalScrollbar.css";
import ModalAddExercise from "../Modals/ModalAddExercise";

function T_Exercises({
  teacherId,
  selectedLessonId,
  server_url,
  handleClickExercise,
}) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQueryExercises, setSearchQueryExercises] = useState("");
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);

  const openAddExerciseModal = () => {
    setIsAddExerciseModalOpen(true);
  };

  const closeAddExerciseModal = () => {
    setIsAddExerciseModalOpen(false);
  };

  useEffect(() => {
    console.log(selectedLessonId);
    fetchExercises(selectedLessonId);
  }, [server_url]);

  const fetchExercises = async (selectedLessonId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/exercises/exercises/${selectedLessonId}`
      );
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exercise?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${server_url}/exercises/delete/${id}`, {});
      fetchExercises(selectedLessonId);
    } catch (error) {
      alert(error);
    }
  };

  const filteredExercises = exercises.filter((exercise) => {
    const { exerciseNumber, exerciseName } = exercise;
    const searchValue = searchQueryExercises.toLowerCase();
    return (
      exerciseNumber.toString().toLowerCase().includes(searchValue) ||
      exerciseName.toString().toLowerCase().includes(searchValue)
    );
  });

  const handleSearchChangeExercises = (e) => {
    setSearchQueryExercises(e.target.value);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const truncatedDescription = (description) => {
    const maxLength = 100;
    return truncateText(description, maxLength);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-white text-6xl pt-4 pb-2">EXERCISES</h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-4">
          <input
            type="text"
            placeholder="Search Exercises"
            value={searchQueryExercises}
            onChange={handleSearchChangeExercises}
            className="p-2 border rounded"
          />
          <button
            className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={openAddExerciseModal}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          filteredExercises.length > 0 &&
          filteredExercises.map((exercise) => (
            <div
              key={exercise.exerciseId}
              className="flex flex-col bg-blue-500 rounded-t-none rounded-b mr-2 overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => {
                  handleClickExercise(exercise.exerciseId);
                }}
              >
                <div className="p-4 flex flex-col h-full min-h-48">
                  <div className="text-xl font-bold mb-2">
                    {exercise.exerciseNumber}
                  </div>
                  <div className="text-base">{exercise.exerciseName}</div>
                  <div className="text-sm italic">
                    {truncatedDescription(exercise.exerciseDescription)}
                  </div>
                </div>
              </button>
              <div className="flex justify-center p-2 border-t-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded mx-1"
                  onClick={() => {
                    console.log(
                      `Edit button clicked for exercise ${exercise.exerciseId}`
                    );
                  }}
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 p-2 rounded mx-1"
                  onClick={() => handleDeleteLesson(exercise.exerciseId)}
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ModalAddExercise
        teacherId={teacherId}
        selectedLessonId={selectedLessonId}
        server_url={server_url}
        isOpen={isAddExerciseModalOpen}
        closeModal={closeAddExerciseModal}
        fetchExercises={fetchExercises}
      />
    </>
  );
}

export default T_Exercises;
