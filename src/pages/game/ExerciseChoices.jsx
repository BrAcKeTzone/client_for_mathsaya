import React, { useState, useEffect } from "react";
import backLogo from "../../assets/images/back.png";
import skyBackground from "../../assets/images/sky.gif";
import { GrPrevious, GrNext } from "react-icons/gr";
import ModalViewLessonVideo from "../../pages/components/modals/ModalViewLessonVideo";

const ExerciseChoices = ({
  exerciseChoices,
  onBack,
  onSelect,
  fetchExercises,
  selectedlesson,
  server_url,
  completedExercises, // Add completedExercises as a prop
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    fetchExercises();
  }, [selectedlesson]);

  const handleViewLessonVideoButtonClick = () => {
    setIsViewLessonVideoModalOpen(true);
  };

  const [isViewLessonVideoModalOpen, setIsViewLessonVideoModalOpen] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEntry = currentPage * 1;
  const indexOfFirstEntry = indexOfLastEntry - 1;
  const currentEntries = exerciseChoices.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExerciseSelect = (exercise) => {
    sessionStorage.setItem("selectedexercise", exercise.exerciseId);
    onSelect(exercise);
  };

  // Check if an exercise entry matches any completed exercise
  const isCompleted = (exerciseId) => {
    return completedExercises.some(
      (completedExercise) => completedExercise.exerciseId === exerciseId
    );
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center overflow-hidden p-10 bg-cover bg-center transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${skyBackground})` }}
    >
      <div className="flex flex-col transition-transform duration-500 transform hover:-translate-y-1">
        <h1 className="text-4xl sm:text-6xl text-center p-10 text-slate-800 transition-opacity duration-500 hover:opacity-70">
          Mga Tunanan
        </h1>
        <div className="flex justify-center">
          <button
            className="bn632-hover bn26 transform -translate-y-1/2 transition-transform duration-500 hover:-translate-y-2"
            onClick={handleViewLessonVideoButtonClick}
          >
            LANTAWA ANG LEKSYON
          </button>
        </div>
        <ModalViewLessonVideo
          isOpen={isViewLessonVideoModalOpen}
          closeModal={() => setIsViewLessonVideoModalOpen(false)}
          server_url={server_url}
          lessonId={selectedlesson}
        />
      </div>
      <div className="flex flex-wrap justify-center py-4 px-6 sm:px-0 transition-transform duration-500 transform hover:-translate-y-1">
        {currentEntries.map((exercise, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center m-4 cursor-pointer rounded border border-black transition-transform duration-500 transform hover:scale-105 ${
              isCompleted(exercise.exerciseId) ? "bg-green-200" : ""
            }`}
            onClick={
              isCompleted(exercise.exerciseId)
                ? null
                : () => handleExerciseSelect(exercise)
            }
          >
            <p className="text-center mb-2 transition-opacity duration-500 hover:opacity-70">
              {exercise.exerciseName}
            </p>
            <p className="mb-2 transition-opacity duration-500 hover:opacity-70">
              Exercise Number: {exercise.exerciseNumber}
            </p>
            <p className="mb-2 h-44 w-60 overflow-y-auto p-1 transition-opacity duration-500 hover:opacity-70">
              Instruction: {exercise.exerciseDescription}
            </p>
            {isCompleted(exercise.exerciseId) && (
              <p className="text-green-600 font-bold">Completed</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 transition-transform duration-500 transform hover:scale-105 flex justify-center items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-white rounded transition-colors duration-300 min-w-24 flex justify-center items-center ${
            currentPage === 1
              ? "disabled:bg-gray-300 disabled:cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          <GrPrevious className="text-5xl" />
        </button>
        <span className="mx-2" />
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastEntry >= exerciseChoices.length}
          className={`bg-blue-500 text-white rounded transition-colors duration-300 min-w-24 flex justify-center items-center ${
            indexOfLastEntry >= exerciseChoices.length
              ? "disabled:bg-gray-300 disabled:cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          <GrNext className="text-5xl" />
        </button>
      </div>
      <div
        className="absolute top-5 left-5 cursor-pointer transition-opacity duration-500 hover:opacity-70"
        onClick={onBack}
      >
        <img src={backLogo} alt="Back Logo" className="w-16 h-16" />
      </div>
    </div>
  );
};

export default ExerciseChoices;
