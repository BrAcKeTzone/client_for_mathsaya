import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUserGraduate, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "../../assets/styles/hideVerticalScrollbar.css";
import Navbar from "./components/Navbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_TeacherList() {
  const Navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let superadmin = Cookies.get("spr");
    if (!superadmin) {
      Navigate("/super-login");
      return;
    }

    superadmin = JSON.parse(Cookies.get("spr"));

    const checkSuperAdminId = async () => {
      try {
        const response = await axios.post(
          `${server_url}/superadmin/check-superadmin/${superadmin.id}`
        );

        console.log(response.data.message);
        fetchTeachers();
      } catch (error) {
        Cookies.remove("spr");
        Navigate("/super-login");
      }
    };

    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${server_url}/superadmin/teachers`);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSuperAdminId();
  }, [Navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-emerald-600">
        <h1 className="text-white text-4xl pt-4 pb-2">Teacher List</h1>
        <div className="overflow-y-auto overflow-x-hidden max-h-[80vh]">
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
              {teachers.map((teacher) => (
                <div
                  key={teacher.teacherId}
                  className={`bg-green-300 hover:bg-green-200 flex justify-center flex-col items-center p-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  <FaUserGraduate className="text-8xl mb-2" />
                  <table className="flex justify-center flex-col items-center">
                    <th>
                      {teacher.firstname} {teacher.lastname}
                    </th>
                    <tr />
                    <td>{teacher.email}</td>
                    <tr />
                    <td>{teacher.gender}</td>
                    <tr />
                    <td className="grid grid-cols-2 gap-4 p-2 border-t-2">
                      <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded">
                        <FaRegEdit className="text-2xl" />
                      </button>
                      <button className="bg-red-500 hover:bg-red-400 p-2 rounded">
                        <FaTrashAlt className="text-2xl" />
                      </button>
                    </td>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SA_TeacherList;
