import React, { useEffect, useState } from "react";
import imgLogo from "../../assets/images/mathsaya_logo.png";
import audioIntro from "../../assets/audios/intro.ogg";
import backgroundImg from "../../assets/images/introBackground.png";

const GameIntro = ({ onComplete }) => {
  const [logoScale, setLogoScale] = useState(0);

  useEffect(() => {
    const audio = new Audio(audioIntro);
    audio.loop = false;
    audio.play();
  }, []);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setLogoScale(0.9);
    }, 100);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <img
        src={backgroundImg}
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <button onClick={onComplete}>
        <img
          src={imgLogo}
          alt="Mathsaya Logo"
          style={{
            width: "70%",
            opacity: 0.7,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(" + logoScale + ")",
            transition: "transform 2s ease-in-out",
          }}
        />
      </button>
    </div>
  );
};

export default GameIntro;
