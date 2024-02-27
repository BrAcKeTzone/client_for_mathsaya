import React, { useState, useEffect } from "react";
import profileLogo from "../../assets/images/profile.png";
import playLogo from "../../assets/images/play.png";
import settingLogo from "../../assets/images/settings.png";
import sky from "../../assets/images/sky.gif";
import weird from "../../assets/images/weird.gif";

const PlayGame = ({ fetchStudentProfile, onPlay, onProfile, onSettings }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    // Function to preload the resources
    const preloadResources = async () => {
      try {
        // Load images
        await Promise.all(
          [
            // Preload images
            profileLogo,
            playLogo,
            settingLogo,
            sky,
            weird,
          ].map((src) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );

        // Set resourcesLoaded to true when all resources are loaded
        setResourcesLoaded(true);
      } catch (error) {
        console.error("Error preloading resources:", error);
      }
    };

    // Call the preloadResources function
    preloadResources();
  }, []);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    fetchStudentProfile();
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

  const getMenuName = (buttonType) => {
    switch (buttonType) {
      case "play":
        return "Play Menu";
      case "profile":
        return "Profile Menu";
      case "settings":
        return "Settings Menu";
      default:
        return "";
    }
  };

  if (!resourcesLoaded) {
    // Render loading indicator if resources are not loaded yet
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-blue-300"></div>
    );
  }

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
          <span className="myLogoTitle text-6xl md:text-8xl" />
        </h1>

        <div className="flex justify-center gap-8 mt-36">
          <div className="flex flex-col items-center">
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
            {selectedButton === "profile" && (
              <span className="text-black mt-12 bg-white bg-opacity-20 fixed">
                IMONG PROPAYL
              </span>
            )}
          </div>
          <div className="flex flex-col items-center">
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
            {selectedButton === "play" && (
              <span className="text-black mt-12 bg-white bg-opacity-20 fixed">
                MAGDULA
              </span>
            )}
          </div>
          <div className="flex flex-col items-center">
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
            {selectedButton === "settings" && (
              <span className="text-black mt-12 bg-white bg-opacity-20 fixed">
                MGA SETTINGS
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayGame;
