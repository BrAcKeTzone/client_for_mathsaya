import { FaHome } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { preventRightClick } from "../components/preventRightClick";
import "../assets/styles/AllFonts.css";

function NotFound() {
  return (
    <>
      <div
        className="h-screen bg-green-200 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        <div className="fixed top-4 right-4">
          <Link to="/super-login">
            <button className="bg-rose-500 hover:bg-rose-700 py-2 px-4 rounded shadow-md text-white">
              <FaUserShield className="text-2xl" />
            </button>
          </Link>
        </div>
        <div className="grid grid-rows-2 grid-flow-col justify-center text-center">
          <div className="flex md:flex-row flex-col">
            <h1 className="text-red-500 md:text-5xl text-4xl font-extrabold mb-4 mx-1">
              Error 404!
            </h1>
            <h1 className="text-red-500 text-5xl font-extrabold mb-4 mx-1">
              Page not found!
            </h1>
          </div>

          <div className="flex justify-center">
            <Link to="/">
              <button className="flex bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded-b-lg text-white text-2xl shadow-md">
                <FaHome className="text-3xl mr-2" />
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
