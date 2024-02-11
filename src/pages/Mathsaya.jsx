// MathSaya.jsx

import React, { useEffect, useState } from "react";
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

import sampleImage from "../assets/images/sky.gif";

const server_url = import.meta.env.VITE_SERVER_LINK;

const MathSaya = () => {
  useEffect(() => {
    preventRightClickAndHighlight();
  }, []);

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
  const [unitChoices, setUnitChoices] = useState([
    {
      yunitId: 1,
      yunitNumber: 1,
      yunitName: "Unit 1",
      yunitThumbnail: sampleImage,
    },
    {
      yunitId: 2,
      yunitNumber: 2,
      yunitName: "Unit 2",
      yunitThumbnail: sampleImage,
    },
    {
      yunitId: 3,
      yunitNumber: 3,
      yunitName: "Unit 3",
      yunitThumbnail: sampleImage,
    },
    {
      yunitId: 4,
      yunitNumber: 4,
      yunitName: "Unit 4",
      yunitThumbnail: sampleImage,
    },
    {
      yunitId: 5,
      yunitNumber: 5,
      yunitName: "Unit 5",
      yunitThumbnail: sampleImage,
    },
  ]);

  const [lessonChoices, setLessonChoices] = useState([
    {
      lessonId: 1,
      lessonNumber: 1,
      lessonName: "Lesson 1",
      lessonDescription: "Description for Lesson 1",
      lessonThumbnail: sampleImage,
      lessonVideo:
        "https://res.cloudinary.com/dnfunfiga/video/upload/v1706809934/mathsaya_uploads/lessons/p4ocybfbtkrtui6cwxme.mp4",
    },
    {
      lessonId: 2,
      lessonNumber: 2,
      lessonName: "Lesson 2",
      lessonDescription: "Description for Lesson 2",
      lessonThumbnail: sampleImage,
      lessonVideo:
        "https://res.cloudinary.com/dnfunfiga/video/upload/v1706809934/mathsaya_uploads/lessons/p4ocybfbtkrtui6cwxme.mp4",
    },
    {
      lessonId: 3,
      lessonNumber: 3,
      lessonName: "Lesson 3",
      lessonDescription: "Description for Lesson 3",
      lessonThumbnail: sampleImage,
      lessonVideo:
        "https://res.cloudinary.com/dnfunfiga/video/upload/v1706809934/mathsaya_uploads/lessons/p4ocybfbtkrtui6cwxme.mp4",
    },
    {
      lessonId: 4,
      lessonNumber: 4,
      lessonName: "Lesson 4",
      lessonDescription: "Description for Lesson 4",
      lessonThumbnail: sampleImage,
      lessonVideo:
        "https://res.cloudinary.com/dnfunfiga/video/upload/v1706809934/mathsaya_uploads/lessons/p4ocybfbtkrtui6cwxme.mp4",
    },
    {
      lessonId: 5,
      lessonNumber: 5,
      lessonName: "Lesson 5",
      lessonDescription: "Description for Lesson 5",
      lessonThumbnail: sampleImage,
      lessonVideo:
        "https://res.cloudinary.com/dnfunfiga/video/upload/v1706809934/mathsaya_uploads/lessons/p4ocybfbtkrtui6cwxme.mp4",
    },
  ]);

  const [exerciseChoices, setExerciceChoices] = useState([
    {
      exerciseId: 1,
      exerciseNumber: 1,
      exerciseName: "Exercise 1",
      exerciseDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget libero vel justo varius ultrices. Cras nec justo ac nulla convallis sodales. Fusce auctor, ligula sed efficitur vehicula, ipsum est viverra eros, sit amet sollicitudin libero mi ac odio. Mauris convallis velit ut augue ultricies, sed dictum justo volutpat. Integer nec nisi a sem aliquam luctus sed sit amet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut quis risus euismod, sollicitudin ligula nec, fermentum mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque varius tellus vel felis dapibus, vel lobortis sem vulputate. Fusce quis sodales dolor. Maecenas hendrerit enim a ipsum convallis, non fermentum ipsum laoreet. Sed feugiat magna nec augue dictum, eget eleifend libero scelerisque.",
    },
    {
      exerciseId: 2,
      exerciseNumber: 2,
      exerciseName: "Exercise 2",
      exerciseDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget libero vel justo varius ultrices. Cras nec justo ac nulla convallis sodales. Fusce auctor, ligula sed efficitur vehicula, ipsum est viverra eros, sit amet sollicitudin libero mi ac odio. Mauris convallis velit ut augue ultricies, sed dictum justo volutpat. Integer nec nisi a sem aliquam luctus sed sit amet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut quis risus euismod, sollicitudin ligula nec, fermentum mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque varius tellus vel felis dapibus, vel lobortis sem vulputate. Fusce quis sodales dolor. Maecenas hendrerit enim a ipsum convallis, non fermentum ipsum laoreet. Sed feugiat magna nec augue dictum, eget eleifend libero scelerisque.",
    },
    {
      exerciseId: 3,
      exerciseNumber: 3,
      exerciseName: "Exercise 3",
      exerciseDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget libero vel justo varius ultrices. Cras nec justo ac nulla convallis sodales. Fusce auctor, ligula sed efficitur vehicula, ipsum est viverra eros, sit amet sollicitudin libero mi ac odio. Mauris convallis velit ut augue ultricies, sed dictum justo volutpat. Integer nec nisi a sem aliquam luctus sed sit amet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut quis risus euismod, sollicitudin ligula nec, fermentum mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque varius tellus vel felis dapibus, vel lobortis sem vulputate. Fusce quis sodales dolor. Maecenas hendrerit enim a ipsum convallis, non fermentum ipsum laoreet. Sed feugiat magna nec augue dictum, eget eleifend libero scelerisque.",
    },
    {
      exerciseId: 4,
      exerciseNumber: 4,
      exerciseName: "Exercise 4",
      exerciseDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget libero vel justo varius ultrices. Cras nec justo ac nulla convallis sodales. Fusce auctor, ligula sed efficitur vehicula, ipsum est viverra eros, sit amet sollicitudin libero mi ac odio. Mauris convallis velit ut augue ultricies, sed dictum justo volutpat. Integer nec nisi a sem aliquam luctus sed sit amet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut quis risus euismod, sollicitudin ligula nec, fermentum mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque varius tellus vel felis dapibus, vel lobortis sem vulputate. Fusce quis sodales dolor. Maecenas hendrerit enim a ipsum convallis, non fermentum ipsum laoreet. Sed feugiat magna nec augue dictum, eget eleifend libero scelerisque.",
    },
    {
      exerciseId: 5,
      exerciseNumber: 5,
      exerciseName: "Exercise 5",
      exerciseDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget libero vel justo varius ultrices. Cras nec justo ac nulla convallis sodales. Fusce auctor, ligula sed efficitur vehicula, ipsum est viverra eros, sit amet sollicitudin libero mi ac odio. Mauris convallis velit ut augue ultricies, sed dictum justo volutpat. Integer nec nisi a sem aliquam luctus sed sit amet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut quis risus euismod, sollicitudin ligula nec, fermentum mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque varius tellus vel felis dapibus, vel lobortis sem vulputate. Fusce quis sodales dolor. Maecenas hendrerit enim a ipsum convallis, non fermentum ipsum laoreet. Sed feugiat magna nec augue dictum, eget eleifend libero scelerisque.",
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      questionId: 1,
      question_text: "What is the capital of France?",
      questionImage: null,
      answer_choices: ["Paris", "London", "Berlin", "Madrid"],
      correct_answer: "Paris",
      answer_explanation: "Paris is the capital of France.",
    },
    {
      questionId: 2,
      question_text: "What is the largest planet in our solar system?",
      questionImage: null,
      answer_choices: ["Mars", "Jupiter", "Earth", "Saturn"],
      correct_answer: "Jupiter",
      answer_explanation: "Jupiter is the largest planet in our solar system.",
    },
    {
      questionId: 3,
      question_text: "Who wrote the novel 'To Kill a Mockingbird'?",
      questionImage: null,
      answer_choices: [
        "Mark Twain",
        "Harper Lee",
        "F. Scott Fitzgerald",
        "J.D. Salinger",
      ],
      correct_answer: "Harper Lee",
      answer_explanation: "Harper Lee wrote the novel 'To Kill a Mockingbird'.",
    },
    {
      questionId: 4,
      question_text: "Which element has the chemical symbol 'Fe'?",
      questionImage: null,
      answer_choices: ["Iron", "Gold", "Silver", "Copper"],
      correct_answer: "Iron",
      answer_explanation: "The element with the chemical symbol 'Fe' is Iron.",
    },
    {
      questionId: 6,
      question_text: "What is the capital of Japan?",
      questionImage: null,
      answer_choices: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correct_answer: "Tokyo",
      answer_explanation: "Tokyo is the capital of Japan.",
    },
    // Add more questions here
  ]);

  const bg_music = new Audio(playgameBG);
  const testscreen_loop = new Audio(testscreenLoop);
  const wlcm = new Audio(welcome);
  const click_sound = new Audio(clicksound);
  const calm_BG = new Audio(calmBG);

  const initializeSessionStorage = () => {
    if (sessionStorage.getItem("music") === null) {
      sessionStorage.setItem("music", true);
    }
    if (sessionStorage.getItem("voice") === null) {
      sessionStorage.setItem("voice", true);
    }
  };

  const handleIntroComplete = () => {
    click_sound.play();
    initializeSessionStorage();

    setShowGameIntro(false);
    setShowTestScreen(true);
  };

  const handleContinueClick = () => {
    click_sound.play();

    setShowTestScreen(false);
    setShowPlayGame(true);

    bg_music.pause();
    if (sessionStorage.getItem("voice") === "true") {
      wlcm.play();
      if (sessionStorage.getItem("music") === "true") {
        wlcm.onended = () => {
          bg_music.play();
          wlcm.onended = null;
        };
      }
    }
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

    bg_music.pause();

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

    calm_BG.pause();
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

    setShowGameOver(false);
    setShowExerciseChoices(true);
  };

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      {!showGameIntro && !showTestScreen && (
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
          unitChoices={unitChoices}
          clicking={click_sound}
          onSelect={handleUnitSelect}
          onBack={handleBackToMainMenu}
          server_url={server_url}
        />
      )}
      {showLessonChoices && (
        <LessonChoices
          lessonChoices={lessonChoices}
          clicking={click_sound}
          onSelect={handleLessonSelect}
          onBack={handleBackToUnitChoices}
          server_url={server_url}
        />
      )}
      {showExerciseChoices && (
        <ExerciseChoices
          exerciseChoices={exerciseChoices}
          clicking={click_sound}
          onSelect={handleExerciseSelect}
          onBack={handleBackToLessonChoices}
          server_url={server_url}
        />
      )}
      {showQuestionsAnswering && (
        <QuestionsAnswering
          questions={questions}
          clicking={click_sound}
          onGameOver={handleGameOverClick}
          server_url={server_url}
        />
      )}
      {showGameOver && (
        <GameOver
          questions={questions}
          clicking={click_sound}
          onBack={handleBackFromGameOver}
          server_url={server_url}
        />
      )}
      {showProfile && (
        <Profile
          clicking={click_sound}
          onBack={handleBackToPlayGame}
          server_url={server_url}
        />
      )}
      {showSettings && (
        <Settings clicking={click_sound} onBack={handleBackToPlayGame} />
      )}
    </div>
  );
};

export default MathSaya;
