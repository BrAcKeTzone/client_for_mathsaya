import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import skyBackground from "../../assets/images/waterfall.gif";
import starSpinning from "../../assets/images/star-spinning.gif";
import wrongGesture from "../../assets/images/wrong.gif";
import happyGesture from "../../assets/images/smile.gif";
import ModalShowExplanation from "../components/modals/ModalShowExplanation";

const GameOver = ({
  questions,
  selectedAnswers,
  onBack,
  saveExerciseProgress,
  saveLessonProgress,
  saveUnitProgress,
  correct,
  wrong,
  gameover,
}) => {
  const [starsCount, setStarsCount] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [showWrongGesture, setShowWrongGesture] = useState(false);
  const [showHappyGesture, setShowHappyGesture] = useState(false);

  useEffect(() => {
    setShowConfetti(true);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 7000);

    return () => clearTimeout(confettiTimer);
  }, []);

  useEffect(() => {
    const score = sessionStorage.getItem("score");
    if (score) {
      setStarsCount(parseInt(score));
    }
  }, []);

  useEffect(() => {
    const saveProgress = async () => {
      await saveExerciseProgress();
      await saveLessonProgress();
      await saveUnitProgress();
    };

    saveProgress();
  }, []);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const numbers = [];
      for (let i = 0; i < 3; i++) {
        let randomNum;
        do {
          randomNum = Math.floor(Math.random() * 30) + 1;
        } while (randomNum === starsCount);
        numbers.push(randomNum);
      }
      numbers.push(starsCount);
      numbers.sort(() => Math.random() - 0.5);
      setRandomNumbers(numbers);
    };

    generateRandomNumbers();
  }, [starsCount]);

  const handleNumberClick = (number) => {
    if (number === starsCount) {
      correct.play();
      setShowHappyGesture(true);
      setTimeout(() => {
        setShowHappyGesture(false);
        setShowExplanationModal(true);
      }, 2000);
    } else {
      wrong.play();
      setShowWrongGesture(true);
      setTimeout(() => {
        setShowWrongGesture(false);
      }, 2000);
    }
  };

  const handleGameOverClick = () => {
    gameover.play();
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center overflow-hidden p-10 bg-cover"
      style={{ backgroundImage: `url(${skyBackground})` }}
    >
      {showConfetti && <Confetti />}
      {showWrongGesture && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400 z-50 flex justify-center items-center bg-opacity-70">
          <img src={wrongGesture} alt="Wrong Gesture" className="max-w-50%" />
        </div>
      )}
      {showHappyGesture && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400 z-50 flex justify-center items-center bg-opacity-70">
          <img src={happyGesture} alt="Happy Gesture" className="max-w-50%" />
        </div>
      )}

      <div className="text-4xl text-gray-800 font-bold mb-10 text-center border-b-2 shadow-lg">
        <span className="congrats" />
      </div>
      <div className="grid grid-cols-5 md:grid-cols-5 gap-4 mb-10">
        {Array.from({ length: starsCount }, (_, index) => (
          <img
            key={index}
            src={starSpinning}
            alt="Star"
            className="w-4 h-4 md:w-8 md:h-8"
          />
        ))}
      </div>
      <div className="flex flex-col max-w-96">
        <h1
          className="text-center text-2xl mb-2 p-1 bg-green-200 bg-opacity-40 cursor-pointer"
          onClick={handleGameOverClick}
        >
          Aron makita nimo ang listahan sa tubag, kinahanglan nga pili-on nimo
          ang eksaktong numero sa mga bituon gikan sa pilianan sa ubos.
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {randomNumbers.map((number, index) => (
            <button
              key={index}
              className="bn54 bn54span px-4 py-2"
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <ModalShowExplanation
        questions={questions}
        selectedAnswers={selectedAnswers}
        isOpen={showExplanationModal}
        onClose={() => {
          setShowExplanationModal(false);
          onBack();
        }}
      />
    </div>
  );
};

export default GameOver;
