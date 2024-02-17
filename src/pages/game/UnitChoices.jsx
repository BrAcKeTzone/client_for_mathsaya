import React, { useState, useEffect } from "react";
import backLogo from "../../assets/images/back.png";
import skyBackground from "../../assets/images/sky.gif";
import { GrPrevious, GrNext } from "react-icons/gr";

const UnitChoices = ({
  unitChoices,
  onBack,
  onSelect,
  fetchUnits,
  teacherId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(false);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUnitSelect = (unit) => {
    sessionStorage.setItem("selectedunit", unit.yunitId);
    onSelect(unit);
  };

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
            onClick={() => handleUnitSelect(unit)}
          >
            <p className="text-center mb-2">
              {" "}
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
      <div
        className="absolute top-5 left-5 cursor-pointer transition-opacity duration-500 hover:opacity-70"
        onClick={onBack}
      >
        <img src={backLogo} alt="Back Logo" className="w-16 h-16" />
      </div>
    </div>
  );
};

export default UnitChoices;
