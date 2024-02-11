import React, { useState, useEffect } from "react";
import profileLogo from "../../assets/images/profile.png";
import playLogo from "../../assets/images/play.png";
import settingLogo from "../../assets/images/settings.png";
import sky from "../../assets/images/sky.gif";
import weird from "../../assets/images/weird.gif";

const PlayGame = ({ onPlay, onProfile, onSettings }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  const handleButtonClick = (buttonType) => {
    if (selectedButton === buttonType) {
      switch (buttonType) {
        case "play":
          onPlay();
          break;
        case "profile":
          onProfile();
          break;
        case "settings":
          onSettings();
          break;
        default:
          break;
      }
    } else {
      setSelectedButton(buttonType);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex justify-center items-center overflow-hidden p-10 bg-cover ${
        isActive ? "opacity-100 transition-opacity duration-500" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${sky})` }}
    >
      <div>
        <div className="fixed top-24 md:top-24 ml-14 md:ml-32">
          <img src={weird} alt="Weird" className="w-48 h-w-48" />
        </div>
        <h1 className="text-center fixed top-64 bg-white bg-opacity-20 rounded">
          <span className="myLogoTitle text-7xl md:text-8xl" />
        </h1>

        <div className="flex justify-center gap-8 mt-36">
          <img
            src={profileLogo}
            alt="Profile Logo"
            className={`w-24 sm:w-32 h-24 sm:h-32 cursor-pointer ${
              selectedButton === "profile"
                ? "bg-green-200 rounded-full selected"
                : ""
            }`}
            onClick={() => handleButtonClick("profile")}
          />
          <img
            src={playLogo}
            alt="Play Logo"
            className={`w-24 sm:w-32 h-24 sm:h-32 cursor-pointer ${
              selectedButton === "play"
                ? "bg-blue-200 rounded-full selected"
                : ""
            }`}
            onClick={() => handleButtonClick("play")}
          />
          <img
            src={settingLogo}
            alt="Settings Logo"
            className={`w-24 sm:w-32 h-24 sm:h-32 cursor-pointer ${
              selectedButton === "settings"
                ? "bg-orange-200 rounded-full selected"
                : ""
            }`}
            onClick={() => handleButtonClick("settings")}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayGame;
