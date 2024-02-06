import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const ModalChangePass = ({
  isOpen,
  closeModal,
  server_url,
  userId,
  fetchUserInfo,
  currentEmail,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleVerifyPasswordChange = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await axios.put(`${server_url}/auth/verifyChangePass`, {
        userId,
        email: currentEmail,
        otp,
        newPassword,
      });
      setSuccessMessage("Password updated successfully");
      alert("Password updated successfully!");
      setTimeout(() => {
        closeModal();
      }, 2000);
      fetchUserInfo();
    } catch (error) {
      setError(error.response.data.error || "Failed to verify password change");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(`${server_url}/auth/changePass`, {
        userId,
        email: currentEmail,
        currentPassword,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.error || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Change Password"
      className="Modal max-w-md mx-auto mt-16 p-4 bg-white rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={closeModal}
        >
          <FaTimes />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto text-center">
        {successMessage && (
          <div className="flex flex-col justify-center min-h-[380px]">
            <p className="text-green-500 py-5">{successMessage}</p>
            <button
              className="bg-green-500 text-white p-2 mx-16 rounded-md hover:bg-green-400"
              onClick={() => {
                setSuccessMessage(null);
              }}
            >
              Okay
            </button>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {!successMessage && (
          <>
            <div className="mb-4">
              <label
                htmlFor="currentEmail"
                className="block text-sm font-medium text-gray-600"
              >
                Current Email
              </label>
              <input
                type="email"
                id="currentEmail"
                value={currentEmail}
                className="mt-1 p-2 w-full border rounded-md text-center"
                disabled={true}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-center"
                disabled={isLoading}
              />
            </div>
            <div className="">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-600"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-center"
                disabled={isLoading}
              />
              <div className="flex justify-end ">
                <button
                  type="button"
                  className={`px-2 mt-1 text-blue-500 hover:text-white hover:bg-blue-500 ${
                    isLoading ? "cursor-not-allowed" : ""
                  }`}
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-center"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white p-2 mx-2 rounded-md hover:bg-green-400"
                onClick={handleVerifyPasswordChange}
                disabled={isLoading}
              >
                Verify Password Change
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalChangePass;
