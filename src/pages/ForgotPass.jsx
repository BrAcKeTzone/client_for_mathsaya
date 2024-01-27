import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Logo from "../assets/images/logo.png";

const server_url = import.meta.env.VITE_SERVER_LINK;
const usr = Cookies.get("SESSION_ID");

const ForgotPass = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const startCountdown = () => {
    setIsOtpSent(true);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsOtpSent(false);
      setCountdown(300);
    }, 300000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSendOtp = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${server_url}/auth/forgotPass`, {
        email: formData.email,
      });
      if (response.status === 200) {
        startCountdown();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.response && error.response.status === 400) {
        alert("Email address not found");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.email) {
      setLoginError("Email is required");
      return;
    }

    if (!formData.otp) {
      setLoginError("OTP is required");
      return;
    }

    if (!formData.newPassword) {
      setLoginError("New Password is required");
      return;
    }

    if (!formData.confirmPassword) {
      setLoginError("Confirm Password is required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setLoginError("Passwords do not match");
      return;
    }

    try {
      console.log("Submitting form with values:", formData);
      setIsSubmitting(true);

      const response = await axios.put(
        `${server_url}/auth/verifyForgotPass`,
        formData
      );
      console.log("Password reset successful:", response.data);
      alert("Password reset successful");
      Navigate("/");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Password reset failed. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading ? (
        <div className="fullLoader"></div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} className="size-20 m-2" alt="Logo" />
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Forgot Password
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            {loginError && <div className="text-red-600">{loginError}</div>}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                onClick={() => setLoginError("")}
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                className={`w-full px-3 py-2 border ${
                  formData.email && loginError
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="mb-4">
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  onClick={() => setLoginError("")}
                  onChange={handleChange}
                  value={formData.otp}
                  placeholder="OTP"
                  className={`w-full px-3 py-2 border ${
                    formData.otp && loginError
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:ring focus:border-blue-300`}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  className={`px-2 mt-1 text-blue-500 hover:text-white hover:bg-blue-500 ${
                    isOtpSent || !formData.email ? "cursor-not-allowed" : ""
                  }`}
                  onClick={handleSendOtp}
                  disabled={isSubmitting || isOtpSent || !formData.email}
                >
                  {isOtpSent ? `Resend OTP (${countdown}s)` : "Send OTP"}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <input
                    type={formData.showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    onClick={() => setLoginError("")}
                    onChange={handleChange}
                    value={formData.newPassword}
                    placeholder="New Password"
                    className={`w-full px-3 py-2 border ${
                      formData.newPassword && loginError
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:ring focus:border-blue-300`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                    onClick={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        showPassword: !prevData.showPassword,
                      }))
                    }
                  >
                    {formData.showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 12l2-2m0 0l6-6 6 6m-6-6L6 12m6 6l6-6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 15v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h9a2 2 0 012 2v1"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={formData.showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    onClick={() => setLoginError("")}
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    className={`w-full px-3 py-2 border ${
                      formData.confirmPassword && loginError
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:ring focus:border-blue-300`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                    onClick={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        showConfirmPassword: !prevData.showConfirmPassword,
                      }))
                    }
                  >
                    {formData.showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 12l2-2m0 0l6-6 6 6m-6-6L6 12m6 6l6-6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 15v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h9a2 2 0 012 2v1"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="please_wait"></span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-blue-500 px-2 hover:text-white hover:bg-blue-500"
                onClick={() => Navigate("/")}
              >
                Back to Sign In
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPass;