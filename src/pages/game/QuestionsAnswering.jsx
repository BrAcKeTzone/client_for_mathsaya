import React, { useState, useEffect } from "react";
import loopBG from "../../assets/images/loopingBG.gif";
import dancing from "../../assets/images/dancing.gif";

const QuestionsAnswering = ({ questions, onGameOver }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [showTransitionCountdown, setShowTransitionCountdown] = useState(false);
  const [transitionCountdown, setTransitionCountdown] = useState(3);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0 && !showTransitionCountdown) {
        setCountdown(countdown - 1);
      } else if (countdown === 0 && !showTransitionCountdown) {
        setShowTransitionCountdown(true);
      } else if (showTransitionCountdown && transitionCountdown > 0) {
        setTransitionCountdown(transitionCountdown - 1);
      } else if (showTransitionCountdown && transitionCountdown === 0) {
        if (currentQuestionIndex < questions.length - 1) {
          console.log("Total Score: " + score);
          sessionStorage.setItem("score", score);
          handleNextQuestion();
        } else {
          onGameOver();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    countdown,
    currentQuestionIndex,
    showTransitionCountdown,
    transitionCountdown,
  ]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setCountdown(60);
    setShowTransitionCountdown(false);
    setTransitionCountdown(3);
  };

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (selectedAnswer === correctAnswer) {
      // Increment score if the answer is correct
      setScore((prevScore) => prevScore + calculateScore(countdown));
      // Use a callback to ensure you log the updated score
      setScore((prevScore) => {
        console.log(`Correct answer! Score: ${prevScore}`);
        return prevScore;
      });
    } else {
      console.log("Incorrect answer!");
    }
    setShowTransitionCountdown(true);
  };

  const calculateScore = (timeLeft) => {
    if (timeLeft >= 40) {
      return 3;
    } else if (timeLeft >= 20) {
      return 2;
    } else {
      return 1;
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  let countdownColor = "";
  if (countdown <= 10) {
    countdownColor = "text-red-500";
  } else if (countdown <= 20) {
    countdownColor = "text-yellow-400";
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center overflow-hidden p-10 bg-cover bg-center transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${loopBG})` }}
    >
      <div className="absolute inset-0 bg-gray-100 bg-opacity-30 z-0"></div>
      <h1 className=" flex flex-col text-center p-5  fixed top-16 max-w-[500px] bg-white bg-opacity-50 rounded z-10">
        Kung makatubag kag sakto sa dli pa muubos ug 40 segundos aduna kay tulo
        ka bituon, kung dli pa muubos sa 20 segundos aduna kay duha ka bituon,
        kung dli pa muubos sa 1 segundo aduna kay isa ka bituon.
      </h1>
      <div className="absolute bottom-1 md:top-5 md:right-5 right-0 left-0 md:left-auto text-white bg-slate-500 bg-opacity-20 md:bottom-auto">
        <span className={`text-4xl ${countdownColor}`}>
          {`Nahabiling Oras: ${countdown}`}
        </span>
      </div>

      <div className="max-w-lg z-10 bg-white bg-opacity-50 p-10 rounded">
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-center mb-2">{currentQuestion.question_text}</p>
          {currentQuestion.questionImage && (
            <img
              src={currentQuestion.questionImage}
              alt="Question Image"
              className="w-64 h-64 cursor-pointer"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 z-10">
          {currentQuestion.answer_choices.map((choice, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-blue-500 text-white rounded border border-blue-500 hover:border-yellow-500 active:bg-yellow-500 "
              onClick={() => handleAnswer(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      {showTransitionCountdown && (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20 text-center z-20">
            <div className="text-9xl font-bold bg-white px-14 py-7 bg-opacity-20 rounded-full">
              {`${transitionCountdown}`}
            </div>
          </div>
          <div className="absolute bottom-0 w-full flex justify-center">
            <img src={dancing} alt="Dancing" className="w-60 h-w-60" />
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionsAnswering;
