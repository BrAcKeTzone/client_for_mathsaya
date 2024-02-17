import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { FaBug } from "react-icons/fa";
// import ModalSendMessage from "./modals/ModalSendMessage";
import ModalUserInfo from "./modals/ModalUserInfo";

function Bottombar({ server_url, usr }) {
  // const [isSendMessageModalOpen, setSendMessageModalOpen] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

  const openSendMessageModal = () => {
    setSendMessageModalOpen(true);
  };

  const closeSendMessageModal = () => {
    setSendMessageModalOpen(false);
  };

  const openUserInfoModal = () => {
    setIsUserInfoModalOpen(true);
  };

  const closeUserInfoModal = () => {
    setIsUserInfoModalOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 p-2 bg-transparent z-10 flex justify-between items-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex flex-col items-center w-16 sm:w-28"
          onClick={openUserInfoModal}
        >
          <FiUser className="mr-2 text-xl" />
          <span className="hidden md:inline">Profile</span>
        </button>

        {/* <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex flex-col items-center w-16 sm:w-28"
          onClick={openSendMessageModal}
        >
          <FaBug className="mr-2 text-xl" />
          <span className="hidden md:inline">Report Bug</span>
        </button> */}
      </div>
      {/* <ModalSendMessage
        isOpen={isSendMessageModalOpen}
        closeModal={closeSendMessageModal}
        server_url={server_url}
        userId={usr}
      /> */}
      <ModalUserInfo
        isOpen={isUserInfoModalOpen}
        closeModal={closeUserInfoModal}
        server_url={server_url}
        userId={usr}
      />
    </>
  );
}

export default Bottombar;
