import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Sections from "./components/classrooms/Sections";
import Students from "./components/classrooms/Students";
import StudProfile from "./components/classrooms/StudProfile";

const server_url = import.meta.env.VITE_SERVER_LINK;

function Topics() {
  let usr = Cookies.get("SESSION_ID");

  const Navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("SectionsList");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    if (!usr) {
      alert("Session Expired. Re-login.");
      Navigate("/");
    }
  }, [usr, Navigate]);

  usr = JSON.parse(Cookies.get("SESSION_ID"));

  const handleClickSection = (sectionId) => {
    setActiveComponent("StudentsList");
    setSelectedSectionId(sectionId);
    sessionStorage.setItem("sEc", sectionId);
  };

  const handleClickStudent = (studentId) => {
    setActiveComponent("StudProfile");
    setSelectedStudentId(studentId);
    sessionStorage.setItem("sTu", studentId);
  };

  const goBack2Dashboard = () => {
    Navigate("/dash");
  };

  const goBack2Section = () => {
    setActiveComponent("SectionsList");
  };

  const goBack2Student = () => {
    setActiveComponent("StudentsList");
    setSelectedSectionId(sessionStorage.getItem("sEc"));
  };

  return (
    <div className="flex flex-col lg:flex-row  h-screen bg-blue-500">
      <div className="order-2 lg:order-2 lg:w-2/3 p-3 md:max-h-max overflow-y-auto mx-auto ">
        <div className="h-full">
          <div className="px-4 py-1 border border-black rounded bg-blue-400">
            {activeComponent === "SectionsList" && (
              <Sections
                teacherId={usr.id}
                server_url={server_url}
                handleClickSection={handleClickSection}
                goBack={goBack2Dashboard}
              />
            )}
            {activeComponent === "StudentsList" && (
              <Students
                teacherId={usr.id}
                selectedSectionId={selectedSectionId}
                server_url={server_url}
                handleClickStudent={handleClickStudent}
                goBack={goBack2Section}
              />
            )}
            {activeComponent === "StudProfile" && (
              <StudProfile
                teacherId={usr.id}
                selectedStudentId={selectedStudentId}
                server_url={server_url}
                goBack={goBack2Student}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topics;
