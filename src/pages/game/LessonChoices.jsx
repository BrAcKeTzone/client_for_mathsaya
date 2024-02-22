import React, { useState, useEffect } from "react";
import backLogo from "../../assets/images/back.png";
import skyBackground from "../../assets/images/sky.gif";
import { GrPrevious, GrNext } from "react-icons/gr";

const LessonChoices = ({
  backSound,
  lessonChoices,
  onBack,
  onSelect,
  fetchLessons,
  selectedunit,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [selectedunit]);

  const indexOfLastEntry = currentPage * 1;
  const indexOfFirstEntry = indexOfLastEntry - 1;
  const currentEntries = lessonChoices.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setClickCount(0); // Reset click count when navigating to a different page
    setLastClickedIndex(null); // Reset last clicked index when navigating to a different page
  };

  const handleLessonClick = (index, lesson) => {
    if (lastClickedIndex !== index) {
      if (localStorage.getItem("voice") === "true") {
        responsiveVoice.speak(lesson.lessonName, "Filipino Female");
      }
      setClickCount(1);
    } else {
      if (clickCount === 1) {
        sessionStorage.setItem("selectedlesson", lesson.lessonId);
        onSelect(lesson);
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

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center overflow-hidden p-10 bg-cover bg-center transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${skyBackground})` }}
    >
      <h1 className="text-4xl sm:text-6xl text-center mb-4 p-10 text-slate-800 transition-transform duration-500 transform hover:scale-110">
        Mga Leksyon
      </h1>
      <div className="flex flex-wrap justify-center py-4 px-6 sm:px-0 transition-transform duration-500 transform hover:-translate-y-1">
        {currentEntries.map((lesson, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center m-4 transition-transform duration-500 transform hover:scale-105"
            onClick={() => handleLessonClick(index, lesson)}
          >
            <p className="text-center mb-2 transition-opacity duration-500 hover:opacity-70">
              Ikapila nga leksyon: {lesson.lessonNumber}
            </p>
            <img
              src={lesson.lessonThumbnail}
              alt={`Lesson ${lesson.lessonNumber} Thumbnail`}
              className="w-64 h-64 cursor-pointer transition-transform duration-500 transform hover:rotate-6"
            />
            <p className="mb-2 transition-opacity duration-500 hover:opacity-70">
              {lesson.lessonName}
            </p>
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
          disabled={indexOfLastEntry >= lessonChoices.length}
          className={`bg-blue-500 text-white rounded transition-colors duration-300 min-w-24 flex justify-center items-center ${
            indexOfLastEntry >= lessonChoices.length
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

export default LessonChoices;
