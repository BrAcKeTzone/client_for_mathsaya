import React, { useState, useEffect } from "react";
import backLogo from "../../assets/images/back.png";
import skyBackground from "../../assets/images/sky.gif";
import { GrPrevious, GrNext } from "react-icons/gr";
import ModalViewLessonVideo from "../../pages/components/modals/ModalViewLessonVideo";

const ExerciseChoices = ({
  backSound,
  videoDiscussion,
  exerciseChoices,
  onBack,
  onSelect,
  fetchExercises,
  selectedlesson,
  server_url,
  completedExercises,
  fetchStudentProfile,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    fetchExercises();
    fetchStudentProfile();
  }, [selectedlesson]);

  useEffect(() => {
    // Preload background image
    const preloadBackgroundImage = async () => {
      try {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.src = skyBackground;
          img.onload = resolve;
          img.onerror = reject;
        });
        setResourcesLoaded(true);
      } catch (error) {
        console.error("Error preloading background image:", error);
      }
    };

    preloadBackgroundImage();
  }, []);

  const handleViewLessonVideoButtonClick = () => {
    if (localStorage.getItem("voice") === "true") {
      videoDiscussion.play();
    }
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

  const isCompleted = (exerciseId) => {
    return completedExercises.some(
      (completedExercise) => completedExercise.exerciseId === exerciseId
    );
  };

  const handleExerciseClick = (index, exercise) => {
    if (lastClickedIndex !== index) {
      if (localStorage.getItem("voice") === "true") {
        responsiveVoice.speak(
          exercise.exerciseName +
            ". Kini ang gipahimong pamaagi. " +
            exercise.exerciseDescription,
          "Filipino Female"
        );
      }
      setClickCount(1);
    } else {
      if (clickCount === 1) {
        sessionStorage.setItem("selectedexercise", exercise.exerciseId);
        onSelect(exercise);
      }
      setClickCount(0);
    }
    setLastClickedIndex(index);
  };

  const handleBackClick = () => {
    if (localStorage.getItem("voice") === "true") {
      backSound.play();
    }
    onBack();
  };

  if (!resourcesLoaded) {
    // Render loading indicator if resources are not loaded yet
    return (
      <div class="h-screen w-full flex justify-center items-center bg-blue-300">
        <div class="colorloader"></div>
      </div>
    );
  }

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
                : () => handleExerciseClick(index, exercise)
            }
          >
            <p className="text-center mb-2 transition-opacity duration-500 hover:opacity-70">
              {exercise.exerciseName}
            </p>
            <p className="mb-2 transition-opacity duration-500 hover:opacity-70">
              Ikapila nga tun-anan: {exercise.exerciseNumber}
            </p>
            <p className="mb-2 h-44 w-60 overflow-y-auto p-1 transition-opacity duration-500 hover:opacity-70">
              Timan-e: {exercise.exerciseDescription}
            </p>
            {isCompleted(exercise.exerciseId) && (
              <p className="text-green-600 font-bold">Human na</p>
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
      <button className="absolute top-0 left-0 m-4" onClick={handleBackClick}>
        <img src={backLogo} alt="Back" className="w-16 h-16" />
      </button>
    </div>
  );
};

export default ExerciseChoices;
