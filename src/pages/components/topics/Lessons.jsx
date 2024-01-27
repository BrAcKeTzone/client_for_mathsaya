import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import ModalAddLesson from "../modals/ModalAddLesson";

function Lessons({ teacherId, selectedUnitId, server_url, handleClickLesson }) {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQueryLessons, setSearchQueryLessons] = useState("");
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);

  const openAddLessonModal = () => {
    setIsAddLessonModalOpen(true);
  };

  const closeAddLessonModal = () => {
    setIsAddLessonModalOpen(false);
  };

  const fetchLessons = async (selectedUnitId) => {
    try {
      console.log(selectedUnitId);
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/lessons/${selectedUnitId}`
      );
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${server_url}/lessons/delete/${id}`, {});
      fetchLessons(selectedUnitId);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchLessons(selectedUnitId);
  }, [selectedUnitId]);

  const filteredLessons = lessons.filter((lesson) => {
    const { lessonNumber, lessonName } = lesson;
    const searchValue = searchQueryLessons.toLowerCase();
    return (
      lessonNumber.toString().toLowerCase().includes(searchValue) ||
      lessonName.toString().toLowerCase().includes(searchValue)
    );
  });

  const handleSearchChangeLessons = (e) => {
    setSearchQueryLessons(e.target.value);
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
        <h1 className="text-white text-6xl pt-4 pb-2">LESSONS</h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-4">
          <input
            type="text"
            placeholder="Search Lessons"
            value={searchQueryLessons}
            onChange={handleSearchChangeLessons}
            className="p-2 border rounded"
          />
          <button
            className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={openAddLessonModal}
          >
            ADD NEW
          </button>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          filteredLessons.length > 0 &&
          filteredLessons.map((lesson) => (
            <div
              key={lesson.lessonId}
              className="flex flex-col bg-blue-500 rounded-t-none rounded-b mr-2 overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => {
                  handleClickLesson(lesson.lessonId);
                }}
              >
                <img
                  src={lesson.lessonThumbnail}
                  alt={lesson.lessonName}
                  className="w-full h-24 object-cover object-center"
                />
                <div className="p-2 flex flex-col h-full min-h-20">
                  <div className="text-xl font-bold mb-2">
                    {lesson.lessonNumber}
                  </div>
                  <div className="text-base">{lesson.lessonName}</div>
                  <div className="text-sm italic ">
                    {truncatedDescription(lesson.lessonDescription)}
                  </div>
                </div>
              </button>
              <div className="flex justify-center p-2 border-t-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded mx-1"
                  onClick={() => {
                    console.log(
                      `Edit button clicked for lesson ${lesson.lessonId}`
                    );
                  }}
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 p-2 rounded mx-1"
                  onClick={() => handleDeleteLesson(lesson.lessonId)}
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ModalAddLesson
        teacherId={teacherId}
        selectedUnitId={selectedUnitId}
        server_url={server_url}
        isOpen={isAddLessonModalOpen}
        closeModal={closeAddLessonModal}
        fetchLessons={fetchLessons}
      />
    </>
  );
}

export default Lessons;
