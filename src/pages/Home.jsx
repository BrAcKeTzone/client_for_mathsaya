import { FaUserGraduate, FaUserGroup } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { preventRightClick } from "../components/preventRightClick";
import "../assets/styles/RubikDoodleShadow.css";

function Home() {
  const Navigate = useNavigate();
  let consecutiveClicks = 0;

  const handleLogoClick = () => {
    consecutiveClicks += 1;
    if (consecutiveClicks === 5) {
      Navigate("/super-login");
      consecutiveClicks = 0;
    }
  };

  const handleLogoRightClick = (event) => {
    if (event.button === 2) {
      event.preventDefault();
      Navigate("/super-login");
    }
  };

  return (
    <>
      <div
        className="h-screen bg-blue-300 flex justify-center items-center"
        onContextMenu={preventRightClick}>
        <div className="rounded bg-blue-400 shadow-lg shadow-black p-4 md:w-2/3 lg:w-1/3">
          <div className="px-4 pt-4">
            <h1 className="grid grid-rows-2 grid-flow-col justify-center">
              <span className="flex justify-center text-4xl">WELCOME</span>
              <span className="flex justify-center text-3xl">TO</span>
            </h1>
          </div>
          <div className="flex justify-center">
            <button
              onContextMenu={handleLogoRightClick}
              onClick={handleLogoClick}>
              <img src={Logo} width={300} height={300} />
            </button>
          </div>
          <div className="px-4 pb-4 bg-slate-700">
            <div className="py-2 flex justify-center">
              <h1 className="text-white text-2xl">ARE YOU A</h1>
            </div>
            <div className="grid grid-cols-2 grid-flow-row gap-4 text-white font-bold">
              <Link
                to="/teach-login"
                className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded shadow-md shadow-black">
                <div className="grid grid-rows-2 grid-flow-col justify-center">
                  <span className="text-4xl flex justify-center">
                    <FaUserGraduate />
                  </span>
                  <span className="text-2xl">Teacher</span>
                </div>
              </Link>
              <Link
                to="/stud-login"
                className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded shadow-md shadow-black">
                <div className="grid grid-rows-2 grid-flow-col justify-center">
                  <span className="text-4xl flex justify-center">
                    <FaUserGroup />
                  </span>
                  <span className="text-2xl">Student</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
