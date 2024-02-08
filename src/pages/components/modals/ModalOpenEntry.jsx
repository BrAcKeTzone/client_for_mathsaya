import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const ModalOpenEntry = ({
  isOpen,
  closeModal,
  server_url,
  userId,
  emailId,
}) => {
  const [entryInfo, setEntryInfo] = useState(null);

  const fetchEntryInfo = async () => {
    try {
      const response = await axios.get(
        `${server_url}/user/inbox/view/${emailId}/${userId}`
      );
      setEntryInfo(response.data);
    } catch (error) {
      console.error("Error fetching entry information", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEntryInfo();
    }
  }, [isOpen, emailId, userId, server_url]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Entry Information"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-white rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bug Report Entry</h2>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={closeModal}
        >
          <FaTimes />
        </button>
      </div>
      <div className="max-h-[500px] overflow-y-auto text-left">
        {entryInfo && (
          <div>
            <p className="mb-2">
              <span className="font-semibold text-lg">From: </span>
              <span>{entryInfo.teacherEmail}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-lg">Subject: </span>
              <span>{entryInfo.subject}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-lg">Date: </span>
              <span>{new Date(entryInfo.createdAt).toLocaleString()}</span>
            </p>
            <div className="mb-2">
              <span className="font-semibold text-lg">Content: </span>
              <p className="break-all bg-gray-100 px-2 rounded-md">
                {entryInfo.content}
              </p>
            </div>
            {entryInfo.attachment && (
              <div className="mb-2">
                <span className="font-semibold text-lg">Attachment: </span>
                <img
                  src={entryInfo.attachment}
                  alt="Attachment"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalOpenEntry;
