import { FaUserGraduate, FaUserGroup, FaUserShield } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { preventRightClick } from "../components/preventRightClick";
import "../assets/styles/RubikDoodleShadow.css";

function Home() {
  return (
    <>
      <div
        className="h-screen bg-gradient-to-br from-teal-200 via-blue-200 to-indigo-700 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        <div className="rounded bg-white shadow-lg p-8 md:w-2/3 lg:w-1/3">
          <div className="fixed top-4 right-4">
            <Link to="/super-login">
              <button className="bg-rose-500 hover:bg-rose-700 py-2 px-4 rounded shadow-md text-white">
                <FaUserShield className="text-2xl" />
              </button>
            </Link>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-cyan-600 mb-2">WELCOME</h1>
            <h2 className="text-3xl font-bold text-cyan-600">TO</h2>
          </div>
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="Logo" className="w-48 h-48 object-cover" />
          </div>
          <div className="bg-blue-200 py-4 px-8 rounded-md">
            <div className="flex justify-center mb-4">
              <h1 className="text-2xl font-bold text-blue-800">ARE YOU A</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/teach-login"
                className="bg-cyan-500 hover:bg-cyan-700 py-2 px-4 rounded-md shadow-md text-white flex items-center justify-center"
              >
                <FaUserGraduate className="text-2xl mr-2" />
                <span className="text-xl">Teacher</span>
              </Link>
              <Link
                to="/stud-login"
                className="bg-amber-500 hover:bg-amber-700 py-2 px-4 rounded-md shadow-md text-white flex items-center justify-center"
              >
                <FaUserGroup className="text-2xl mr-2" />
                <span className="text-xl">Student</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
