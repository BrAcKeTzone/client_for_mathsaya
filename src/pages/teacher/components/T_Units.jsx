import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/styles/hideVerticalScrollbar.css";

function T_Units({ teacherId, server_url, setActiveComponent }) {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [searchQueryUnits, setSearchQueryUnits] = useState("");

  useEffect(() => {
    fetchUnits(teacherId);
  }, [selectedUnit, server_url]);

  const fetchUnits = async (teacherId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/yunits/yunits/${teacherId}`
      );
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickUnit = (yunitId) => {
    setActiveComponent("LessonsList");
    setSelectedUnit(yunitId);
  };

  const handleDeleteUnit = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this unit?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${server_url}/yunits/delete/${id}`, {});
      fetchUnits(teacherId);
    } catch (error) {
      alert(error);
    }
  };

  const filteredUnits = units.filter((yunit) => {
    const { yunitNumber, yunitName } = yunit;
    const searchValue = searchQueryUnits.toLowerCase();
    return (
      yunitNumber.toString().toLowerCase().includes(searchValue) ||
      yunitName.toString().toLowerCase().includes(searchValue)
    );
  });

  const handleSearchChangeUnits = (e) => {
    setSearchQueryUnits(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-white text-6xl pt-4 pb-2">Units</h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-4">
          <input
            type="text"
            placeholder="Search Units"
            value={searchQueryUnits}
            onChange={handleSearchChangeUnits}
            className="p-2 border rounded"
          />
          <button
            className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              console.log("Add Unit clicked");
            }}
          >
            ADD UNIT
          </button>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          filteredUnits.length > 0 &&
          filteredUnits.map((unit) => (
            <div
              key={unit.yunitId}
              className="flex flex-col bg-white rounded-md overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => {
                  handleClickUnit(unit.yunitId);
                }}
              >
                <img
                  src={unit.yunitThumbnail}
                  alt={unit.yunitName}
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4 flex flex-col h-full">
                  <div className="text-xl font-bold mb-2">
                    {unit.yunitNumber}
                  </div>
                  <div className="text-base">{unit.yunitName}</div>
                </div>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default T_Units;
