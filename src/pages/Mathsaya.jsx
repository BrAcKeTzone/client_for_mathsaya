import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Phaser from "phaser";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ModalViewLessonVideo from "./components/modals/ModalViewLessonVideo";

import GameIntro from "../pages/scenes/GameIntro";
import TestScreen from "../pages/scenes/TestScreen";
import PlayGame from "../pages/scenes/PlayGame";
import YunitsChoices from "../pages/scenes/YunitsChoices";
import LessonsChoices from "../pages/scenes/LessonsChoices";
import ExercisesChoices from "../pages/scenes/ExercisesChoices";
import QuestionsAnswering from "../pages/scenes/QuestionsAnswering";
import GameOver from "../pages/scenes/GameOver";
import Settings from "../pages/scenes/Settings";
import Profile from "../pages/scenes/Profile";
import VideoScene from "../pages/scenes/VideoScene";

const Mathsaya = () => {
  const server_url = import.meta.env.VITE_SERVER_LINK;
  let usr = Cookies.get("STUDENT_SESSION");

  const Navigate = useNavigate();
  const [isPhaserGameActive, setIsPhaserGameActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [isViewLessonVideoModalOpen, setIsViewLessonVideoModalOpen] =
    useState(false);
  const [isExercisesChoicesScene, setIsExercisesChoicesScene] = useState(false);

  let gameInstance;

  useEffect(() => {
    setShowConfetti(true);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(confettiTimer);
  }, []);

  useEffect(() => {
    if (!usr) {
      alert("Session Expired. Re-login.");
      Navigate("/login");
    }
  }, [usr, Navigate]);

  useEffect(() => {
    const initializeGame = () => {
      const config = {
        type: Phaser.AUTO,
        parent: "mathsaya_game",
        scene: [
          GameIntro,
          TestScreen,
          PlayGame,
          YunitsChoices,
          LessonsChoices,
          // VideoScene,
          ExercisesChoices,
          QuestionsAnswering,
          GameOver,
          Settings,
          Profile,
        ],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      const game = new Phaser.Game(config);
      gameInstance = game;

      return game;
    };

    const handleResize = () => {
      const isMobileView = window.matchMedia("(max-width: 767px)").matches;
      const currentIsPortrait = window.innerHeight > window.innerWidth;
      setIsMobile(isMobileView);
      setIsPortrait(currentIsPortrait);

      if (gameInstance) {
        gameInstance.scale.refresh();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    gameInstance = initializeGame();
    setIsPhaserGameActive(true);

    return () => {
      gameInstance.destroy(true);
      setIsPhaserGameActive(false);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPhaserGameActive]);

  const handleViewLessonVideoButtonClick = () => {
    setIsViewLessonVideoModalOpen(true);
  };

  return (
    <>
      {/* {showConfetti && <Confetti />} */}

      {isMobile && isPortrait ? (
        <div className="text-center p-5">
          <p>
            Please rotate your device to landscape mode for the best experience.
          </p>
        </div>
      ) : null}
      <div id="mathsaya_game" className="w-full h-screen">
        {/* Your Phaser game container */}
      </div>
      <button
        className="bg-green-500 text-white p-2 rounded mx-1 fixed top-1/2 transform -translate-y-1/2"
        onClick={handleViewLessonVideoButtonClick}
      >
        LANTAWA ANG LEKSYON
      </button>
      <ModalViewLessonVideo
        isOpen={isViewLessonVideoModalOpen}
        closeModal={() => setIsViewLessonVideoModalOpen(false)}
        server_url={server_url}
        lessonId={sessionStorage.getItem("selectedLessonId")}
      />
    </>
  );
};

export default Mathsaya;
