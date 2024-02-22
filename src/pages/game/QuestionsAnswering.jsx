import React, { useState, useEffect } from "react";
import loopBG from "../../assets/images/loopingBG.gif";
import dancing from "../../assets/images/dancing.gif";
import ct321 from "../../assets/audios/countdown-321.wav";

const QuestionsAnswering = ({
  questions,
  setSelectedAnswers,
  onGameOver,
  fetchQuestions,
  selectedexercise,
  answering_timer,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [showTransitionCountdown, setShowTransitionCountdown] = useState(false);
  const [transitionCountdown, setTransitionCountdown] = useState(3);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerSoundPlayed, setTimerSoundPlayed] = useState(false);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [bgOpacity, setBgOpacity] = useState("bg-white bg-opacity-0");

  const countdown321 = new Audio(ct321);

  useEffect(() => {
    const opacityTimer = setInterval(() => {
      setBgOpacity((prevOpacity) =>
        prevOpacity === "bg-white bg-opacity-0"
          ? "bg-white bg-opacity-20"
          : "bg-white bg-opacity-0"
      );
    }, 2000);

    return () => clearInterval(opacityTimer);
  }, []);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [selectedexercise]);

  useEffect(() => {
    sessionStorage.setItem("score", score);
  }, [score]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0 && !showTransitionCountdown) {
        setCountdown(countdown - 1);
        if (countdown === 20 && !timerSoundPlayed) {
          if (localStorage.getItem("voice") === "true") {
            playTimerSound();
          }
        }
      } else if (countdown === 0 && !showTransitionCountdown) {
        setShowTransitionCountdown(true);
      } else if (showTransitionCountdown && transitionCountdown > 0) {
        setTransitionCountdown(transitionCountdown - 1);
      } else if (showTransitionCountdown && transitionCountdown === 0) {
        if (currentQuestionIndex < questions.length - 1) {
          console.log("Total Score: " + score);
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
    setTimerSoundPlayed(false);
  };

  const handleAnswer = (questionId, selectedAnswer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: selectedAnswer,
    }));
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + calculateScore(countdown));
      setScore((prevScore) => {
        console.log(`Correct answer! Score: ${prevScore}`);
        return prevScore;
      });
    } else {
      console.log("Incorrect answer!");
    }
    if (localStorage.getItem("voice") === "true") {
      countdown321.play();
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

  if (!currentQuestion) {
    return null;
  }

  let countdownColor = "";
  if (countdown <= 10) {
    countdownColor = "text-red-500";
  } else if (countdown <= 20) {
    countdownColor = "text-yellow-400";
  }

  const handleQuestionTextClick = () => {
    if (localStorage.getItem("voice") === "true") {
      responsiveVoice.speak(currentQuestion.question_text, "Filipino Female");
    }
  };

  const playTimerSound = () => {
    if (localStorage.getItem("voice") === "true") {
      answering_timer.play();
    }
    setTimerSoundPlayed(true);
  };

  const handleChoiceClick = (choice, index) => {
    if (lastClickedIndex === index) {
      setClickCount(clickCount + 1);
    } else {
      setLastClickedIndex(index);
      setClickCount(1);
    }
    if (localStorage.getItem("voice") === "true") {
      responsiveVoice.speak(choice, "Filipino Female");
    }
    if (clickCount > 1) {
      handleAnswer(currentQuestion.questionId, choice);
      setClickCount(0);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center overflow-hidden p-10 bg-cover bg-center transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${loopBG})` }}
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-30 z-0"></div>
      <div className="absolute bottom-1 md:top-5 md:right-5 right-0 left-0 md:left-auto text-white bg-slate-500 bg-opacity-20 md:bottom-auto">
        <span className={`text-4xl ${countdownColor}`}>
          {`Nahabiling Oras: ${countdown}`}
        </span>
      </div>
      <div className="max-w-lg z-10 min-w-64 md:min-w-72">
        <div className="flex flex-col items-center justify-center mb-8">
          <p
            className={`text-center mb-2 hover:bg-white hover:bg-opacity-20 p-5 rounded cursor-pointer ${bgOpacity}`}
            onClick={handleQuestionTextClick}
          >
            {currentQuestion.question_text}
          </p>
          {currentQuestion.questionImage && (
            <img
              src={currentQuestion.questionImage}
              alt="Question Image"
              className="w-64 h-64 cursor-pointer"
            />
          )}
        </div>
        <div
          className={`grid grid-cols-2 gap-4 z-10 hover:bg-white hover:bg-opacity-20 p-5 rounded ${bgOpacity}`}
        >
          {currentQuestion.answer_choices.split(",").map((choice, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-blue-500 text-white rounded border hover:bg-yellow-200 hover:text-black active:bg-yellow-500 "
              onClick={() => handleChoiceClick(choice, index)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      {showTransitionCountdown && (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 text-center z-20">
            <div className="text-9xl font-bold text-yellow-400 px-14 py-7 bg-opacity-20 rounded-full z-30">
              {`${transitionCountdown}`}
            </div>
            <div className="absolute bottom-0 w-full flex justify-center">
              <img src={dancing} alt="Dancing" className="h-80 w-h-80" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionsAnswering;
