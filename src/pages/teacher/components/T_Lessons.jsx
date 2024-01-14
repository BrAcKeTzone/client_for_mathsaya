import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/styles/hideVerticalScrollbar.css";

function T_Lessons({ server_url, setActiveComponent }) {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [searchQueryLessons, setSearchQueryLessons] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${server_url}/lessons/lessons/:teacherId`
        );
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [selectedLesson, server_url]);

  const handleClickLesson = (lessonId) => {
    setSelectedLesson(lessonId);
  };

  return (
    <div>
      <h1 className="text-white text-6xl pt-4 pb-2">Lessons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          lessons.length > 0 &&
          lessons.map((lesson) => (
            <div
              key={lesson.lessonId}
              className="bg-white rounded-md overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => {
                  handleClickLesson(lesson.lessonId);
                }}
              >
                <img
                  src={lesson.lessonThumbnail}
                  alt={lesson.lessonName}
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4 flex flex-col h-full">
                  <div className="text-xl font-bold mb-2">
                    {lesson.lessonNumber}
                  </div>
                  <div className="text-base">{lesson.lessonName}</div>
                </div>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default T_Lessons;
