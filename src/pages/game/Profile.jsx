import React, { useEffect, useState } from "react";
import sky from "../../assets/images/sky.gif";
import backButton from "../../assets/images/back.png";

const Profile = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  const studentProfileData = {
    student: { firstname: "John", lastname: "Doe" },
    studentProfile: { firstLoginDate: new Date().toLocaleString() },
    completedExercises: [
      { Exercise: { exerciseTitle: "Exercise 1" }, starRating: 3 },
      { Exercise: { exerciseTitle: "Exercise 2" }, starRating: 4 },
      { Exercise: { exerciseTitle: "Exercise 2" }, starRating: 4 },
      { Exercise: { exerciseTitle: "Exercise 2" }, starRating: 4 },
      { Exercise: { exerciseTitle: "Exercise 2" }, starRating: 4 },
    ],
    completedLessons: [
      { Lesson: { lessonTitle: "Lesson 1" }, starRating: 5 },
      { Lesson: { lessonTitle: "Lesson 2" }, starRating: 2 },
    ],
    completedUnits: [
      { Yunit: { yunitTitle: "Unit 1" }, starRating: 4 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
      { Yunit: { yunitTitle: "Unit 2" }, starRating: 3 },
    ],
  };

  return (
    <div
      className={`min-h-screen w-full flex justify-center items-center overflow-hidden p-10 bg-cover ${
        isActive ? "opacity-100 transition-opacity duration-500" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${sky})` }}
    >
      <div className="overflow-y-auto max-h-screen py-10">
        <div className="flex flex-col items-center space-y-4">
          {/* Student info container */}
          <div className="bg-blue-300 p-4 rounded-lg">
            <p className="text-lg font-semibold text-center text-blue-900">
              Akoang Impormasyon
            </p>
            <p className="text-base text-center text-blue-900">
              Ngan: {studentProfileData.student.firstname}{" "}
              {studentProfileData.student.lastname}
            </p>
            <p className="text-base text-center text-blue-900">
              Unang adlaw sa pagsulod:
              {studentProfileData.studentProfile.firstLoginDate}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Completed exercises list container */}
            <div className="bg-green-300 p-4 rounded-lg">
              <p className="text-lg font-semibold text-center text-green-900">
                Pag-uswag sa mga Ehersisyo
              </p>
              <div className="bg-green-200 rounded p-2 max-h-80 overflow-y-auto">
                {studentProfileData.completedExercises.map(
                  (exercise, index) => (
                    <p
                      key={index}
                      className="text-base text-center text-green-900"
                    >{`${exercise.Exercise.exerciseTitle} - Ihap sa Bituon
                    : ${exercise.starRating} ⭐`}</p>
                  )
                )}
              </div>
            </div>
            {/* Completed lessons list container */}
            <div className="bg-yellow-300 p-4 rounded-lg">
              <p className="text-lg font-semibold text-center text-yellow-900">
                Pag-uswag sa mga Leksyon
              </p>
              <div className="bg-yellow-200 rounded p-2 max-h-80 overflow-y-auto">
                {studentProfileData.completedLessons.map((lesson, index) => (
                  <p
                    key={index}
                    className="text-base text-center text-yellow-900"
                  >
                    {`${lesson.Lesson.lessonTitle} - Ihap sa Bituon: ${lesson.starRating} ⭐`}
                  </p>
                ))}
              </div>
            </div>
            {/* Completed units list container */}
            <div className="bg-red-300 p-4 rounded-lg">
              <p className="text-lg font-semibold text-center text-red-900">
                Pag-uswag sa mga Yunit
              </p>
              <div className="bg-red-200 rounded p-2 max-h-80 overflow-y-auto">
                {studentProfileData.completedUnits.map((unit, index) => (
                  <p key={index} className="text-base text-center text-red-900">
                    {`${unit.Yunit.yunitTitle} - Ihap sa Bituon: ${unit.starRating} ⭐`}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Back button */}
        <button className="absolute top-0 left-0 m-4" onClick={onBack}>
          <img src={backButton} alt="Back" className="w-16 h-16" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
