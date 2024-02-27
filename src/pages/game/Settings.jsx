import React, { useState, useEffect } from "react";
import backLogo from "../../assets/images/back.png";
import signoutLogo from "../../assets/images/signout.png";
import musicOnLogo from "../../assets/images/soundon.png";
import musicOffLogo from "../../assets/images/soundoff.png";
import voiceOnLogo from "../../assets/images/audioon.png";
import voiceOffLogo from "../../assets/images/audiooff.png";
import sky from "../../assets/images/sky.gif";

const Settings = ({
  clicking,
  music_off,
  music_on,
  voice_off,
  voice_on,
  signout,
  onBack,
  backSound,
  audioState,
  soundState,
  setAudioState,
  setSoundState,
  handleSignout,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    // Function to preload the resources
    const preloadResources = async () => {
      try {
        // Load images
        await Promise.all([
          new Promise((resolve, reject) => {
            const img1 = new Image();
            img1.src = musicOnLogo;
            img1.onload = resolve;
            img1.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img2 = new Image();
            img2.src = musicOffLogo;
            img2.onload = resolve;
            img2.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img3 = new Image();
            img3.src = voiceOnLogo;
            img3.onload = resolve;
            img3.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img4 = new Image();
            img4.src = voiceOffLogo;
            img4.onload = resolve;
            img4.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img5 = new Image();
            img5.src = signoutLogo;
            img5.onload = resolve;
            img5.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img6 = new Image();
            img6.src = backLogo;
            img6.onload = resolve;
            img6.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img7 = new Image();
            img7.src = sky;
            img7.onload = resolve;
            img7.onerror = reject;
          }),
        ]);

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

  const handleVoiceToggle = () => {
    audioState ? voice_off.play() : voice_on.play();
    const newState = !audioState;
    setAudioState(newState);
    localStorage.setItem("voice", newState);
  };

  const handleSoundToggle = () => {
    soundState ? music_off.play() : music_on.play();
    const newState = !soundState;
    setSoundState(newState);
    localStorage.setItem("music", newState);
  };

  const signoutPrompt = () => {
    signout.play();
    handleSignout();
  };

  if (!resourcesLoaded) {
    // Render loading indicator if resources are not loaded yet
    return (
      <div class="h-screen w-full flex justify-center items-center bg-blue-300">
        <div class="colorloader"></div>
      </div>
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
        <h1 className="text-4xl sm:text-6xl text-center mb-4 p-10 text-slate-800">
          KONPIGURASYON
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="flex flex-col items-center justify-center">
            <img
              src={audioState ? voiceOnLogo : voiceOffLogo}
              alt="Voice Logo"
              className="w-32 h-32 cursor-pointer"
              onClick={handleVoiceToggle}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={soundState ? musicOnLogo : musicOffLogo}
              alt="Sound Logo"
              className="w-32 h-32 cursor-pointer"
              onClick={handleSoundToggle}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={signoutLogo}
              alt="Signout Logo"
              className="w-32 h-32 cursor-pointer"
              onClick={signoutPrompt}
            />
          </div>
        </div>
        <button
          className="absolute top-0 left-0 m-4"
          onClick={onBack}
          onMouseEnter={() => backSound.play()}
          onTouchStart={() => backSound.play()}
        >
          <img src={backLogo} alt="Back" className="w-16 h-16" />
        </button>
      </div>
    </div>
  );
};

export default Settings;
