import { Link } from "react-router-dom";
import { preventRightClick } from "../components/preventRightClick";
import "../assets/styles/RubikDoodleShadow.css";

function NotFound() {
  return (
    <>
      <div
        className="h-screen bg-blue-300 flex justify-center items-center"
        onContextMenu={preventRightClick}>
        <div className="grid grid-rows-2 grid-flow-col justify-center">
          <h1 className="text-red-500 text-5xl font-extrabold">
            Error 404! Page not found!
          </h1>
          <div className="flex justify-center m-2">
            <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-b-lg text-white text-2xl shadow-md shadow-black">
              <Link to="/">Go Back to Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
