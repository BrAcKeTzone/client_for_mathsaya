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
  onBack,
  audioState,
  soundState,
  setAudioState,
  setSoundState,
  handleSignout,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  const handleVoiceToggle = () => {
    clicking.play();
    const newState = !audioState;
    setAudioState(newState);
    localStorage.setItem("voice", newState);
  };

  const handleSoundToggle = () => {
    clicking.play();
    const newState = !soundState;
    setSoundState(newState);
    localStorage.setItem("music", newState);
  };

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
            {/* <p className="mt-2">{audioState ? "Voice: On" : "Voice: Off"}</p> */}
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={soundState ? musicOnLogo : musicOffLogo}
              alt="Sound Logo"
              className="w-32 h-32 cursor-pointer"
              onClick={handleSoundToggle}
            />
            {/* <p className="mt-2">{soundState ? "Music: On" : "Music: Off"}</p> */}
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={signoutLogo}
              alt="Signout Logo"
              className="w-32 h-32 cursor-pointer"
              onClick={handleSignout}
            />
            {/* <p className="mt-2">Signout</p> */}
          </div>
        </div>
        <div className="absolute top-5 left-5 cursor-pointer" onClick={onBack}>
          <img src={backLogo} alt="Back Logo" className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
};

export default Settings;