import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const ModalViewLessonVideo = ({
  isOpen,
  closeModal,
  server_url,
  lessonId,
  fetchLessons,
}) => {
  const [lessonVideo, setLessonVideo] = useState(null);

  useEffect(() => {
    const fetchLessonVideo = async () => {
      try {
        const response = await axios.get(
          `${server_url}/lessons/view/${lessonId}`
        );
        setLessonVideo(response.data.lessonVideo);
      } catch (error) {
        console.error("Error fetching lesson video:", error);
      }
    };

    if (isOpen && lessonId) {
      fetchLessonVideo();
    }
  }, [isOpen, lessonId, server_url]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="View Lesson Video Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">View Lesson Video</h2>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      <div>
        {lessonVideo ? (
          <video controls width="100%">
            <source src={`${lessonVideo}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No lesson video available.</p>
        )}
      </div>
    </Modal>
  );
};

export default ModalViewLessonVideo;
