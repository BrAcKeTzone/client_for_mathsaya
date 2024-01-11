import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/styles/hideVerticalScrollbar.css";

function T_Units({ server_url, setActiveComponent }) {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${server_url}/yunits/yunits/:teacherId`
        );
        setUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnits();
  }, [selectedUnit, server_url]);

  const handleClickUnit = (yunitId) => {
    setSelectedUnit(yunitId);
  };

  return (
    <div>
      <h1 className="text-white text-6xl pt-4 pb-2">Units</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          units.length > 0 &&
          units.map((unit) => (
            <div
              key={unit.yunitId}
              className="bg-white rounded-md overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
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
