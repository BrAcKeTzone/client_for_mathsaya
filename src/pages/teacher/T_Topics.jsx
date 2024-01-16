import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import T_TeacherInfo from "./components/T_TeacherInfo";
import T_Units from "./components/Topics/T_Units";
import T_Lessons from "./components/Topics/T_Lessons";
import T_Exercises from "./components/Topics/T_Exercises";
import T_Questions from "./components/Topics/T_Questions";
import T_Unit_Dashboard from "./components/Topics/T_Unit_Dashboard";
import T_Lesson_Dashboard from "./components/Topics/T_Lesson_Dashboard";
import T_Exercise_Dashboard from "./components/Topics/T_Exercise_Dashboard";
import T_Question_Dashboard from "./components/Topics/T_Question_Dashboard";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_Topics() {
  const Navigate = useNavigate();

  const [activeComponent, setActiveComponent] = useState("UnitsList");

  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

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

  const handleClickUnit = (yunitId) => {
    setActiveComponent("LessonsList");
    setSelectedUnitId(yunitId);
  };

  const handleClickLesson = (lessonId) => {
    setActiveComponent("ExercisesList");
    setSelectedLessonId(lessonId);
  };

  const handleClickExercise = (exerciseId) => {
    setActiveComponent("QuestionsList");
    setSelectedExerciseId(exerciseId);
  };

  useEffect(() => {
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
          <div className="px-4 py-1 border border-black rounded bg-blue-400">
            {activeComponent === "UnitsList" && (
              <T_Units
                teacherId={teacher.id}
                server_url={server_url}
                handleClickUnit={handleClickUnit}
              />
            )}
            {activeComponent === "LessonsList" && (
              <T_Lessons
                teacherId={teacher.id}
                selectedUnitId={selectedUnitId}
                server_url={server_url}
                handleClickLesson={handleClickLesson}
              />
            )}
            {activeComponent === "ExercisesList" && (
              <T_Exercises
                teacherId={teacher.id}
                selectedLessonId={selectedLessonId}
                handleClickExercise={handleClickExercise}
                server_url={server_url}
              />
            )}
            {activeComponent === "QuestionsList" && (
              <T_Questions
                teacherId={teacher.id}
                selectedExerciseId={selectedExerciseId}
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
