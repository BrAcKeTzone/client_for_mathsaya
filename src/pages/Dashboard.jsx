import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FaUserGraduate,
  FaBook,
  FaUsers,
  FaCubes,
  FaChalkboard,
  FaTasks,
  FaUserShield,
} from "react-icons/fa";

const server_url = import.meta.env.VITE_SERVER_LINK;

const Dashboard = ({ fetchUserRole }) => {
  let usr = Cookies.get("SESSION_ID");

  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [teacherData, setTeacherData] = useState();
  const [totalSections, setTotalSections] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalYunits, setTotalYunits] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);

  useEffect(() => {
    if (!usr) {
      alert("Session Expired. Re-login.");
      Navigate("/");
    } else {
      fetchUserRole();
      setIsLoading(false);
      fetchDashboardData();
    }
  }, [usr, Navigate]);

  const fetchDashboardData = async () => {
    try {
      usr = JSON.parse(Cookies.get("SESSION_ID"));
      setIsLoading(true);
      const infoResponse = await axios.get(`${server_url}/auth/${usr.id}`);
      setTeacherData(infoResponse.data);

      const statResponse = await axios.get(
        `${server_url}/user/stats/${usr.id}`
      );
      setTotalSections(statResponse.data.totalSections);
      setTotalStudents(statResponse.data.totalStudents);
      setTotalYunits(statResponse.data.totalYunits);
      setTotalLessons(statResponse.data.totalLessons);
      setTotalExercises(statResponse.data.totalExercises);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-blue-500">
        <h1 className="text-white text-4xl pt-4 pb-2">DASHBOARD</h1>
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4  p-3 md:max-h-max overflow-y-auto">
            <div className="flex flex-col items-center bg-blue-300 p-6 rounded shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              {teacherData.roleType === "Teacher" ? (
                <FaUserGraduate className="text-8xl mb-2" />
              ) : teacherData.roleType === "Admin" ? (
                <FaUserShield className="text-8xl mb-2" />
              ) : (
                <div className="text-8xl mb-2">Icon for other roles</div>
              )}
              <p className="text-xl font-bold underline">
                {teacherData.lastname}, {teacherData.firstname}
              </p>
              <p className="italic">{teacherData.roleType}</p>
            </div>
            <div className="flex flex-col items-center bg-yellow-300 p-6 rounded shadow-md hover:bg-yellow-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaBook className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalSections}</p>
              <p>Total Sections</p>
            </div>
            <div className="flex flex-col items-center bg-pink-300 p-6 rounded shadow-md hover:bg-pink-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaUsers className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalStudents}</p>
              <p>Total Students</p>
            </div>
            <div className="flex flex-col items-center bg-purple-300 p-6 rounded shadow-md hover:bg-purple-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaCubes className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalYunits}</p>
              <p>Total Yunits</p>
            </div>
            <div className="flex flex-col items-center bg-red-300 p-6 rounded shadow-md hover:bg-red-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaChalkboard className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalLessons}</p>
              <p>Total Lessons</p>
            </div>
            <div className="flex flex-col items-center bg-green-300 p-6 rounded shadow-md hover:bg-green-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaTasks className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalExercises}</p>
              <p>Total Exercises</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
