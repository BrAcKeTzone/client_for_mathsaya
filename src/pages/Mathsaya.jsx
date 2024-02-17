// MathSaya.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import GameIntro from "./game/GameIntro";
import TestScreen from "./game/TestScreen";
import PlayGame from "./game/PlayGame";
import UnitChoices from "./game/UnitChoices";
import LessonChoices from "./game/LessonChoices";
import ExerciseChoices from "./game/ExerciseChoices";
import QuestionsAnswering from "./game/QuestionsAnswering";
import GameOver from "./game/GameOver";
import Profile from "./game/Profile";
import Settings from "./game/Settings";
import playgameBG from "../assets/audios/playgameBG.mp3";
import testscreenLoop from "../assets/audios/voice_lines/testscreen_loop.mp3";
import welcome from "../assets/audios/voice_lines/testscreen_wlcm_sa_ms.mp3";
import calmBG from "../assets/audios/settingsBG.mp3";
import clicksound from "../assets/audios/click_sound.mp3";
import { preventRightClickAndHighlight } from "./components/mySystemLogic";
import Eyeball from "./components/Eyeball";

const server_url = import.meta.env.VITE_SERVER_LINK;

const MathSaya = () => {
  useEffect(() => {
    preventRightClickAndHighlight();
  }, []);

  const Navigate = useNavigate();
  const [showGameIntro, setShowGameIntro] = useState(false);
  const [showTestScreen, setShowTestScreen] = useState(false);
  const [showPlayGame, setShowPlayGame] = useState(false);
  const [showUnitChoices, setShowUnitChoices] = useState(false);
  const [showLessonChoices, setShowLessonChoices] = useState(false);
  const [showExerciseChoices, setShowExerciseChoices] = useState(false);
  const [showQuestionsAnswering, setShowQuestionsAnswering] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [studentName, setStudentName] = useState({
    firstname: "",
    lastname: "",
  });
  const [firstLoginDate, setFirstLoginDate] = useState("");
  const [completedExercises, setCompletedExercises] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [completedUnits, setCompletedUnits] = useState([]);

  const [unitChoices, setUnitChoices] = useState([]);
  const [lessonChoices, setLessonChoices] = useState([]);
  const [exerciseChoices, setExerciseChoice] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const bg_music = new Audio(playgameBG);
  const testscreen_loop = new Audio(testscreenLoop);
  const wlcm = new Audio(welcome);
  const click_sound = new Audio(clicksound);
  const calm_BG = new Audio(calmBG);

  const studentProfile = Cookies.get("STUDENT_SESSION");
  const studentProfileId = studentProfile
    ? JSON.parse(studentProfile)?.id
    : null;
  const teacherId = Cookies.get("teach");
  const selectedunit = sessionStorage.getItem("selectedunit");
  const selectedlesson = sessionStorage.getItem("selectedlesson");
  const selectedexercise = sessionStorage.getItem("selectedexercise");
  const score = sessionStorage.getItem("score");

  useEffect(() => {
    if (!studentProfile) {
      alert("Session Expired. Re-login.");
      Navigate("/login");
    }
  }, [studentProfile]);

  async function fetchStudentProfile() {
    try {
      const response = await axios.get(
        `${server_url}/sprofile/student-profile/${studentProfileId}`
      );
      const studentData = response.data;

      const { firstname, lastname } = studentData.student;
      const { firstLoginDate } = studentData.studentProfile;
      const completedExercises = studentData.completedExercises;
      const completedLessons = studentData.completedLessons;
      const completedUnits = studentData.completedUnits;

      setStudentName({ firstname, lastname });
      setFirstLoginDate({ firstLoginDate });
      setCompletedExercises(completedExercises);
      setCompletedLessons(completedLessons);
      setCompletedUnits(completedUnits);

      const teacherId = studentData.studentProfile.userId;
      Cookies.set("teach", teacherId);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  }

  async function fetchUnits() {
    try {
      const response = await axios.get(`${server_url}/units/${teacherId}`);
      const units = response.data;
      setUnitChoices(units);
    } catch (error) {
      console.error("Error fetching Yunits:", error);
    }
  }

  async function fetchLessons() {
    try {
      const response = await axios.get(`${server_url}/lessons/${selectedunit}`);
      const lessons = response.data;
      setLessonChoices(lessons);
    } catch (error) {
      console.error("Error fetching Lessons:", error);
    }
  }

  async function fetchExercises() {
    try {
      const response = await axios.get(
        `${server_url}/exercises/${selectedlesson}`
      );
      const exercises = response.data;
      console.log("Exercises entry: ", exercises);
      setExerciseChoice(exercises);
    } catch (error) {
      console.error("Error fetching Exercises:", error);
    }
  }

  async function fetchQuestions() {
    try {
      const response = await axios.get(
        `${server_url}/questions/${selectedexercise}`
      );
      const questions = response.data;
      console.log("Questions entry: ", questions);
      setQuestions(questions);
    } catch (error) {
      console.error("Error fetching Questions:", error);
    }
  }

  const initializeLocalStorage = () => {
    if (localStorage.getItem("music") === null) {
      localStorage.setItem("music", true);
    }
    if (localStorage.getItem("voice") === null) {
      localStorage.setItem("voice", true);
    }
  };

  const handleIntroComplete = () => {
    click_sound.play();
    initializeLocalStorage();

    setShowGameIntro(false);
    setShowTestScreen(true);
  };

  const handleContinueClick = () => {
    click_sound.play();

    setShowTestScreen(false);
    setShowPlayGame(true);
  };

  const handlePlayClick = () => {
    click_sound.play();

    setShowPlayGame(false);
    setShowUnitChoices(true);
  };

  const handleUnitSelect = () => {
    click_sound.play();

    setShowUnitChoices(false);
    setShowLessonChoices(true);
  };

  const handleLessonSelect = () => {
    click_sound.play();

    setShowLessonChoices(false);
    setShowExerciseChoices(true);
  };

  const handleExerciseSelect = () => {
    click_sound.play();

    setShowExerciseChoices(false);
    setShowQuestionsAnswering(true);
  };

  const handleGameOverClick = () => {
    click_sound.play();

    setShowQuestionsAnswering(false);
    setShowGameOver(true);
  };

  const handleProfileClick = () => {
    click_sound.play();

    setShowPlayGame(false);
    setShowProfile(true);
  };

  const handleSettingsClick = () => {
    click_sound.play();

    setShowPlayGame(false);
    setShowSettings(true);
  };

  const handleBackToPlayGame = () => {
    click_sound.play();

    setShowProfile(false);
    setShowSettings(false);
    setShowPlayGame(true);
  };

  const handleBackToMainMenu = () => {
    click_sound.play();

    setShowUnitChoices(false);
    setShowPlayGame(true);
  };

  const handleBackToUnitChoices = () => {
    click_sound.play();

    setShowLessonChoices(false);
    setShowUnitChoices(true);
  };

  const handleBackToLessonChoices = () => {
    click_sound.play();

    setShowExerciseChoices(false);
    setShowLessonChoices(true);
  };

  const handleBackFromGameOver = () => {
    click_sound.play();

    sessionStorage.removeItem("score");
    setShowGameOver(false);
    setShowExerciseChoices(true);
  };

  const [audioState, setAudioState] = useState(
    localStorage.getItem("voice") === "true" ? true : false
  );
  const [soundState, setSoundState] = useState(
    localStorage.getItem("music") === "true" ? true : false
  );

  const handleSignout = () => {
    const confirmSignout = window.confirm("Are you sure you want to sign out?");
    if (confirmSignout) {
      Cookies.remove("teach");
      Cookies.remove("STUDENT_SESSION");
      Navigate("/login");
    }
  };

  async function saveExerciseProgress() {
    try {
      const completeDataExercise = {
        exerciseId: selectedexercise,
        starRating: score,
        studentProfileId,
      };
      const responseExercise = await axios.post(
        `${server_url}/sprofile/add-completed-exercise`,
        completeDataExercise
      );
      console.log(responseExercise);
    } catch (error) {
      console.error("Error saving exercise progress:", error);
      throw error;
    }
  }
  async function saveLessonProgress() {
    try {
      const completeDataLesson = {
        lessonId: selectedlesson,
        studentProfileId,
      };
      const responseLesson = await axios.post(
        `${server_url}/sprofile/add-completed-lesson`,
        completeDataLesson
      );
      console.log(responseLesson);
    } catch (error) {
      console.error("Error saving lesson progress:", error);
      throw error;
    }
  }
  async function saveUnitProgress() {
    try {
      const completedDataUnit = {
        yunitId: selectedunit,
        studentProfileId,
      };
      const responseUnit = await axios.post(
        `${server_url}/sprofile/add-completed-yunit`,
        completedDataUnit
      );
      console.log(responseUnit);
    } catch (error) {
      console.error("Error saving unit progress:", error);
      throw error;
    }
  }

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      {!showGameIntro && !showTestScreen && !showProfile && !showSettings && (
        <div className="fixed top-0">
          <Eyeball />
        </div>
      )}
      {showGameIntro && (
        <GameIntro onComplete={handleIntroComplete} server_url={server_url} />
      )}
      {showTestScreen && (
        <TestScreen
          testscreenLoop={testscreen_loop}
          onContinue={handleContinueClick}
        />
      )}
      {showPlayGame && (
        <PlayGame
          clicking={click_sound}
          onProfile={handleProfileClick}
          onSettings={handleSettingsClick}
          onPlay={handlePlayClick}
        />
      )}
      {showUnitChoices && (
        <UnitChoices
          fetchUnits={fetchUnits}
          unitChoices={unitChoices}
          clicking={click_sound}
          onSelect={handleUnitSelect}
          onBack={handleBackToMainMenu}
          teacherId={teacherId}
        />
      )}
      {showLessonChoices && (
        <LessonChoices
          fetchLessons={fetchLessons}
          lessonChoices={lessonChoices}
          clicking={click_sound}
          onSelect={handleLessonSelect}
          onBack={handleBackToUnitChoices}
          selectedunit={selectedunit}
        />
      )}
      {showExerciseChoices && (
        <ExerciseChoices
          fetchExercises={fetchExercises}
          exerciseChoices={exerciseChoices}
          clicking={click_sound}
          onSelect={handleExerciseSelect}
          onBack={handleBackToLessonChoices}
          selectedlesson={selectedlesson}
          server_url={server_url}
        />
      )}
      {showQuestionsAnswering && (
        <QuestionsAnswering
          fetchQuestions={fetchQuestions}
          questions={questions}
          setSelectedAnswers={setSelectedAnswers}
          clicking={click_sound}
          onGameOver={handleGameOverClick}
          selectedexercise={selectedexercise}
        />
      )}
      {showGameOver && (
        <GameOver
          questions={questions}
          selectedAnswers={selectedAnswers}
          clicking={click_sound}
          onBack={handleBackFromGameOver}
          saveExerciseProgress={saveExerciseProgress}
          saveLessonProgress={saveLessonProgress}
          saveUnitProgress={saveUnitProgress}
        />
      )}
      {showProfile && (
        <Profile
          onBack={handleBackToPlayGame}
          fetchStudentProfile={fetchStudentProfile}
          studentName={studentName}
          firstLoginDate={firstLoginDate}
          completedExercises={completedExercises}
          completedLessons={completedLessons}
          completedUnits={completedUnits}
        />
      )}
      {showSettings && (
        <Settings
          clicking={click_sound}
          onBack={handleBackToPlayGame}
          audioState={audioState}
          soundState={soundState}
          setAudioState={setAudioState}
          setSoundState={setSoundState}
          handleSignout={handleSignout}
        />
      )}
    </div>
  );
};

export default MathSaya;
