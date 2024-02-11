import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";

Modal.setAppElement("#root");

const ModalViewLessonVideo = ({ isOpen, closeModal, server_url, lessonId }) => {
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
      className="Modal fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-md shadow-md"
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4">View Lesson Video</h2>
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
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 "
          onClick={closeModal}
        >
          <IoMdCloseCircleOutline className="text-4xl" />
        </button>
      </div>
    </Modal>
  );
};

export default ModalViewLessonVideo;
