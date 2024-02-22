import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Units from "./components/topics/Units";
import Lessons from "./components/topics/Lessons";
import Exercises from "./components/topics/Exercises";
import Questions from "./components/topics/Questions";

const server_url = import.meta.env.VITE_SERVER_LINK;

function Topics() {
  let usr = Cookies.get("SESSION_ID");

  const Navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("UnitsList");
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  useEffect(() => {
    if (!usr) {
      alert("Session Expired. Re-login.");
      Navigate("/");
    }
  }, [usr, Navigate]);

  usr = JSON.parse(Cookies.get("SESSION_ID"));

  const handleClickUnit = (yunitId) => {
    setActiveComponent("LessonsList");
    setSelectedUnitId(yunitId);
    sessionStorage.setItem("U", yunitId);
  };

  const handleClickLesson = (lessonId) => {
    setActiveComponent("ExercisesList");
    setSelectedLessonId(lessonId);
    sessionStorage.setItem("L", lessonId);
  };

  const handleClickExercise = (exerciseId) => {
    setActiveComponent("QuestionsList");
    setSelectedExerciseId(exerciseId);
    sessionStorage.setItem("E", exerciseId);
  };

  const goBack2Dashboard = () => {
    Navigate("/dash");
  };

  const goBack2Unit = () => {
    setActiveComponent("UnitsList");
  };

  const goBack2Lesson = () => {
    setActiveComponent("LessonsList");
    setSelectedUnitId(sessionStorage.getItem("U"));
  };

  const goBack2Exercise = () => {
    setActiveComponent("ExercisesList");
    setSelectedUnitId(sessionStorage.getItem("L"));
  };

  return (
    <div className="flex flex-col lg:flex-row  h-screen bg-blue-500">
      <div className="order-2 lg:order-2 lg:w-2/3 p-3 md:max-h-max overflow-y-auto mx-auto ">
        <div className="h-full">
          <div className="px-4 py-1 border border-black rounded bg-blue-400">
            {activeComponent === "UnitsList" && (
              <Units
                teacherId={usr.id}
                server_url={server_url}
                handleClickUnit={handleClickUnit}
                goBack={goBack2Dashboard}
              />
            )}
            {activeComponent === "LessonsList" && (
              <Lessons
                teacherId={usr.id}
                selectedUnitId={selectedUnitId}
                server_url={server_url}
                handleClickLesson={handleClickLesson}
                goBack={goBack2Unit}
              />
            )}
            {activeComponent === "ExercisesList" && (
              <Exercises
                teacherId={usr.id}
                selectedLessonId={selectedLessonId}
                handleClickExercise={handleClickExercise}
                server_url={server_url}
                goBack={goBack2Lesson}
              />
            )}
            {activeComponent === "QuestionsList" && (
              <Questions
                teacherId={usr.id}
                selectedExerciseId={selectedExerciseId}
                server_url={server_url}
                goBack={goBack2Exercise}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topics;
