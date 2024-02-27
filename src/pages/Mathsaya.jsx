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
import calm from "../assets/audios/calmBG.mp3";
import testscreenLoop from "../assets/audios/voicelines/testscreen.mp3";
import welcome from "../assets/audios/voicelines/wlcm.mp3";
import playprofilesettings from "../assets/audios/playprofilesettings.mp3";
import profileAudio from "../assets/audios/voicelines/profile.mp3";
import settingsAudio from "../assets/audios/voicelines/settings.mp3";
import musicOff from "../assets/audios/voicelines/music_off.mp3";
import musicOn from "../assets/audios/voicelines/music_on.mp3";
import voiceOff from "../assets/audios/voicelines/voice_off.mp3";
import voiceOn from "../assets/audios/voicelines/voice_on.mp3";
import signoutAudio from "../assets/audios/voicelines/signout.mp3";
import choicescene from "../assets/audios/choicescene.mp3";
import unitAudio from "../assets/audios/voicelines/yunitscene.mp3";
import lessonAudio from "../assets/audios/voicelines/leksyonscene.mp3";
import videoDiskasyon from "../assets/audios/voicelines/hover_leksyon_diskasyon.mp3";
import exerciseAudio from "../assets/audios/voicelines/tunananscene.mp3";
import answering from "../assets/audios/answeringMusic.mp3";
import tickingTimer from "../assets/audios/voicelines/answering_timer.mp3";
import congratsAudio from "../assets/audios/voicelines/congrats.mp3";
import gameoverAudio from "../assets/audios/voicelines/gameover.mp3";
import correctAudio from "../assets/audios/voicelines/gameover_correct.mp3";
import wrongAudio from "../assets/audios/voicelines/gameover_wrong.mp3";
import backAudio from "../assets/audios/voicelines/back.mp3";
import clicksound from "../assets/audios/click_sound.mp3";
import gameOverMusic from "../assets/audios/gameOverMusic.ogg";
import agayAudio from "../assets/audios/voicelines/agay.mp3";
import agayAudio2 from "../assets/audios/voicelines/agay_bah.mp3";
import healchoir from "../assets/audios/healchoir.wav";
import { preventRightClickAndHighlight } from "./components/mySystemLogic";
import Eyeball from "./components/Eyeball";

const server_url = import.meta.env.VITE_SERVER_LINK;

const MathSaya = () => {
  useEffect(() => {
    preventRightClickAndHighlight();
  }, []);

  const Navigate = useNavigate();
  const [showGameIntro, setShowGameIntro] = useState(true);
  const [showTestScreen, setShowTestScreen] = useState(false);
  const [showPlayGame, setShowPlayGame] = useState(false);
  const [showUnitChoices, setShowUnitChoices] = useState(false);
  const [showLessonChoices, setShowLessonChoices] = useState(false);
  const [showExerciseChoices, setShowExerciseChoices] = useState(false);
  const [showQuestionsAnswering, setShowQuestionsAnswering] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
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

  const choicesceneBG = new Audio(choicescene);
  const testscreen_loop = new Audio(testscreenLoop);
  const wlcm = new Audio(welcome);
  const click_sound = new Audio(clicksound);
  const calmBG = new Audio(calm);
  const playprofilesettingsBG = new Audio(playprofilesettings);
  const answeringBG = new Audio(answering);
  const gameOverBG = new Audio(gameOverMusic);
  const prfl = new Audio(profileAudio);
  const stng = new Audio(settingsAudio);
  const music_off = new Audio(musicOff);
  const music_on = new Audio(musicOn);
  const voice_off = new Audio(voiceOff);
  const voice_on = new Audio(voiceOn);
  const signout = new Audio(signoutAudio);
  const yunitscene = new Audio(unitAudio);
  const leksyonscene = new Audio(lessonAudio);
  const videoDiscussion = new Audio(videoDiskasyon);
  const tunananscene = new Audio(exerciseAudio);
  const answering_timer = new Audio(tickingTimer);
  const congrats = new Audio(congratsAudio);
  const gameover = new Audio(gameoverAudio);
  const correct = new Audio(correctAudio);
  const wrong = new Audio(wrongAudio);
  const back = new Audio(backAudio);
  const agay = new Audio(agayAudio);
  const agay2 = new Audio(agayAudio2);
  const healChoir = new Audio(healchoir);

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

  useEffect(() => {
    if (!showTestScreen || !soundState) {
      calmBG.pause();
      calmBG.currentTime = 0;
      return;
    }
    calmBG.loop = true;
    calmBG.currentTime = 0;
    calmBG.volume = 0.4;
    calmBG.play();
    return () => {
      calmBG.pause();
      calmBG.currentTime = 0;
    };
  }, [showTestScreen]);

  useEffect(() => {
    if ((!showPlayGame && !showProfile && !showSettings) || !soundState) {
      playprofilesettingsBG.pause();
      playprofilesettingsBG.currentTime = 0;
      return;
    }
    playprofilesettingsBG.loop = true;
    playprofilesettingsBG.currentTime = 0;
    playprofilesettingsBG.volume = 0.1;
    playprofilesettingsBG.play();
    return () => {
      playprofilesettingsBG.pause();
      playprofilesettingsBG.currentTime = 0;
    };
  }, [showPlayGame, showProfile, showSettings]);

  useEffect(() => {
    if (
      (!showUnitChoices && !showLessonChoices && !showExerciseChoices) ||
      !soundState
    ) {
      choicesceneBG.pause();
      choicesceneBG.currentTime = 0;
      return;
    }
    choicesceneBG.loop = true;
    choicesceneBG.currentTime = 2;
    choicesceneBG.volume = 0.1;
    choicesceneBG.play();
    return () => {
      choicesceneBG.pause();
      choicesceneBG.currentTime = 0;
    };
  }, [showUnitChoices, showLessonChoices, showExerciseChoices]);

  useEffect(() => {
    if (!showQuestionsAnswering || !soundState) {
      answeringBG.pause();
      answeringBG.currentTime = 0;
      return;
    }
    answeringBG.loop = true;
    answeringBG.currentTime = 0;
    answeringBG.volume = 0.2;
    answeringBG.play();
    return () => {
      answeringBG.pause();
      answeringBG.currentTime = 0;
    };
  }, [showQuestionsAnswering]);

  useEffect(() => {
    if (!showGameOver || !soundState) {
      gameOverBG.pause();
      gameOverBG.currentTime = 0;
      return;
    }
    gameOverBG.loop = true;
    gameOverBG.currentTime = 0;
    gameOverBG.volume = 0.2;
    gameOverBG.play();
    return () => {
      gameOverBG.pause();
      gameOverBG.currentTime = 0;
    };
  }, [showGameOver]);

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
    healChoir.play();
    initializeLocalStorage();

    setShowGameIntro(false);
    setShowTestScreen(true);
  };

  const handleContinueClick = () => {
    if (!audioState) {
      wlcm.pause();
      wlcm.currentTime = 0;
    } else {
      wlcm.volume = 1;
      wlcm.play();
    }
    setShowTestScreen(false);
    setShowPlayGame(true);
  };

  const handlePlayClick = () => {
    if (!audioState) {
      yunitscene.pause();
      yunitscene.currentTime = 0;
    } else {
      yunitscene.volume = 1;
      yunitscene.play();
    }
    setShowPlayGame(false);
    setShowUnitChoices(true);
  };

  const handleUnitSelect = () => {
    if (!audioState) {
      leksyonscene.pause();
      leksyonscene.currentTime = 0;
    } else {
      leksyonscene.volume = 1;
      leksyonscene.play();
    }
    setShowUnitChoices(false);
    setShowLessonChoices(true);
  };

  const handleLessonSelect = () => {
    if (!audioState) {
      tunananscene.pause();
      tunananscene.currentTime = 0;
    } else {
      tunananscene.volume = 1;
      tunananscene.play();
    }
    setShowLessonChoices(false);
    setShowExerciseChoices(true);
  };

  const handleExerciseSelect = () => {
    // click_sound.play();

    setShowExerciseChoices(false);
    setShowQuestionsAnswering(true);
  };

  const handleGameOverClick = () => {
    if (!audioState) {
      congrats.pause();
      congrats.currentTime = 0;
    } else {
      congrats.volume = 1;
      congrats.play();
    }
    setShowQuestionsAnswering(false);
    setShowGameOver(true);
  };

  const handleProfileClick = () => {
    if (!audioState) {
      prfl.pause();
      prfl.currentTime = 0;
    } else {
      prfl.volume = 1;
      prfl.play();
    }
    setShowPlayGame(false);
    setShowProfile(true);
  };

  const handleSettingsClick = () => {
    if (!audioState) {
      stng.pause();
      stng.currentTime = 0;
    } else {
      stng.volume = 1;
      stng.play();
    }
    setShowPlayGame(false);
    setShowSettings(true);
  };

  const handleBackToPlayGame = () => {
    setShowProfile(false);
    setShowSettings(false);
    setShowPlayGame(true);
  };

  const handleBackToMainMenu = () => {
    setShowUnitChoices(false);
    setShowPlayGame(true);
  };

  const handleBackToUnitChoices = () => {
    // click_sound.play();

    setShowLessonChoices(false);
    setShowUnitChoices(true);
  };

  const handleBackToLessonChoices = () => {
    // click_sound.play();

    setShowExerciseChoices(false);
    setShowLessonChoices(true);
  };

  const handleBackFromGameOver = () => {
    // click_sound.play();

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
    } catch (error) {
      console.error("Error saving unit progress:", error);
      throw error;
    }
  }

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      {!showGameIntro && !showTestScreen && !showProfile && !showSettings && (
        <div className="fixed top-0">
          <Eyeball agay={agay} agaybah={agay2} />
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
          fetchStudentProfile={fetchStudentProfile}
          onProfile={handleProfileClick}
          onSettings={handleSettingsClick}
          onPlay={handlePlayClick}
        />
      )}
      {showUnitChoices && (
        <UnitChoices
          backSound={back}
          fetchUnits={fetchUnits}
          unitChoices={unitChoices}
          onSelect={handleUnitSelect}
          onBack={handleBackToMainMenu}
          teacherId={teacherId}
        />
      )}
      {showLessonChoices && (
        <LessonChoices
          backSound={back}
          fetchLessons={fetchLessons}
          lessonChoices={lessonChoices}
          onSelect={handleLessonSelect}
          onBack={handleBackToUnitChoices}
          selectedunit={selectedunit}
        />
      )}
      {showExerciseChoices && (
        <ExerciseChoices
          backSound={back}
          videoDiscussion={videoDiscussion}
          fetchStudentProfile={fetchStudentProfile}
          fetchExercises={fetchExercises}
          exerciseChoices={exerciseChoices}
          onSelect={handleExerciseSelect}
          onBack={handleBackToLessonChoices}
          selectedlesson={selectedlesson}
          completedExercises={completedExercises}
          server_url={server_url}
        />
      )}
      {showQuestionsAnswering && (
        <QuestionsAnswering
          answering_timer={answering_timer}
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
          correct={correct}
          wrong={wrong}
          gameover={gameover}
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
          backSound={back}
          onBack={handleBackToPlayGame}
          studentName={studentName}
          firstLoginDate={firstLoginDate}
          completedExercises={completedExercises}
          completedLessons={completedLessons}
          completedUnits={completedUnits}
        />
      )}
      {showSettings && (
        <Settings
          backSound={back}
          music_off={music_off}
          music_on={music_on}
          voice_off={voice_off}
          voice_on={voice_on}
          signout={signout}
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
