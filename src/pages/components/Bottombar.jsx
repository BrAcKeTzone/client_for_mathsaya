import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { FaBug } from "react-icons/fa";
import ModalSendMessage from "./modals/ModalSendMessage";

function Bottombar({ server_url, usr }) {
  const [isSendMessageModalOpen, setSendMessageModalOpen] = useState(false);

  const openSendMessageModal = () => {
    setSendMessageModalOpen(true);
  };

  const closeSendMessageModal = () => {
    setSendMessageModalOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 p-2 bg-transparent z-20 flex justify-between items-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex flex-col items-center"
          onClick={() => console.log("Profile Clicked")}
        >
          <FiUser className="mr-2" />
          Profile
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex flex-col items-center"
          onClick={openSendMessageModal}
        >
          <FaBug className="mr-2" />
          Report Bug
        </button>
      </div>
      {isSendMessageModalOpen && (
        <ModalSendMessage
          isOpen={isSendMessageModalOpen}
          closeModal={closeSendMessageModal}
          server_url={server_url}
          userId={usr}
        />
      )}
    </>
  );
}

export default Bottombar;
