import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const ModalAddLessonVideo = ({
  isOpen,
  closeModal,
  server_url,
  lessonId,
  fetchLessons,
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [existingVideo, setExistingVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchExistingVideo = async () => {
      try {
        const response = await axios.get(
          `${server_url}/lessons/view/${lessonId}`
        );
        setExistingVideo(response.data.lessonVideo);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching existing video:", error);
      }
    };

    if (isOpen && lessonId) {
      fetchExistingVideo();
    }
  }, [isOpen, lessonId, server_url]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
  };

  const handleUpload = async () => {
    try {
      if (!selectedVideo) {
        alert("Please select a video file.");
        return;
      }

      const formData = new FormData();
      formData.append("lessonVideo", selectedVideo);

      setIsUploading(true);

      await axios.put(
        `${server_url}/lessons/upload-video/${lessonId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      closeModal();
      fetchLessons();

      alert("Video uploaded successfully");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Video upload failed");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isUploading ? null : closeModal}
      contentLabel="Add Lesson Video Modal"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upload Lesson Video</h2>
        <button
          className="text-gray-500 hover:text-red-500"
          disabled={isUploading}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      <div className="mb-4">
        {existingVideo && (
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Existing Video:
            </p>
            <video
              controls
              className="w-full h-auto"
              src={existingVideo}
              type="video/mp4"
            ></video>
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="lessonVideo"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Select Video File:
        </label>
        <input
          type="file"
          id="lessonVideo"
          name="lessonVideo"
          onChange={handleVideoChange}
          className="mt-1 p-2 w-full border rounded-md"
          disabled={isUploading}
        />
      </div>
      {isUploading && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600 mb-2">
            Uploading... {uploadProgress}%
          </p>
          <div className="bg-blue-200 h-4 rounded-full">
            <div
              className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end w-full mt-4 pr-2">
        <button
          type="button"
          className="bg-blue-500 text-white p-2 mx-1 rounded-md hover:bg-blue-400"
          disabled={isUploading}
          onClick={handleUpload}
        >
          {isUploading ? <span className="please_wait"></span> : "UPLOAD"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddLessonVideo;
