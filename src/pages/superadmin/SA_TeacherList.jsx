import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUserGraduate, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "../../assets/styles/hideVerticalScrollbar.css";
import ModalAddTeacher from "./components/ModalAddTeacher";
import ModalEditTeacher from "./components/ModalEditTeacher";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_TeacherList() {
  const Navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [modalKey, setModalKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

    checkSuperAdminId();
  }, [Navigate]);

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

  const handleDeleteTeacher = async (teacherId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `${server_url}/superadmin/delete-teacher/${teacherId}`
      );

      fetchSuperAdmins();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const openAddModal = () => {
    console.log("Modal ADD open");
    setModalKey((prevKey) => prevKey + 1);
    setIsAddModalOpen(true);
  };

  const openEditModal = (superAdminId) => {
    console.log("Modal EDIT open");
    setEditTeacherId(superAdminId);
    setModalKey((prevKey) => prevKey + 1);
    setIsEditModalOpen(true);
  };

  const closeAddModal = () => {
    console.log("Modal ADD close");
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    console.log("Modal EDIT close");
    setIsEditModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstname} ${teacher.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-green-500">
        <h1 className="text-white text-6xl pt-4 pb-2">Teacher List</h1>
        <div className="mx-1">
          {!isLoading && (
            <div className="flex justify-between w-full mb-2 pr-2 pl-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white p-2 rounded mr-2"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-400 p-2 rounded"
                onClick={openAddModal}
              >
                <h2>ADD TEACHER</h2>
              </button>
            </div>
          )}
        </div>
        <div className="overflow-y-auto overflow-x-hidden h-full">
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.teacherId}
                  className={`bg-green-500 hover:bg-green-400 flex justify-center flex-col items-center p-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  <FaUserGraduate className="text-8xl mb-2" />
                  <table className="flex justify-center flex-col items-center ">
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
                        <FaRegEdit
                          className="text-2xl"
                          onClick={() => openEditModal(teacher.teacherId)}
                        />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 p-2 rounded"
                        onClick={() => handleDeleteTeacher(teacher.teacherId)}
                      >
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
      <ModalAddTeacher
        key={modalKey}
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        fetchTeachers={fetchTeachers}
      />
      <ModalEditTeacher
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        fetchTeachers={fetchTeachers}
        teacherId={editTeacherId}
      />
    </>
  );
}

export default SA_TeacherList;
