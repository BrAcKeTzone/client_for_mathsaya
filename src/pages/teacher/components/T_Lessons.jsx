import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/styles/hideVerticalScrollbar.css";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_Lessons() {
  const [units, setLessons] = useState([
    {
      lessonId: "1",
      lessonNumber: "101",
      lessonName: "Introduction to React",
      lessonThumbnail:
        "https://static.wikia.nocookie.net/vsbattles/images/7/70/Kid_goku_render_xkeeperz_by_maxiuchiha22_dd2jqul.png/revision/latest?cb=20190816232153",
    },
    {
      lessonId: "2",
      lessonNumber: "102",
      lessonName: "Advanced React Concepts",
      lessonThumbnail:
        "https://static.wikia.nocookie.net/vsbattles/images/7/70/Kid_goku_render_xkeeperz_by_maxiuchiha22_dd2jqul.png/revision/latest?cb=20190816232153",
    },
    {
      lessonId: "3",
      lessonNumber: "103",
      lessonName: "Advanced React Concepts",
      lessonThumbnail:
        "https://static.wikia.nocookie.net/vsbattles/images/7/70/Kid_goku_render_xkeeperz_by_maxiuchiha22_dd2jqul.png/revision/latest?cb=20190816232153",
    },
    {
      lessonId: "4",
      lessonNumber: "104",
      lessonName: "Advanced React Concepts",
      lessonThumbnail:
        "https://static.wikia.nocookie.net/vsbattles/images/7/70/Kid_goku_render_xkeeperz_by_maxiuchiha22_dd2jqul.png/revision/latest?cb=20190816232153",
    },
  ]);
  //   const [units, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("");

  useEffect(() => {
    console.log(selectedLesson);
    //     const fetchLessons = async () => {
    //       try {
    //         setIsLoading(true);
    //         const response = await axios.get(`${server_url}/teacher/units`);
    //         setLessons(response.data);
    //       } catch (error) {
    //         console.error("Error fetching units:", error);
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };

    //     fetchLessons();
  }, [selectedLesson]);

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
          units.map((lesson) => (
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
