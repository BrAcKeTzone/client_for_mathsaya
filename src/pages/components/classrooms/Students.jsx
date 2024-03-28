import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { CgBoy, CgGirl } from "react-icons/cg";
import ModalAddStudent from "../modals/ModalAddStudent";
import ModalEditStudent from "../modals/ModalEditStudent";

function Students({
  teacherId,
  selectedSectionId,
  server_url,
  handleClickStudent,
  goBack,
}) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQueryStudents, setSearchQueryStudents] = useState("");
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const openAddStudentModal = () => {
    setIsAddStudentModalOpen(true);
  };

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
  };

  const openEditStudentModal = (studentId) => {
    setSelectedStudentId(studentId);
    setIsEditStudentModalOpen(true);
  };

  const closeEditStudentModal = () => {
    setSelectedStudentId(null);
    setIsEditStudentModalOpen(false);
  };

  const fetchStudents = async (selectedSectionId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/students/${selectedSectionId}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
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

  useEffect(() => {
    fetchStudents(selectedSectionId);
  }, [selectedSectionId]);

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
            ADD STUDENT
          </button>
        </div>
      </div>
      <div className="flex justify-end pt-1">
        <button
          className="w-[89px] p-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center relative"
          onClick={goBack}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaArrowLeft
            className={`opacity-0 transition-opacity ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <span
            className={`opacity-0 transition-opacity ${
              !isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Back
          </span>
        </button>
      </div>
      <div className="p-2">
        {isLoading ? (
          <div className="text-center py-4">
            <span className="loader"></span>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.studentId}
              className="border border-gray-400 mb-2 p-2 flex items-center justify-between transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 hover:text-white"
            >
              <button
                onClick={() => {
                  handleClickStudent(student.studentId);
                }}
              >
                <div className="flex">
                  <div className="flex flex-row">
                    <div className="min-w-6 md:min-w-20 md:border-r border-blue-700">
                      {student.gender === "Male" ? (
                        <CgBoy className="rounded-full text-2xl bg-blue-500 inline-block" />
                      ) : (
                        <CgGirl className="rounded-full text-2xl bg-pink-500 inline-block" />
                      )}
                    </div>
                    <div className="min-w-20 md:min-w-32 md:border-r border-blue-700">
                      {student.username}
                    </div>
                    <div className="min-w-20 md:min-w-32 text-left md:pl-10">
                      {student.lastname}, {student.firstname}
                    </div>
                  </div>
                </div>
              </button>
              <div className="flex flex-row md:border-l border-blue-700 md:pl-2">
                <button
                  className="bg-blue-600 hover:bg-blue-400 p-2 rounded mx-1"
                  onClick={() => openEditStudentModal(student.studentId)}
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  className="bg-red-600 hover:bg-red-400 p-2 rounded mx-1"
                  onClick={() => handleDeleteStudent(student.studentId)}
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
      <ModalEditStudent
        isOpen={isEditStudentModalOpen}
        closeModal={closeEditStudentModal}
        server_url={server_url}
        fetchStudents={fetchStudents}
        selectedSectionId={selectedSectionId}
        teacherId={teacherId}
        studentId={selectedStudentId}
      />
    </>
  );
}

export default Students;
