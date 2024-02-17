import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import ModalUserInfo from "./modals/ModalUserInfo";

function Bottombar({ server_url, usr }) {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

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
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md m-2 p-2 md:p-4 flex flex-col"
          onClick={openUserInfoModal}
        >
          <FiUser className="text-4xl md:text-2xl md:ml-3" />
          <span className="hidden md:inline">Profile</span>
        </button>
      </div>

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
