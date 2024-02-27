import React, { useEffect, useState } from "react";
import aniBackground from "../../assets/images/menu_bg.gif";

const TestScreen = ({ testscreenLoop, onContinue }) => {
  const [intervalId, setIntervalId] = useState(null);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    // Function to preload the resources
    const preloadResources = async () => {
      try {
        // Load background image
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.src = aniBackground;
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
    const id = setInterval(() => {
      testscreenLoop.play();
    }, 7000);
    setIntervalId(id);
    return () => {
      clearInterval(id);
    };
  }, [testscreenLoop]);

  const handleNumberClick = (number) => {
    clearInterval(intervalId);
    responsiveVoice.speak(number.toString(), "Spanish Female");
  };

  const numbers = [...Array(99).keys()].map((number) => number + 1);

  if (!resourcesLoaded) {
    // Render loading indicator if resources are not loaded yet
    return (
      <div class="h-screen w-full flex justify-center items-center bg-emerald-400 bg-opacity-50">
        <div class="colorloader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden ">
        <div
          className="min-h-screen w-full flex justify-center items-center overflow-hidden p-10 bg-cover"
          style={{ backgroundImage: `url(${aniBackground})` }}
        ></div>
      </div>

      <div className="absolute inset-0 flex flex-wrap justify-center items-center pt-10 mb-20 md:mb-0 overflow-y-auto md:overflow-y-hidden">
        <div className="bg-blue-200 bg-opacity-50 p-2 mb-20">
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {numbers.map((number) => (
              <div
                key={number}
                className="rounded w-12 h-12 flex justify-center items-center bg-white text-black hover:bg-black hover:text-white font-bold transition duration-300"
                onClick={() => handleNumberClick(number)}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 mb-8 mr-8">
        <button
          onClick={onContinue}
          className="px-4 py-2 bg-transparent border border-black rounded bg-white text-black hover:bg-black hover:text-white transition duration-300"
        >
          LAKTAWI
        </button>
      </div>
    </div>
  );
};

export default TestScreen;
