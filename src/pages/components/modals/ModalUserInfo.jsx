import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FaEnvelope, FaKey, FaTimes, FaEdit } from "react-icons/fa";
import ModalChangeEmail from "./ModalChangeEmail";
import ModalChangePass from "./ModalChangePass";
import ModalEditUser from "./ModalEditUser";

Modal.setAppElement("#root");

const ModalUserInfo = ({ isOpen, closeModal, server_url, userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isChangeEmailModalOpen, setChangeEmailModalOpen] = useState(false);
  const [isChangePassModalOpen, setChangePassModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${server_url}/user/teacher/${userId}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user information", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserInfo();
    }
  }, [isOpen, userId, server_url]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="User Information"
        className="Modal max-w-md mx-auto mt-16 p-4 bg-white rounded-md shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={closeModal}
          >
            <FaTimes />
          </button>
        </div>
        <div className="max-h-[500px] overflow-y-auto text-center">
          {userInfo && (
            <div>
              <p className="mb-2 flex flex-col">
                <span className="font-semibold text-xl">
                  {userInfo.firstname}
                </span>
                <span className="border "></span>
                <span>First Name</span>
              </p>
              <p className="mb-2 flex flex-col">
                <span className="font-semibold text-xl">
                  {userInfo.lastname}
                </span>
                <span className="border "></span>
                <span>Last Name</span>
              </p>
              <p className="mb-2 flex flex-col">
                <span className="font-semibold text-xl">{userInfo.gender}</span>
                <span className="border "></span>
                <span>Gender</span>
              </p>
              <p className="mb-2 flex flex-col">
                <span className="font-semibold text-xl">{userInfo.email}</span>
                <span className="border "></span>
                <span>Email Adress</span>
              </p>
              <p className="mb-2 flex flex-col">
                <span className="font-semibold text-xl">
                  {userInfo.schoolName}
                </span>
                <span className="border "></span>
                <span>School Name</span>
              </p>
              <p className="mb-2 flex flex-col">
                <span className="font-semibold text-xl">
                  {userInfo.roleType}
                </span>
                <span className="border "></span>
                <span>Privileges</span>
              </p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2">
            <button
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400 flex flex-col items-center"
              onClick={() => {
                setChangeEmailModalOpen(true);
              }}
            >
              <FaEnvelope className="text-2xl" />
              <span className="text-xl md:text-sm">Change Email</span>
            </button>
            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 flex flex-col items-center"
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              <FaEdit className="text-2xl" />
              <span className="text-xl md:text-sm"> Edit Information</span>
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-400 flex flex-col items-center"
              onClick={() => {
                setChangePassModalOpen(true);
              }}
            >
              <FaKey className="text-2xl" />
              <span className="text-xl md:text-sm"> Change Password</span>
            </button>
          </div>
        </div>
      </Modal>
      {isChangeEmailModalOpen && (
        <ModalChangeEmail
          isOpen={isChangeEmailModalOpen}
          closeModal={() => setChangeEmailModalOpen(false)}
          server_url={server_url}
          userId={userId}
          fetchUserInfo={fetchUserInfo}
          currentEmail={userInfo.email}
        />
      )}
      {isEditModalOpen && (
        <ModalEditUser
          isOpen={isEditModalOpen}
          closeModal={() => setEditModalOpen(false)}
          server_url={server_url}
          userId={userId}
          fetchUserInfo={fetchUserInfo}
        />
      )}
      {isChangePassModalOpen && (
        <ModalChangePass
          isOpen={isChangePassModalOpen}
          closeModal={() => setChangePassModalOpen(false)}
          server_url={server_url}
          userId={userId}
          fetchUserInfo={fetchUserInfo}
          currentEmail={userInfo.email}
        />
      )}
    </>
  );
};

export default ModalUserInfo;
