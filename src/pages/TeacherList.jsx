import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { GiArmorUpgrade } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";

import ModalEditSuperTeacher from "./components/modals/ModalEditSuperTeacher";

const server_url = import.meta.env.VITE_SERVER_LINK;

const TeacherList = () => {
  let usr = Cookies.get("SESSION_ID");

  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [teacherEntries, setTeacherEntries] = useState([]);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openEditModal = (userId) => {
    setEditTeacherId(userId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditTeacherId(null);
    setIsEditModalOpen(false);
  };

  const promoteTeacher = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to promote this teacher to have Admin previledges?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.put(`${server_url}/user/bypass/teacher/edit/${userId}`, {
        roleType: "Admin",
      });
      fetchTeacherEntries();
      console.log("Teacher promoted to Admin successfully.");
    } catch (error) {
      console.error("Error promoting teacher:", error);
    }
  };

  useEffect(() => {
    if (!usr) {
      alert("Session Expired. Re-login.");
      Navigate("/");
    } else {
      setIsLoading(false);
      fetchTeacherEntries();
    }
  }, [usr, Navigate]);

  usr = JSON.parse(Cookies.get("SESSION_ID"));

  const fetchTeacherEntries = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${server_url}/user/teachers/${usr.id}`);
      setTeacherEntries(response.data.teachers);
      setTotalTeachers(response.data.teacherCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTeacher = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`${server_url}/user/teacher/delete/${userId}`);
      fetchTeacherEntries();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeacherEntries = teacherEntries.filter((teacher) =>
    `${teacher.firstname} ${teacher.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-blue-500">
        <h1 className="text-white text-4xl pt-4 pb-2">TEACHER MANAGEMENT</h1>
        <div className="mx-4 w-full max-w-screen-lg">
          {!isLoading && (
            <div className="flex justify-between w-full mb-2 px-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white p-2 rounded border border-gray-300"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <button
                className="bg-blue-500 md:bg-white hover:bg-blue-300 p-2 rounded"
                onClick={fetchTeacherEntries}
              >
                <h2 className="hidden md:block">RELOAD</h2>
                <TfiReload className="block md:hidden text-white hover:text-black" />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-y-auto overflow-x-auto h-full mx-4 w-full max-w-screen-lg rounded-xl">
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <>
              <div className="flex items-center bg-white p-2 mb-1 rounded">
                <span className="text-gray-700 italic">
                  Total Teacher Count:
                </span>
                <span className="font-bold ml-2">{totalTeachers}</span>
              </div>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Gender</th>
                    <th className="py-2 px-4 border-b">School Name</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredTeacherEntries.length > 0 &&
                    filteredTeacherEntries.map((teacher) => (
                      <tr key={teacher.UserId} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">
                          {teacher.lastname}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {teacher.firstname}
                        </td>
                        <td className="py-2 px-4 border-b">{teacher.email}</td>
                        <td className="py-2 px-4 border-b">{teacher.gender}</td>
                        <td className="py-2 px-4 border-b">
                          {teacher.schoolName}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex justify-between">
                            <button
                              className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded"
                              onClick={() => promoteTeacher(teacher.UserId)}
                            >
                              <GiArmorUpgrade className="text-2xl" />
                            </button>
                            <button
                              className="bg-blue-500 hover:bg-blue-400 p-2 rounded"
                              onClick={() => openEditModal(teacher.UserId)}
                            >
                              <FaRegEdit className="text-2xl" />
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-400 p-2 rounded"
                              onClick={() =>
                                handleDeleteTeacher(teacher.UserId)
                              }
                            >
                              <FaTrashAlt className="text-2xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <ModalEditSuperTeacher
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        server_url={server_url}
        fetchTeacherEntries={fetchTeacherEntries}
        teacherId={editTeacherId}
      />
    </>
  );
};

export default TeacherList;
