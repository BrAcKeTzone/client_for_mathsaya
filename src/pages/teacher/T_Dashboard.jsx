import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FaBook,
  FaUsers,
  FaCubes,
  FaChalkboard,
  FaTasks,
} from "react-icons/fa";
import Navbar from "./components/Navbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_Dashboard() {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalSections, setTotalSections] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalYunits, setTotalYunits] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);

  useEffect(() => {
    let teacher = Cookies.get("tchr");
    if (!teacher) {
      Navigate("/teach-login");
      return;
    }

    teacher = JSON.parse(Cookies.get("tchr"));

    const checkTeacherId = async () => {
      try {
        const response = await axios.get(
          `${server_url}/teachers/check-teacher/${teacher.id}`
        );
        console.log(response.data.message);
        fetchData();
      } catch (error) {
        Cookies.remove("tchr");
        Navigate("/teach-login");
      }
    };

    const fetchTeacherData = async () => {
      try {
        console.log(teacher.id);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${server_url}/dashboard/${teacher.id}`
        );

        setTotalSections(response.data.totalSections);
        setTotalStudents(response.data.totalStudents);
        setTotalYunits(response.data.totalYunits);
        setTotalLessons(response.data.totalLessons);
        setTotalExercises(response.data.totalExercises);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTeacherId();
    fetchTeacherData();
  }, [Navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-blue-500">
        <h1 className="text-white text-6xl pt-4 pb-2">Dashboard</h1>
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-3">
            <div className="bg-yellow-300 p-6 rounded shadow-md hover:bg-yellow-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaBook className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalSections}</p>
              <p>Total Sections</p>
            </div>
            <div className="bg-pink-300 p-6 rounded shadow-md hover:bg-pink-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaUsers className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalStudents}</p>
              <p>Total Students</p>
            </div>
            <div className="bg-purple-300 p-6 rounded shadow-md hover:bg-purple-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaCubes className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalYunits}</p>
              <p>Total Yunits</p>
            </div>
            <div className="bg-red-300 p-6 rounded shadow-md hover:bg-red-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaChalkboard className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalLessons}</p>
              <p>Total Lessons</p>
            </div>
            <div className="bg-green-300 p-6 rounded shadow-md hover:bg-green-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <FaTasks className="text-8xl mb-2" />
              <p className="text-xl font-bold">{totalExercises}</p>
              <p>Total Exercises</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default T_Dashboard;
