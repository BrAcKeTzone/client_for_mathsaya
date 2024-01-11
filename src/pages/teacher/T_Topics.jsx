import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import T_TeacherInfo from "./components/T_TeacherInfo";
import T_Units from "./components/T_Units";
import T_Lessons from "./components/T_Lessons";
import T_Exercises from "./components/T_Exercises";
import T_Questions from "./components/T_Questions";
import T_Unit_Dashboard from "./components/T_Unit_Dashboard";
import T_Lesson_Dashboard from "./components/T_Lesson_Dashboard";
import T_Exercise_Dashboard from "./components/T_Exercise_Dashboard";
import T_Question_Dashboard from "./components/T_Question_Dashboard";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_Topics() {
  const Navigate = useNavigate();

  const [activeComponent, setActiveComponent] = useState("UnitsList");
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentProfilesInfo, setStudentProfilesInfo] = useState([]);

  const [yunits, setYunits] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [selectedYunitId, setSelectedYunitId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentProfileId, setStudentProfileId] = useState(null);

  const [searchQueryYunits, setSearchQueryYunits] = useState("");
  const [searchQueryLessons, setSearchQueryLessons] = useState("");
  const [searchQueryExercises, setSearchQueryExercises] = useState("");
  const [searchQueryQuestions, setSearchQueryQuestions] = useState("");
  const [searchQueryStudents, setSearchQueryStudents] = useState("");
  const [searchQuerySections, setSearchQuerySections] = useState("");

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
      } catch (error) {
        alert(error);
        // Cookies.remove("tchr");
        // Navigate("/teach-login");
      }
    };

    checkTeacherId();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row  h-screen bg-blue-500">
      <div className="order-1 lg:order-1 lg:w-1/3 p-4 bg-">
        <T_TeacherInfo />
        {activeComponent === "UnitsList" && <T_Unit_Dashboard />}
        {activeComponent === "LessonsList" && <T_Lesson_Dashboard />}
        {activeComponent === "ExercisesList" && <T_Exercise_Dashboard />}
        {activeComponent === "QuestionsList" && <T_Question_Dashboard />}
      </div>
      <div className="order-2 lg:order-2 lg:w-2/3 p-3 md:max-h-max overflow-y-auto">
        <div className="h-full">
          <div>
            {activeComponent === "UnitsList" && (
              <T_Units
                setActiveComponent={setActiveComponent}
                server_url={server_url}
              />
            )}
            {activeComponent === "LessonsList" && (
              <T_Lessons
                selectedYunitId={selectedYunitId}
                setActiveComponent={setActiveComponent}
                server_url={server_url}
              />
            )}
            {activeComponent === "ExercisesList" && (
              <T_Exercises
                selectedLessonId={selectedLessonId}
                setActiveComponent={setActiveComponent}
                server_url={server_url}
              />
            )}
            {activeComponent === "QuestionsList" && (
              <T_Questions
                selectedExerciseId={selectedExerciseId}
                setActiveComponent={setActiveComponent}
                server_url={server_url}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default T_Topics;
