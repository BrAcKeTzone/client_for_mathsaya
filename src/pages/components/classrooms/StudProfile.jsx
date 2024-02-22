import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgBoy, CgGirl } from "react-icons/cg";
import { FaClock, FaArrowLeft } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function StudProfile({ selectedStudentId, server_url, goBack }) {
  const [studentProfile, setStudentProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(selectedStudentId);
    fetchStudentProfileId(selectedStudentId);
  }, [selectedStudentId, server_url]);

  const fetchStudentProfileId = async (selectedStudentId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/sprofile/get-profile-id/${selectedStudentId}`
      );
      fetchStudentProfile(response.data.studentProfileId);
    } catch (error) {
      console.error("Error fetching profile Id:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentProfile = async (studentProfileId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/sprofile/student-profile/${studentProfileId}`
      );
      console.log(response.data);
      setStudentProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseLoginDates = () => {
    if (
      studentProfile &&
      studentProfile.studentProfile &&
      studentProfile.studentProfile.loginDates
    ) {
      // Assuming loginDates is a comma-separated string of date strings
      const dates = studentProfile.studentProfile.loginDates.split(",");
      return dates.map((dateString) => ({
        date: new Date(dateString),
      }));
    }
    return [];
  };

  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${new Date(
            label
          ).toLocaleDateString()}`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <>
      <div className="">
        <div className="flex justify-end pt-1">
          <button
            className="w-[89px] p-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center relative"
            onClick={goBack}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaArrowLeft
              className={`opacity-0 transition-opacity ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
            <span
              className={`opacity-0 transition-opacity ${
                !isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Back
            </span>
          </button>
        </div>
        {studentProfile ? (
          <div className="p-4">
            <h1 className="text-6xl text-white font-semibold mb-6">
              STUDENT PROFILE
            </h1>
            <div className="bg-blue-200 rounded p-4 mb-2 hover:shadow-md hover:ring-4 ring-blue-400 transition duration-300">
              <div className="flex flex-row">
                <div className="bg-slate-700 flex">
                  {studentProfile.student.gender === "Male" ? (
                    <CgBoy className="text-6xl text-white" />
                  ) : (
                    studentProfile.student.gender === "Female" && (
                      <CgGirl className="text-6xl text-white" />
                    )
                  )}
                </div>
                <h2 className="text-2xl font-bold m-2 text-blue-600 my-auto">
                  {studentProfile.student.firstname}{" "}
                  {studentProfile.student.lastname}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">Student Added Date:</p>
                  <div className="bg-white rounded p-2 border border-blue-400">
                    {new Date(
                      studentProfile.student.createdAt
                    ).toLocaleString()}
                  </div>
                </div>
                <div>
                  <p className="mb-2">First Login Date:</p>
                  <div className="bg-white rounded p-2 border border-blue-400">
                    {new Date(
                      studentProfile.studentProfile.firstLoginDate
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-200 rounded p-4 mb-4 hover:shadow-md hover:ring-4 ring-yellow-400 transition duration-300">
              <h2 className="text-2xl font-bold text-yellow-600">
                Login Dates Chart
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={parseLoginDates()}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString()
                    }
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="date" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-200 rounded p-4 hover:shadow-md hover:ring-4 ring-green-400 transition duration-300">
                <h2 className="text-2xl font-bold text-green-600">
                  Exercise Records
                </h2>
                <ul className="list-disc ml-4">
                  {studentProfile.completedExercises.map((exercise) => (
                    <li
                      key={exercise.id}
                      className="text-blue-600 hover:text-blue-800 transition duration-300 p-1"
                    >
                      <span className="mr-2">
                        {exercise.Exercise.exerciseName}
                      </span>
                      <span className="flex text-gray-500">
                        - Collected Stars: {exercise.starRating} ⭐
                      </span>
                      {exercise.completionTime && (
                        <span className="flex items-center">
                          - Petsa:{" "}
                          {new Date(exercise.completionTime).toLocaleString()}
                          <FaClock className="ml-1" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-200 rounded p-4 hover:shadow-md hover:ring-4 ring-yellow-400 transition duration-300">
                <h2 className="text-2xl font-bold text-yellow-600">
                  Lesson Records
                </h2>
                <ul className="list-disc ml-4">
                  {studentProfile.completedLessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="text-blue-600 hover:text-blue-800 transition duration-300 p-1"
                    >
                      {lesson.Lesson.lessonName}{" "}
                      <span className="flex text-gray-500">
                        - Collected Stars: {lesson.starRating} ⭐
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-200 rounded p-4 hover:shadow-md hover:ring-4 ring-red-400 transition duration-300">
                <h2 className="text-2xl font-bold text-red-600">
                  Unit Records
                </h2>
                <ul className="list-disc ml-4">
                  {studentProfile.completedUnits.map((yunit) => (
                    <li
                      key={yunit.id}
                      className="text-blue-600 hover:text-blue-800 transition duration-300 p-1"
                    >
                      {yunit.Yunit.yunitName}{" "}
                      <span className="flex text-gray-500">
                        - Collected Stars: {yunit.starRating} ⭐
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-200 rounded p-4 mt-6 hover:shadow-md hover:ring-4 ring-purple-400 transition duration-300">
                <h2 className="text-2xl font-bold mb-2 text-purple-600">
                  Concepts Needing Reinforcement
                </h2>
                <div className="text-blue-600">
                  <p className="mb-2">
                    Exercises where the student needs additional practice and
                    support.
                  </p>
                  <div className="bg-white rounded p-2 border border-blue-400 hover:text-blue-800">
                    {studentProfile.minExercise ? (
                      <div>
                        {studentProfile.minExercise.Exercise.exerciseName} -{" "}
                        <span className="text-gray-500">
                          Collected Stars:{" "}
                          {studentProfile.minExercise.starRating} ⭐
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500">No data available</span>
                    )}
                  </div>
                  <p className="mb-2">
                    Lessons where the student needs additional practice and
                    support.{" "}
                  </p>
                  <div className="bg-white rounded p-2 border border-blue-400 hover:text-blue-800">
                    {studentProfile.minLesson ? (
                      <div>
                        {studentProfile.minLesson.Lesson.lessonName} -{" "}
                        <span className="text-gray-500">
                          Collected Stars: {studentProfile.minLesson.starRating}{" "}
                          ⭐
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500">No data available</span>
                    )}
                  </div>
                  <p className="mb-2">
                    Units where the student needs additional practice and
                    support.{" "}
                  </p>
                  <div className="bg-white rounded p-2 border border-blue-400 hover:text-blue-800">
                    {studentProfile.minYunit ? (
                      <div>
                        {studentProfile.minYunit.Yunit.yunitName} -{" "}
                        <span className="text-gray-500">
                          Collected Stars: {studentProfile.minYunit.starRating}{" "}
                          ⭐
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500">No data available</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-purple-200 rounded p-4 mt-6 hover:shadow-md hover:ring-4 ring-purple-400 transition duration-300">
                <h2 className="text-2xl font-bold mb-2 text-purple-600">
                  Ready for Enrichment
                </h2>
                <div className="text-blue-600">
                  <p className="mb-2">
                    Exercises where the student demonstrates strong
                    understanding and proficiency.
                  </p>
                  <div className="bg-white rounded p-2 border border-blue-400 hover:text-blue-800">
                    {studentProfile.minExercise ? (
                      <div>
                        {studentProfile.minExercise.Exercise.exerciseName} -{" "}
                        <span className="text-gray-500">
                          Collected Stars:{" "}
                          {studentProfile.minExercise.starRating} ⭐
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500">No data available</span>
                    )}
                  </div>
                  <p className="mb-2">
                    Lessons where the student demonstrates strong understanding
                    and proficiency.
                  </p>
                  <div className="bg-white rounded p-2 border border-blue-400 hover:text-blue-800">
                    {studentProfile.minLesson ? (
                      <div>
                        {studentProfile.minLesson.Lesson.lessonName} -{" "}
                        <span className="text-gray-500">
                          Collected Stars: {studentProfile.minLesson.starRating}{" "}
                          ⭐
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500">No data available</span>
                    )}
                  </div>
                  <p className="mb-2">
                    Unitswhere the student demonstrates strong understanding and
                    proficiency.
                  </p>
                  <div className="bg-white rounded p-2 border border-blue-400 hover:text-blue-800">
                    {studentProfile.minYunit ? (
                      <div>
                        {studentProfile.minYunit.Yunit.yunitName} -{" "}
                        <span className="text-gray-500">
                          Collected Stars: {studentProfile.minYunit.starRating}{" "}
                          ⭐
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500">No data available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-3xl font-bold p-4 text-red-500">
            <h2>This student haven't signed in yet!</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default StudProfile;
