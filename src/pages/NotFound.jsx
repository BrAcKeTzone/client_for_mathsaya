import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { preventRightClick } from "../components/preventRightClick";
import "../assets/styles/RubikDoodleShadow.css";

function NotFound() {
  return (
    <>
      <div
        className="h-screen bg-gradient-to-br from-teal-200 via-blue-200 to-indigo-700 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        <div className="grid grid-rows-2 grid-flow-col justify-center text-center">
          <h1 className="text-red-500 text-5xl font-extrabold mb-4">
            Error 404! Page not found!
          </h1>
          <div className="flex justify-center">
            <Link to="/">
              <button className="flex bg-cyan-500 hover:bg-cyan-700 py-2 px-4 rounded-b-lg text-white text-2xl shadow-md">
                <FaHome className="text-2xl mr-2" />
                Go Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
