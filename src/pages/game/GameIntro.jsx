import React, { useEffect, useState } from "react";
import imgLogo from "../../assets/images/mathsaya_logo.png";
import audioIntro from "../../assets/audios/intro.ogg";
import backgroundImg from "../../assets/images/introBackground.png";

const GameIntro = ({ onComplete }) => {
  const [logoScale, setLogoScale] = useState(0);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    // Function to preload the resources
    const preloadResources = async () => {
      try {
        // Load image
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imgLogo;
          img.onload = resolve;
          img.onerror = reject;
        });

        // Load audio
        await new Promise((resolve, reject) => {
          const audio = new Audio(audioIntro);
          audio.addEventListener("canplaythrough", resolve);
          audio.onerror = reject;
          audio.load();
        });

        // Load background image
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.src = backgroundImg;
          img.onload = resolve;
          img.onerror = reject;
        });

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
    const animationTimer = setTimeout(() => {
      setLogoScale(1);
    }, 1000);

    return () => clearTimeout(animationTimer);
  }, []);

  if (!resourcesLoaded) {
    // Render loading indicator if resources are not loaded yet
    return (
      <div class="h-screen w-full flex justify-center items-center bg-yellow-400 bg-opacity-10">
        <div class="colorloader"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="relative min-h-screen w-full flex justify-center items-center p-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            zIndex: -1,
          }}
        ></div>
        <button onClick={onComplete}>
          <img
            src={imgLogo}
            alt="Mathsaya Logo"
            className="w-70 md:w-1/2 lg:w-1/3 opacity-70 transform transition-transform duration-1000"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(" + logoScale + ")",
              zIndex: 1,
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default GameIntro;
