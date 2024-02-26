import React, { useState, useEffect } from "react";
import backLogo from "../../assets/images/back.png";
import skyBackground from "../../assets/images/sky.gif";
import { GrPrevious, GrNext } from "react-icons/gr";

const UnitChoices = ({
  backSound,
  unitChoices,
  onBack,
  onSelect,
  fetchUnits,
  teacherId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    // Function to preload the resources
    const preloadResources = async () => {
      try {
        // Load images
        await Promise.all([
          new Promise((resolve, reject) => {
            const img1 = new Image();
            img1.src = backLogo;
            img1.onload = resolve;
            img1.onerror = reject;
          }),
          new Promise((resolve, reject) => {
            const img2 = new Image();
            img2.src = skyBackground;
            img2.onload = resolve;
            img2.onerror = reject;
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

  useEffect(() => {
    fetchUnits();
  }, [teacherId]);

  const indexOfLastEntry = currentPage * 1;
  const indexOfFirstEntry = indexOfLastEntry - 1;
  const currentEntries = unitChoices.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setClickCount(0);
    setLastClickedIndex(null);
  };

  const handleUnitClick = (index, unit) => {
    if (lastClickedIndex !== index) {
      if (localStorage.getItem("voice") === "true") {
        responsiveVoice.speak(unit.yunitName, "Filipino Female");
      }

      setClickCount(1);
    } else {
      if (clickCount === 1) {
        sessionStorage.setItem("selectedunit", unit.yunitId);
        onSelect(unit);
      }
      setClickCount(0);
    }
    setLastClickedIndex(index);
  };

  const handleBackClick = () => {
    if (localStorage.getItem("voice") === "true") {
      backSound.play();
    }
    onBack();
  };

  if (!resourcesLoaded) {
    // Render loading indicator if resources are not loaded yet
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-blue-300"></div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center overflow-hidden p-10 bg-cover bg-center transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${skyBackground})` }}
    >
      <h1 className="text-4xl sm:text-6xl text-center mb-4 p-10 text-slate-800 transition-transform duration-500 transform hover:scale-110">
        Mga Yunit
      </h1>
      <div className="flex flex-wrap justify-center py-4 px-6 sm:px-0 transition-transform duration-500 transform hover:-translate-y-1">
        {currentEntries.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center m-4 transition-transform duration-500 transform hover:scale-105"
            onClick={() => handleUnitClick(index, unit)}
          >
            <p className="text-center mb-2">
              Ikapila nga yunit: {unit.yunitNumber}
            </p>
            <img
              src={unit.yunitThumbnail}
              alt={`Yunit ${unit.yunitNumber} Thumbnail`}
              className="w-64 h-64 cursor-pointer transition-transform duration-500 transform hover:rotate-6"
            />
            <p className="mt-2 transition-opacity duration-500 hover:opacity-70">
              {unit.yunitName}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 transition-transform duration-500 transform hover:scale-105 flex justify-center items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-white rounded transition-colors duration-300 min-w-24 flex justify-center items-center ${
            currentPage === 1
              ? "disabled:bg-gray-300 disabled:cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          <GrPrevious className="text-5xl" />
        </button>
        <span className="mx-2" />
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastEntry >= unitChoices.length}
          className={`bg-blue-500 text-white rounded transition-colors duration-300 min-w-24 flex justify-center items-center ${
            indexOfLastEntry >= unitChoices.length
              ? "disabled:bg-gray-300 disabled:cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          <GrNext className="text-5xl" />
        </button>
      </div>
      <button className="absolute top-0 left-0 m-4" onClick={handleBackClick}>
        <img src={backLogo} alt="Back" className="w-16 h-16" />
      </button>
    </div>
  );
};

export default UnitChoices;
