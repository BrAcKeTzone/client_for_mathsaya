import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/styles/hideVerticalScrollbar.css";

function T_Exercises({ server_url, setActiveComponent }) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [searchQueryExercises, setSearchQueryExercises] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${server_url}/exercises/exercises/:teacherId`
        );
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [selectedExercise, server_url]);

  const handleClickExercise = (exerciseId) => {
    setSelectedExercise(exerciseId);
  };

  return (
    <div>
      <h1 className="text-white text-6xl pt-4 pb-2">Exercises</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          exercises.length > 0 &&
          exercises.map((exercise) => (
            <div
              key={exercise.exerciseId}
              className="bg-white rounded-md overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => {
                  handleClickExercise(exercise.exerciseId);
                }}
              >
                <img
                  src={exercise.exerciseThumbnail}
                  alt={exercise.exerciseName}
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4 flex flex-col h-full">
                  <div className="text-xl font-bold mb-2">
                    {exercise.exerciseNumber}
                  </div>
                  <div className="text-base">{exercise.exerciseName}</div>
                </div>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default T_Exercises;
