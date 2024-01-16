import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import T_TeacherInfo from "./components/T_TeacherInfo";
import T_Sections from "./components/Classrooms/T_Sections";
import T_Students from "./components/Classrooms/T_Students";
import T_Sections_Dashboard from "./components/Classrooms/T_Sections_Dashboard";
import T_Students_Dashboard from "./components/Classrooms/T_Students_Dashboard";
import T_Stud_Profile from "./components/Classrooms/T_Stud_Profile";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_Classrooms() {
  const Navigate = useNavigate();

  const [activeComponent, setActiveComponent] = useState("SectionsList");

  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentProfileId, setStudentProfileId] = useState(null);

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
    } catch (error) {
      alert(error);
      // Cookies.remove("tchr");
      // Navigate("/teach-login");
    }
  };

  const handleClickSection = (sectionId) => {
    setActiveComponent("StudentsList");
    setSelectedSectionId(sectionId);
  };

  const handleClickStudent = (studentId) => {
    setActiveComponent("ExercisesList");
    setSelectedStudentId(studentId);
  };

  useEffect(() => {
    checkTeacherId();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row  h-screen bg-blue-500">
      <div className="order-1 lg:order-1 lg:w-1/3 p-4 bg-">
        <T_TeacherInfo />
        {activeComponent === "SectionsList" && <T_Sections_Dashboard />}
        {activeComponent === "StudentsList" && <T_Students_Dashboard />}
      </div>
      <div className="order-2 lg:order-2 lg:w-2/3 p-3 md:max-h-max overflow-y-auto">
        <div className="h-full">
          <div className="px-4 py-1 border border-black rounded bg-blue-400">
            {activeComponent === "SectionsList" && (
              <T_Sections
                teacherId={teacher.id}
                setActiveComponent={setActiveComponent}
                server_url={server_url}
                handleClickSection={handleClickSection}
              />
            )}
            {activeComponent === "StudentsList" && (
              <T_Students
                teacherId={teacher.id}
                selectedSectionId={selectedSectionId}
                server_url={server_url}
                handleClickStudent={handleClickStudent}
              />
            )}
            {activeComponent === "StudentProfile" && (
              <T_Students
                selectedSectionId={selectedSectionId}
                server_url={server_url}
                handleClickStudent={handleClickStudent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default T_Classrooms;
