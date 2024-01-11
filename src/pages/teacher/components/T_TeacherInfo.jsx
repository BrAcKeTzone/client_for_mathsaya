import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUserGraduate } from "react-icons/fa6";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_TeacherInfo() {
  const [teacherData, setTeacherData] = useState({});
  const [showData, setShowData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const teacher = JSON.parse(Cookies.get("tchr"));

    const fetchTeacherData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${server_url}/teachers/display/${teacher.id}`
        );
        setTeacherData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherData();
  }, [Navigate]);

  const toggleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div className="bg-blue-600 text-white p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Teacher Information</h2>
        <button
          className="text-white bg-blue-800 px-4 py-2 rounded"
          onClick={toggleShowData}
        >
          {showData ? "Hide" : "Show"}
        </button>
      </div>

      {showData && (
        <>
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="flex flex-col items-center">
              <FaUserGraduate className="text-white text-8xl" />
              <p>
                <strong>Name:</strong> {teacherData.firstname}{" "}
                {teacherData.lastname}
              </p>
              <p>
                <strong>Email:</strong> {teacherData.email}
              </p>
              <p>
                <strong>School:</strong> {teacherData.schoolName}
              </p>
              <p>
                <strong>Gender:</strong> {teacherData.gender}
              </p>
              {/* You can add more information based on your needs */}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default T_TeacherInfo;
