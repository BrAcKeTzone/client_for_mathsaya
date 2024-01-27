import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="text-6xl font-bold mb-4">404 Not Found</div>
      <p className="text-lg mb-8">
        Oops! The page you're looking for does not exist.
      </p>
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Lost Astronaut"
        className="w-96 h-auto mb-8"
      />
      <Link to="/" className="text-lg underline hover:text-gray-300">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
