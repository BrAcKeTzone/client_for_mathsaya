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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
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
      "Are you sure you want to promote this teacher to have Admin privileges?"
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
  }, [usr, currentPage, pageSize, Navigate]);

  usr = JSON.parse(Cookies.get("SESSION_ID"));

  const fetchTeacherEntries = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/user/teachers/${usr.id}`,
        {
          params: {
            page: currentPage,
            pageSize: pageSize,
            searchTerm: searchTerm,
          },
        }
      );
      if (response.data.teachers.rows) {
        setTeacherEntries(response.data.teachers.rows);
        setTotalTeachers(response.data.teachers.count);
      } else {
        setTeacherEntries(response.data.teachers);
        setTotalTeachers(response.data.totalCount);
      }
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

  const handleSearch = () => {
    fetchTeacherEntries();
  };

  const totalPages = Math.ceil(totalTeachers / pageSize);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-white">Page Size:</span>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="bg-white p-2 rounded border border-gray-300"
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
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
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Gender</th>
                    <th className="py-2 px-4 border-b">School Name</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {teacherEntries.map((teacher) => (
                    <tr key={teacher.UserId} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{teacher.lastname}</td>
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
                            onClick={() => handleDeleteTeacher(teacher.UserId)}
                          >
                            <FaTrashAlt className="text-2xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center my-4">
                <button
                  onClick={handlePreviousPage}
                  className="mx-1 py-1 px-3 rounded bg-blue-500 text-white"
                >
                  Previous
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`mx-1 py-1 px-3 rounded ${
                      currentPage === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  className="mx-1 py-1 px-3 rounded bg-blue-500 text-white"
                >
                  Next
                </button>
              </div>
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
