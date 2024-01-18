import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { CgBoy, CgGirl } from "react-icons/cg";
import "../../../../assets/styles/hideVerticalScrollbar.css";
import ModalAddStudent from "../Modals/ModalAddStudent";

function T_Students({
  teacherId,
  selectedSectionId,
  server_url,
  handleClickStudent,
}) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQueryStudents, setSearchQueryStudents] = useState("");
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const openAddStudentModal = () => {
    setIsAddStudentModalOpen(true);
  };

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
  };

  useEffect(() => {
    fetchStudents(selectedSectionId);
  }, [selectedSectionId, server_url]);

  const fetchStudents = async (selectedSectionId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/students/list/${selectedSectionId}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${server_url}/students/delete/${id}`, {});
      fetchStudents(selectedSectionId);
    } catch (error) {
      alert(error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const { firstname, lastname, username } = student;
    const searchValue = searchQueryStudents.toLowerCase();
    return (
      firstname.toString().toLowerCase().includes(searchValue) ||
      lastname.toString().toLowerCase().includes(searchValue) ||
      username.toString().toLowerCase().includes(searchValue)
    );
  });

  const handleSearchChangeStudents = (e) => {
    setSearchQueryStudents(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-white text-6xl pt-4 pb-2">STUDENTS</h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-4">
          <input
            type="text"
            placeholder="Search Students"
            value={searchQueryStudents}
            onChange={handleSearchChangeStudents}
            className="p-2 border rounded"
          />
          <button
            className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={openAddStudentModal}
          >
            ADD NEW
          </button>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          filteredStudents.length > 0 &&
          filteredStudents.map((student) => (
            <div
              key={student.studentId}
              className="flex flex-col bg-blue-500 rounded-t-none rounded-b mr-2 overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => {
                  handleClickStudent(student.studentId);
                }}
              >
                <div className="bg-slate-700 w-full flex justify-center">
                  {student.gender === "Male" ? (
                    <CgBoy className="text-9xl text-white" />
                  ) : (
                    student.gender === "Female" && (
                      <CgGirl className="text-9xl text-white" />
                    )
                  )}
                </div>
                <div className="bg-slate-300 text-xl py-1">
                  {student.username}
                </div>
                <div className="p-4 flex flex-col h-full min-h-16">
                  <div className="text-base font-bold mb-2">
                    {student.lastname}
                    {", "}
                    {student.firstname}
                  </div>
                </div>
              </button>
              <div className="flex justify-center p-2 border-t-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded mx-1"
                  onClick={() => {
                    console.log(
                      `Edit button clicked for student ${student.studentId}`
                    );
                  }}
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 p-2 rounded mx-1"
                  onClick={() => handleDeleteSection(student.studentId)}
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ModalAddStudent
        teacherId={teacherId}
        selectedSectionId={selectedSectionId}
        server_url={server_url}
        isOpen={isAddStudentModalOpen}
        closeModal={closeAddStudentModal}
        fetchStudents={fetchStudents}
      />
    </>
  );
}

export default T_Students;
